import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AppConfig from '../../AppConfig.json';

// External package ----------------------------------

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { GetCommodities, ListItem } from '../APIs/StoreManager';
import { GetProfile } from '../APIs/ProfileManager';
import GetCurrencySymbol from '../CurrencyManager/CurrencyManager';

function ListItemScreen(props) {
  // Handle Inventory selection ---------------------------------

  const [selectInventory, setselectInventory] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [expireDate, setExpireDate] = useState(null);
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(false);

  //Handle List item -----------------------------------------
  const handleListItem = () => {
    return null;
  };

  //Handle Cancel button -----------------------------------------
  const handlecancel = () => {
    props.navigation.pop();
  };

  const loadInventory = () => {
    GetCommodities().then(commodities => {
      GetProfile().then(profile => {
        const commodityIds = profile.listings ? profile.listings.map(val => val.commodityId) : [];
        setInventoryItems(commodities.filter(val => !commodityIds.includes(val.id)));
      }).catch(err => {})
    }).catch(err => {});
  }

  const addListing = async () => {
    if(selectInventory === null || selectInventory === "new"){
      alert("Please select item to list");
      return;
    }
    if(price.length === 0 || isNaN(price)){
      alert("Please enter a valid price");
      return;
    }
    if(stock.length === 0 || isNaN(stock)){
      alert("Please enter a valid stock count");
      return;
    }
    if(expireDate === null){
      alert("Please select an expiry date time");
      return;
    }

    const commodity = inventoryItems.filter(val => val.id === selectInventory)[0];

    const data = {
      commodityId: commodity.id,
      name: commodity.name,
      description: commodity.description,
      image: commodity.image,
      price: parseFloat(price),
      dateAdded: new Date().getTime(),
      expiresOn: expireDate.getTime(),
      initialStockCount: parseInt(stock),
      currentStockCount: parseInt(stock)
    }

    console.log(data);

    setLoading(true);
    ListItem(data).then(() => {
      Alert.alert('Success', 'Item listed successfully', [
        {
          text: "Ok",
          onPress: () => props.navigation.pop()
        }
      ]);
    }).catch(err => {
      console.log('Error listing item', err);
      Alert.alert('Error', 'Error listing item', [
        {
          text: "Ok"
        }
      ]);
    }).finally(() => setLoading(false));
    
  }

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      loadInventory();
    })
    loadInventory();
  }, []);

  //Handle date picker --------------------------------------------

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

  return (
    <View style={style.listItemContainer}>
      <Text style={style.subhead}>
        To relist already listed item, first unlist it from store page then list it again from here.
      </Text>
      <Text style={style.inputLable}>Select Item</Text>
      <View style={style.inputWrapper}>
        <Picker
          style={style.inputs}
          selectedValue={selectInventory}
          onValueChange={(itemValue, itemIndex) =>{
            if(itemValue === "new"){
              props.navigation.push('inventory');
              return;
            }
            setselectInventory(itemValue)
          }}>
          <Picker.Item label="Select Item from Inventory" value="select" />
          <Picker.Item label="Create New Item" value="new" />
          {inventoryItems.map(item => {
            return <Picker.Item label={item.name} value={item.id} />;
          })}
        </Picker>
      </View>
      <Text style={style.inputLable}>Selling Price ({GetCurrencySymbol()})</Text>
      <View style={style.inputWrapper}>
        <TextInput keyboardType="decimal-pad" style={style.inputTextField} onChangeText={setPrice}/>
      </View>
      <Text style={style.inputLable}>Stock Available</Text>
      <View style={style.inputWrapper}>
        <TextInput keyboardType="numeric" style={style.inputTextField} onChangeText={setStock} />
      </View>
      <Text style={style.inputLable}>Expiry Date</Text>
      <View style={style.inputWrapper}>
        <TouchableOpacity onPress={showDatePicker} style={style.inputTextField}>
          <Text>{expireDate ? expireDate.toLocaleString() : "Select Expiry date"}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          minimumDate={new Date()}
          onConfirm={(date) => {
            setExpireDate(date);
            hideDatePicker()
          }}
          onCancel={() => hideDatePicker()}
        />
      </View>
      {loading ? <ActivityIndicator color={AppConfig.primaryColor} size="large" /> : 
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={addListing}
        color={AppConfig.primaryColor}
        accessibilityLabel="List Item button"
        style={style.listItemButton}>
        <Text style={style.listItemButtonText}>List Item</Text>
      </TouchableOpacity>}

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handlecancel}
        color={AppConfig.primaryColor}
        accessibilityLabel="Cancel button"
        style={style.cancelButton}>
        <Text style={style.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  listItemContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  inputLable: {
    color: '#5C5C5C',
  },
  inputs: {
    borderWidth: 1,
    borderColor: AppConfig.primaryColor,
    borderRadius: 3,
  },
  inputWrapper: {
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 3,
    height: 45,
    marginVertical: 10,
    borderColor: AppConfig.primaryColor,
  },
  inputTextField: {
    paddingHorizontal: 20,
  },
  listItemButton: {
    paddingVertical: 10,
    backgroundColor: AppConfig.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 40,
  },

  listItemButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#FF5353',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#FF5353',
    fontSize: 18,
  },
  subhead: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20
  }
});

export default ListItemScreen;
