import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import homeScreen from './screens/homescreen';
import loginScreen from './screens/loginscreen';
import listScreen from './screens/listscreen';
import registerScreen from './screens/registerscreen';
import disconnectScreen from './screens/disconnectscreen';
import useColorScheme from './hooks/useColorScheme';

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer>
      <Stack.Navigator colorScheme={colorScheme} initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={homeScreen} options={{ title: 'Shopping list' }} />
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="List" component={listScreen} />
        <Stack.Screen name="Register" component={registerScreen} />
        <Stack.Screen name="Disconnect" component={disconnectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
