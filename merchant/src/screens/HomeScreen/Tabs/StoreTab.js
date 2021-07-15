import React, {useState} from 'react';
import {
  Switch,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {FAB} from 'react-native-paper';
import AppConfig from '../../../../AppConfig.json';
import ItemCard from '../../../components/itemCard';
import ListingInfoDialog from '../../../dialogs/ListingInfoDialog';

function StoreTab(props) {
  // store name for the title of page  --------------------

  const storeName = 'Store Name';

  // store activity status ----------------------------------

  const [shopStatus, setShopStatus] = useState('Store Closed');
  const [showInfoDialog, setInfoDialogVisibility] = useState(false);

  //Changing shop status text with change in switch ----------------

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    if (isEnabled === false) {
      setIsEnabled(previousState => !previousState);
      setShopStatus('Accepting Orders');
    } else {
      setIsEnabled(previousState => !previousState);
      setShopStatus('Store Closed');
    }
  };

  //Order overview (Ongoing and pending orders)-------

  const onGoingOrders = '7';
  const pendingOrders = '2';

  //Manage Inventory Button ---------------------------
  const manageInventory = () => {
    props.navigation.push('inventory');
  };

  // add List Item Button ---------------------------

  const addListItemButton = () => {
    props.navigation.push('listItem');
  };

  //listd card press event --------------------------

  const handelListedCard = () => {
    return null;
  };

  return (
    <View style={style.storeContainer}>
      <ScrollView contentContainerStyle={style.scrollContainer}>
        <View style={style.headerContainer}>
          <View>
            <Text style={style.shopNameText}>{storeName}</Text>
            <Text
              style={
                isEnabled ? {color: AppConfig.primaryColor} : {color: '#B80000'}
              }>
              {shopStatus}
            </Text>
          </View>
          <Switch
            trackColor={{false: '#E8E8E8', true: '#DDD'}}
            thumbColor={isEnabled ? AppConfig.primaryColor : '#B80000'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View style={style.overviewContainer}>
          <View style={style.overviewInnerContainer}>
            <Text style={style.overviewNumber}>{onGoingOrders}</Text>
            <Text style={style.overviewText}>Ongoing Orders</Text>
          </View>
          <View style={style.verticalLine}></View>
          <View style={style.overviewInnerContainer}>
            <Text style={style.overviewNumber}>{pendingOrders}</Text>
            <Text style={style.overviewText}>Pending Orders</Text>
          </View>
        </View>
        <View style={style.manageInventoryButtonContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={style.manageInventoryButton}
            onPress={manageInventory}>
            <Text style={style.manageInventoryButtonText}>
              Manage Inventory
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.horizontalLine}></View>
        <View style={style.listedItemTextContainer}>
          <Text style={style.listedItemText}>Listed Items</Text>
          <Text>
            These items will be automatically be removed from here once they are
            sold out or expired.
          </Text>
        </View>
        <Text style={style.categoryName}>Category 1</Text>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          data={[0,0]}
          renderItem={({item, index}) => {
            return <ItemCard
                    key={index}
                    title={`Title Name : ${index}`}
                    price="200"
                    handelCardPress={() => setInfoDialogVisibility(true)}
                    expiry="5"
                    stock="5"
                    // imageSource="../components/assets/restaurant.jpg"
                  />;
          }}
          />

        <Text style={style.categoryName}>Category 2</Text>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          data={[0,0,0]}
          renderItem={({item, index}) => {
            return <ItemCard
                    key={index}
                    title={`Title Name : ${index}`}
                    price="200"
                    handelCardPress={() => setInfoDialogVisibility(true)}
                    expiry="5"
                    stock="5"
                    // imageSource="../components/assets/restaurant.jpg"
                  />;
          }}
          />

        <Text style={style.categoryName}>Category 3</Text>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          data={[0,0,0]}
          renderItem={({item, index}) => {
            return <ItemCard
                    key={index}
                    title={`Title Name : ${index}`}
                    price="200"
                    handelCardPress={() => setInfoDialogVisibility(true)}
                    expiry="5"
                    stock="5"
                    // imageSource="../components/assets/restaurant.jpg"
                  />;
          }}
          />
        
      </ScrollView>
      <FAB style={style.fab} icon="plus" onPress={addListItemButton} />
      <ListingInfoDialog show={showInfoDialog} close={() => setInfoDialogVisibility(false)}/>
    </View>
  );
}
const style = StyleSheet.create({
  storeContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  shopNameText: {
    fontSize: 24,
    color: '#000',
    fontWeight: '700',
  },
  overviewContainer: {
    width: '100%',
    height: 130,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#88888840",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 1
  },
  overviewInnerContainer: {
    alignItems: 'center',
  },
  overviewNumber: {
    fontSize: 48,
  },
  overviewText: {
    color: '#747474',
  },
  verticalLine: {
    borderWidth: 1,
    height: '50%',
    borderColor: '#C6C6C6',
  },
  manageInventoryButtonContainer: {
    marginVertical: 10,
  },
  manageInventoryButton: {
    width: '100%',
    height: 50,
    backgroundColor: AppConfig.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  manageInventoryButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    width: '100%',
    marginVertical: 10,
  },

  listedItemText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: AppConfig.primaryColor
  },
  listedItemTextContainer: {
    marginBottom: 20,
  },
  //Floating action button style ----------------
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: AppConfig.primaryColor,
  },
});

export default StoreTab;
