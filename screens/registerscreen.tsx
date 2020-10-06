import * as React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import boxContainer from '../Style/BoxContainerStyle';
import MyTextInput from '../components/textinput';
import MyButton from '../components/MyButton';
import { ButtonStyle } from '../Style/StyleSheet';

function createAccount() {
  console.log('CreateAccount');
}

export default function registerScreen({ navigation }) {
  return (
    <View style={boxContainer.boxSimple}>
      <Text style={{ fontSize: 20 }}>Create your account</Text>
      <MyTextInput
        placeholder="Username"
        textContentType="username"
      />
      <MyTextInput
        placeholder="Password"
        secureTextEntry
        textContentType="newPassword"
      />
      <MyTextInput
        placeholder="Password confirmation"
        secureTextEntry
        textContentType="password"
      />
      <View style={{
        marginTop: 12,
      }}
      >
        <MyButton
          onPress={() => {
            createAccount();
            navigation.navigate('Login');
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
