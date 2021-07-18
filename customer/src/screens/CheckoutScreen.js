import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

function CheckoutScreen(props) {
  const addressCategory = 'Home';
  const cutomerAddress =
    'Pushpa Nagar Colony, Near Main Railway Station, Bhopal - 462010';
  const item = 'Item1';
  const price = '200';
  const cgstAmount = '80';
  const sgstAmount = '80';
  const TotalAmount = '626';

  console.log('Order Details', props.route.params);

  //handel handel Promo Code button ---------------------
  const handelPromoCodeButton = () => {
    return null;
  };

  //handle payment ---------------------------------------
  const handlePayment = () => {
    props.navigation.push('chatScreen');
  };

  return (
    <View style={style.mainOuterContainer}>
      <ScrollView style={style.mainContainer}>
        <View style={style.generalContainer}>
          <Text style={style.lightTitle}>Address</Text>
          <View style={style.addressContainer}>
            <Text style={style.customerName}>{addressCategory}</Text>
            <Text style={style.lightTitle}>{cutomerAddress}</Text>
          </View>
        </View>
        <View style={style.generalContainer}>
          <Text style={style.lightTitle}>Promotional Code</Text>
          <View style={style.inputTextContainer}>
            <TextInput style={style.textInput} placeholder="Enter code here" />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={handelPromoCodeButton}
              style={style.promoCodeButton}>
              <IconMCI name="send" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.generalContainer}>
          <Text style={style.lightTitle}>Order</Text>
          <View style={style.summaryContainer}>
            <View style={style.itemContainer}>
              <Text style={style.itemTitle}>{item}</Text>
              <Text style={style.summaryPrice}>₹ {price}</Text>
            </View>
            <View style={style.itemContainer}>
              <Text style={style.itemTitle}>{item}</Text>
              <Text style={style.summaryPrice}>₹ {price}</Text>
            </View>
            <View style={style.itemContainer}>
              <Text style={style.itemTitle}>{item}</Text>
              <Text style={style.summaryPrice}>₹ {price}</Text>
            </View>
            <View style={style.itemContainer}>
              <Text style={style.itemTitle}>{item}</Text>
              <Text style={style.summaryPrice}>₹ {price}</Text>
            </View>

            <View style={style.horizontalLine}></View>
            <View>
              <Text style={style.itemTitle}>Tax</Text>
              <View style={style.taxInnerContainer}>
                <View style={style.taxInnerInnerContainer}>
                  <Text style={style.itemTitle}>CGST (9%)</Text>
                  <Text style={style.summaryPrice}>₹ {cgstAmount}</Text>
                </View>
                <View style={style.taxInnerInnerContainer}>
                  <Text style={style.itemTitle}>SGST (9%)</Text>
                  <Text style={style.summaryPrice}>₹ {sgstAmount}</Text>
                </View>
              </View>
            </View>
            <View style={style.summaryTotalContainer}>
              <Text style={style.summaryTotalText}>Total</Text>
              <Text style={style.summaryPriceWithWhiteColor}>
                ₹ {TotalAmount}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={style.payContainer}>
        <TouchableOpacity
          style={style.payButton}
          activeOpacity={0.6}
          onPress={handlePayment}>
          <Text style={style.payButtonText}>Pay ₹ {TotalAmount}</Text>
          <Text style={style.payButtonTextArrow}>&#9654;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainOuterContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    ...StyleSheet.absoluteFill,
  },
  mainContainer: {
    width: '100%',
    height: '87%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 70,
    backgroundColor: '#fff',
    ...StyleSheet.absoluteFill,
  },
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
  addressContainer: {
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
  inputTextContainer: {
    flexDirection: 'row',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#7A7A7A',
    paddingRight: 60,
    paddingLeft: 10,
    borderRadius: 3,
  },
  promoCodeButton: {
    position: 'absolute',
    alignSelf: 'center',
    right: 7,
    backgroundColor: AppConfig.primaryColor,
    padding: 7,
    paddingLeft: 8,
    borderRadius: 3,
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
  payContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    padding: 20,
    marginTop: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#f4f4f4',
    borderBottomWidth: 0,
  },
  payButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: AppConfig.primaryColor,
    borderRadius: 3,
  },
  payButtonText: {
    color: '#fff',
  },
  payButtonTextArrow: {
    color: '#fff',
    position: 'absolute',
    alignSelf: 'center',
    right: 10,
  },
});

export default CheckoutScreen;
