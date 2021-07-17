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
import RestaurantMenu from './src/screens/RestaurantMenu';
import EditProfileScreen from './src/screens/EditProfileScreen';
import OrderDetailScreen from './src/screens/OrderDetailScreen';
import RestaurantProfile from './src/screens/RestaurantProfile';

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
            title: 'Restaurant Menu',
          }}
          name="restaurantMenu"
          component={RestaurantMenu}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: AppConfig.primaryColor,
            headerTitleAlign: 'center',
            title: 'Profile',
          }}
          name="editProfile"
          component={EditProfileScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: AppConfig.primaryColor,
            headerTitleAlign: 'center',
            title: 'Order Details',
          }}
          name="orderDetail"
          component={OrderDetailScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: AppConfig.primaryColor,
            headerTitleAlign: 'center',
            title: 'Restaurant Profile',
          }}
          name="restaurantProfile"
          component={RestaurantProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
