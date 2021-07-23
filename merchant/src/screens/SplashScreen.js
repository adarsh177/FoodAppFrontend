import React, { useEffect } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GetProfile } from '../APIs/ProfileManager';

function SplashScreen(props) {
  
  useEffect(() => {
    const authSubscription = auth().onAuthStateChanged(user => {
      console.log('User logged in: ', user);
      if(user === null){
        // user not logged in
        props.navigation.replace("onboarding");
      }else{
        // user logged in
        GetProfile().then(profile => {
          if(profile !== null){
            if(profile.blocked){
              props.navigation.replace("blockedScreen");
            }else{
              props.navigation.replace("home");
            }
          }else{
            props.navigation.replace("editProfile", {forced: true});
          }
        }).catch(err => {
            console.log("ERROR GETTING PROFILE", err);
            props.navigation.replace("editProfile", {forced: true});
        })
      }
    })

    return authSubscription;
  }, []);

  return (
    <View style={style.container}>
      <View style={style.innerContainer}>
        <Image
          style={style.brandImg}
          source={require('../assets/logo.png')} //brand logo
        />
      </View>
      <Text style={style.brandText}>GoodForLowPrice</Text>
    </View>
    //brand text
  );
}
// styles of all the above elements

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandImg: {
    width: 120,
    height: 120,
  },
  brandText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#777777',
    position: 'absolute',
    bottom: 50,
  },
});

export default SplashScreen;
