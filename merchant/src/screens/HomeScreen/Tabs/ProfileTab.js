import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

// External poackage for handeling star rating

import Rating from 'react-native-easy-rating';
import Icon from 'react-native-vector-icons/FontAwesome';

function ProfileTab(props) {
  // Details of restaurant --------------------------------------------------------

  const RestaurantName = 'Restaurent Name';
  const RestaurantDescription =
    'dfskhdksh shafkh,en ahdgf,bawefsd fbalkdhfgoyabdfjg  adgkfkafg jkgkgdskf hdkgfksdlfhk kghkasdb fdfdk';
  const [rating, setRating] = useState(4);

  // handel Edit Profile button --------------------------------

  const handelEditProfile = () => {
    props.navigation.push("editProfile");
  };

  // handel Logout button --------------------------------

  const handleLogout = () => {
    return null;
  };
  return (
    <View style={style.profileContainer}>
      <View style={style.resaurantImageContainer}>
        <Image
          style={style.resaurantImage}
          source={require('../../../assets/restaurant.jpg')}
        />
      </View>
      <View style={style.detailsContainer}>
        <Text style={style.boldDescriptionTitle}>{RestaurantName}</Text>
        <Text style={style.smallDescriptionTitle}>{RestaurantDescription}</Text>
        <View style={style.rowFlexContainer}>
          <Rating
            rating={rating}
            max={5}
            iconWidth={24}
            iconHeight={24}
            onRate={setRating}
            style={style.rightMargin}
            editable={false}
          />
          <Text style={style.smallDescriptionTitle}>256 Ratings</Text>
        </View>
        <View style={style.rowFlexContainer}>
          <Icon
            style={style.rightMargin}
            name="map-marker"
            size={28}
            color="#00B875"
          />
          <Text style={style.smallDescriptionTitle}>
            Lorem ipsum dolor sit amet, consectetur
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
            Lorem ipsum dolor sit amet, consectetur
          </Text>
        </View>
        <View style={style.rowFlexContainer}>
          <Icon
            style={style.rightMargin}
            name="address-card"
            size={28}
            color="#00B875"
          />
          <Text style={style.smallDescriptionTitle}>
            Lorem ipsum dolor sit amet, consectetur
          </Text>
        </View>

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
