import * as React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import boxContainer from '../Style/BoxContainerStyle';
import MyTextInput from '../components/textinput';
import MyButton from '../components/MyButton';
import { ButtonStyle } from '../Style/StyleSheet';
import { loginRoute } from '../routes';

function createAccount() {
  console.log('CreateAccount');
}

export default function registerScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  return (
    <View style={boxContainer.boxSimple}>
      <Text style={{ fontSize: 20 }}>Create your account</Text>
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
          onPress={() => {
            createAccount();
            navigation.navigate(loginRoute);
          }}
          title="Create your account"
          styleButton={ButtonStyle.button}
          styleText={ButtonStyle.text}
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
