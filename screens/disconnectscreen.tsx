import * as React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import boxContainer from '../Style/BoxContainerStyle';
import MyButton from '../components/MyButton';
import { ButtonStyle } from '../Style/StyleSheet';
import { homeRoute, listsRoute } from '../routes';

function disconnect() {
  console.log('disconnect');
}

export default function disconnectScreen({ navigation }) {
  return (
    <View style={boxContainer.boxSimple}>
      <Text style={{ fontSize: 20 }}>Do you really want to disconnect?</Text>
      <View style={{ height: 30 }} />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
      >
        <MyButton
          title="Yes"
          onPress={() => {
            disconnect();
            navigation.reset({
              index: 0,
              routes: [{ name: homeRoute }],
            });
          }}
          styleButton={ButtonStyle.buttonConfirmation}
          styleText={ButtonStyle.text}
        />
        <MyButton
          title="No"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: listsRoute }],
            });
          }}
          styleButton={ButtonStyle.buttonConfirmation}
          styleText={ButtonStyle.text}
        />
      </View>
    </View>
  );
}

disconnectScreen.propTypes = {
  navigation: PropTypes.shape({
    reset: PropTypes.func.isRequired,
  }).isRequired,
};
