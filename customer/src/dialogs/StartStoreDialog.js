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
  const [date, setDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const close = () => {
    setDate(null);
    props.close();
  }

  const StartAccepting = () => {
      if(!date){
          alert("Please select closing time");
          return;
      }
      
      setLoading(true);
      UpdateStoreStatus(date.getTime()).then(() => {
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

          <Text style={style.label}>Select Date Time</Text>
          <TouchableOpacity onPress={0.8} onPress={() => setDatePickerVisibility(true)}>
            <Text style={style.datetime}>{date ? `${date.toLocaleTimeString()} ${date.toLocaleDateString()}` : `Select date`}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            minimumDate={new Date()}
            mode="datetime"
            onConfirm={(date) => {
                setDate(date);
                setDatePickerVisibility(false)
            }}
            onCancel={() => setDatePickerVisibility(false)}
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
      color: "black"
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
