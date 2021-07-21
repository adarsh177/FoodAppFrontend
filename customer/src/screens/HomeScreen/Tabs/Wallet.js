import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, ScrollView, Touchable, TouchableOpacity, ActivityIndicator, Image, RefreshControl} from 'react-native';
import AppConfig from '../../../../AppConfig.json';
import { GetOrders, GetWalletBalance } from '../../../APIs/ProfileManager';
import OrderCard from '../../../components/OrderCard';
import GetCurrencySymbol from '../../../CurrencyManager/CurrencyManager';
import AddMoneyDialog from '../../../dialogs/AddMoneyDialog';

function Wallet(props) {
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [walletBalance, setWalletBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState([])


  const loadWalletBalance = () => {
    GetWalletBalance().then(bal => setWalletBalance(bal ?? 0))
  }

  useEffect(() => {
    loadWalletBalance()
  })

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
  }, [])

  return (
    <View style={style.orderContainer}>
      <Text style={style.walletBalance}>{GetCurrencySymbol()}{walletBalance}</Text>
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
      

      {loading && <ActivityIndicator size="large" color={AppConfig.primaryColor} />}

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
  ordersTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#919191",
    marginBottom: 20
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
