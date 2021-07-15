import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Modal, Image } from 'react-native';
import AppConfig from '../../AppConfig.json';

function ListingInfoDialog(props){
    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={props.show}
        onRequestClose={() => {
          props.close();
        }}>
            <View style={style.mainContainer}>
                <View style={style.dialog}>
                    <Text style={style.itemName}>Item Name</Text>
                    <Image style={style.image} source={{uri: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}}  />
                    <Text style={style.price}>Rs 500</Text>

                    <Text style={style.detail}>
                        <Text style={{fontWeight: "bold"}}>Expires in: </Text>
                        3 Hours
                    </Text>

                    <View style={style.stockDetailsContainer}>
                        <Text style={[style.detail, style.stockDetail]}>
                            <Text style={{fontWeight: "bold"}}>Stock Listed: </Text>
                            15
                        </Text>
                        <Text style={[style.detail, style.stockDetail]}>
                            <Text style={{fontWeight: "bold"}}>Stock Left: </Text>
                            11
                        </Text>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => alert('yo')}>
                        <Text style={style.unlistBtn}>Unlist Item</Text>
                    </TouchableOpacity>
                </View>
            </View>
      </Modal>
    );
}

const style = StyleSheet.create({
  mainContainer: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.2)",
      ...StyleSheet.absoluteFill,
  },
  dialog: {
      width: "90%",
      minHeight: 200,
      padding: 10,
      backgroundColor: "#FFF",
      borderColor: "#efef",
      borderWidth: 0.5,
      borderRadius: 3
  },
  itemName: {
      color: "#000",
      fontSize: 18
  },
  image: {
      width: "100%",
      height: 120,
      borderRadius: 3,
      marginTop: 10,
  },
  price: {
      fontSize: 24,
      fontWeight: "bold",
      color: AppConfig.primaryColor,
      marginTop: 10,
  },
  detail: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
  },
  unlistBtn: {
      width: "100%",
      paddingVertical: 10,
      textAlign: 'center',
      textAlignVertical: 'center',
      borderRadius: 3,
      backgroundColor: "#B80000",
      color: "#fff",
      fontSize: 14,
      marginTop: 20
  },
  stockDetailsContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
  },
  stockDetail: {
      flex: 1
  }
})

export default ListingInfoDialog;
