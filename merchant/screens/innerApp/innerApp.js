import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// All screens in proper order-----------------------------------

import Store from './store';
import Order from './order';
import Profile from './profile';
import Earning from './earning';

function InnerApp() {
  const bottomTab = createBottomTabNavigator();
  return (
    <bottomTab.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <bottomTab.Screen name="store" component={Store} />
      <bottomTab.Screen name="order" component={Order} />
      <bottomTab.Screen name="profile" component={Profile} />
      <bottomTab.Screen name="earning" component={Earning} />
    </bottomTab.Navigator>
  );
}

export default InnerApp;
