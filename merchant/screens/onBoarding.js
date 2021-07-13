import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

function onBoarding(props) {
  //navigate to login screen for test
  var finishOnboard = () => {
    props.navigation.navigate('innerApp');
  };

  // Custom dot component for the bottom bar of the onBoarding---------------------

  const Square = ({isLight, selected}) => {
    let backgroundColor;
    if (isLight) {
      backgroundColor = selected ? 'rgb(0,184,117)' : 'rgba(0, 0, 0, 0.3)';
    } else {
      backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
    }
    return (
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

  // Custom dot component for done button of the onBoarding -----------------------------------------

  const Done = ({isLight, ...props}) => (
    <TouchableOpacity style={{marginHorizontal: 20}} onPress={finishOnboard}>
      <Text style={{color: '#00B875', fontWeight: 'bold'}}>Get Started</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      DotComponent={Square}
      DoneButtonComponent={Done}
      bottomBarColor="#fff"
      titleStyles={{fontSize: 24, color: '#00B875'}}
      subTitleStyles={{fontSize: 14, color: '#707070'}}
      //navigation two buttons to login screen
      onSkip={finishOnboard}
      pages={[
        {
          backgroundColor: '#fff',
          title: 'Help environment by choosing  us',
          subtitle:
            'Lorem ipsum dolor sit amet, consectetur  dipiscing elit. Donec pretium porta iaculis. ',
          image: (
            <Image
              style={{width: 350, height: 350, resizeMode: 'contain'}}
              source={require('../components/assets/onBoarding1.png')}
            />
          ),
        },
        {
          backgroundColor: '#fff',
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
          image: (
            <Image
              style={{width: 350, height: 350, resizeMode: 'contain'}}
              source={require('../components/assets/onBoarding2.png')}
            />
          ),
        },
        {
          backgroundColor: '#fff',
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
          image: (
            <Image
              style={{width: 350, height: 350, resizeMode: 'contain'}}
              source={require('../components/assets/onBoarding3.png')}
            />
          ),
        },
      ]}
    />
  );
}

export default onBoarding;
