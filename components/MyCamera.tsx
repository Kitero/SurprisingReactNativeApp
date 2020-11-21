import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Platform, StatusBar, Image } from 'react-native';
import { Camera } from 'expo-camera';
import MyButton from './MyButton';
import cameraStyle from '../Style/cameraStyle';
import { listsRoute } from '../routes';
import { useNavigation } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';

export default function MyCamera() {
  const navigation = useNavigation();

  const [spinner, setSpinner] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [camera, setCamera] = useState(null);

  const [cameraDisplay, setCameraDisplay] = useState(true);
  const [photo, setPhoto] = useState({uri: 'file:///data/'});

  // Screen Ratio and image padding
  const [imagePadding, setImagePadding] = useState(0);
  const [ratio, setRatio] = useState('4:3');  // default is 4:3
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  // set the camera ratio and padding.
  const prepareRatio = async () => {
    let desiredRatio = '4:3';
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();

      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        const distance = screenRatio - realRatio; 
        distances[ratio] = realRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      desiredRatio = minDistance;
      const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
      );
      setImagePadding(remainder / 2);
      setRatio(desiredRatio);
      setIsRatioSet(true);
    }
  }

  const setCameraReady = async() => {
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

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const uploadPhoto = () => {
    //use photo variable containing photo URI, width and height
    console.log(photo);
    navigation.navigate(listsRoute);
  }

  if (!cameraDisplay) {
    let ratioPhoto = 3;
    return(
    <View style={{flex: 1}}>
      <Image
        style={{width: width - width / ratioPhoto, height: height - height / ratioPhoto, marginLeft: width / ratioPhoto / 2, marginTop: height / ratioPhoto / 3}}
        source={{
          uri: photo.uri
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
          }}/>
        <MyButton
          styleButton={cameraStyle.ConfirmButtonStyle}
          styleText={cameraStyle.ConfirmTextButtonStyle}
          title="Validate"
          onPress={uploadPhoto}/>
      </View>
    </View>
  )}

  return (
    <View style={{ flex: 1}}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        overlayColor={"rgba(142, 142, 142, 0.5)"}
        textStyle={{ color: 'white'}}
      />
      <Camera
        style={{ flex: 1, marginTop: imagePadding, marginBottom: imagePadding}}
        ratio={ratio}
        onCameraReady={setCameraReady}
        ref={(ref) => {
          setCamera(ref)
        }}
        type={type}>
        <View
          style={cameraStyle.separatorStyle}>
        </View>
        <View style={{flexDirection: "row", justifyContent: 'space-around'}}>
          <MyButton
            styleButton={cameraStyle.ButtonStyle}
            styleText={cameraStyle.TextButtonStyle}
            title="Flip"
            onPress={() => {
              console.log("flip");
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}/>
          <MyButton
            styleButton={cameraStyle.ButtonStyle}
            styleText={cameraStyle.TextButtonStyle}
            title="Take Picture"
            onPress={async () => {
              if(camera){
                setSpinner(!spinner);
                let photo = await camera.takePictureAsync();
                setCameraDisplay(false);
                setPhoto(photo);
              }
            }}/>
        </View>
      </Camera>
    </View>
  );
}
