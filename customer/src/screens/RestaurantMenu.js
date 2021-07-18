import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import MenuCard from '../components/MenuCard';

// External package ---------------------------------------
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

//Component for bottom cart Indicator ------------------------------

const NoItem = () => {
  return (
    <View style={style.flagComponentContainer}>
      <IconMCI name="cart-outline" size={30} color="#fff" />
      <Text style={style.flagText}>No item added yet.</Text>
    </View>
  );
};

const ItemAdded = props => {
  const cartValue = '200';
  return (
    <TouchableOpacity
      style={style.flagComponentContainerItemAdded}
      activeOpacity={0.6}
      onPress={props.onPress}>
      <View style={style.iconAndValueContainer}>
        <IconMCI name="cart-outline" size={30} color="#fff" />
        <Text style={style.flagText}>Cart value : ₹ {cartValue}</Text>
      </View>
      <View>
        <Text style={style.flagText}>Checkout &#9654;</Text>
      </View>
    </TouchableOpacity>
  );
};

//#####################################################################

function RestaurantMenu(props) {
  const handlePressOnCartValue = () => {
    props.navigation.navigate('checkoutScreen');
  };
  return (
    <View style={style.inventoryContainer}>
      <FlatList
        contentContainerStyle={style.InventoryCardContainer}
        data={[0, 0, 0, 0, 0, 0, 0]}
        renderItem={(item, index) => {
          return (
            <MenuCard
              key={index}
              itemName="Item Name"
              price="200"
              description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            />
          );
        }}
      />
      {/* ###################### Render one of the below component according to condition ############################# */}
      <View style={style.flagMessageContainer}>
        <ItemAdded onPress={handlePressOnCartValue} />
      </View>
      <View style={style.flagMessageContainer}>
        <NoItem />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  inventoryContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  InventoryCardContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  flagMessageContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppConfig.primaryColor,
    paddingHorizontal: 20,
  },

  // flag message Component style ############################################

  flagComponentContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagText: {
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 10,
  },

  ///////////////// - -item added ////////////////////////
  flagComponentContainerItemAdded: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconAndValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RestaurantMenu;
