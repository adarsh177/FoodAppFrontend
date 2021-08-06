import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AppConfig from '../../../../../AppConfig.json';
import CompleteOrders from './CompleteOrders';
import PendingOrders from './PendingOrders';

function OrderTab(props) {
  const TopTab = createMaterialTopTabNavigator();
  return (
    <TopTab.Navigator
      tabBarOptions={{
        labelStyle: {
          activeTintColor: AppConfig.primaryColor,
          inactiveTineColor: '#a4a4a4',
        },
        indicatorStyle: {backgroundColor: AppConfig.primaryColor},
      }}>
      <TopTab.Screen name="Pending" component={PendingOrders} />
      <TopTab.Screen name="History" component={CompleteOrders} />
    </TopTab.Navigator>
  );
}
const style = StyleSheet.create({
  orderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default OrderTab;
