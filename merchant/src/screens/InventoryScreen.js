import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Image,
} from 'react-native';
import {FAB} from 'react-native-paper';
import AppConfig from '../../AppConfig.json';
import InventoryCard from '../components/inventoryCard';

// External package ---------------------------------------
import Icon from 'react-native-vector-icons/FontAwesome';
import AddInventoryItemDialog from '../dialogs/AddInventoryItemDialog';
import {DeleteCommodity, GetCommodities} from '../APIs/StoreManager';
import ListingInfoDialog from '../dialogs/ListingInfoDialog';

function InventoryScreen(props) {
  const [showAddItem, setAddItemVisibility] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // add inventory button ---------------------------
  const addInventoryItemButton = () => {
    setAddItemVisibility(true);
  };
  // handle delete event -----------------------------
  const deleteInventoryItem = data => {
    Alert.alert('Confirm', `Are you sure you want to delete ${data.name}?`, [
      {
        text: 'Delete',
        style: 'default',
        onPress: () => DeleteCommodity(data.id).then(() => loadCommodities()),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const loadCommodities = () => {
    setLoading(true);
    GetCommodities()
      .then(val => {
        console.log('Inventory', val);
        setInventory(val);
      })
      .catch(err => {
        console.log('Error getting commodities', err);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    loadCommodities();
  }, []);

  return (
    <View style={style.inventoryContainer}>
      {inventory.length === 0 && !loading && (
        <Image
          style={style.noResultImg}
          source={require('../assets/no_result.png')}
        />
      )}
      {inventory.length === 0 && !loading && (
        <Text style={style.noItem}>
          Your inventory is empty!{'\n'} Click on + icon to add items
        </Text>
      )}

      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadCommodities} />
        }
        contentContainerStyle={style.InventoryCardContainer}
        data={inventory}
        renderItem={(item, index) => {
          console.log(item);
          return (
            <InventoryCard
              key={index}
              itemName={item.item.name}
              description={item.item.description}
              image={item.item.image}
              handelDelete={() => deleteInventoryItem(item.item)}
              ingredients={item.item.ingredients}
              tags={item.item.tags}
            />
          );
        }}
      />
      <View>
        <FAB style={style.fab} icon="plus" onPress={addInventoryItemButton} />
      </View>

      {/*----------Modal starts here -------------------------------*/}
      <AddInventoryItemDialog
        show={showAddItem}
        close={() => {
          loadCommodities();
          setAddItemVisibility(false);
        }}
      />
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
  noItem: {
    alignSelf: 'center',
    fontSize: 18,
    margin: 20,
  },
  noResultImg: {
    width: '100%',
    padding: 20,
    marginTop: 100,
    height: 200,
    resizeMode: 'contain',
  },
  noItem: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: AppConfig.primaryColor,
  },
});

export default InventoryScreen;
