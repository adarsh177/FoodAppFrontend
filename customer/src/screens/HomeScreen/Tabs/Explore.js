import React, {useState} from 'react';
import {
  Switch,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import AppConfig from '../../../../AppConfig.json';
import IconMI from 'react-native-vector-icons/MaterialIcons';

import RestaurantCard from '../../../components/RestaurantCard';

function Explore(props) {
  //handle card press ---------------------
  const handelCardPress = () => {
    return null;
  };
  //handel Restaurant Profile Button
  const handelRestaurantProfileButton = () => {
    props.navigation.push('restaurantProfile');
  };

  //  handel profile button
  const handleProfile = () => {
    return null;
  };
  return (
    <View style={style.storeContainer}>
      <View style={style.locationContainer}>
        <View style={style.locationInnerContainer}>
          <IconMI
            name="location-pin"
            size={20}
            color={AppConfig.primaryColor}
          />
          <Text style={style.locationText}>Home - Pushpa Nagar</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleProfile}
          style={style.profileImageContainer}>
          <Image
            style={style.profileImage}
            source={require('../../../assets/logo.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={style.textInputContainer}>
        <TextInput
          style={style.textInput}
          placeholder="&#x1F50D;  Search here"
          s
        />
      </View>
      <ScrollView contentContainerStyle={style.scrollContainer}>
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
  storeContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  locationInnerContainer: {
    flexDirection: 'row',
  },
  locationText: {
    marginHorizontal: 10,
    textDecorationLine: 'underline',
    color: AppConfig.primaryColor,
    textDecorationColor: AppConfig.primaryColor,
    fontWeight: '700',
  },
  profileImageContainer: {
    width: 35,
    height: 35,
  },
  profileImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 10,
    height: 35,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#C1C1C1',
    borderRadius: 3,
    paddingHorizontal: 10,
  },
});

export default Explore;
