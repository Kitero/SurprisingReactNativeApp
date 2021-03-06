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
import { IUserContext, UserContext } from '../contexts/userContext';
import { INavigation } from '../interfaces/navigation';

interface IProps {
  navigation: INavigation;
}

export default function LoginScreen({ navigation }: IProps) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [buttonDisable, setButtonDisable] = React.useState(true);
  const [errors, setErrors] = React.useState([]);

  function handleUsernameChange(text: string) {
    setUsername(text);
  }

  function handlePasswordChange(text: string) {
    setPassword(text);
  }

  function loginAccount(userContext: IUserContext) {
    signIn(username, password)
      .then((json) => {
        userContext.setToken(json.token);
        userContext.setProfileImageUrl(json.profile_picture);
        navigation.reset({
          index: 0,
          routes: [{ name: listsRoute }],
        });
      }, (errorsStatus) => {
        setErrors(errorsStatus);
      });
  }

  const needDisable = () => username.length === 0 || password.length === 0;

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
        autoFocus
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

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
};
