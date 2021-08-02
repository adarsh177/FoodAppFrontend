import React, {useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AppConfig from '../../AppConfig.json';

//external poackage ---------------------------------------

import NumericInput from 'react-native-numeric-input';
import {GetCurrencySymbolFromId} from '../CurrencyManager/CurrencyManager';
import Dinero from 'dinero.js'

function InventoryCard(props) {
  // Image source
  const imageSource = '../assets/restaurant.jpg';

  // stora value of numeric input ----------------

  const [quantity, setQuantity] = useState(0);
  console.log(quantity);

  const OnValueChanged = (val) => {
    setQuantity(val)
    props.onValueChanged(props.id, {
      count: val,
      price: Dinero(props.price).multiply(val).toJSON(),
      id: props.id,
      name: props.itemName
    })
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onClick}>
      <View style={style.InventoryCardInnerContainer}>
        <Image style={style.InventoryCardImage} source={{uri: props.image}} />
        <View style={style.cardDetailsContainer}>
          <View style={style.cardTitleAndPriceContaienr}>
            <Text style={style.itemName}>{props.itemName}</Text>
            <Text style={style.price}>{GetCurrencySymbolFromId(props.price.currency)} {Dinero(props.price).toUnit()}</Text>
          </View>
          <Text style={style.itemDescription}>{props.description}</Text>
          <View style={style.numericInputContainer}>
            <NumericInput
              value={quantity}
              onChange={OnValueChanged}
              minValue={0}
              maxValue={props.max}
              // onLimitReached={(isMax, msg) => alert(`Currently only ${props.max} of this item are available`)}
              totalWidth={100}
              totalHeight={25}
              iconSize={12}
              step={1}
              valueType="real"
              rounded
              textColor={AppConfig.primaryColor}
              iconStyle={{color: 'white'}}
              rightButtonBackgroundColor={AppConfig.primaryColor}
              leftButtonBackgroundColor="#B80000"
              borderColor="#f4f4f4"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  InventoryCardInnerContainer: {
    width: '100%',
    height: 110,
    borderRadius: 3,
    borderWidth: 0.5,
    borderEndWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginVertical: 5,
  },
  InventoryCardImage: {
    width: 105,
    height: 106,
    resizeMode: 'cover',
    borderRadius: 3,
  },
  cardTitleAndPriceContaienr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetailsContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  price: {
    fontSize: 12,
    fontWeight: '700',
    color: AppConfig.primaryColor,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
  },
  itemDescription: {
    fontSize: 12,
    color: '#707070',
    marginBottom: 5,
  },
  numericInputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
export default InventoryCard;
