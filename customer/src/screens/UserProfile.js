import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMIC from 'react-native-vector-icons/MaterialCommunityIcons';

function UserProfile(props) {
  const customerName = 'Rajesh kumar';
  const address = 'raipur';
  const email = 'ramesh@gmail.com';
  const phone = '915142514';

  // handel Edit Profile button --------------------------------

  const handelEditProfile = () => {
    props.navigation.push('editProfile');
  };

  // handel Logout button --------------------------------

  const handleLogout = () => {
    return null;
  };
  return (
    <ScrollView style={style.profileContainer}>
      <Image style={style.avtar} source={require('../assets/restaurant.jpg')} />
      <View style={style.detailsContainer}>
        <Text style={style.boldDescriptionTitle}>{customerName}</Text>

        <View style={style.rowFlexContainer}>
          <Icon
            style={style.rightMargin}
            name="map-marker"
            size={28}
            color="#00B875"
          />
          <Text style={style.smallDescriptionTitle}>{address}</Text>
        </View>

        <View style={style.rowFlexContainer}>
          <IconMIC
            style={style.rightMargin}
            name="email"
            size={28}
            color="#00B875"
          />
          <Text style={style.smallDescriptionTitle}>{email}</Text>
        </View>

        <View style={style.rowFlexContainer}>
          <Icon
            style={style.rightMargin}
            name="phone"
            size={28}
            color="#00B875"
          />
          <Text style={style.smallDescriptionTitle}>{phone}</Text>
        </View>
        {/*Button for Edit profile------------------------------------- */}

        <TouchableOpacity
          activeOpacity={0.6}
          style={style.editProfile}
          onPress={handelEditProfile}>
          <Text style={style.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/*Button for Logout  -------------------------------------- */}

        <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
          <Text style={style.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  profileContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  avtar: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  detailsContainer: {
    width: '100%',
    height: '100%',
  },
  boldDescriptionTitle: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 20,
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
    alignSelf: 'center',
    marginTop: 40,
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButtonText: {
    marginTop: 10,
    alignSelf: 'center',
    color: '#FF5353',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editProfile: {
    width: 200,
    height: 40,
    backgroundColor: '#00B875',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 40,
  },
  editProfileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButtonText: {
    marginTop: 10,
    alignSelf: 'center',
    color: '#FF5353',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
