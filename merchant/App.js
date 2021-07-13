import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// All screens in proper order-----------------------------------

import SplashScreen from './screens/splashScreen';
import Login from './screens/login';
import OnBoarding from './screens/onBoarding';
import InnerApp from './screens/innerApp/innerApp';

const Tab = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Splash screen"
          component={SplashScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="onBoarding"
          component={OnBoarding}
        />
        <Tab.Screen name="innerApp" component={InnerApp} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
