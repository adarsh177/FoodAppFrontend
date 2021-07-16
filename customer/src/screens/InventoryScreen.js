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
import {FAB} from 'react-native-paper';
import AppConfig from '../../AppConfig.json';
import InventoryCard from '../components/inventoryCard';

// External package ---------------------------------------
import Icon from 'react-native-vector-icons/FontAwesome';
import AddInventoryItemDialog from '../dialogs/AddInventoryItemDialog';

function InventoryScreen(props) {
  // add inventory button ---------------------------
  const addInventoryItemButton = () => {
    setAddItemVisibility(true);
  };
  // handle delete event -----------------------------
  const deleteInventoryItem = () => {
    return null;
  };
  //Modal-------------------------------------------
  const [showAddItem, setAddItemVisibility] = useState(false);

  //Get image from user button------------------------------
  const getImage = () => {
    return null;
  };

  //Handle modal Inputs --------------------------
  const [value, onChangeText] = React.useState('');

  //Handle add item button
  const addItem = () => {
    props.navigation.pop();
  };
  return (
    <View style={style.inventoryContainer}>
      <FlatList
        contentContainerStyle={style.InventoryCardContainer}
        data={[0,0,0,0,0,0,0]}
        renderItem={(item, index) => {
          return <InventoryCard
            key={index}
            itemName="Item Name"
            description="Description here, Description here, Description here Description here dasd ca Vcva Description here dsdfasf"
            handelDelete={deleteInventoryItem}
          />;
        }} />
      <View>
        <FAB
          style={style.fab}
          icon="plus"
          onPress={addInventoryItemButton}
        />
      </View>

      {/*----------Modal starts here -------------------------------*/}
      <AddInventoryItemDialog
        show={showAddItem}
        close={() => setAddItemVisibility(false)} />
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
});

export default InventoryScreen;
