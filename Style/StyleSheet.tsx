import { StyleSheet } from 'react-native';

const inputStyle = StyleSheet.create({
  textInput: {
    height: 40,
    marginTop: 12,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
  },
});

const ButtonStyle = StyleSheet.create({
  button: {
    paddingTop: 8,
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#00b70e',
    borderRadius: 5,
    borderColor: '#00b70e',
    height: 40,
  },
  buttonConfirmation: {
    paddingTop: 8,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#00b70e',
    borderRadius: 5,
    borderColor: '#00b70e',
    height: 40,
  },
  buttonTopBar: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    margin: 5,
    marginRight: 10,
    backgroundColor: '#00b70e',
    borderRadius: 5,
    borderColor: '#00b70e',
    height: 40,
  },
  buttonDisconnect: {
    paddingTop: 8,
    paddingLeft: 7,
    paddingRight: 7,
    margin: 10,
    backgroundColor: '#b70000',
    borderRadius: 5,
    borderColor: '#b70000',
    height: 40,
  },
  buttonDelete: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#ff7c00',
    borderRadius: 5,
    borderColor: '#ff7c00',
    height: 40,
  },
  buttonNewItem: {
    paddingTop: 8,
    paddingRight: 8,
    paddingLeft: 8,
    margin: 7,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#00b70e',
    borderRadius: 5,
    borderColor: '#00b70e',
    height: 40,
  },
  bigbutton: {
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#00b70e',
    borderRadius: 10,
    borderColor: '#00b70e',
    height: 80,
  },
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
  bigtext: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 30,
  },
  buttonClose: {
    padding: 4,
    backgroundColor: '#cbcbcb',
    borderRadius: 5,
    borderColor: '#b70000',
    height: 30,
    width: 30,
    margin: 10,
  },
});

const modalStyle = StyleSheet.create({
  basicModal: {
    backgroundColor: '#fff',
    width: 300,
    height: 200,
    alignItems: 'flex-end',
    borderRadius: 10,
  },
  basicModalNewList: {
    backgroundColor: '#fff',
    width: 300,
    height: 230,
    alignItems: 'flex-end',
    borderRadius: 10,
  },
  newItemModal: {
    backgroundColor: '#fff',
    width: 300,
    minHeight: 270,
    alignItems: 'flex-end',
    borderRadius: 10,
  },
  centerModal: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  modalContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  modalContainerColumn: {
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 10,
  },
  modalButton: {
    paddingTop: 8,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#00b70e',
    borderRadius: 5,
    borderColor: '#00b70e',
    height: 40,
    margin: 20,
    marginTop: 35,
  },
  modalRejectButton: {
    paddingTop: 8,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: 'red',
    borderRadius: 5,
    borderColor: 'red',
    height: 40,
    margin: 20,
    marginTop: 35,
  },
  modalNewItemButton: {
    paddingTop: 8,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#00b70e',
    borderRadius: 5,
    borderColor: '#00b70e',
    height: 40,
    margin: 20,
  },
  doubleContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    paddingTop: 0,
  },
});

const Default = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const textStyle = StyleSheet.create({
  text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 22,
    alignSelf: 'center',
  },
  textInput: {
    color: '#000',
    textAlign: 'left',
    fontSize: 22,
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 5,
  },
});

const lightTheme = {
  body: '#E2E2E2',
  text: '#363537',
  toggleBorder: '#FFF',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
};

const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
};

export {
  ButtonStyle,
  Default,
  lightTheme,
  darkTheme,
  inputStyle,
  modalStyle,
  textStyle,
};
