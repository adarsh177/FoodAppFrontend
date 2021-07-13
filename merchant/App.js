import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
// All screens in proper order-----------------------------------
import SplashScreen from './screens/splashScreen';
import Login from './screens/login';
import OnBoarding from './screens/onBoarding';

function App() {
  const Tab = createStackNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen name="Splash screen" component={SplashScreen} />
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="onBoarding" component={OnBoarding} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
