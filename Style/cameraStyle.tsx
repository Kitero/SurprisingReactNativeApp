import { Dimensions, StyleSheet } from 'react-native';

const cameraWidth = Dimensions.get('window').width;
const cameraHeight = Dimensions.get('window').height - 80;

const cameraStyle = StyleSheet.create({
  containerCamera: {
    width: cameraWidth,
    height: cameraHeight,
  },
  ButtonStyle: {
    backgroundColor: 'transparent',
    paddingTop: 8,
    paddingLeft: 7,
    paddingRight: 7,
    height: 40,
  },
  TextButtonStyle: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
  separatorStyle: {
    height: cameraHeight - 50,
    width: cameraWidth,
  },
  ConfirmButtonStyle: {
    backgroundColor: 'transparent',
    paddingTop: 8,
    paddingLeft: 7,
    paddingRight: 7,
    height: 40,
    flex: 2,
  },
  ConfirmTextButtonStyle: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 20,
    flex: 2,
  },
  containerPhotoStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    marginTop: cameraHeight - 50,
    width: cameraWidth,
  },
});

export default cameraStyle;
