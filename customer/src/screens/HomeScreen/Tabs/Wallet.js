import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, ScrollView, Touchable, TouchableOpacity, ActivityIndicator, Image, RefreshControl} from 'react-native';
import AppConfig from '../../../../AppConfig.json';
import { GetOrders, GetWalletBalance } from '../../../APIs/ProfileManager';
import OrderCard from '../../../components/OrderCard';
import {GetCurrencySymbolFromId} from '../../../CurrencyManager/CurrencyManager';
import AddMoneyDialog from '../../../dialogs/AddMoneyDialog';
import DropDownPicker from 'react-native-dropdown-picker';
import Dinero from 'dinero.js';

function Wallet(props) {
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [walletBalance, setWalletBalance] = useState({})
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [orderFilter, setOrderFilter] = useState(null)
  const [orderTypePickerOpen, setOrderTypePickerOpen] = useState(false)
  const [orderTypeItems, setOrderTypeItems] = useState([
    {label: "All", value: "ALL"},
    {label: "Pending", value: "PENDING"},
    {label: "Confirm", value: "CONFIRM"},
    {label: "Rejected", value: "REJECTED"},
  ])

  const loadWalletBalance = () => {
    GetWalletBalance().then(bal => setWalletBalance(bal ?? 0))
  }

  const loadOrders = () => {
    GetOrders()
    .then(data => {
      console.log('Orders', data)
      setOrders(data.orders)
    })
    .finally(() => setLoading(false))
  }

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setLoading(true)
      loadWalletBalance()
      loadOrders()
    })

    loadOrders()
    loadWalletBalance()
  }, [])

  return (
    <View style={style.orderContainer}>
      <Text style={style.walletBalance}>
        {walletBalance !== null && walletBalance !== undefined ? 
        `${GetCurrencySymbolFromId(walletBalance.currency)}${Dinero(walletBalance).toUnit()}`:
        `0`}
      </Text>
      <Text style={style.subtext}>Wallet Balance</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={() => setShowAddMoney(true)}>
        <Text style={style.addMoney}>Add Money</Text>
      </TouchableOpacity>

      <View style={style.horizontalLine} />

      <Text style={style.ordersTitle}>My Orders</Text>

      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => {
          loadOrders()
          loadWalletBalance()
          }} />}>
      {!loading && orders.length === 0 && 
      <Image style={style.noOrders} source={require('../../../assets/no_restro.png')} />}
      {!loading && orders.length === 0 && 
      <Text style={style.noResultText}>You have not placed any order yet!</Text>}
      
      {!loading && orders.map(item => {
          let itemsText = ''
          item.items.forEach(element => {
            itemsText += `${element.name}x${element.count}, `
          });
          itemsText = itemsText.substr(0, itemsText.length - 2)
          return(
            <OrderCard
              orderID={item._id}
              price={item.finalValue}
              date={`${new Date(item.timeOfOrder).toLocaleTimeString()}, ${new Date(item.timeOfOrder).toLocaleDateString()}`}
              items={itemsText}
              status={item.status}
              onPress={() => {
                props.navigation.push('orderDetail', {
                  orderId: item._id,
                });
              }}
            />
          )
        })}
      </ScrollView>


      <AddMoneyDialog
        show={showAddMoney}
        close={() => {
          setShowAddMoney(false)
          loadWalletBalance()
        }} />
    </View>
  );
}

const style = StyleSheet.create({
  orderPageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: AppConfig.primaryColor,
    marginVertical: 10,
  },
  orderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  walletBalance: {
    fontWeight: 'bold',
    color: AppConfig.primaryColor,
    fontSize: 42,
    textAlign: 'center',
    marginTop: 20
  },
  subtext: {
    fontWeight: 'bold',
    fontSize: 18,
    color: "#838a96",
    textAlign: 'center',
    marginBottom: 20,
  },
  addMoney: {
    width: "100%",
    padding: 10,
    textAlign: 'center',
    color: "#fff",
    backgroundColor: AppConfig.primaryColor,
    borderRadius: 3,
    fontWeight: 'bold'
  },
  horizontalLine: {
    width: '100%',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    alignSelf: 'center',
    marginVertical: 20,
  },
  horizontalBar:{
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  orderTypePicker: {
    borderWidth: 1,
    borderColor: AppConfig.primaryColor,
    borderRadius: 3,
    flex: 1,
  },
  ordersTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#000",
    marginBottom: 20,
    marginHorizontal: 10
  },
  noOrders: {
    width: "100%",
    padding: 10,
    height: 250,
    resizeMode: 'contain'
  },
  noResultText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: AppConfig.primaryColor
  }
});

export default Wallet;
