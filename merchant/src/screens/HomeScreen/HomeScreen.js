import React from 'react';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconEN from 'react-native-vector-icons/Entypo';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppConfig from '../../../AppConfig.json';

// All screens in proper order-----------------------------------

import StoreTab from './Tabs/StoreTab';
import OrderTab from './Tabs/OrderTab/OrderTab';
import ProfileTab from './Tabs/ProfileTab';
import EarningTab from './Tabs/EarningTab';

function HomeScreen(props) {
  const bottomTab = createBottomTabNavigator();

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
      <bottomTab.Screen name="store" component={StoreTab} />
      <bottomTab.Screen name="order" component={OrderTab} />
      <bottomTab.Screen name="profile" component={ProfileTab} />
      <bottomTab.Screen name="earning" component={EarningTab} />
    </bottomTab.Navigator>
  );
}

export default HomeScreen;
