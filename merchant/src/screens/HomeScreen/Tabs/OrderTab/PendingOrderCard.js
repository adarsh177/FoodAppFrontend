import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AppConfig from '../../../../../AppConfig.json';

function PendingOrderCard(props) {
  //handel card press-------------------------------
  const pendingCardPress = () => {
    return null;
  };
  //handle action of reject and accept in card
  const rejectOrder = () => {
    return null;
  };
  const acceptOrder = () => {
    return null;
  };
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={pendingCardPress}>
      <View style={style.cardContainer}>
        <View style={style.orderIdandPriceContainer}>
          <Text style={style.orderId}>#{props.orderID}</Text>
          <Text style={style.price}>₹ {props.price}</Text>
        </View>
        <Text style={style.date}>Date: {props.date}</Text>
        <Text style={style.items}>{props.items}</Text>
        <View style={style.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={style.rejectOrder}
            onPress={rejectOrder}>
            <Text style={style.buttonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={style.acceptOrder}
            onPress={acceptOrder}>
            <Text style={style.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 130,
    borderRadius: 3,
    shadowColor: '#F0F0F0',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 2,
    padding: 10,
    justifyContent: 'center',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rejectOrder: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#FF5353',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginHorizontal: 2.5,
  },
  acceptOrder: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: AppConfig.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginLeft: 2.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PendingOrderCard;
