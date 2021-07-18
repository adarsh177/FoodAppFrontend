import React, {useEffect, useState} from 'react';
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
import { GetProfile } from '../../../APIs/ProfileManager';
import { GetListings, GetOrderSummary, UpdateStoreStatus } from '../../../APIs/StoreManager';
import ItemCard from '../../../components/itemCard';
import ListingInfoDialog from '../../../dialogs/ListingInfoDialog';
import StartStoreDialog from '../../../dialogs/StartStoreDialog';
import { GetTimeInWords } from '../../../Utils';

const REFRESH_TIME = 10000; // 10sec

function StoreTab(props) {
  // store name for the title of page  --------------------

  const storeName = 'Store Name';

  // store activity status ----------------------------------

  const [shopStatus, setShopStatus] = useState('Accepting Orders');
  const [showInfoDialog, setInfoDialogVisibility] = useState(false);
  const [showStartShowDialog, setStartShowDialogVisibility] = useState(false);
  const [listings, setListings] = useState([]);
  const [clickedItem, setClickedItem] = useState({});
  const [orderSummary, setOrderSummary] = useState({pendingOrders: 0, ongoingOrders: 0})
  const [intervalHandle, setIntervalHandle] = useState();

  //Changing shop status text with change in switch ----------------

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = (val) => {
    setIsEnabled(val);
    setShopStatus(val ? 'Accepting Orders' : 'Store Closed');
  };

  //Manage Inventory Button ---------------------------
  const manageInventory = () => {
    props.navigation.push('inventory');
  };

  const CloseStore = () => {
    UpdateStoreStatus(new Date().getTime() - 10000).then(() => {
      updatePage();
    }).catch(err => {
      console.log('Error closing store', err);
      alert('Error closing app, try again later');
    })
  }

  // add List Item Button ---------------------------

  const addListItemButton = () => {
    props.navigation.push('listItem');
  };

  function updatePage(){
    GetListings().then(listings => {
      setListings(listings ?? []);
    }).catch(err => {
      console.log("Error getting listings", err);
    })

    GetProfile().then(profile => {
      toggleSwitch(profile.openTill && (profile.openTill >= new Date().getTime()))
    }).catch(err => {
      console.log("Error getting profile", err);
    })

    GetOrderSummary().then(summary => {
      setOrderSummary(summary);
    }).catch(err => {
      console.log("Error getting order summary", err);
    })
  }

  useEffect(() => {
    setIntervalHandle(setInterval(() => {
      updatePage()
    }, REFRESH_TIME))

    props.navigation.addListener('focus', () => {
      console.log('Focus store tab');
      clearInterval(intervalHandle)
      setIntervalHandle(setInterval(() => {
        updatePage()
      }, REFRESH_TIME))
    });

    props.navigation.addListener('blur', () => clearInterval(intervalHandle))
  }, []);

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
            onValueChange={bool => {
              if(bool){
                setStartShowDialogVisibility(true);
                return;
              }else{
                CloseStore();
              }
            }}
            value={isEnabled}
          />
        </View>
        <View style={style.overviewContainer}>
          <View style={style.overviewInnerContainer}>
            <Text style={style.overviewNumber}>{orderSummary.ongoingOrders}</Text>
            <Text style={style.overviewText}>Ongoing Orders</Text>
          </View>
          <View style={style.verticalLine}></View>
          <View style={style.overviewInnerContainer}>
            <Text style={style.overviewNumber}>{orderSummary.pendingOrders}</Text>
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
        <FlatList
          scrollEnabled={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          data={listings}
          renderItem={({item, index}) => {
            return <ItemCard
                    key={item.id}
                    title={item.name}
                    price={item.price}
                    handelCardPress={() => {
                      setClickedItem(item);
                      setInfoDialogVisibility(true);
                    }}
                    expiry={GetTimeInWords(item.expiresOn - new Date().getTime())}
                    stock={item.currentStockCount}
                    image={item.image}
                  />;
          }}
          />
          {listings.length === 0 && <Text style={style.noItem}>No item listed yet! Click on plus button to list item</Text>}
      </ScrollView>
      <FAB style={style.fab} icon="plus" onPress={addListItemButton} />
      <ListingInfoDialog data={clickedItem} show={showInfoDialog} close={() => {
        updatePage();
        setInfoDialogVisibility(false);
      }}/>
      <StartStoreDialog show={showStartShowDialog} close={() => {
        updatePage();
        setStartShowDialogVisibility(false);
      }}/>
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
  noItem:{
    fontSize: 16,
    marginTop: 10
  }
});

export default StoreTab;
