import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Modal,
  ScrollView,
  Linking,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import AppConfig from '../../AppConfig.json';
import { GetOrderDetails } from '../APIs/OrderManager';
import { GetCustomerInfo, GetMerchantInfo } from '../APIs/StoreManager';
import GetCurrencySymbol from '../CurrencyManager/CurrencyManager';

function OrderDetailScreen(props) {
  const [loading, setLoading] = useState(true)
  const [orderDetails, setOrderDetails] = useState({})
  const [customerInfo, setCustomerInfo] = useState({})

  
  //handel chat and call button ---------------------
  const handleChat = () => {
    return null;
  };
  const handleCall = () => {
    Linking.openURL(`tel:${customerInfo.phone}`)
  };

  const loadCustomerInfo = (id) => {
    GetCustomerInfo(id).then(info => {
      setCustomerInfo(info)
      console.log('customer Info', id, info)
    })
  }

  useEffect(() => {
    GetOrderDetails(props.route.params.orderId)
      .then(details => {
        console.log('Order', details)
        setOrderDetails(details)
        loadCustomerInfo(details.customerId)
      })
      .finally(() => setLoading(false))
  }, [])

  if(loading)
    return <ActivityIndicator size="large" color={AppConfig.primaryColor} />

  return (
    <ScrollView style={style.mainContainer}>
      <View style={style.orderIdContainer}>
        <Text style={style.orderId}>#{orderDetails._id}</Text>
        <Text style={style.date}>{new Date(orderDetails.timeOfOrder).toLocaleDateString()}</Text>
      </View>
      <View style={style.generalContainer}>
        <Text style={style.lightTitle}>Status</Text>
        <Text style={style.indicator}>{orderDetails.status}</Text>
      </View>
      <View style={style.generalContainer}>
        <Text style={style.lightTitle}>Ordered by</Text>
        <View style={style.orderByContainer}>
          <Text style={style.customerName}>{customerInfo.name}</Text>
          <Text style={style.lightTitle}>{customerInfo.location?.label ?? ""}</Text>
          <View style={style.orderByButtonsContainer}>
            {/* <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleChat}
              style={style.orderByChatButtonsInnerContainer}>
              <Text style={style.buttonTextColor}>Chat</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handleCall}
              style={style.orderByCallButtonsInnerContainer}>
              <Text style={style.buttonTextColor}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View style={style.generalContainer}>
        <Text style={style.lightTitle}>Delivery Mode:</Text>
        <Text style={style.indicator}>{deliveryMode}</Text>
      </View> */}
      <View style={style.generalContainer}>
        <Text style={style.lightTitle}>Order</Text>
        <View style={style.summaryContainer}>
          {orderDetails.items.map(item => {
            return(
              <View key={item.name} style={style.itemContainer}>
                <Text style={style.itemTitle}>{item.name}</Text>
                <Text style={style.summaryPrice}>{GetCurrencySymbol()} {item.price}</Text>
              </View>
            )
          })}

          {orderDetails.promotion && 
          <View style={style.itemContainer}>
            <Text style={style.itemTitle}>PROMO: {orderDetails.promotion.code}</Text>
            <Text style={[style.summaryPrice, {color: "#a61900"}]}>- {GetCurrencySymbol()}{orderDetails.promoValue}</Text>
          </View>}

          <View style={style.horizontalLine}></View>
          <View>
            <Text style={style.itemTitle}>Tax</Text>
            <View style={style.taxInnerContainer}>
              {orderDetails.taxes.map(item => {
                return(
                <View key={item.name} style={style.taxInnerInnerContainer}>
                  <Text style={style.itemTitle}>{item.name} ({item.percent})</Text>
                  <Text style={style.summaryPrice}>{GetCurrencySymbol()} {item.value}</Text>
                </View>
                )
              })}
            </View>
          </View>
          <View style={style.summaryTotalContainer}>
            <Text style={style.summaryTotalText}>Total</Text>
            <Text style={style.summaryPriceWithWhiteColor}>
              {GetCurrencySymbol()} {orderDetails.finalValue}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: '#fff',
    ...StyleSheet.absoluteFill,
  },
  //Modal styling ------------------------------
  orderIdContainer: {
    marginBottom: 20,
  },
  orderId: {
    fontSize: 24,
    fontWeight: '700',
  },
  date: {
    color: '#7d7d7d',
  },
  lightTitle: {
    color: '#787878',
    fontSize: 16,
    marginBottom: 5,
  },
  generalContainer: {
    marginBottom: 20,
  },
  indicator: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  orderByContainer: {
    borderWidth: 1,
    borderColor: '#B7B7B7',
    padding: 10,
    borderRadius: 3,
  },
  customerName: {
    fontSize: 18,
    marginBottom: 5,
  },
  orderByButtonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  orderByChatButtonsInnerContainer: {
    marginRight: 10,
    backgroundColor: AppConfig.primaryColor,
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 3,
  },
  orderByCallButtonsInnerContainer: {
    marginRight: 10,
    backgroundColor: '#0076B8',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 3,
  },
  buttonTextColor: {
    color: '#fff',
    fontWeight: '700',
  },
  summaryContainer: {
    borderWidth: 1,
    borderColor: '#B7B7B7',
    padding: 10,
    borderRadius: 3,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    marginBottom: 10,
    color: '#414141',
  },
  summaryPrice: {
    fontWeight: '700',
  },
  horizontalLine: {
    width: '100%',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 10,
  },
  taxInnerContainer: {
    paddingLeft: 20,
    paddingBottom: 40,
  },
  taxInnerInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  summaryTotalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '106%',
    padding: 10,
    backgroundColor: AppConfig.primaryColor,
    borderRadius: 3,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
  summaryTotalText: {
    color: '#fff',
  },
  summaryPriceWithWhiteColor: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default OrderDetailScreen;
