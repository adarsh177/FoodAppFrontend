import React, {useEffect, useState} from 'react';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconEN from 'react-native-vector-icons/Entypo';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppConfig from '../../../AppConfig.json';

// All screens in proper order-----------------------------------

import StoreTab from './Tabs/StoreTab';
import OrderTab from './Tabs/OrderTab/OrderTab';
import ProfileTab from './Tabs/ProfileTab';
import EarningTab from './Tabs/EarningTab';
import messaging from '@react-native-firebase/messaging';
import {UpdateProfile} from '../../APIs/ProfileManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen(props) {
  const bottomTab = createBottomTabNavigator();

  useEffect(() => {
    // LOADING FCM TOKEN
    messaging()
      .getToken()
      .then(async token => {
        const notificationDisabled = await AsyncStorage.getItem(
          'notificationsDisabled',
        );
        if (notificationDisabled === null || !notificationDisabled)
          UpdateProfile({fcmToken: token});
      })
      .catch(err => {});
  }, []);

  return (
    <bottomTab.Navigator
      initialRouteName="store"
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'store') {
              return <IconEN name="shop" color={color} size={size} />;
            } else if (route.name === 'order') {
              return <IconFA name="shopping-bag" color={color} size={size} />;
            } else if (route.name === 'profile') {
              return <IconFA name="user" color={color} size={size} />;
            } else if (route.name === 'earning') {
              return <IconFA name="money" color={color} size={size} />;
            }
          },
        };
      }}
      tabBarOptions={{
        activeTintColor: AppConfig.primaryColor,
        inactiveTineColor: '#a4a4a4',
      }}>
      <bottomTab.Screen
        options={{title: 'Store'}}
        name="store"
        component={StoreTab}
      />
      <bottomTab.Screen
        options={{title: 'Order'}}
        name="order"
        component={OrderTab}
      />
      <bottomTab.Screen
        options={{title: 'Profile'}}
        name="profile"
        component={ProfileTab}
      />
      <bottomTab.Screen
        options={{title: 'Earning'}}
        name="earning"
        component={EarningTab}
      />
    </bottomTab.Navigator>
  );
}

export default HomeScreen;
