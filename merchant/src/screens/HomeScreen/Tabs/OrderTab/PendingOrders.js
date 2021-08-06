import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  AcceptOrder,
  GetPendingOrders,
  RejectOrder,
} from '../../../../APIs/OrderManager';
import PendingOrderCard from '../../../../components/PendingOrderCard';
import AppConfig from '../../../../../AppConfig.json';

function PendingOrders(props) {
  const [loading, setLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState([]);

  const loadPendingOrders = () => {
    setLoading(true);
    GetPendingOrders()
      .then(orders => {
        console.log('pending orders', orders);
        setPendingOrders(orders ?? []);
      })
      .catch(err => console.log('Error getting pending orders', err))
      .finally(() => setLoading(false));
  };

  const rejectOrder = id => {
    RejectOrder(id)
      .then(() => {})
      .catch(err => {
        console.log('Error rejecting', err);
        alert('Error rejecting order');
      })
      .finally(() => {
        setPendingOrders([]);
        loadPendingOrders();
      });
  };

  const acceptOrder = id => {
    AcceptOrder(id)
      .then(() => {
        setPendingOrders([]);
        loadPendingOrders();
      })
      .catch(err => {
        console.log('Error accepting', err);
        alert('Error accepting order');
      });
  };

  useEffect(() => {
    props.navigation.addListener('focus', loadPendingOrders);
    loadPendingOrders();
  }, []);

  return (
    <ScrollView
      style={style.orderContainer}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadPendingOrders} />
      }>
      {pendingOrders.map(order => {
        let items = '';
        order.items.forEach(element => {
          items += `${element.name}x${element.count}, `;
        });
        items = items.substr(0, items.length - 2);
        return (
          <PendingOrderCard
            key={order._id}
            orderID={order._id}
            price={order.finalValue}
            date={`${new Date(
              order.timeOfOrder,
            ).toLocaleTimeString()}, ${new Date(
              order.timeOfOrder,
            ).toLocaleDateString()}`}
            items={items}
            onCardPressed={() =>
              props.navigation.navigate('orderDetail', {orderId: order._id})
            }
            reject={() => rejectOrder(order._id)}
            accept={() => acceptOrder(order._id)}
          />
        );
      })}
      {pendingOrders.length === 0 && !loading && (
        <Image
          style={style.noResultImg}
          source={require('../../../../assets/no_result.png')}
        />
      )}
      {pendingOrders.length === 0 && !loading && (
        <Text style={style.noItem}>No pending orders at the moment</Text>
      )}
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
    width: '100%',
    padding: 20,
    height: 250,
    resizeMode: 'contain',
    marginTop: 50,
  },
  noItem: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: AppConfig.primaryColor,
  },
});

export default PendingOrders;
