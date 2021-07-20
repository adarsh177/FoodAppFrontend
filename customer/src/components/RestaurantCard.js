import {useLinkProps} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import AppConfig from '../../AppConfig.json';

function RestaurantCard(props) {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={props.onPress}
        style={style.restaurantCardContainer}>
        <View style={style.restaurantCardImageContainer}>
          <Image
            style={style.restrauntImage}
            source={require('../assets/restaurant.jpg')}
          />
        </View>
        <View style={style.cardDetailContainer}>
          <View style={style.cardDetailInnerContainer}>
            <Text style={style.retaurantName}>{props.name}</Text>
            {!isNaN(props.distance) && 
            <Text style={style.retaurantDistance}>
              {props.distance} Km away
            </Text>}
          </View>
          <View style={style.cardDetailInnerContainer}>
            <View style={style.starAndRating}>
              <IconMI name="star" size={20} color={AppConfig.primaryColor} />
              <Text style={style.ratingText}>{props.rating}</Text>
            </View>
            {props.storeOpen !== undefined && <Text style={props.storeOpen === true ? style.openText : style.closedText}>{props.storeOpen ? "Open now" : "Closed"}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  restaurantCardContainer: {
    width: '100%',
    borderColor: '#A8A8A8',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 3
  },
  restaurantCardImageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 3
  },
  restrauntImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 3
  },
  cardDetailContainer: {
    margin: 10,
    marginTop: 5
  },
  retaurantName: {
    color: '#3C3C3C',
    fontSize: 16,
    fontWeight: "bold"
  },
  cardDetailInnerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
  },
  retaurantDistance: {
    color: '#737373',
  },
  starAndRating: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ratingText: {
    marginLeft: 5,
    color: '#818181',
  },
  closedText: {
    color: '#B70000',
    fontWeight: '700',
  },
  openText: {
    color: AppConfig.primaryColor,
    fontWeight: '700',
  },
  RestaurantProfileButtonContainer: {
    position: 'absolute',
    width: 80,
    top: 5,
    right: 5,
    zIndex: 1,
  },
});

export default RestaurantCard;
