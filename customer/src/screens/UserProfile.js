import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconMIC from 'react-native-vector-icons/MaterialCommunityIcons';
import IonicIcons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';
import { GetProfile } from '../APIs/ProfileManager';
import FeedbackDialog from '../dialogs/FeedbackDialog';

function UserProfile(props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(auth().currentUser.phoneNumber)
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  
  const handelEditProfile = () => {
    props.navigation.push('editProfile');
  };
  
  const handleLogout = () => {
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
    GetProfile().then(profile => {
      setName(profile.name)
    })
  }, [])

  return (
    <ScrollView style={style.profileContainer} contentContainerStyle={{width: "100%", overflow: "scroll"}}>
      <Image style={style.avtar} source={require('../assets/logo.png')} />
      <Text style={style.boldDescriptionTitle}>{name}</Text>
      <Text style={style.smallDescriptionTitle}>{phone}</Text>

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

      <TouchableOpacity onPress={() => alert('Working on it')} style={[style.rowFlexContainer]} activeOpacity={0.8}>
        <Icon
          style={style.rightMargin}
          name="question-circle"
          size={24}
          color={AppConfig.primaryColor}
        />
        <Text style={style.option}>How to use this app</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('Working')} style={[style.rowFlexContainer]} activeOpacity={0.8}>
        <IonicIcons
          style={style.rightMargin}
          name="business"
          size={24}
          color={AppConfig.primaryColor}
        />
        <Text style={style.option}>Connect your business</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('Working')} style={[style.rowFlexContainer]} activeOpacity={0.8}>
        <IonicIcons
          style={style.rightMargin}
          name="notifications"
          size={24}
          color={AppConfig.primaryColor}
        />
        <Text style={style.option}>Enable Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.push('shareScreen')} style={[style.rowFlexContainer]} activeOpacity={0.8}>
        <Icon
          style={style.rightMargin}
          name="share-alt"
          size={24}
          color={AppConfig.primaryColor}
        />
        <Text style={style.option}>Share with</Text>
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

      <TouchableOpacity onPress={() => handleLogout()} style={[style.rowFlexContainer, {marginBottom: 100}]} activeOpacity={0.8}>
        <IonicIcons
          style={style.rightMargin}
          name="exit"
          size={24}
          color="#FF5353"
        />
        <Text style={[style.option, {color: "#FF5353", fontWeight: "bold"}]}>Logout</Text>
      </TouchableOpacity>

      <FeedbackDialog
        show={showFeedbackDialog}
        close={() => setShowFeedbackDialog(false)}/>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#fff',
    padding: 20
  },
  avtar: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
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
    textAlign: 'center'
  },
  smallDescriptionTitle: {
    fontSize: 14,
    color: '#707070',
    textAlign: 'center'
  },
  option: {
    fontSize: 16,
    color: "#696969",
    textAlign: 'center'
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
    width: 40,
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
});

export default UserProfile;
