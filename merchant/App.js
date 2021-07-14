import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// All screens in proper order-----------------------------------

import SplashScreen from './screens/splashScreen';
import Login from './screens/login';
import OnBoarding from './screens/onBoarding';
import InnerApp from './screens/innerApp/innerApp';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="Splash screen"
          component={SplashScreen}
        />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="onBoarding"
          component={OnBoarding}
        />
        <Stack.Screen 
          name="innerApp" 
          component={InnerApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
