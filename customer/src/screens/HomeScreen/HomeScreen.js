import React from 'react';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppConfig from '../../../AppConfig.json';

// All screens in proper order-----------------------------------

import Explore from './Tabs/Explore';
import FavouriteTab from './Tabs/FavouriteTab';
import Wallet from './Tabs/Wallet';

function HomeScreen() {
  const bottomTab = createBottomTabNavigator();
  return (
    <bottomTab.Navigator
      initialRouteName="store"
      screenOptions={({route}) => {
        return {
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'explore') {
              return <IconMI name="explore" color={color} size={size} />;
            } else if (route.name === 'favorite') {
              return <IconMI name="favorite" color={color} size={size} />;
            } else if (route.name === 'wallet') {
              return <IconMI name="account-balance-wallet" color={color} size={size} />;
            }
          },
        };
      }}
      tabBarOptions={{
        activeTintColor: AppConfig.primaryColor,
        inactiveTineColor: '#a4a4a4',
      }}>
      <bottomTab.Screen options={{title: "Explore"}} name="explore" component={Explore} />
      <bottomTab.Screen options={{title: "Favourites"}} name="favorite" component={FavouriteTab} />
      <bottomTab.Screen options={{title: "Wallet"}} name="wallet" component={Wallet} />
    </bottomTab.Navigator>
  );
}

export default HomeScreen;
