import React, { useEffect, useState } from 'react'
import { Image, RefreshControl, ScrollView, StyleSheet, View, Text } from 'react-native';
import HistoryOrderCard from '../../../../components/HistoryOrderCard';
import AppConfig from '../../../../../AppConfig.json'
import { GetCompleteOrders } from '../../../../APIs/OrderManager';



function CompleteOrders(props) {
    const [loading, setLoading] = useState(true)
    const [completeOrders, setCompleteOrders] = useState([])

    const loadCompleteOrders = () => {
        setLoading(true)
        GetCompleteOrders().then(orders => {
            console.log('complete orders', orders)
            setCompleteOrders(orders ?? [])
        }).catch(err => console.log('Error getting complete orders', err))
        .finally(() => setLoading(false))
    }

    useEffect(() => {
        props.navigation.addListener('focus', loadCompleteOrders)
        loadCompleteOrders()
    }, [])

    return (
      <ScrollView
        style={style.orderContainer}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadCompleteOrders} />}>
        
        {completeOrders.map(order => {
            let items = '';
            order.items.forEach(element => {
                items += `${element.name}x${element.count}, `
            });
            items = items.substr(0, items.length - 2)
            return(
              <HistoryOrderCard
                  orderID={order._id}
                  price={order.finalValue}
                  date={`${new Date(order.timeOfOrder).toLocaleTimeString()}, ${new Date(order.timeOfOrder).toLocaleDateString()}`}
                  items={items}
                  />
            )
        })}

        {(completeOrders.length === 0 && !loading) &&
        <Image style={style.noResultImg} source={require('../../../../assets/no_result.png')} />}
        {(completeOrders.length === 0 && !loading) && <Text style={style.noItem}>No order history found</Text>}
      </ScrollView>
    );
}

const style = StyleSheet.create({
  orderContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      padding: 10,
  },
  noResultImg: {
    width: "100%",
    padding: 20,
    height: 250,
    resizeMode: 'contain',
    marginTop: 50
  },
  noItem:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: AppConfig.primaryColor
  },
})
export default CompleteOrders