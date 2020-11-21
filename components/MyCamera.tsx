import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import MyButton from './MyButton';
import cameraStyle from '../Style/cameraStyle';
import { listsRoute } from '../routes';

export default function MyCamera() {
  const navigation = useNavigation();

  const [spinner, setSpinner] = useState(false);

  const [hasPermission, setHasPermission] = useState<boolean>();
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [camera, setCamera] = useState<Camera | null>();

  const [cameraDisplay, setCameraDisplay] = useState(true);
  const [photo, setPhoto] = useState({ uri: 'file:///data/' });

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3'); // default is 4:3
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  // set the camera ratio and padding.
  const prepareRatio = async () => {
    let desiredRatio = '4:3';
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();

      const distances = {};
      const realRatios = {};
      let minDistance: string;
      ratios.forEach((ratioCam: string) => {
        const parts = ratioCam.split(':');
        const realRatio = parseInt(parts[0], 10) / parseInt(parts[1], 10);
        realRatios[ratioCam] = realRatio;
        const distance = screenRatio - realRatio;
        distances[ratioCam] = realRatio;
        if (minDistance === undefined) {
          minDistance = ratioCam;
        } else if (distance >= 0 && distance < distances[minDistance]) {
          minDistance = ratioCam;
        }
      });
      desiredRatio = minDistance;
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2,
      );
      setImagePadding(remainder / 2);
      setRatio(desiredRatio);
      setIsRatioSet(true);
    }
  };

  const setCameraReady = async () => {
    if (!isRatioSet) {
      await prepareRatio();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === undefined) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const uploadPhoto = () => {
    navigation.navigate(listsRoute);
  };

  if (!cameraDisplay) {
    const ratioPhoto = 3;
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{
            width: width - width / ratioPhoto,
            height: height - height / ratioPhoto,
            marginLeft: width / ratioPhoto / 2,
            marginTop: height / ratioPhoto / 3,
          }}
          source={{
            uri: photo.uri,
          }}
        />
        <View style={cameraStyle.containerPhotoStyle}>
          <MyButton
            styleButton={cameraStyle.ConfirmButtonStyle}
            styleText={cameraStyle.ConfirmTextButtonStyle}
            title="Retry"
            onPress={() => {
              setSpinner(!spinner);
              setCameraDisplay(!cameraDisplay);
            }}
          />
          <MyButton
            styleButton={cameraStyle.ConfirmButtonStyle}
            styleText={cameraStyle.ConfirmTextButtonStyle}
            title="Validate"
            onPress={uploadPhoto}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={spinner}
        textContent="Loading..."
        overlayColor="rgba(142, 142, 142, 0.5)"
        textStyle={{ color: 'white' }}
      />
      <Camera
        style={{ flex: 1, marginTop: imagePadding, marginBottom: imagePadding }}
        ratio={ratio}
        onCameraReady={setCameraReady}
        ref={(ref) => {
          setCamera(ref);
        }}
        type={type}
      >
        <View
          style={cameraStyle.separatorStyle}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <MyButton
            styleButton={cameraStyle.ButtonStyle}
            styleText={cameraStyle.TextButtonStyle}
            title="Flip"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          />
          <MyButton
            styleButton={cameraStyle.ButtonStyle}
            styleText={cameraStyle.TextButtonStyle}
            title="Take Picture"
            onPress={async () => {
              if (camera) {
                setSpinner(!spinner);
                const photoInfos = await camera.takePictureAsync();
                setCameraDisplay(false);
                setPhoto(photoInfos);
              }
            }}
          />
        </View>
      </Camera>
    </View>
  );
}
