import {useLinkProps} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import AppConfig from '../../AppConfig.json';
import { GetMerchantInfo } from '../APIs/Merchant';
import {GetCurrencySymbolFromId} from '../CurrencyManager/CurrencyManager';
import Dinero from 'dinero.js';

function RestaurantCard(props) {
  
  const [listings, setListings] = useState([])
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    GetMerchantInfo(props.merchantId).then(info => {
      if(info.openTill >= new Date().getTime()){
        const finalListings  = info.listings ? info.listings.filter(item => item.expiresOn >= new Date().getTime()) : []
        setListings(finalListings)
      }
      
    }).finally(() => setLoading(false))
  }, [])

  if(!loading && listings.length === 0 && props.storeOpen === undefined ){
    return <View style={{height: 0, width: 0}}></View>
  }

  return (
    <View style={style.restaurantCardContainer}>
      <View style={style.restroNameContainer}>
        <TouchableOpacity style={{flex: 1, marginRight: 20}} activeOpacity={0.8} onPress={props.onPress}>
          <Text style={style.restroName}>{props.name}</Text>
          
          {props.storeOpen !== undefined ? 
            <Text style={style.subText}><Text style={{fontWeight: 'bold'}}>{props.storeOpen ? "Store Open" : "Store Closed"}</Text> • {props.rating}</Text>
            :
            <Text style={style.subText}>{props.distance} Km • {props.rating}</Text>
          }
        </TouchableOpacity>

        {props.storeOpen === undefined &&
        <TouchableOpacity activeOpacity={0.8} onPress={props.onMapPressed}>
          <IconMI
            name="map"
            size={25}
            color={AppConfig.primaryColor}
          />
        </TouchableOpacity>}
        
      </View>
      {/* Loading spinner */}
      {loading && 
      <ActivityIndicator style={{alignSelf: 'flex-start'}} size="large" color={AppConfig.primaryColor} />}

      {/* No item found  */}
      {!loading && listings.length === 0 && 
      <Text style={style.noListings}>No Item Listed</Text>}

      <FlatList
        data={listings}
        style={style.listStyle}
        horizontal
        renderItem={({item, index}) => {
          // return(
          //   <TouchableOpacity activeOpacity={0.8}>
          //     <View style={style.listElement}>
          //       <Text style={[style.seeMore, {height: '100%', textAlignVertical: 'center'}]}>See More</Text>
          //     </View>
          //   </TouchableOpacity>
          // )
          return(
           <TouchableOpacity onPress={() => props.onItemPressed(item.id)} activeOpacity={0.8}>
              <ImageBackground source={{uri: item.image}} style={style.listElement}>
                <Text style={style.stockLeft}>{item.currentStockCount} Left</Text>
                <Text numberOfLines={1} style={style.itemText}>{item.name}</Text>
                <Text numberOfLines={1} style={[style.itemText, {paddingTop: 0, fontSize: 14,}]}>{GetCurrencySymbolFromId(item.price.currency)} {Dinero(item.price).toUnit()}</Text>
              </ImageBackground>
           </TouchableOpacity>
          )
        }}
       />
    </View>
  );
}
const style = StyleSheet.create({
  restaurantCardContainer: {
    width: '100%',
    marginBottom: 10
  },
  restroNameContainer: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  restroName:{
    color: AppConfig.primaryColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    color: "#000"
  },
  listStyle: {
    marginVertical: 10
  },
  listElement: {
    width: 160,
    height: 160,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  stockLeft: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: AppConfig.primaryColor,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 12
  },
  seeMore: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold'
  },
  itemText: {
    width: "100%",
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  noListings: {
    fontSize: 18,
    color: '#696969',
    margin: 10
  }
});

export default RestaurantCard;
