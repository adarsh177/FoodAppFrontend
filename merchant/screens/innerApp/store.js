import React, {useState} from 'react';
import {
  Switch,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FAB} from 'react-native-paper';
import AppConfig from '../../AppConfig.json';
import ItemCard from '../../components/itemCard';

function Store(props) {
  // store name for the title of page  --------------------

  const storeName = 'Store Name';

  // store activity status ----------------------------------

  const [shopStatus, setShopStatus] = useState('Shop Closed');

  //Changing shop status text with change in switch ----------------

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

  //Order overview (Ongoing and pending orders)-------

  const onGoingOrders = '7';
  const pendingOrders = '2';

  //Manage Inventory Button ---------------------------
  const manageInventory = () => {
    props.navigation.push('Inventory');
  };

  // add List Item Button ---------------------------

  const addListItemButton = () => {
    props.navigation.push('List Item');
  };

  //listd card press event --------------------------

  const handelListedCard = () => {
    return null;
  };

  return (
    <View style={style.storeContainer}>
      <ScrollView>
        <View style={style.headerContainer}>
          <View>
            <Text style={style.shopNameText}>{storeName}</Text>
            <Text
              style={
                isEnabled ? {color: AppConfig.primaryColor} : {color: '#FF5353'}
              }>
              {shopStatus}
            </Text>
          </View>
          <Switch
            trackColor={{false: '#E8E8E8', true: '#DDD'}}
            thumbColor={isEnabled ? AppConfig.primaryColor : '#FF5353'}
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
        <View>
          {/*Listed Item Cards ------------------------
        
        ##########---Props  used int he card---###########


        title = title for the item
        Price = price for the listed item
        expiry = time duration in *hour* within which the item will expire
        stock = Number of item left in the stock
        imageSource = path of image   {not working}


        */}
          <ItemCard
            title="Title Name"
            price="200"
            handelCardPress={handelListedCard}
            expiry="5"
            stock="5"
            // imageSource="../components/assets/restaurant.jpg"
          />
          <ItemCard
            title="Title Name"
            price="200"
            handelCardPress={handelListedCard}
            expiry="5"
            stock="5"
            // imageSource="../components/assets/restaurant.jpg"
          />
          <ItemCard
            title="Title Name"
            price="200"
            handelCardPress={handelListedCard}
            expiry="5"
            stock="5"
            // imageSource="../components/assets/restaurant.jpg"
          />
          <ItemCard
            title="Title Name"
            price="200"
            handelCardPress={handelListedCard}
            expiry="5"
            stock="5"
            // imageSource="../components/assets/restaurant.jpg"
          />
          <ItemCard
            title="Title Name"
            price="200"
            handelCardPress={handelListedCard}
            expiry="5"
            stock="5"
            // imageSource="../components/assets/restaurant.jpg"
          />
          <ItemCard
            title="Title Name"
            price="200"
            handelCardPress={handelListedCard}
            expiry="5"
            stock="5"
            // imageSource="../components/assets/restaurant.jpg"
          />
          <ItemCard
            title="Title Name"
            price="200"
            handelCardPress={handelListedCard}
            expiry="5"
            stock="5"
            imageSource="../components/assets/restaurant.jpg"
          />
          <ItemCard
            title="Title Name"
            price="200"
            handelCardPress={handelListedCard}
            expiry="5"
            stock="5"
            imageSource="../components/assets/restaurant.jpg"
          />
        </View>
      </ScrollView>
      <FAB style={style.fab} small icon="plus" onPress={addListItemButton} />
    </View>
  );
}
const style = StyleSheet.create({
  storeContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
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
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 2,
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
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  listedItemTextContainer: {
    marginBottom: 10,
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

export default Store;
