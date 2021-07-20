import React, {useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AppConfig from '../../AppConfig.json';

//external poackage ---------------------------------------

import NumericInput from 'react-native-numeric-input';
import GetCurrencySymbol from '../CurrencyManager/CurrencyManager';

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
      price: val * props.price,
      id: props.id,
      name: props.itemName
    })
  }

  return (
    <View style={style.InventoryCardInnerContainer}>
      <Image style={style.InventoryCardImage} source={require(imageSource)} />
      <View style={style.cardDetailsContainer}>
        <View style={style.cardTitleAndPriceContaienr}>
          <Text style={style.itemName}>{props.itemName}</Text>
          <Text style={style.price}>{GetCurrencySymbol()} {props.price}</Text>
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
    fontSize: 15,
    fontWeight: '700',
  },
  itemDescription: {
    fontSize: 11,
    color: '#707070',
    marginBottom: 5,
  },
  numericInputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
export default InventoryCard;
