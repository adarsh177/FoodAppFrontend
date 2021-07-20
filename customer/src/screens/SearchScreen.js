import React from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import IconMI from 'react-native-vector-icons/MaterialIcons';



function SearchScreen(props){

    return(
        <View style={Style.mainContainer}>
            <View style={style.searchBox}>
                <IconMI
                    name="search"
                    size={25}
                    color="#8c8c8c" />
                <TextInput
                    style={style.searchBoxInner}
                    placeholder="Search here" />
            </View>

            <FlatList>
                
            </FlatList>
        </View>
    )
}

const Style = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10
    },
    searchBox: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#C1C1C1',
        borderRadius: 3,
        paddingHorizontal: 10
    },
    searchBoxInner: {
        height: "100%",
        flex: 1
    },
})

export default SearchScreen;
