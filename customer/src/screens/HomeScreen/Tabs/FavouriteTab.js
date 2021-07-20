import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import RestaurantCard from '../../../components/RestaurantCard';
import AppConfig from '../../../../AppConfig.json';
import NoResult from '../../../assets/no_restro.png'
import { GetFavourites } from '../../../APIs/Merchant';

function FavouriteTab(props) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  //handle card press ---------------------
  const handelCardPress = (id) => {
    props.navigation.push('restaurantMenu', {merchantId: id})
  };
  
  useEffect(() => {
    GetFavourites().then(favs => {
      setData(favs)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <View style={style.favoriteContainer}>
      <Text style={style.favoriteTitle}>Favorite</Text>

      {loading ? <ActivityIndicator size="large" color={AppConfig.primaryColor} /> :
        <ScrollView>
          {data.map(restro => {
            return(
              <RestaurantCard
                name={restro.name}
                distance={(restro.distanceInMeters / 1000).toFixed(2)}
                rating={`${restro.rating ?? 0} (${restro.ratingCount ?? 0} ratings)`}
                onPress={() => handelCardPress(restro.userId)}
                storeOpen={restro.openTill > new Date().getTime()}
              />
            )
          })}

          
        {!loading && data.length === 0 && <Image style={style.noResult} source={NoResult} />}
        {!loading && data.length === 0 && <Text style={style.noResultText}>You have not marked any restaurants as your favourite yet</Text>}
        
        </ScrollView>}
    </View>
  );
}
const style = StyleSheet.create({
  favoriteContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  favoriteTitle: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '700',
    color: AppConfig.primaryColor,
  },
  noResult: {
    width: "100%",
    height: 300,
    resizeMode: 'contain',
  },
  noResultText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: AppConfig.primaryColor
  }
});
export default FavouriteTab;
