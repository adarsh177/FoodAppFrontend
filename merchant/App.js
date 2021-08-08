import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
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
import OrderDetailScreen from './src/screens/OrderDetailScreen';
import ShareScreen from './src/screens/ShareScreen';
import messaging from '@react-native-firebase/messaging';
import {Alert, View} from 'react-native';
import BlockedScreen from './src/screens/BlockedScreen';
import WebViewScreen from './src/screens/WebViewScreen';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    messaging().onMessage(msg => {
      console.log('Notification', msg.notification);
      Alert.alert(msg.notification.title, msg.notification.body);
    });
    messaging().subscribeToTopic('merchant');
  }, []);
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
            title: 'Inventory',
          }}
          name="inventory"
          component={InventoryScreen}
        />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: AppConfig.primaryColor,
            headerTitleAlign: 'center',
            title: 'List Item',
          }}
          name="listItem"
          component={ListItemScreen}
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
            title: 'Share App',
          }}
          name="shareApp"
          component={ShareScreen}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: AppConfig.primaryColor,
            headerTitleAlign: 'center',
            title: 'Account Disabled',
          }}
          name="blockedScreen"
          component={BlockedScreen}
        />

        <Stack.Screen
          options={{
            headerShown: true,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: AppConfig.stripeColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            title: 'stripe',
            headerLeft: null,
          }}
          name="webviewScreen"
          component={WebViewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
