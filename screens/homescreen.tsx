import * as React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import MyButton from '../components/MyButton';
import { ButtonStyle } from '../Style/StyleSheet';

export default function homeScreen({ navigation }) {
  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 40, margin: 'auto', paddingTop: 50 }}>
          Create your shopping list
        </Text>
        <Text style={{ fontSize: 40, margin: 'auto' }}>
          But first, login !
        </Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', margin: 'auto' }}>
        <View style={{
          margin: 50,
        }}
        >
          <MyButton
            title="Register"
            onPress={() => navigation.navigate('Register')}
            color="#00b70e"
            styleButton={ButtonStyle.bigbutton}
            styleText={ButtonStyle.bigtext}
          />
        </View>
        <View style={{
          margin: 50,
        }}
        >
          <MyButton
            title="Login"
            onPress={() => navigation.navigate('Login')}
            color="#00b70e"
            styleButton={ButtonStyle.bigbutton}
            styleText={ButtonStyle.bigtext}
          />
        </View>
      </View>
    </>
  );
}

homeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
