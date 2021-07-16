import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  Modal,
} from 'react-native';
import AppConfig from '../../AppConfig.json';
import OTPDialog from '../dialogs/OTPDialog';
import {CountryPicker} from 'react-native-country-codes-picker/CountryPicker';
import {countryCodes} from "react-native-country-codes-picker/constants/countryCodes";
import * as RNLocalize from "react-native-localize";
import auth from '@react-native-firebase/auth';

function Login(props) {
  const [phoneNumber, onChangeNumber] = React.useState("");
  const [Focus, setFocus] = useState(false); //CHANGING THE BORDER COLOUR WHEN FOCUSED
  const [otpDialogVisible, setOTPDialogVisibility] = useState(false);
  const [otp, onfinishOtp] = useState(null); //otp has the value of otp entered by the user
  const [showCountryCodePicker, setCountryCodePickerVisibility] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [sendResult, setSendResult] = useState(null);

  //submit otp function--------------------------------------
  const submitOtp = () => {
    console.log(`${otp}`);
    props.navigation.navigate('onboarding');
  };

  // resend otp function------------------------------------
  const reSendOTP = () => {
    Alert.alert('Innitiate resend OTP');
  };

  const sendOTP = async ()  => {
    if(phoneNumber.length < 10){
      Alert.alert('Error', 'Invalid phone number entered');
      return;
    }
    try{
      setSendResult(await auth().signInWithPhoneNumber(`${countryCode}${phoneNumber}`, true));
      setOTPDialogVisibility(true);
    }catch(ex){
      console.log('Error sending otp', ex);
      Alert.alert('Error', 'Error sending OTP : ' + ex);
    }
  }

  const VerifyOTP = async (code) => {
    if(sendResult == null){
      Alert.alert('Error', 'Error verifying OTP');
      setOTPDialogVisibility(false);
      return;
    }
    
    try{
      let result = await sendResult.confirm(code);
      if(result !== null){
        setOTPDialogVisibility(false);
        props.navigation.replace('home');
      }
    }catch(ex){
      console.log('Error verifying otp', ex);
      Alert.alert('Error', 'Error verifying OTP : ' + ex);
    }
  }

  useEffect(() => {
    // loading app's countrty code
    let country = RNLocalize.getCountry();
    console.log('Country Code: ', country);

    countryCodes.forEach(val => {
      if(val.code == country){
        setCountryCode(val.dial_code);
      }
    });
  }, []);

  return (
    <View style={style.loginContainer}>
      <Image
        style={style.brandingImg}
        source={require('../assets/logo_name.png')}
      />

      <View style={style.illustrationContainer}>
        <Image
          style={style.illustration}
          source={require('../assets/login_illustration.png')}
        />
      </View>

      <View style={style.innerLoginContainer}>
        <View style={style.screenDescriptionContainer}>
          <Text style={style.boldDescriptionTitle}>Let’s get started</Text>
        </View>

        <View
          style={Focus ? style.PhoneFieldFocused : style.PhoneField}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setCountryCodePickerVisibility(true)}>
              <Text style={style.countryCode}>{countryCode}</Text>
            </TouchableOpacity>
            <TextInput
              style={style.textFieldOtp}
              value={phoneNumber}
              onChangeText={onChangeNumber}
              placeholder="Enter mobile number to get OTP"
              keyboardType="numeric"
              autoFocus={true}
              dataDetectorTypes={'phoneNumber'}
              maxLength={10}
              onFocus={() => {
                setFocus(true);
              }}
              onBlur={() => {
                setFocus(false);
              }}
            />
        </View>
        

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => sendOTP()}
          color={AppConfig.primaryColor}
          accessibilityLabel="Get OTP button"
          style={style.getOtpButton}>
            <Text style={style.otpButtonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>

      <OTPDialog
        phone={`${countryCode}${phoneNumber}`}
        show={otpDialogVisible}
        close={() => {
          setOTPDialogVisibility(false);
        }}
        submit={code => {
          VerifyOTP(code);
        }}
      />

      <CountryPicker
        show={showCountryCodePicker}
        pickerButtonOnPress={val => {
          console.log(val);
          setCountryCode(val.dial_code);
          setCountryCodePickerVisibility(false);
        }}
        setClose={() => setCountryCodePickerVisibility(false)}
        onBackdropClose={() => setCountryCodePickerVisibility(false)}
       />
    </View>
  );
}
// Style section ---------------------------------------------------------------
const style = StyleSheet.create({
  loginContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  innerLoginContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  brandingImg: {
    width: '100%',
    height: 40,
    resizeMode: 'contain',
    marginTop: 20,
  },
  illustration: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  illustrationContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  screenDescriptionContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
  boldDescriptionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#656565',
  },
  textFieldOtp: {
    flex: 1,
  },
  PhoneField: {
    width: '100%',
    borderRadius: 3,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  PhoneFieldFocused: {
    borderColor: AppConfig.primaryColor,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 3,
    width: '100%',
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  countryCode:{
    color: AppConfig.primaryColor,
    fontSize: 16,
    marginRight: 10
  },
  getOtpButton: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: AppConfig.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 10,
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Login;
