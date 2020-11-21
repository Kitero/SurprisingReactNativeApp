import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';
import ListScreen from './screens/listScreen';
import ListItemsScreen from './screens/listItemsScreen';
import RegisterScreen from './screens/registerScreen';
import CameraScreen from './screens/cameraScreen';
// import useColorScheme from './hooks/useColorScheme';
import { UserContext } from './contexts/userContext';
import * as routes from './routes';

const Stack = createStackNavigator();

export default function App() {
  // const colorScheme = useColorScheme();
  const [token, setToken] = useState('');

  const initialRouteName = token.length === 0 ? routes.homeRoute : routes.listsRoute;

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ token, setToken }}>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen name={routes.homeRoute} component={HomeScreen} options={{ title: 'Shopping list' }} />
          <Stack.Screen name={routes.registerRoute} component={RegisterScreen} />
          <Stack.Screen name={routes.loginRoute} component={LoginScreen} />
          <Stack.Screen name={routes.listsRoute} component={ListScreen} />
          <Stack.Screen name={routes.listItemsRoute} component={ListItemsScreen} />
          <Stack.Screen name={routes.cameraRoute} component={CameraScreen} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
