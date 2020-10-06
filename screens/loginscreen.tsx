import * as React from 'react';
import { View, Text } from 'react-native';
import { boxContainer } from '../Style/BoxContainerStyle';
import { MyTextInput } from '../components/textinput';
import MyButton from '../components/MyButton';
import { ButtonStyle } from '../Style/StyleSheet';

function loginAccount() {
  console.log('LoginAccount');
}

export default function loginScreen({ navigation }) {
  return (
    <View style={boxContainer.boxSimple}>
      <Text style={{ fontSize: 20 }}>Connect to your account</Text>
      <MyTextInput
        placeholder="Username"
        selectionColor="#428AF8"
      />
      <MyTextInput
        placeholder="Password"
        selectionColor="#428AF8"
        secureTextEntry
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
            navigation.reset({
              index: 0,
              routes: [{ name: 'List' }],
            });
          }}
          styleButton={ButtonStyle.button}
          styleText={ButtonStyle.text}
        />
      </View>
    </View>
  );
}
