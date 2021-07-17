import React from 'react';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppConfig from '../../../AppConfig.json';

// All screens in proper order-----------------------------------

import Explore from './Tabs/Explore';
import OrderTab from './Tabs/OrderTab';
import FavouriteTab from './Tabs/FavouriteTab';

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
      <bottomTab.Screen name="explore" component={Explore} />
      <bottomTab.Screen name="favorite" component={FavouriteTab} />
      <bottomTab.Screen name="order" component={OrderTab} />
    </bottomTab.Navigator>
  );
}

export default HomeScreen;
