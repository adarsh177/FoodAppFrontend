import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppConfig from '../../AppConfig.json';
import GetCurrencySymbol, {
  GetCurrencySymbolFromId,
} from '../CurrencyManager/CurrencyManager';
import Dinero from 'dinero.js';
import Icons from 'react-native-vector-icons/Ionicons';

function ReviewCard(props) {
  return (
    <View style={Style.CardContainer}>
      <Text style={Style.customerName}>Adarsh Shrivastava</Text>
      <Text style={Style.desc}>
        <Text style={{fontWeight: 'bold'}}>Rating: </Text>
        4.9 Stars
      </Text>
      <Text style={Style.desc}>
        <Text style={{fontWeight: 'bold'}}>Review: </Text>
        Once upon a time, India was the fourth-largest exporter of soybean meal.
        However, the country is now set to import 12 lakh tonnes of genetically
        modified deoiled soya cake.
      </Text>
      <View style={Style.iconContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[Style.btnIcon, {marginRight: 3}]}>
          <Icons color="#fff" size={20} name="call" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[Style.btnIcon, {marginLeft: 3}]}>
          <Icons color="#fff" size={20} name="information-circle" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  CardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: '#e0e0e0',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
  },
  customerName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: AppConfig.primaryColor,
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  btnIcon: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: AppConfig.primaryColor,
    paddingVertical: 5,
    borderRadius: 3,
  },
});
export default ReviewCard;
