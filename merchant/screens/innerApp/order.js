import React, {useState} from 'react';
import {Switch, Text, View, StyleSheet} from 'react-native';

function Order() {
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
        <View>
          <Text>{storeName}</Text>
          <Text>{shopStatus}</Text>
        </View>
        <Switch
          trackColor={{false: '#E8E8E8', true: '#E8E8E8'}}
          thumbColor={isEnabled ? '#00B875' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
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

export default Order;
