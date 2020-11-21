import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import CameraStyle from '../Style/cameraStyle';
import MyCamera from '../components/MyCamera';

export default function CameraScreen({ navigation }) {
  return (
    <>
      <View style={CameraStyle.containerCamera}>
        <MyCamera />
      </View>
    </>
  );
}

CameraScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};