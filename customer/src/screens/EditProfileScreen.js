import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {CreateProfile, GetProfile, UpdateProfile} from '../APIs/ProfileManager';

function EditProfileScreen(props) {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(auth().currentUser.phoneNumber);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const saveProfile = () => {
    if (name.length === 0) {
      alert('Please enter your name');
      return;
    }
    if (email.length === 0) {
      alert('Please enter your email');
      return;
    }

    const data = {
      name: name,
      email: email,
    };
    setUpdateLoading(true);
    if (props.route && props.route.params && props.route.params.forced) {
      CreateProfile(data)
        .then(() => {
          props.navigation.navigate('home');
        })
        .catch(err => {
          alert('Error updating profile');
        })
        .finally(() => setUpdateLoading(false));
    } else {
      UpdateProfile(data)
        .then(() => {
          props.navigation.pop();
        })
        .catch(err => {
          alert('Error updating profile');
        })
        .finally(() => setUpdateLoading(false));
    }
  };

  useEffect(() => {
    GetProfile()
      .then(profile => {
        setname(profile?.name);
        setEmail(profile?.email);
      })
      .then(err => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <ActivityIndicator
        style={{alignSelf: 'center'}}
        size="large"
        color={AppConfig.primaryColor}
      />
    );

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <ImageBackground
        imageStyle={{resizeMode: 'stretch'}}
        source={require('../assets/bg_repeat.png')}
        style={Style.mainContainer}>
        <Text style={Style.Label}>Phone</Text>
        <TextInput
          editable={false}
          style={[Style.Field, {borderColor: '#9c9c9c', color: '#9c9c9c'}]}
          value={phone}
        />

        <Text style={Style.Label}>Name</Text>
        <TextInput style={Style.Field} value={name} onChangeText={setname} />

        <Text style={Style.Label}>E-mail</Text>
        <TextInput style={Style.Field} value={email} onChangeText={setEmail} />

        {updateLoading ? (
          <ActivityIndicator
            style={{alignSelf: 'center'}}
            size="large"
            color={AppConfig.primaryColor}
          />
        ) : (
          <TouchableOpacity
            onPress={saveProfile}
            activeOpacity={0.8}
            style={{width: '100%', marginTop: 20}}>
            <Text style={Style.SaveBtn}>SAVE PROFILE</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </ScrollView>
  );
}

const Style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: "#fff",
    padding: 10,
  },
  ImageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 1,
    borderColor: '#efefef',
    borderWidth: 1,
    marginBottom: 20,
  },
  Image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 3,
  },
  ChangeImage: {
    position: 'absolute',
    bottom: 10,
    end: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: AppConfig.primaryColor,
    color: '#fff',
    borderRadius: 3,
    elevation: 1,
    fontWeight: 'bold',
  },
  Label: {
    fontSize: 14,
    color: '#5C5C5C',
    marginBottom: 5,
  },
  Field: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    borderColor: AppConfig.primaryColor,
    borderWidth: 1,
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  LocationField: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 15,
    paddingEnd: 10,
  },
  SaveBtn: {
    width: '100%',
    paddingVertical: 10,
    color: '#fff',
    backgroundColor: AppConfig.primaryColor,
    borderRadius: 3,
    elevation: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
