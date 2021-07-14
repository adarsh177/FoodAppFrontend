import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppConfig from './AppConfig.json';

// All screens in proper order-----------------------------------

import SplashScreen from './screens/splashScreen';
import Login from './screens/login';
import OnBoarding from './screens/onBoarding';
import InnerApp from './screens/innerApp/innerApp';
import Inventory from './screens/headerScreens/inventory';
import ListItem from './screens/headerScreens/listItem';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Splash screen"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="onBoarding"
          component={OnBoarding}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="innerApp"
          component={InnerApp}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: AppConfig.primaryColor,
            headerTitleAlign: 'center',
          }}
          name="Inventory"
          component={Inventory}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: AppConfig.primaryColor,
            headerTitleAlign: 'center',
          }}
          name="List Item"
          component={ListItem}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
