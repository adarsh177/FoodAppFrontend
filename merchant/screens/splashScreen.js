import React from 'react';
import {View, Text, Image, ImageBackground, StyleSheet} from 'react-native';

function SplashScreen(props) {
  setTimeout(() => {
    props.navigation.navigate('Login');
  }, 5000);
  return (
    <View style={style.container}>
      <View style={style.innerContainer}>
        <Image
          style={style.brandImg}
          source={require('../components/assets/logo.png')} //brand logo
        />
      </View>
      <Text style={style.brandText}>Brand Name </Text>
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
