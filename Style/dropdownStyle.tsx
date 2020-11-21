import { StyleSheet } from 'react-native';

const dropDownStyle = StyleSheet.create({
  list: {
    padding: 5,
    paddingBottom: 3,
    paddingTop: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    width: 140,
    height: 'auto',
    position: 'absolute',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    top: 56,
    borderBottomStartRadius: 5,
  },
  element: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
  },
  triggerButton: {
    paddingRight: 10,
    paddingLeft: 10,
    margin: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
  },
  triggerButtonText: {
    padding: 10,
  },
});

export default {
  dropDownStyle,
};
