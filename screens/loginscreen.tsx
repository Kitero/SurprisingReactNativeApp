import * as React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import boxContainer from '../Style/BoxContainerStyle';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import { ButtonStyle } from '../Style/StyleSheet';
import { listsRoute } from '../routes';
import { signIn } from '../apiCaller';
import MyErrorPrinter from '../components/MyErrorPrinter';
import { UserContext } from '../contexts/userContext';


export default function loginScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [buttonDisable, setButtonDisable] = React.useState(true);
  const [errors, setErrors] = React.useState([]);

  function handleUsernameChange(text) {
    setUsername(text);
  }

  function handlePasswordChange(text) {
    setPassword(text);
  }

  function loginAccount(uesrContext) {
    signIn(username, password)
      .then((json) => {
        uesrContext.setToken(json.token);
        navigation.reset({
          index: 0,
          routes: [{ name: listsRoute }]
        });
      }, (errors) => {
        setErrors(errors);
      });
  }

  const needDisable = () => {
    return username.length == 0 || password.length == 0;
  }

  React.useEffect(() => {
    setButtonDisable(needDisable());
  }, [username, password]);

  return (
    <View style={boxContainer.boxSimple}>
      <Text style={{ fontSize: 20 }}>Connect to your account</Text>
      <MyErrorPrinter errors={errors} />
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
      <View
        style={{
          marginTop: 12,
        }}
      >
        <UserContext.Consumer>
          {(value) => (
            <MyButton
              title="Validate login"
              onPress={() => {
                loginAccount(value);
              }}
              styleButton={ButtonStyle.button}
              styleText={ButtonStyle.text}
              disable={buttonDisable}
            />
          )}
        </UserContext.Consumer>
      </View>
    </View>
  );
}

loginScreen.propTypes = {
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
};
