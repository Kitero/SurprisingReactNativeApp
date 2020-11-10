import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import homeScreen from './screens/homescreen';
import loginScreen from './screens/loginscreen';
import listScreen from './screens/listscreen';
import listItemsScreen from './screens/listItemsScreen';
import registerScreen from './screens/registerscreen';
import useColorScheme from './hooks/useColorScheme';
import * as routes from './routes';

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <NavigationContainer>
      <Stack.Navigator colorScheme={colorScheme} initialRouteName="HomePage">
        <Stack.Screen name={routes.homeRoute} component={homeScreen} options={{ title: 'Shopping list' }} />
        <Stack.Screen name={routes.loginRoute} component={loginScreen} />
        <Stack.Screen name={routes.listsRoute} component={listScreen} />
        <Stack.Screen name={routes.listItemsRoute} component={listItemsScreen} />
        <Stack.Screen name={routes.registerRoute} component={registerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
