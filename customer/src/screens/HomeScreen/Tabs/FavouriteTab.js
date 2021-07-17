import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import RestaurantCard from '../../../components/RestaurantCard';
import AppConfig from '../../../../AppConfig.json';

function FavouriteTab(props) {
  //handle card press ---------------------
  const handelCardPress = () => {
    props.navigation.push('restaurantMenu');
  };

  //handel Restaurant Profile Button --------------------------------

  const handelRestaurantProfileButton = () => {
    props.navigation.push('restaurantProfile');
  };
  return (
    <View style={style.favoriteContainer}>
      <Text style={style.favoriteTitle}>Favorite</Text>
      <ScrollView>
        <RestaurantCard
          name="Merchant Name Here"
          distance="7"
          rating="3.7 (256 rating)"
          onPress={handelCardPress}
          onProfilePress={handelRestaurantProfileButton}
        />
        <RestaurantCard
          name="Merchant Name Here"
          distance="7"
          rating="3.7 (256 rating)"
          onPress={handelCardPress}
          onProfilePress={handelRestaurantProfileButton}
        />
        <RestaurantCard
          name="Merchant Name Here"
          distance="7"
          rating="3.7 (256 rating)"
          onPress={handelCardPress}
          onProfilePress={handelRestaurantProfileButton}
        />
        <RestaurantCard
          name="Merchant Name Here"
          distance="7"
          rating="3.7 (256 rating)"
          onPress={handelCardPress}
          onProfilePress={handelRestaurantProfileButton}
        />
        <RestaurantCard
          name="Merchant Name Here"
          distance="7"
          rating="3.7 (256 rating)"
          onPress={handelCardPress}
          onProfilePress={handelRestaurantProfileButton}
        />
        <RestaurantCard
          name="Merchant Name Here"
          distance="7"
          rating="3.7 (256 rating)"
          onPress={handelCardPress}
          onProfilePress={handelRestaurantProfileButton}
        />
      </ScrollView>
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
    marginBottom: 10,
    fontSize: 24,
    fontWeight: '700',
    color: AppConfig.primaryColor,
  },
});
export default FavouriteTab;
