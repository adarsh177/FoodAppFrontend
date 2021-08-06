import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppConfig from '../../AppConfig.json';
import GetCurrencySymbol, {
  GetCurrencySymbolFromId,
} from '../CurrencyManager/CurrencyManager';
import Dinero from 'dinero.js';

function ItemCard(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.handelCardPress}
      style={style.listItemContainer}>
      <Image style={style.listItemImage} source={{uri: props.image}} />
      <View style={style.cardTitleAndPriceContainer}>
        <Text style={style.cardTitle}>{props.title}</Text>
        <Text style={style.cardPrice}>
          {GetCurrencySymbolFromId(props.price.currency)}{' '}
          {Dinero(props.price).toUnit()}
        </Text>
      </View>
      <View style={style.cardDetailContainer}>
        <Text style={style.cardDetailTitle}>Expires in: </Text>
        <Text style={style.cardDetailValue}>{props.expiry}</Text>
      </View>
      <View style={style.cardDetailContainer}>
        <Text style={style.cardDetailTitle}>Stock left: </Text>
        <Text style={style.cardDetailValue}>{props.stock}</Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  listItemContainer: {
    borderWidth: 1,
    borderColor: '#cecece',
    width: '48%',
    borderRadius: 3,
    marginBottom: 20,
    paddingBottom: 5,
  },
  listItemImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 3,
    marginBottom: 5,
  },
  cardTitleAndPriceContainer: {
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '700',
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: AppConfig.primaryColor,
  },
  cardDetailContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    marginBottom: 2,
  },
  cardDetailTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#707070',
  },
  cardDetailValue: {
    fontSize: 12,
    color: '#707070',
  },
});
export default ItemCard;
