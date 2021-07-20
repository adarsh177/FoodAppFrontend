import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';

// External poackage for handeling star rating

import Rating from 'react-native-easy-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { GetProfile } from '../../../APIs/ProfileManager';
import AppConfig from '../../../../AppConfig.json';

function ProfileTab(props) {
  // Details of restaurant --------------------------------------------------------
  const [restaurantName, setRestaurantName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [banner, setBanner] = useState(null);
  const [rating, setRating] = useState(0);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState(auth().currentUser.phoneNumber);
  const [loading, setLoading] = useState(true);

  // handel Edit Profile button --------------------------------

  const handelEditProfile = () => {
    props.navigation.push("editProfile");
  };

  // handel Logout button --------------------------------

  const handleLogout = async () => {
    await auth().signOut();
    console.log("User signed out");
    props.navigation.replace("splash")
    return null;
  };

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      GetProfile().then(profile => {
        setLoading(false);
        setRestaurantName(profile.name);
        setDesc(profile.description);
        setBanner(profile.bannerImage);
        setLocation(profile.location && profile.location.label ? profile.location.label : "Location not found");
        setRating(profile.rating);
      })
    })
  }, []);

  if(loading)
    return <ActivityIndicator color={AppConfig.primaryColor} size="large" />;

  return (
    <View style={style.profileContainer}>
      <View style={style.resaurantImageContainer}>
        <Image
          style={style.resaurantImage}
          source={{uri: banner ? banner : "https://media.istockphoto.com/photos/top-view-table-full-of-food-picture-id1220017909?b=1&k=6&m=1220017909&s=170667a&w=0&h=yqVHUpGRq-vldcbdMjSbaDV9j52Vq8AaGUNpYBGklXs="}}
        />
      </View>
      <View style={style.detailsContainer}>
        <Text style={style.boldDescriptionTitle}>{restaurantName}</Text>
        <Text style={style.smallDescriptionTitle}>{desc}</Text>
        <View style={style.rowFlexContainer}>
          <Rating
            rating={rating}
            max={5}
            iconWidth={24}
            iconHeight={24}
            style={style.rightMargin}
            editable={false}
          />
          <Text style={style.smallDescriptionTitle}>
            {rating ?? 0} rating
          </Text>
        </View>
        <View style={style.rowFlexContainer}>
          <Icon
            style={style.rightMargin}
            name="map-marker"
            size={28}
            color="#00B875"
          />
          <Text style={style.smallDescriptionTitle}>
            {location}
          </Text>
        </View>

        <View style={style.rowFlexContainer}>
          <Icon
            style={style.rightMargin}
            name="phone"
            size={28}
            color="#00B875"
          />
          <Text style={style.smallDescriptionTitle}>
            {phone}
          </Text>
        </View>
        {/* <View style={style.rowFlexContainer}>
          <Icon
            style={style.rightMargin}
            name="address-card"
            size={28}
            color="#00B875"
          />
          <Text style={style.smallDescriptionTitle}>
            Lorem ipsum dolor sit amet, consectetur
          </Text>
        </View> */}

        {/*Button for Edit profile------------------------------------- */}

        <TouchableOpacity
          activeOpacity={0.6}
          style={style.editProfile}
          onPress={handelEditProfile}>
          <Text style={style.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/*Button for Logout  -------------------------------------- */}

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={handleLogout}>
          <Text style={style.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  profileContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10
  },
  resaurantImageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  resaurantImage: {
    width: "100%",
    height: 240,
    borderRadius: 3,
    resizeMode: 'cover',
  },
  detailsContainer: {
    width: '100%',
    height: '100%',
  },
  boldDescriptionTitle: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 20
  },
  smallDescriptionTitle: {
    fontSize: 14,
    color: '#707070',
    marginVertical: 10,
  },
  rowFlexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  rightMargin: {
    marginRight: 15,
  },
  editProfile: {
    width: 200,
    height: 40,
    backgroundColor: '#00B875',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 40
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButtonText: {
    marginTop: 10,
    alignSelf: "center",
    color: '#FF5353',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ProfileTab;
