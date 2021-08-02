import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AppConfig from '../../AppConfig.json';
import GetCurrencySymbol, { GetCurrencySymbolFromId } from '../CurrencyManager/CurrencyManager';

function HistoryOrderCard(props) {
  return (
    <TouchableOpacity onPress={props.onClick} activeOpacity={0.8}>
      <View style={style.cardContainer}>
        <View style={style.orderIdandPriceContainer}>
          <Text style={style.orderId}>#{props.orderID}</Text>
          <Text style={style.price}>{GetCurrencySymbolFromId(props.price.currency)} {props.price.amount}</Text>
        </View>
        <Text style={style.date}>Date: {props.date}</Text>
        <Text style={style.items}>{props.items}</Text>
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
    marginBottom: 10,
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
    color: '#7d7d7d',
    marginBottom: 3,
  },
  items: {
    fontWeight: '700',
    marginBottom: 3,
  },
});
export default HistoryOrderCard;
