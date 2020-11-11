import * as React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import boxContainer from '../Style/BoxContainerStyle';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import { ButtonStyle } from '../Style/StyleSheet';
import { listsRoute } from '../routes';
import { signIn } from '../apiCaller';


export default function loginScreen({ navigation, setToken }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleUsernameChange(text) {
    setUsername(text);
  }

  function handlePasswordChange(text) {
    setPassword(text);
  }

  function loginAccount() {
    signIn(username, password)
      .then((json) => {
        console.log(json);
        setToken(json.token);
        navigation.navigate(listsRoute);
      });
  }

  return (
    <View style={boxContainer.boxSimple}>
      <Text style={{ fontSize: 20 }}>Connect to your account</Text>
      <MyTextInput
        placeholder="Username"
        value={username}
        onChangeText={handleUsernameChange}
      />
      <MyTextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      <View style={{
        marginTop: 12,
      }}
      >
        <MyButton
          title="Validate login"
          color="#00b70e"
          onPress={() => {
            loginAccount();
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: listsRoute }],
            // });
          }}
          styleButton={ButtonStyle.button}
          styleText={ButtonStyle.text}
        />
      </View>
    </View>
  );
}

loginScreen.propTypes = {
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
};
