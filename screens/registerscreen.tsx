import * as React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import boxContainer from '../Style/BoxContainerStyle';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import MyErrorPrinter from '../components/MyErrorPrinter';
import { ButtonStyle } from '../Style/StyleSheet';
import { listsRoute } from '../routes';
import { signUp } from '../apiCaller';


export default function registerScreen({ navigation, setToken }) {
  const [username, setUsername] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [errors, setErrors] = React.useState([]);
  const [buttonDisable, setButtonDisable] = React.useState(true);

  function verify_passwords() {
    if (password1 != password2) {
      setErrors(['Password don\'t match']);
      return false;
    }
    return true;
  }

  const createAccount = () => {
    if (!verify_passwords()) {
      return false;
    }
    signUp(username, password1)
      .then((json) => {
        setToken(json.token);
        navigation.navigate(listsRoute);
      }, (error) => {
        let errors = [];
        for (let e in error) {
          errors = errors.concat(error[e]);
        }
        setErrors(errors);
      });
  }

  React.useEffect(() => {
    setButtonDisable(needDisable());
  }, [username, password1, password2])

  const needDisable = () => {
    return username.length == 0 || password1.length == 0 || password2.length == 0;
  }

  return (
    <View style={boxContainer.boxSimple}>
      <Text style={{ fontSize: 20 }}>Create your account</Text>
      <MyErrorPrinter errors={errors} />
      <MyTextInput
        placeholder="Username"
        textContentType="username"
        value={username}
        onChangeText={(text) => { setUsername(text); }}
      />
      <MyTextInput
        placeholder="Password"
        secureTextEntry
        textContentType="newPassword"
        value={password1}
        onChangeText={(text) => { setPassword1(text); }}
      />
      <MyTextInput
        placeholder="Password confirmation"
        secureTextEntry
        textContentType="password"
        value={password2}
        onChangeText={(text) => { setPassword2(text); }}
      />
      <View style={{
        marginTop: 12,
      }}
      >
        <MyButton
          onPress={() => { createAccount(); }}
          title="Create your account"
          styleButton={ButtonStyle.button}
          styleText={ButtonStyle.text}
          disable={buttonDisable}
        />
      </View>
    </View>
  );
}

registerScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
