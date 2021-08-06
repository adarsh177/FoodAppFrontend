import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function BlockedScreen(props) {
  const logout = async () => {
    try {
      await auth().signOut();
      props.navigation.replace('splash');
    } catch (ex) {
      console.log('error logging out', ex);
      alert('Error signing out at the moment');
    }
  };

  return (
    <View style={Style.mainContainer}>
      <Image style={Style.image} source={require('../assets/blocked.png')} />
      <Text style={Style.text}>
        Your account has been deactivated due to unusual activities.
      </Text>

      <TouchableOpacity onPress={logout} activeOpacity={0.8}>
        <Text style={Style.signout}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const Style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 50,
  },
  text: {
    width: '100%',
    textAlign: 'center',
    color: '#000',
    fontSize: 22,
    marginTop: 10,
    fontWeight: 'bold',
    flex: 1,
  },
  signout: {
    color: '#fff',
    backgroundColor: '#d42522',
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    paddingVertical: 10,
    width: '100%',
    textAlign: 'center',
  },
});
