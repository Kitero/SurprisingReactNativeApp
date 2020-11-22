import * as React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CameraStyle from '../Style/cameraStyle';
import MyCamera from '../components/MyCamera';
import { uploadProfilePicture } from '../apiCaller';
import { INavigation } from '../interfaces/navigation';
import { UserContext } from '../contexts/userContext';
import { listsRoute } from '../routes';

interface IProps {
  navigation: INavigation;
}

interface IComponentProps extends IProps {
  token: string;
}

function CameraScreenComponent({ navigation, token, setProfileImageUrl }: IComponentProps) {
  const handleUploadProfilePicture = (picture) => {
    uploadProfilePicture(picture.base64, token)
      .then((json) => {
        setProfileImageUrl(json.profile_picture);
        navigation.navigate(listsRoute);
      }, () => { });
  };

  return (
    <>
      <View style={CameraStyle.containerCamera}>
        <MyCamera onValidatePicture={handleUploadProfilePicture} />
      </View>
    </>
  );
}

CameraScreenComponent.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  setProfileImageUrl: PropTypes.func.isRequired,
};

export default function CameraScreen({ navigation }: IProps) {
  return (
    <UserContext.Consumer>
      {
        (value) => (
          <CameraScreenComponent
            navigation={navigation}
            token={value.token}
            setProfileImageUrl={value.setProfileImageUrl}
          />
        )
      }
    </UserContext.Consumer>
  );
}

CameraScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};
