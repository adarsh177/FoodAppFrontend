import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppConfig from '../../AppConfig.json';

// All screens in proper order-----------------------------------

import Store from './store';
import Order from './order';
import Profile from './profile';
import Earning from './earning';

function InnerApp() {
  const bottomTab = createBottomTabNavigator();
  return (
    <bottomTab.Navigator
      initialRouteName="store"
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'store') {
              iconName = focused ? 'store' : 'store';
            } else if (route.name === 'order') {
              iconName = focused ? 'shopping-bag' : 'shopping-bag';
            } else if (route.name === 'profile') {
              iconName = focused ? 'user' : 'user';
            } else if (route.name === 'earning') {
              iconName = focused ? 'dollar-sign' : 'dollar-sign';
            }
            return <Icon name={iconName} color={color} size={size} />;
          },
        };
      }}
      tabBarOptions={{
        activeTintColor: AppConfig.primaryColor,
        inactiveTineColor: '#a4a4a4',
      }}>
      <bottomTab.Screen name="store" component={Store} />
      <bottomTab.Screen name="order" component={Order} />
      <bottomTab.Screen name="profile" component={Profile} />
      <bottomTab.Screen name="earning" component={Earning} />
    </bottomTab.Navigator>
  );
}

export default InnerApp;
