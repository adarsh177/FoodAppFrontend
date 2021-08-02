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
  Image,
  RefreshControl,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import MenuCard from '../components/MenuCard';

// External package ---------------------------------------
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { GetMerchantInfo, SetFavourite, UnsetFavourite } from '../APIs/Merchant';
import ANT from 'react-native-vector-icons/AntDesign';
import GetCurrencySymbol, { GetCurrencySymbolFromId } from '../CurrencyManager/CurrencyManager';
import ListingInfoDialog from '../dialogs/ListingInfoDialog';
import { GetTimeInWords } from '../Utils';
import Dinero from 'dinero.js'

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
  return (
    <TouchableOpacity
      style={style.flagComponentContainerItemAdded}
      activeOpacity={0.6}
      onPress={props.onPress}>
      <View style={style.iconAndValueContainer}>
        <IconMCI name="cart-outline" size={30} color="#fff" />
        <Text style={style.flagText}>Cart value : {GetCurrencySymbolFromId(props.cartValue.currency)} {Dinero(props.cartValue).toUnit()}</Text>
      </View>
      <View>
        <Text style={style.flagText}>Checkout &#9654;</Text>
      </View>
    </TouchableOpacity>
  );
};

function RestaurantMenu(props) {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [isFav, setFav] = useState(true)
  const [listings, setListings] = useState([])
  const [currentMenu, setCurrentMenu] = useState({})
  const [cartTotal, setCartTotal] = useState({})
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const [infoItem, setInfoItem] = useState(false)

  const handlePressOnCartValue = () => {
    props.navigation.navigate('checkoutScreen', {
      merchantId: props.route.params.merchantId,
      merchantName: data.name,
      merchantAddress: data.location.label,
      items: Object.values(currentMenu)
    });
  };

  const UpdateFavourite = async (val) => {
    setFav(val)

    if(val)
      SetFavourite(props.route.params.merchantId)
    else
      UnsetFavourite(props.route.params.merchantId)
  }

  const loadData = () => {
    setLoading(true)
    GetMerchantInfo(props.route.params.merchantId).then(merch => {
      console.log(merch)
      setData(merch)
      setFav(merch.isFav)
      props.navigation.setOptions({title: merch.name})

      // setting listings
      const menu = merch.listings ?? []
      const currTime = new Date().getTime()
      const liveMenu = menu.filter(val => val.expiresOn > currTime)
      setListings(liveMenu)

      // checking if any item should be opened
      console.log('ITEM SELECTED', props.route.params.showItem)
      if(props.route.params.showItem){
        
        const item = liveMenu.filter(val => val.id == props.route.params.showItem)[0]
        const finalList = liveMenu.filter(item => item.id !== props.route.params.showItem)
        finalList.splice(0, 0, item)
        setListings(finalList)
        // if(item){
        //   setInfoItem(item)
        //   setShowInfoDialog(true)
        // }
      }
    }).catch(err => {
      console.log('Error getting merchant info', err)
      alert('Error getting info at the moment')
      props.navigation.pop()
    }).finally(() => setLoading(false))
  }

  const ItemValChange = (id, val) => {
    const menuData = currentMenu
    menuData[id] = val

    console.log('Menu', menuData)
    setCurrentMenu(menuData)
    GetTotalCartValue(menuData)
  }

  const GetTotalCartValue = (menuData) => {
    if(Object.keys(menuData).length === 0 ) return 0

    let total = null
    Object.values(menuData).forEach(val => {
      if(total !== null){
        total = total.add(Dinero(val.price))
      }else{
        total = Dinero(val.price)
      }
    })
    // console.log()
    
    setCartTotal(total.toJSON())
  }

  useEffect(() => {
    props.navigation.addListener('focus', loadData)
    loadData()
  }, [])

  return (
    <View style={style.inventoryContainer}>
      <ScrollView 
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} />}
        >
        <View style={style.bannerContainer}>
          <Image style={style.bannerImage} source={{uri: data.bannerImage}} />
          <TouchableOpacity 
            style={[style.favWrapper, isFav ? {backgroundColor: "#d42522"}: {}]} 
            activeOpacity={0.8} 
            onPress={() => {UpdateFavourite(!isFav)}}>
            <ANT
              name="heart"
              size={16}
              color={isFav ? "#fff" : "#d42522"}
            />
          </TouchableOpacity>
        </View>

        <Text style={style.location}>
          {data.location?.label}
        </Text>
        
        <View style={style.menuContainer}>
          {!loading && listings.length === 0 &&
          <Text style={{fontSize: 24, alignSelf: 'center', margin: 20}}>No Items listed</Text>}
          {listings.map((item, index) => {
            return(
              <MenuCard
                  key={item.id}
                  id={item.id}
                  itemName={item.name}
                  price={item.price}
                  image={item.image}
                  description={item.description}
                  max={item.currentStockCount}
                  onValueChanged={ItemValChange}
                  onClick={() => {
                    setInfoItem(item)
                    setShowInfoDialog(true)
                  }}
                />
            )
          })}
        </View>
      </ScrollView>

      {data.openTill < new Date().getTime() ? 
        <View style={[style.flagMessageContainer, {backgroundColor: "#c2130e"}]}>
          <Text style={style.closed}>Store is closed at the moment</Text>
        </View>
        :
        (cartTotal.amount > 0 && 
          <View style={style.flagMessageContainer}>
            <ItemAdded onPress={handlePressOnCartValue} cartValue={cartTotal}/>
          </View>)
      }
      
      <ListingInfoDialog
        show={showInfoDialog}
        data={infoItem}
        close={() => {
          setShowInfoDialog(false)
        }} />
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
  bannerContainer: {
    width: "100%",
    height: 250
  },
  bannerImage: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
    resizeMode: 'cover'
  },
  flagMessageContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppConfig.primaryColor,
    paddingHorizontal: 20,
  },
  favWrapper: {
    position: "absolute",
    top: 10,
    end: 10,
    borderRadius: 3,
    padding: 10,
    borderColor: '#d42522',
    borderRadius: 500,
    borderWidth: 2
  },
  location: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: AppConfig.primaryColor,
    fontWeight: 'bold',
    margin: 10,
    borderWidth: 1,
    borderColor: AppConfig.primaryColor,
    padding: 10,
    borderRadius: 3
  },
  menuContainer: {
    width: "100%",
    padding: 10,
    marginBottom: 100
  },
  closed: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#fff"
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
