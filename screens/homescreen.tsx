import * as React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MyButton from '../components/MyButton';
import { ButtonStyle } from '../Style/StyleSheet';
import { registerRoute, loginRoute } from '../routes';

export default function HomeScreen({ navigation }) {
  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{
          fontSize: 40, margin: 'auto', paddingTop: 50, textAlign: 'center',
        }}
        >
          Create your shopping list
        </Text>
        <Text style={{ fontSize: 40, margin: 'auto' }}>
          But first, login !
        </Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'column', margin: 'auto' }}>
        <View style={{
          margin: 50,
        }}
        >
          <MyButton
            title="Register"
            onPress={() => navigation.navigate(registerRoute)}
            styleButton={ButtonStyle.bigbutton}
            styleText={ButtonStyle.bigtext}
          />
        </View>
        <View style={{
          marginRight: 50,
          marginLeft: 50,
        }}
        >
          <MyButton
            title="Login"
            onPress={() => navigation.navigate(loginRoute)}
            styleButton={ButtonStyle.bigbutton}
            styleText={ButtonStyle.bigtext}
          />
        </View>
      </View>
    </>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
