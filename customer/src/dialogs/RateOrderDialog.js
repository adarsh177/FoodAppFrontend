import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppConfig from '../../AppConfig.json';
import { AddWalletBalance, GetWalletBalance, RateOrder } from '../APIs/ProfileManager';
import GetCurrencySymbol from '../CurrencyManager/CurrencyManager';
import { Rating, AirbnbRating } from 'react-native-ratings';


function RateOrderDialog(props) {
  const [rating, setRating] = useState(3)
  const [loading, setLoading] = useState(false)

  const close = () => {
    setLoading(false)

    props.close();
  }

  const rateOrder = () => {
      setLoading(true)
      RateOrder(props.orderId, rating).finally(() => {
          setLoading(false)
          close()
      })
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        close();
      }}>
      <View style={style.mainContainer}>
        <View style={style.dialog}>
          <Text style={style.title}>Rate Order</Text>
          <Text style={style.subtitle}>
              How do you liked your order from <Text style={{fontWeight: "bold", color: '#000'}}>{props.name}</Text>? Your ratings will help other users.
          </Text>
          
          <AirbnbRating
            onFinishRating={setRating}
            reviewColor={AppConfig.primaryColor}
            starContainerStyle={{justifyContent: 'space-around', width: '100%'}}
            selectedColor={AppConfig.primaryColor}
           />

           {loading ? <ActivityIndicator size="large" color={AppConfig.primaryColor} style={{marginTop: 20}}/> :
            <TouchableOpacity onPress={rateOrder} activeOpacity={0.8} style={{marginTop: 40}}>
                <Text style={style.rateSave}>SAVE</Text>
            </TouchableOpacity>}
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
  //Modal styling ------------------------------
  dialog: {
    width: '90%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 0.5,
    borderEndWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 50,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppConfig.primaryColor
  },
  subtitle: {
    marginTop: 5,
    fontSize: 16,
    color: "#8c8c8c",
    marginBottom: 20
  },
  rateSave: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: "100%",
    padding: 10,
    backgroundColor: AppConfig.primaryColor,
    color: "#fff",
    fontSize: 18
  }
});

export default RateOrderDialog;
