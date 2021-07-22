import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, Share } from 'react-native';
import AppConfig from '../../AppConfig.json';

function ShareScreen(props){
    const msg = "Hey!\nCheck out this awesome app - Good For Low Price, using which we could save food while getting our favourite dishes for cheaper rates.\n https://adarshshrivastava.in"

    const shareApp = () => {
        Share.share({
            message: msg,
        }, {
            dialogTitle: 'Sharing Joy',
            tintColor: AppConfig.primaryColor
        })
    }

    return(
        <View style={Style.mainContainer}>
            <Image style={Style.shareImage} source={require('../assets/share.png')} />
            <Text style={Style.shareTxt}>
                Around one third of all food produced in the world is <Text style={{color: 'red'}}>wasted</Text>.{"\n\n"}
                <Text style={{color: AppConfig.primaryColor}}>Share this app </Text> 
                with others and do your part in saving our food.
            </Text>
            <TouchableOpacity style={{marginTop: 20}} onPress={shareApp} activeOpacity={0.8}>
                <Text style={Style.shareBtn}>SHARE</Text>
            </TouchableOpacity>
        </View>
    )
}

const Style = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        padding: 10,
        backgroundColor: '#fff'
    },
    shareImage: {
        width: "100%",
        height: 350,
        resizeMode: 'contain'
    },
    shareTxt: {
        fontSize: 24,
        width: "100%",
        textAlign: 'center',
        flex: 1
    },
    shareBtn: {
        backgroundColor: AppConfig.primaryColor,
        color: '#fff',
        width: "100%",
        padding: 10,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default ShareScreen;
