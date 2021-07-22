import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Modal,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppConfig from '../../AppConfig.json';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { UpdateStoreStatus } from '../APIs/StoreManager';

function StartStoreDialog(props) {
  const [storeCloseDate, setStoreCloseDate] = useState(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [isStoreCloseDatePickerVisible, setStoreCloseDatePickerVisibility] = useState(false);
  const [isPickupDatePickerVisible, setPickupDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const close = () => {
    setStoreCloseDate(null);
    setPickupDate(null)
    props.close();
  }

  const StartAccepting = () => {
      if(!storeCloseDate){
          alert("Please select store closing time");
          return;
      }
      if(!pickupDate){
        alert("Please select pickup closing time");
        return;
      }
      
      setLoading(true);
      UpdateStoreStatus(storeCloseDate.getTime(), pickupDate.getTime()).then(() => {
          close();
      }).catch(err => {
          console.log('Error startig store', err);
          alert('Error starting store, please try again later');
      }).finally(() => setLoading(false))
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        close();
      }}>
      <View style={style.mainContainer}>
        <View style={style.inventoryModalContainer}>
          <Text style={style.head}>Accept Order</Text>
          <Text style={style.subtext} >Select a time at which the store will automatically close.</Text>

          <Text style={style.label}>Store closing time</Text>
          <TouchableOpacity onPress={0.8} onPress={() => setStoreCloseDatePickerVisibility(true)}>
            <Text style={style.datetime}>{storeCloseDate ? `${storeCloseDate.toLocaleTimeString()} ${storeCloseDate.toLocaleDateString()}` : `Select date time`}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStoreCloseDatePickerVisible}
            minimumDate={new Date()}
            mode="datetime"
            onConfirm={(date) => {
                setStoreCloseDate(date);
                setStoreCloseDatePickerVisibility(false)
            }}
            onCancel={() => setStoreCloseDatePickerVisibility(false)}
            />

          <Text style={style.label}>Pickup closing time</Text>
          <TouchableOpacity onPress={0.8} onPress={() => setPickupDatePickerVisibility(true)}>
            <Text style={style.datetime}>{pickupDate ? `${pickupDate.toLocaleTimeString()} ${pickupDate.toLocaleDateString()}` : `Select date time`}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isPickupDatePickerVisible}
            minimumDate={new Date()}
            mode="datetime"
            onConfirm={(date) => {
                setPickupDate(date);
                setPickupDatePickerVisibility(false)
            }}
            onCancel={() => setPickupDatePickerVisibility(false)}
            />

          {loading ? <ActivityIndicator color={AppConfig.primaryColor} size="large" /> :
          <TouchableOpacity onPress={0.8} onPress={StartAccepting}>
              <Text style={style.startButton}>Start Accepting</Text>
          </TouchableOpacity>
          }
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    ...StyleSheet.absoluteFill,
  },
  //Modal styling ------------------------------
  inventoryModalContainer: {
    width: '90%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 0.5,
    borderEndWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 50,
    padding: 20,
  },
  head: {
      fontSize: 24
  },
  subtext: {
      fontSize: 14,
      color: "grey",
      marginTop: 5,
      marginBottom: 10
  },
  label: {
      fontSize: 14,
      color: "black",
      marginTop: 10
  },
  datetime: {
      padding: 10,
      marginTop: 5,
      fontSize: 16,
      borderWidth: 1,
      borderColor: AppConfig.primaryColor,
      borderRadius: 3,
      color: "gray"
  },
  startButton: {
      marginTop: 20,
      backgroundColor: AppConfig.primaryColor,
      borderRadius: 3,
      padding: 10,
      textAlign: 'center',
      textAlignVertical: 'center',
      color: "white",
      fontSize: 16,
      fontWeight: "bold"
  }
});

export default StartStoreDialog;
