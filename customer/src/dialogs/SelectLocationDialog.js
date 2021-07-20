import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Modal, Image, ActivityIndicator } from 'react-native';
import AppConfig from '../../AppConfig.json';
import MapPicker from "react-native-map-picker";
import ReverseGeocode from '../APIs/ReverseGeocoding';

function SelectLocationDialog(props){
    const [loading, setLoading] = useState(false);
    const [coords, setCoords] = useState({latitude: 0,longitude: 0,})
    const [address, setAddress] = useState('');

    const coordinatesSelected = (coords) => {
        setCoords(coords);
        setLoading(true);
        ReverseGeocode(coords.latitude, coords.longitude).then(rslt => {
            setAddress(rslt.label)
        }).finally(() => setLoading(false))
    }

    const onConfirm = () => {
        props.onSelected(coords);
    }

    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={props.show}
        onRequestClose={() => {
          props.close();
        }}>
            <MapPicker
                initialCoordinate={props.initialPosition}
                onLocationSelect={coordinatesSelected}
            />
            <View style={style.mainContainer}>
                {/* <View style={style.bottomBar}>

                    {loading ? <ActivityIndicator size="large" color={AppConfig.primaryColor} /> : 
                    <Text style={style.address}>{address}</Text>}
                    
                    <TouchableOpacity activeOpacity={0.8} onPress={onConfirm}>
                        <Text style={style.confirm}>CONFIRM</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
      </Modal>
    );
}

const style = StyleSheet.create({
  mainContainer: {
      alignItems: "center",
      justifyContent: "center",
      ...StyleSheet.absoluteFill,
  },
  mapContainer: {
      ...StyleSheet.absoluteFill,
      zIndex: 2
  },
  bottomBar:{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      padding: 20,
      margin: 10,
      backgroundColor: "#fff",
      borderRadius: 3,
      zIndex: 3,
      elevation: 2
  },
  address: {
      color: "#666666",
      fontSize: 16,
      width: "100%"
  },
  confirm: {
      marginTop: 20,
      width: "100%",
      paddingVertical: 5,
      paddingHorizontal: 10,
      textAlign: 'center',
      fontWeight:  'bold',
      fontSize: 18,
      color: "#fff",
      backgroundColor: AppConfig.primaryColor,
      borderRadius: 3
  }
})

export default SelectLocationDialog;
