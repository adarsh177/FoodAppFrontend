import DineroFactory from 'dinero.js';
import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
  Image,
  ActivityIndicator,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import {UnlistItem} from '../APIs/StoreManager';
import {GetCurrencySymbolFromId} from '../CurrencyManager/CurrencyManager';
import {GetTimeInWords} from '../Utils';

function ListingInfoDialog(props) {
  const [loading, setLoading] = useState(false);

  const unlistItem = () => {
    if (loading) return;

    setLoading(true);
    UnlistItem(props.data.id)
      .then(() => {
        alert('Item unlisted');
        props.close();
      })
      .catch(err => {
        console.log('Error unlisting item', err);
        alert('Error unlisting item');
      })
      .finally(() => setLoading(false));
  };

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
          {props.data.price && (
            <Text style={style.price}>
              {GetCurrencySymbolFromId(props.data.price.currency)}{' '}
              {DineroFactory(props.data.price).toUnit()}
            </Text>
          )}

          <Text style={style.detail}>
            <Text style={{fontWeight: 'bold'}}>Expires in: </Text>
            {GetTimeInWords(props.data.expiresOn - new Date().getTime())}
          </Text>

          <View style={style.stockDetailsContainer}>
            <Text style={[style.detail, style.stockDetail]}>
              <Text style={{fontWeight: 'bold'}}>Stock Listed: </Text>
              {props.data.initialStockCount}
            </Text>
            <Text style={[style.detail, style.stockDetail]}>
              <Text style={{fontWeight: 'bold'}}>Stock Left: </Text>
              {props.data.currentStockCount}
            </Text>
          </View>

          {!props.hideUnlist && (
            <>
              {loading ? (
                <ActivityIndicator
                  color={AppConfig.primaryColor}
                  size="large"
                />
              ) : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => unlistItem()}>
                  <Text style={style.unlistBtn}>Unlist Item</Text>
                </TouchableOpacity>
              )}
            </>
          )}
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
    minHeight: 200,
    padding: 10,
    backgroundColor: '#FFF',
    borderColor: '#efef',
    borderWidth: 0.5,
    borderRadius: 3,
  },
  itemName: {
    color: '#000',
    fontSize: 18,
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
  unlistBtn: {
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
