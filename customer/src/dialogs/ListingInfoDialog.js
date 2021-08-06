import Dinero from 'dinero.js';
import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import GetCurrencySymbol, {
  GetCurrencySymbolFromId,
} from '../CurrencyManager/CurrencyManager';

function ListingInfoDialog(props) {
  if (!props.show) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        props.close();
      }}>
      <View style={style.mainContainer}>
        <View style={style.dialog}>
          <Text style={style.itemName}>{props.data.name}</Text>
          <Image style={style.image} source={{uri: props.data.image}} />
          <Text style={style.price}>
            {GetCurrencySymbolFromId(props.data.price.currency)}{' '}
            {Dinero(props.data.price).toUnit()}
          </Text>

          <Text style={style.detailHead}>Stock Left</Text>
          <Text style={style.detail}>{props.data.currentStockCount} Units</Text>

          <Text style={style.detailHead}>Description</Text>
          <Text style={style.detail}>{props.data.description}</Text>

          {props.data.ingredients !== undefined &&
            props.data.ingredients !== null &&
            props.data.ingredients.length > 0 && (
              <>
                <Text style={style.detailHead}>Contains</Text>
                <Text style={style.detail}>
                  {props.data.ingredients.join(', ')}
                </Text>
              </>
            )}

          {props.data.tags !== undefined &&
            props.data.tags !== null &&
            props.data.tags.length > 0 && (
              <>
                <Text style={style.detailHead}>Tags</Text>
                <Text style={style.detail}>{props.data.tags.join(', ')}</Text>
              </>
            )}

          <TouchableOpacity onPress={props.close} activeOpacity={0.8}>
            <Text style={style.close}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    ...StyleSheet.absoluteFill,
  },
  dialog: {
    width: '90%',
    maxHeight: '80%',
    padding: 10,
    backgroundColor: '#FFF',
    borderColor: '#efef',
    borderWidth: 0.5,
    borderRadius: 3,
  },
  itemName: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 3,
    marginTop: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppConfig.primaryColor,
    marginTop: 10,
  },
  detail: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
  },
  detailHead: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  close: {
    width: '100%',
    paddingVertical: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 3,
    backgroundColor: '#B80000',
    color: '#fff',
    fontSize: 14,
    marginTop: 20,
  },
  stockDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  stockDetail: {
    flex: 1,
  },
});

export default ListingInfoDialog;
