import React, {useEffect, useState} from 'react';
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
import {PostAccountInfo, SendFeedback} from '../APIs/ProfileManager';

function RazorpayAccountInfoDialog(props) {
  const [accountNumberText, setAccountNumberText] = useState('');
  const [accountNameText, setAccountNameText] = useState('');
  const [ifscText, setIfscText] = useState('');
  const [loading, setLoading] = useState(false);

  const close = () => {
    // resetting state variables
    setAccountNumberText('');
    setAccountNameText('');
    setIfscText('');
    setLoading(false);

    props.close();
  };

  const saveDetails = () => {
    if (accountNameText.length < 4 || accountNameText.length > 120) {
      alert('Please enter a valid Beneficiary Name of length 4-120');
      return;
    }

    if (accountNumberText.length < 5 || accountNameText.length > 35) {
      alert('Please enter a valid Account Number of length 5-35');
      return;
    }

    if (ifscText.length !== 11) {
      alert('Please enter a valid 11 digit IFSC Code.');
      return;
    }

    const data = {
      accountName: accountNameText,
      accountNumber: accountNumberText,
      ifscCode: ifscText,
    };

    setLoading(true);

    PostAccountInfo(data)
      .then(() => {
        close();
        Alert.alert('Success', 'Account Details saved successfully');
      })
      .catch(err => {
        Alert.alert('Error', 'Error saving account details');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!props.show) return;

    console.log('effect', props.profile?.paymentAccountInfo);
    setAccountNameText(props.profile?.paymentAccountInfo?.accountName ?? '');
    setAccountNumberText(
      props.profile?.paymentAccountInfo?.accountNumber ?? '',
    );
    setIfscText(props.profile?.paymentAccountInfo?.ifscCode ?? '');

    console.log('heeee');
  }, [props]);

  if (!props.show) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        close();
      }}>
      <View style={style.mainContainer}>
        <View style={style.dialog}>
          <Text style={style.title}>Account Information</Text>
          <Text style={style.subtitle}>
            Payouts are made to these account details
          </Text>

          <Text style={style.label}>Beneficiary Name</Text>
          <TextInput
            placeholder="Beneficiary Name"
            keyboardType="name-phone-pad"
            value={accountNameText}
            onChangeText={setAccountNameText}
            style={style.feedbackBox}
          />

          <Text style={style.label}>Account Number</Text>
          <TextInput
            placeholder="Account Number"
            keyboardType="numeric"
            value={accountNumberText}
            onChangeText={setAccountNumberText}
            style={style.feedbackBox}
          />

          <Text style={style.label}>IFSC Code</Text>
          <TextInput
            placeholder="IFSC Code"
            keyboardType="default"
            value={ifscText}
            onChangeText={setIfscText}
            style={style.feedbackBox}
          />

          {loading ? (
            <ActivityIndicator
              style={{marginVertical: 10}}
              size="large"
              color={AppConfig.primaryColor}
            />
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={saveDetails}>
              <Text style={style.sendBtn}>SAVE</Text>
            </TouchableOpacity>
          )}
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
  dialog: {
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppConfig.primaryColor,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#8c8c8c',
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
    textAlign: 'left',
    color: '#696969',
  },
  feedbackBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: AppConfig.primaryColor,
    borderRadius: 3,
    fontSize: 16,
  },
  sendBtn: {
    width: '100%',
    padding: 10,
    backgroundColor: AppConfig.primaryColor,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RazorpayAccountInfoDialog;
