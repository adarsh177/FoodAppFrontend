import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppConfig from './AppConfig.json';

// All screens in proper order-----------------------------------

import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/LoginScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import ListItemScreen from './src/screens/ListItemScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="splash"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="onboarding"
          component={OnboardingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: AppConfig.primaryColor,
            headerTitleAlign: 'center',
            title: "Inventory"
          }}
          name="inventory"
          component={InventoryScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: AppConfig.primaryColor,
            headerTitleAlign: 'center',
            title: "List Item"
          }}
          name="listItem"
          component={ListItemScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: AppConfig.primaryColor,
            headerTitleAlign: 'center',
            title: "Profile"
          }}
          name="editProfile"
          component={EditProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
