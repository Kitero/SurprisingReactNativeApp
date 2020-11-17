import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import homeScreen from './screens/homescreen';
import LoginScreen from './screens/loginscreen';
import ListScreen from './screens/listscreen';
import ListItemsScreen from './screens/listItemsScreen';
import RegisterScreen from './screens/registerscreen';
import useColorScheme from './hooks/useColorScheme';
import { UserContext } from './contexts/userContext';
import * as routes from './routes';

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const [token, setToken] = useState('');

  const initialRouteName = token.length == 0 ? "HomePage" : "lists"

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ token, setToken }}>
        <Stack.Navigator colorScheme={colorScheme} initialRouteName={initialRouteName}>
          <Stack.Screen name={routes.homeRoute} component={homeScreen} options={{ title: 'Shopping list' }} />
          <Stack.Screen name={routes.registerRoute} component={RegisterScreen} />
          <Stack.Screen name={routes.loginRoute} component={LoginScreen} />
          <Stack.Screen name={routes.listsRoute} component={ListScreen} />
          <Stack.Screen name={routes.listItemsRoute}>
            {
              props => <ListItemsScreen {...props} token={token} />
            }
          </Stack.Screen>
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer >
  );
}
