import { StyleSheet } from 'react-native';

const inputStyle = StyleSheet.create({
  textInput: {
    height: 40,
    marginTop: 12,
    paddingLeft: 7,
    paddingRight: 7,
    underline: { textDecorationLine: 'underline' },
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
    borderColor: '#',
    height: 40,
  },
  buttonConfirmation: {
    paddingTop: 8,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#00b70e',
    borderRadius: 5,
    borderColor: '#',
    height: 40,
  },
  buttonTopBar: {
    paddingTop: 8,
    paddingLeft: 7,
    paddingRight: 7,
    margin: 10,
    backgroundColor: '#00b70e',
    borderRadius: 5,
    borderColor: '#',
    height: 40,
  },
  buttonDisconnect: {
    paddingTop: 8,
    paddingLeft: 7,
    paddingRight: 7,
    margin: 10,
    backgroundColor: '#b70000',
    borderRadius: 5,
    borderColor: '#',
    height: 40,
  },
  bigbutton: {
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#00b70e',
    borderRadius: 5,
    borderColor: '#',
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
});

const Default = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
};
