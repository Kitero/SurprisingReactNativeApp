import * as React from 'react';
import {
  ScrollView, View, Text,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MyButton from '../components/MyButton';
import { ButtonStyle } from '../Style/StyleSheet';

function disconnect() {

}

export default function listScreen({ navigation }) {
  const data = {
    choucroutte: 1,
    poires: 4,
    steak: 3,
    sel: 1,
    pommes: 5,
  };
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flex: 1,
            alignContent: 'flex-end',
            flexDirection: 'row',
          }}
        >
          <MyButton
            title="Create a new list"
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'HomePage' }],
            })}
            styleButton={ButtonStyle.buttonTopBar}
            styleText={ButtonStyle.text}
          />
          <MyButton
            title="Disconnect"
            onPress={() => {
              disconnect();
              navigation.navigate('Disconnect');
            }}
            styleButton={ButtonStyle.buttonDisconnect}
            styleText={ButtonStyle.text}
          />
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>List Screen</Text>
      <ScrollView>
        <Text>
          Insert List here
        </Text>
      </ScrollView>
    </View>
  );
}
