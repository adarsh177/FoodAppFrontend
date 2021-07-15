import React, {useState} from 'react';
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
import {OTP} from 'react-native-otp-form';
import AppConfig from '../../AppConfig.json';
import OTPDialog from '../dialogs/OTPDialog';

function Login(props) {
  const [number, onChangeNumber] = React.useState(null);
  const [Focus, setFocus] = useState(false); //CHANGING THE BORDER COLOUR WHEN FOCUSED
  const [otpDialogVisible, setOTPDialogVisibility] = useState(false);
  const [otp, onfinishOtp] = useState(null); //otp has the value of otp entered by the user
  //submit otp function--------------------------------------
  const submitOtp = () => {
    console.log(`${otp}`);
    props.navigation.navigate('onboarding');
  };

  // resend otp function------------------------------------
  const reSendOTP = () => {
    Alert.alert('Innitiate resend OTP');
  };

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

        <TextInput
          style={style.textFieldOtp}
          value={number}
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
          style={Focus ? style.textFieldFocused : style.textFieldOtp}
        />

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setOTPDialogVisibility(true)}
          color={AppConfig.primaryColor}
          accessibilityLabel="Get OTP button"
          style={style.getOtpButton}>
          <Text style={style.otpButtonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>

      <OTPDialog phone={number} show={otpDialogVisible} close={() => setOTPDialogVisibility(false)}/>
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
    width: '100%'
  },
  brandingImg: {
    width: "100%",
    height: 40,
    resizeMode: "contain",
    marginTop: 20
  },
  illustration: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  illustrationContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50
  },
  screenDescriptionContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: "100%"
  },
  boldDescriptionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#656565"
  },
  textFieldOtp: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    borderRadius: 3,
    width: "100%",
  },
  textFieldFocused: {
    borderColor: AppConfig.primaryColor,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 3,
    width: "100%",
    marginTop: 20
  },
  getOtpButton: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: AppConfig.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 10
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Login;
