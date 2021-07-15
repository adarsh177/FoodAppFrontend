import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AppConfig from '../../../../AppConfig.json';
import OrderDetailDialog from '../../../dialogs/OrderDetailsDialog';

//Importing cards for order tabs -----------------------

import OnGoingOrderCard from './OrderTab/OnGoingOrderCard';
import PendingOrderCard from './OrderTab/PendingOrderCard';
import HistoryOrderCard from './OrderTab/HistoryOrderCard';

// 3 orders top tab components--------------------------

function OrderOngoing() {
  const [orderDetailDialogVisible, setorderDetailDialogVisibility] =
    useState(false);

  return (
    <ScrollView style={style.orderContainer}>
      <View>
        <TouchableOpacity
          onPress={() => {
            setorderDetailDialogVisibility(true);
          }}>
          <Text>Modal</Text>
        </TouchableOpacity>
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Packing"
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="On the way"
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Packing"
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="On the way"
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Packing"
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="On the way"
        />
      </View>
      <OrderDetailDialog
        show={orderDetailDialogVisible}
        close={() => {
          setorderDetailDialogVisibility(false);
        }}
      />
    </ScrollView>
  );
}

function OrderPending() {
  return (
    <ScrollView style={style.orderContainer}>
      <View>
        <PendingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
        <PendingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
        <PendingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
        <PendingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
        <PendingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
        <PendingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
      </View>
    </ScrollView>
  );
}

function OrderHistory() {
  return (
    <ScrollView style={style.orderContainer}>
      <View>
        <HistoryOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
        <HistoryOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
        <HistoryOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
        <HistoryOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
        <HistoryOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
        <HistoryOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
        />
      </View>
    </ScrollView>
  );
}

//Top navigation configuration-------------------------

function OrderTab() {
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
      <TopTab.Screen name="Ongoing" component={OrderOngoing} />
      <TopTab.Screen name="Pending" component={OrderPending} />
      <TopTab.Screen name="History" component={OrderHistory} />
    </TopTab.Navigator>
  );
}
const style = StyleSheet.create({
  orderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default OrderTab;
