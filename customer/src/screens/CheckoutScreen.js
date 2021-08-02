import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import GetCurrencySymbol, { GetCurrencySymbolFromId } from '../CurrencyManager/CurrencyManager';
import { CheckPromo, GetTaxes, GetWalletBalance, PostOrder } from '../APIs/ProfileManager';
import auth from '@react-native-firebase/auth';
import AddMoneyDialog from '../dialogs/AddMoneyDialog';
import Dinero from 'dinero.js';

function CheckoutScreen(props) {
  const [promoLoading, setPromoLoading] = useState(false)
  const [items, setItems] = useState([])
  const [totalBaseValue, setTotalBaseValue] = useState(null)
  const [promoValue, setPromoValue] = useState(null)
  const [totalTaxValue, setTotalTaxValue] = useState(null)
  const [promoUsed, setPromoUsed] = useState(null)
  const [taxes, setTaxes] = useState([])
  const [promoText, setPromoText] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAddMoney, setShowAddMoney] = useState(false)
  
  console.log('Order Details', props.route.params);

  //handel handel Promo Code button ---------------------
  const handelPromoCodeButton = () => {
    setPromoLoading(true)
    CheckPromo(promoText).then(promo => {
      if(promo){
        let promoVal = Dinero(calculateTotalBase()).percentage(promo.offPercent)
        promoVal = Dinero({currency: promoVal.getCurrency(), amount: Math.min(promoVal.getAmount(), promo.uptoValue * 100)})
        promo.value = promoVal.toJSON()
        setPromoUsed(promo)
        setPromoValue(promoVal.toJSON())
        Alert.alert(`${promo.offPercent}% off upto ${GetCurrencySymbolFromId(promoVal.getCurrency())}${promo.uptoValue}`, `Promotional code applied successfully.\nWe have applied ${promo.offPercent}% off upto ${GetCurrencySymbolFromId(promoVal.getCurrency())}${promo.uptoValue}`)
      }else{
        Alert.alert('Invalid Code', 'Invalid promotional code entered.')
      }
    }).catch(err => alert('Error applying promo code: ' + err))
    .finally(() => setPromoLoading(false))
  };

  const GetGrandTotal = () => {
    if(totalBaseValue)
      return Dinero(totalBaseValue).add(Dinero(totalTaxValue ?? {amount: 0, currency: totalBaseValue.currency})).subtract(Dinero(promoValue ?? {amount: 0, currency: totalBaseValue.currency}))

    return Dinero()
  }

  const SendOrder = () => {
    const data = {
      customerId: auth().currentUser.uid,
      merchantId: props.route.params.merchantId,
      timeOfOrder: new Date().getTime(),
      items: props.route.params.items,
      taxes: taxes,
      promotion: promoUsed,
      baseValue: totalBaseValue,
      taxValue: totalTaxValue ?? Dinero({amount: 0, currency: totalBaseValue.currency}).toJSON(),
      promoValue: promoValue ?? Dinero({amount: 0, currency: totalBaseValue.currency}).toJSON(),
      finalValue: GetGrandTotal().toJSON(),
      status: "PENDING"
    }

    PostOrder(data)
      .then(id => {
        props.navigation.pop()
        props.navigation.push('orderDetail', {orderId: id})
      }).catch(err => {
        alert('Error placing order at the moment')
      })
      .finally(() => setLoading(false))

    console.log('data', data)
  }

  const payClicked = () => {
    setLoading(true)
    GetWalletBalance().then(bal => {
      const grandTotal = GetGrandTotal()
      const walletBal = Dinero(bal ?? Dinero({amount: 0, currency: totalBaseValue.currency}))
      if(grandTotal.greaterThan(walletBal)){
        Alert.alert('Insufficient Balance', 'You do not have sufficient wallet balance for this order, Please recharge your wallet', [
          {
            onPress: () => {
              setShowAddMoney(true)
              setLoading(false)
            },
            text: "Add Money",
            style: "default"
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setLoading(false)
          }
        ])
      }else{
        SendOrder()
      }
    })
  }

  

  const calculateTotalBase = () => {
    let total = null
    props.route?.params?.items.forEach(val => {
      if(total == null){
        total = Dinero(val.price)
      }else{
        total = total.add(Dinero(val.price))
      }
    })

    return total.toJSON()
  }

  useEffect(() => {
    const base = Dinero(calculateTotalBase())
    setItems(props.route?.params?.items ?? [])
    setTotalBaseValue(base.toJSON())

    GetTaxes().then(val => {
      console.log('Taxes', val)
      
      setTaxes(val.map(item => {
        return {
          ...item,
          value: base.percentage(item.percent).toJSON()
        }
      }))
      
      let totalTaxPercent = 0
      val.forEach(item => {
        totalTaxPercent += item.percent
      })

      const totalTax = base.percentage(totalTaxPercent).toJSON()
      console.log('Total tax', totalTax)

      setTotalTaxValue(totalTax)
    })
  }, [])

  return (
    <View style={style.mainOuterContainer}>
      <ScrollView style={style.mainContainer}>
        <View style={style.generalContainer}>
          <Text style={style.lightTitle}>Order from</Text>
          <View style={style.addressContainer}>
            <Text style={style.customerName}>{props.route.params.merchantName}</Text>
            <Text style={style.lightTitle}>{props.route.params.merchantAddress}</Text>
          </View>
        </View>
        <View style={style.generalContainer}>
          <Text style={style.lightTitle}>Promotional Code</Text>
          <View style={style.inputTextContainer}>
            <TextInput onChangeText={setPromoText} style={style.textInput} placeholder="Enter code here" />
            {promoLoading ? <ActivityIndicator style={style.promoLoad} size="small" color={AppConfig.primaryColor} /> :
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={handelPromoCodeButton}
                style={style.promoCodeButton}>
                <Text style={style.promoApply}>APPLY</Text>
              </TouchableOpacity>}
          </View>
        </View>
        <View style={style.generalContainer}>
          <Text style={style.lightTitle}>Order</Text>
          <View style={style.summaryContainer}>

            {items.map(item => {
              return(
                <View style={style.itemContainer}>
                  <Text style={style.itemTitle}>{`${item.count} x ${item.name}`}</Text>
                  <Text style={style.summaryPrice}>{GetCurrencySymbolFromId(item.price.currency)} {Dinero(item.price).toUnit()}</Text>
                </View>
              )
            })}

            {promoUsed !== null &&
            <View style={style.itemContainer}>
              <Text style={style.itemTitle}>{`PROMO: ${promoUsed.code.toUpperCase()}`}</Text>
              <Text style={style.promoPrice}>- {GetCurrencySymbolFromId(promoUsed.value.currency)} {Dinero(promoUsed.value).toUnit()}</Text>
            </View>}

            <View style={style.horizontalLine}></View>

            <View>
              <Text style={style.itemTitle}>Tax</Text>
              <View style={style.taxInnerContainer}>
                
                {taxes.map(tax => {
                  return(
                    <View style={style.taxInnerInnerContainer}>
                      <Text style={style.itemTitle}>{tax.name} ({tax.percent}%)</Text>
                      <Text style={style.summaryPrice}>{GetCurrencySymbolFromId(tax.value.currency)} {Dinero(tax.value).toUnit()}</Text>
                    </View>
                  )
                })}

              </View>
            </View>
            <View style={style.summaryTotalContainer}>
              <Text style={style.summaryTotalText}>Total</Text>
              <Text style={style.summaryPriceWithWhiteColor}>
                {GetCurrencySymbolFromId(GetGrandTotal().getCurrency())} {GetGrandTotal().toUnit()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={style.payContainer}>
        {loading ? <ActivityIndicator size="large" color={AppConfig.primaryColor} /> :
          <TouchableOpacity
            style={style.payButton}
            activeOpacity={0.6}
            onPress={payClicked}>
            <Text style={style.payButtonText}>Pay {GetCurrencySymbolFromId(GetGrandTotal().getCurrency())} {GetGrandTotal().toUnit()}</Text>
            <Text style={style.payButtonTextArrow}>&#9654;</Text>
          </TouchableOpacity>
        }
      </View>

      <AddMoneyDialog
        show={showAddMoney}
        close={() => setShowAddMoney(false)} />
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
  promoLoad: {
    position: 'absolute',
    alignSelf: 'center',
    right: 10,
  },
  promoApply: {
    paddingHorizontal: 10,
    color: "#fff",
    fontWeight: 'bold'
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
  promoPrice: {
    fontWeight: '700',
    color: "#911d14"
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
