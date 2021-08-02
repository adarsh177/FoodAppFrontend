import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {GetCurrencySymbolFromId} from '../CurrencyManager/CurrencyManager';
import AppConfig from '../../AppConfig.json';
import Dinero from 'dinero.js'

function OrderCard(props) {
  //handel card press ongoinf -----------------------
  // const onGoingCardPress = () => {
  //   return null;
  // };
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={style.cardContainer}>
        <View style={style.orderIdandPriceContainer}>
          <Text style={style.orderId}>#{props.orderID}</Text>
          <Text style={style.price}>{GetCurrencySymbolFromId(props.price.currency)} {Dinero(props.price).toUnit()}</Text>
        </View>
        <Text style={style.date}>Date: {props.date}</Text>
        <Text style={style.items}>{props.items}</Text>
        <Text style={style.status}>
          <Text style={style.statusTitleText}>Status : </Text>
          {props.status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 130,
    borderRadius: 3,
    shadowColor: '#cfcfcf',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 5,
    elevation: 1,
    padding: 10,
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  orderIdandPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
  },
  price: {
    color: AppConfig.primaryColor,
    fontWeight: '700',
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: '#7d7d7d',
    marginBottom: 10,
  },
  items: {
    fontWeight: '700',
    marginBottom: 3,
  },
  statusTitleText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
export default OrderCard;
