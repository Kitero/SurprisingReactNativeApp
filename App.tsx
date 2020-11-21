import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';
import ListScreen from './screens/listScreen';
import ListItemsScreen from './screens/listItemsScreen';
import RegisterScreen from './screens/registerScreen';
import CameraScreen from './screens/cameraScreen';
import useColorScheme from './hooks/useColorScheme';
import * as routes from './routes';

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const [token, setToken] = useState();

  const initialRouteName = token !== undefined ? 'HomePage' : 'lists';

  return (
    <NavigationContainer>
      <Stack.Navigator colorScheme={colorScheme} initialRouteName="HomePage">
        <Stack.Screen name={routes.homeRoute} component={HomeScreen} options={{ title: 'Shopping list' }} />
        <Stack.Screen name={routes.loginRoute}>
          {(props) => <LoginScreen {...props} setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name={routes.listsRoute}>
          {(props) => <ListScreen {...props} token={token} />}
        </Stack.Screen>
        <Stack.Screen name={routes.listItemsRoute}>
          {(props) => <ListItemsScreen {...props} token={token} />}
        </Stack.Screen>
        <Stack.Screen name={routes.registerRoute}>
          {(props) => <RegisterScreen {...props} setToken={setToken} />}
        </Stack.Screen>
        <Stack.Screen name={routes.cameraRoute} component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
