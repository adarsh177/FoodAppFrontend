import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import AppConfig from '../../../../AppConfig.json';

//Importing cards for order tabs -----------------------

import OnGoingOrderCard from '../../../components/OnGoingOrderCard';

// 3 orders top tab components--------------------------

function Orders(props) {
  return (
    <ScrollView style={style.orderContainer}>
      <Text style={style.orderPageTitle}>Orders</Text>
      <View>
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Packing"
          onPress={() => {
            props.navigation.push('orderDetail', {
              data: 'hello',
            });
          }}
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Delivered"
          onPress={() => {
            props.navigation.push('orderDetail', {
              data: 'hello',
            });
          }}
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Delivered"
          onPress={() => {
            props.navigation.push('orderDetail', {
              data: 'hello',
            });
          }}
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Delivered"
          onPress={() => {
            props.navigation.push('orderDetail', {
              data: 'hello',
            });
          }}
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Delivered"
          onPress={() => {
            props.navigation.push('orderDetail', {
              data: 'hello',
            });
          }}
        />
        <OnGoingOrderCard
          orderID="Order Id"
          price="200"
          date="12/12/2021"
          items="Item1x2, item2x3"
          status="Delivered"
          onPress={() => {
            props.navigation.push('orderDetail', {
              data: 'hello',
            });
          }}
        />
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  orderPageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: AppConfig.primaryColor,
    marginVertical: 10,
  },
  orderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default Orders;
