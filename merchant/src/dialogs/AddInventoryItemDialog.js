import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppConfig from '../../AppConfig.json';

function AddInventoryItemDialog(props){
    const [text, onChangeText] = useState("");

    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={props.show}
        onRequestClose={() => {
          props.close();
        }}>
        <View style={style.mainContainer}>
          <View style={style.inventoryModalContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={style.getImageButton}
              onPress={() => {}}>
              <View style={style.addImageContainer}>
                <Icon name="plus" size={24} color={AppConfig.primaryColor} />
                <Text style={style.selectImageText}>Select Image</Text>
              </View>
            </TouchableOpacity>

            <View style={style.modalTextInputContainer}>
              <TextInput
                placeholder="Item Name (max 70 characters)"
                style={style.modalTextInput}
                maxLength={70}
              />
              <TextInput
                placeholder="Enter description (max 120 characters)"
                style={style.modalTextInput}
                multiline
                numberOfLines={4}
                maxLength={120}
                onChangeText={text => onChangeText(text)}
                value={text}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              style={style.addItem}
              onPress={() => props.close()}>
              <Text style={style.addItemButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
}

const style = StyleSheet.create({
  mainContainer: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.2)",
      ...StyleSheet.absoluteFill,
  },
    //Modal styling ------------------------------
  inventoryModalContainer: {
    height: 250,
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 0.5,
    borderEndWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 50,
    padding: 20,
    justifyContent: 'space-between',
  },
  addImageContainer: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  selectImageText: {
    fontSize: 10,
    marginTop: 10,
    marginBottom: -10,
    color: '#a4a4a4',
  },
  modalTextInputContainer: {
    width: '73%',
  },
  modalTextInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 5,
    marginBottom: 20,
    padding: 5,
  },
  addItem: {
    position: 'absolute',
    width: '112.3%',
    height: 50,
    bottom: 0,
    backgroundColor: AppConfig.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addItemButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default AddInventoryItemDialog;
