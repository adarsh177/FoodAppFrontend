import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {FAB} from 'react-native-paper';
import AppConfig from '../../AppConfig.json';
import InventoryCard from '../../components/inventoryCard';

// External package ---------------------------------------
import Icon from 'react-native-vector-icons/FontAwesome';
import App from '../../App';

function Inventory(props) {
  // add inventory button ---------------------------
  const addInventoryItemButton = () => {
    setModalVisible(true);
  };
  // handle delete event -----------------------------
  const deleteInventoryItem = () => {
    return null;
  };
  //Modal-------------------------------------------
  const [modalVisible, setModalVisible] = useState(false);

  //Get image from user button------------------------------
  const getImage = () => {
    return null;
  };

  //Handle modal Inputs --------------------------
  const [value, onChangeText] = React.useState('');

  //Handle add item button
  const addItem = () => {
    props.navigation.pop('Inventory');
  };
  return (
    <View style={style.inventoryContainer}>
      <ScrollView>
        <View style={style.InventoryCardContainer}>
          <InventoryCard
            itemName="Item Name"
            description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            handelDelete={deleteInventoryItem}
          />
          <InventoryCard
            itemName="Item Name"
            description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            handelDelete={deleteInventoryItem}
          />
          <InventoryCard
            itemName="Item Name"
            description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            handelDelete={deleteInventoryItem}
          />
          <InventoryCard
            itemName="Item Name"
            description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            handelDelete={deleteInventoryItem}
          />
          <InventoryCard
            itemName="Item Name"
            description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            handelDelete={deleteInventoryItem}
          />
          <InventoryCard
            itemName="Item Name"
            description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            handelDelete={deleteInventoryItem}
          />
          <InventoryCard
            itemName="Item Name"
            description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            handelDelete={deleteInventoryItem}
          />
          <InventoryCard
            itemName="Item Name"
            description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            handelDelete={deleteInventoryItem}
          />
          <InventoryCard
            itemName="Item Name"
            description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            handelDelete={deleteInventoryItem}
          />
          <InventoryCard
            itemName="Item Name"
            description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            handelDelete={deleteInventoryItem}
          />
        </View>
      </ScrollView>
      <View>
        <FAB
          style={style.fab}
          small
          icon="plus"
          onPress={addInventoryItemButton}
        />
      </View>
      {/*----------Modal starts here -------------------------------*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={style.inventoryModalContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={style.getImageButton}
            onPress={getImage}>
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
              value={value}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={style.addItem}
            onPress={addItem}>
            <Text style={style.addItemButtonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: AppConfig.primaryColor,
  },
  //Modal styling ------------------------------
  inventoryModalContainer: {
    height: 250,
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignSelf: 'center',
    top: '55%',
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
});

export default Inventory;
