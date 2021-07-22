import React, {useEffect, useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, ScrollView, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { GetProfile } from '../../../APIs/ProfileManager';
import AppConfig from '../../../../AppConfig.json';
import FeedbackDialog from '../../../dialogs/FeedbackDialog';

function ProfileTab(props) {
  // Details of restaurant --------------------------------------------------------
  const [restaurantName, setRestaurantName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [banner, setBanner] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState(auth().currentUser.phoneNumber);
  const [loading, setLoading] = useState(true);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)

  // handel Edit Profile button --------------------------------

  const handelEditProfile = () => {
    props.navigation.push("editProfile");
  };

  // handel Logout button --------------------------------

  const handleLogout = async () => {
    Alert.alert('Log out', 'Are you sure, you want to logout?', [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        onPress: async () => {
          await auth().signOut();
          props.navigation.navigate('splash');
        },
        text: "Log out",
        style: "default"
      }
    ])
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
        setRatingCount(profile.ratingCount);
      })
    })
  }, []);

  if(loading)
    return <ActivityIndicator color={AppConfig.primaryColor} size="large" />;

  return (
    <ScrollView style={style.profileContainer}>
      <View style={style.resaurantImageContainer}>
        <Image
          style={style.resaurantImage}
          source={{uri: banner ? banner : "https://media.istockphoto.com/photos/top-view-table-full-of-food-picture-id1220017909?b=1&k=6&m=1220017909&s=170667a&w=0&h=yqVHUpGRq-vldcbdMjSbaDV9j52Vq8AaGUNpYBGklXs="}}
        />
      </View>
      <View style={style.detailsContainer}>
        <Text style={style.boldDescriptionTitle}>{restaurantName}</Text>
        <Text style={style.smallDescriptionTitle}>{desc}</Text>
        <Text style={style.smallDescriptionTitle}>
          {rating ?? 0} rating ({ratingCount ?? 0})
        </Text>

        <TouchableOpacity onPress={handelEditProfile} style={[style.rowFlexContainer, {marginTop: 20}]} activeOpacity={0.8}>
          <Icon
            style={style.rightMargin}
            name="user"
            size={24}
            color={AppConfig.primaryColor}
          />
          <Text style={style.option}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowFeedbackDialog(true)} style={[style.rowFlexContainer]} activeOpacity={0.8}>
          <Icon
            style={style.rightMargin}
            name="comment"
            size={24}
            color={AppConfig.primaryColor}
          />
          <Text style={style.option}>Give Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.push('shareApp')} style={[style.rowFlexContainer]} activeOpacity={0.8}>
          <Icon
            style={style.rightMargin}
            name="share-alt"
            size={24}
            color={AppConfig.primaryColor}
          />
          <Text style={style.option}>Share with friends</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.google.co.in/search?q=privacy')} style={[style.rowFlexContainer]} activeOpacity={0.8}>
          <Icon
            style={style.rightMargin}
            name="bullseye"
            size={24}
            color={AppConfig.primaryColor}
          />
          <Text style={style.option}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL('https://www.google.co.in/search?q=terms')} style={[style.rowFlexContainer]} activeOpacity={0.8}>
          <Icon
            style={style.rightMargin}
            name="file"
            size={24}
            color={AppConfig.primaryColor}
          />
          <Text style={style.option}>Terms and Conditions</Text>
        </TouchableOpacity>

        {/*Button for Logout  -------------------------------------- */}

        <TouchableOpacity
          activeOpacity={0.6}
          style={{marginBottom: 50, marginTop: 20}}
          onPress={handleLogout}>
          <Text style={style.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FeedbackDialog
        show={showFeedbackDialog}
        close={() => setShowFeedbackDialog(false)} />
    </ScrollView>
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
    marginVertical: 5
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFlexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    borderBottomColor: '#bababa',
    borderBottomWidth: 1,
    padding: 10,
    borderRadius: 3,
    marginTop: 10
  },
  rightMargin: {
    width: 40
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
