import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AppConfig from '../../AppConfig.json';

// External package ----------------------------------

import DateTimePickerModal from 'react-native-modal-datetime-picker';

function ListItemScreen(props) {
  // Handle Inventory selection ---------------------------------

  const [selectInventory, setselectInventory] = useState();
  const [selectCategory, setSelectCategory] = useState();

  //Handle List item -----------------------------------------
  const handleListItem = () => {
    return null;
  };

  //Handle Cancel button -----------------------------------------
  const handlecancel = () => {
    return null;
  };

  //Handle date picker --------------------------------------------

  //   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //   const showDatePicker = () => {
  //     setDatePickerVisibility(true);
  //   };

  //   const hideDatePicker = () => {
  //     setDatePickerVisibility(false);
  //   };

  //   const handleConfirm = time => {
  //     console.warn('A date has been picked: ', time.toString());
  //     hideDatePicker();
  //   };

  return (
    <View style={style.listItemContainer}>
      <Text style={style.inputLable}>Select Category</Text>
      <View style={style.inputWrapper}>
        <Picker
          style={style.inputs}
          selectedValue={selectCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectCategory(itemValue)
          }>
          <Picker.Item style={{color: "grey"}} label="Select Category" value="select" />
          <Picker.Item label="Category 1" value="cat1" />
          <Picker.Item label="Category 2" value="cat2" />
          <Picker.Item label="Category 3" value="cat3" />
          <Picker.Item label="Category 4" value="cat4" />
          <Picker.Item label="Category 5" value="cat5" />
        </Picker>
      </View>

      <Text style={style.inputLable}>Select Item</Text>
      <View style={style.inputWrapper}>
        <Picker
          style={style.inputs}
          selectedValue={selectInventory}
          onValueChange={(itemValue, itemIndex) =>
            setselectInventory(itemValue)
          }>
          <Picker.Item style={{color: "grey"}} label="Select Item from Inventory" value="select" />
          <Picker.Item style={{color: AppConfig.primaryColor}} label="Create New Item" value="new" />
          <Picker.Item label="Inventory 1" value="Inventory1" />
          <Picker.Item label="Inventory 2" value="Inventory2" />
          <Picker.Item label="Inventory 3" value="Inventory3" />
          <Picker.Item label="Inventory 4" value="Inventory4" />
          <Picker.Item label="Inventory 5" value="Inventory5" />
        </Picker>
      </View>
      <Text style={style.inputLable}>List Price</Text>
      <View style={style.inputWrapper}>
        <TextInput style={style.inputTextField} placeholder="₹" />
      </View>
      <Text style={style.inputLable}>Selling Price</Text>
      <View style={style.inputWrapper}>
        <TextInput style={style.inputTextField} placeholder="₹" />
      </View>
      <Text style={style.inputLable}>Stock Available</Text>
      <View style={style.inputWrapper}>
        <TextInput style={style.inputTextField} placeholder="#" />
      </View>
      <Text style={style.inputLable}>Expiry Date</Text>
      <View style={style.inputWrapper}>
        <TouchableOpacity style={style.inputTextField}>
          <Text> &#x1F4C5; Select date</Text>
        </TouchableOpacity>

        {/* <DateTimePickerModal
          isVisible={true}
          mode="time"
          onConfirm={() => {}}
          onCancel={() => {}}
        /> */}
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleListItem}
        color={AppConfig.primaryColor}
        accessibilityLabel="List Item button"
        style={style.listItemButton}>
        <Text style={style.listItemButtonText}>List Item</Text>
      </TouchableOpacity>
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
});

export default ListItemScreen;
