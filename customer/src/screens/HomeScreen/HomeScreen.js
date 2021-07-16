import React from 'react';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppConfig from '../../../AppConfig.json';

// All screens in proper order-----------------------------------

import StoreTab from './Tabs/StoreTab';
import OrderTab from './Tabs/OrderTab';
import ProfileTab from './Tabs/ProfileTab';
import EarningTab from './Tabs/EarningTab';

function HomeScreen() {
  const bottomTab = createBottomTabNavigator();
  return (
    <bottomTab.Navigator
      initialRouteName="store"
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'explore') {
              return <IconMI name="explore" color={color} size={size} />;
            } else if (route.name === 'favorite') {
              return <IconMI name="favorite" color={color} size={size} />;
            } else if (route.name === 'profile') {
              return <IconFA name="user" color={color} size={size} />;
            } else if (route.name === 'order') {
              return <IconFA name="shopping-bag" color={color} size={size} />;
            }
          },
        };
      }}
      tabBarOptions={{
        activeTintColor: AppConfig.primaryColor,
        inactiveTineColor: '#a4a4a4',
      }}>
      <bottomTab.Screen name="explore" component={StoreTab} />
      <bottomTab.Screen name="favorite" component={OrderTab} />
      <bottomTab.Screen name="profile" component={ProfileTab} />
      <bottomTab.Screen name="order" component={OrderTab} />
    </bottomTab.Navigator>
  );
}

export default HomeScreen;
