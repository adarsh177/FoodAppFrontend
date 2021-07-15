import React, {useState} from 'react';
import {Switch, Text, View, StyleSheet} from 'react-native';

function OrderTab() {
  const storeName = 'Store Name';
  const [shopStatus, setShopStatus] = useState('Shop Closed');

  //

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    if (isEnabled === false) {
      setIsEnabled(previousState => !previousState);
      setShopStatus('Accepting Orders');
    } else {
      setIsEnabled(previousState => !previousState);
      setShopStatus('Shop Closed');
    }
  };

  return (
    <View style={style.storeContainer}>
      <View>
        
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  storeContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});

export default OrderTab;
