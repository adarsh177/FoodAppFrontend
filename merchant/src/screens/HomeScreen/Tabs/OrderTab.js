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

//Importing cards for order tabs -----------------------

import OnGoingOrderCard from '../../../components/OnGoingOrderCard';
import PendingOrderCard from '../../../components/PendingOrderCard';
import HistoryOrderCard from '../../../components/HistoryOrderCard';

// 3 orders top tab components--------------------------

function OrderOngoing(props) {

  return (
    <ScrollView style={style.orderContainer}>
      <View>
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Packing"
          onPress={() => {
            props.route.params.baseNavigation.push("orderDetail", {data: "hello"});
          }}
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="On the way"
          onPress={() => {
            props.route.params.baseNavigation.push("orderDetail", {data: "hello"});
          }}
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Packing"
          onPress={() => {
            props.route.params.baseNavigation.push("orderDetail", {data: "hello"});
          }}
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="On the way"
          onPress={() => {
            props.route.params.baseNavigation.push("orderDetail", {data: "hello"});
          }}
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Packing"
          onPress={() => {
            props.route.params.baseNavigation.push("orderDetail", {data: "hello"});
          }}
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="On the way"
          onPress={() => {
            props.route.params.baseNavigation.push("orderDetail", {data: "hello"});
          }}
        />
      </View>
    </ScrollView>
  );
}

function OrderPending(props) {
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

function OrderHistory(props) {
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
      <TopTab.Screen name="Ongoing" component={OrderOngoing} initialParams={{baseNavigation: props.navigation}} />
      <TopTab.Screen name="Pending" component={OrderPending} initialParams={{baseNavigation: props.navigation}} />
      <TopTab.Screen name="History" component={OrderHistory} initialParams={{baseNavigation: props.navigation}} />
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
