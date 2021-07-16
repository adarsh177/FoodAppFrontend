import React, { useState } from "react";
import { Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppConfig from '../../AppConfig.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function EditProfileScreen(props){
    const [phone, setPhone] = useState("+919522349586");

    return(
        <ScrollView style={{backgroundColor: "#fff"}}>
            <ImageBackground imageStyle={{resizeMode: "stretch"}} source={require('../assets/bg_repeat.png')} style={Style.mainContainer}>
                <View style={Style.ImageContainer}>
                    <Image style={Style.Image} source={{uri: "https://media.istockphoto.com/photos/top-view-table-full-of-food-picture-id1220017909?b=1&k=6&m=1220017909&s=170667a&w=0&h=yqVHUpGRq-vldcbdMjSbaDV9j52Vq8AaGUNpYBGklXs="}} />
                    <Text style={Style.ChangeImage}>
                        Change
                    </Text>
                </View>

                <Text style={Style.Label}>Phone Number</Text>
                <TextInput 
                    editable={false}
                    style={[Style.Field, {borderColor: "#9c9c9c", color: "#9c9c9c"}]}
                    value={phone}/>

                <Text style={Style.Label}>Store Name</Text>
                <TextInput 
                    style={Style.Field}
                    value={phone}
                    />

                <Text style={Style.Label}>Description</Text>
                <TextInput 
                    style={[Style.Field, {textAlignVertical: "top"}]}
                    numberOfLines={3}
                    value={phone}
                    />

                <Text style={Style.Label}>Landmark</Text>
                <TextInput 
                    style={Style.Field}
                    value={phone}
                    />
                
                <Text style={Style.Label}>Location</Text>
                <View style={[Style.Field, Style.LocationField]}>
                    <Text numberOfLines={1} style={{fontSize: 16, flex: 1, marginRight: 10}} >
                        Hello There my name is adarsh shrivasrtava and i ma 
                    </Text>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Icon name="target" color={AppConfig.primaryColor} size={22}/>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity activeOpacity={0.8} style={{width: "100%", marginTop: 20}}>
                    <Text style={Style.SaveBtn}>
                        SAVE
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </ScrollView>
    );
}

const Style = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        // backgroundColor: "#fff",
        padding: 10
    },
    ImageContainer: {
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
        elevation: 1,
        borderColor: "#efefef",
        borderWidth: 1,
        marginBottom: 20
    },
    Image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 3,
    },
    ChangeImage: {
        position: "absolute",
        bottom: 10,
        end: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: AppConfig.primaryColor,
        color: "#fff",
        borderRadius: 3,
        elevation: 1,
        fontWeight: "bold"
    },
    Label: {
        fontSize: 14,
        color: "#5C5C5C",
        marginBottom: 5
    },
    Field: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 3,
        borderColor: AppConfig.primaryColor,
        borderWidth: 1,
        fontSize: 16,
        marginBottom: 10,
        color: "#000",
    },
    LocationField: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 15,
        paddingEnd: 10,
    },
    SaveBtn: {
        width: "100%",
        paddingVertical: 10,
        color: "#fff",
        backgroundColor: AppConfig.primaryColor,
        borderRadius: 3,
        elevation: 1,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18,
        fontWeight: "bold"
    }
})

export default EditProfileScreen;
