import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';

function Login() {
  const [number, onChangeNumber] = React.useState(null);
  const [Focus, setFocus] = useState(false);
  return (
    <View style={style.loginContainer}>
      <View style={style.innerLoginContainer}>
        <View style={style.branding}>
          <Image
            style={style.brandingImg}
            source={require('../components/assets/logo.png')}
          />
          <Text style={style.brandingText}>GoodForLowPrice</Text>
        </View>
        <View style={style.screenDescriptionContainer}>
          <Text style={style.boldDescriptionTitle}>Let’s get started</Text>
          <Text style={style.smallDescriptionTitle}>
            Enter you mobile number to sign in
          </Text>
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
          onPress={() =>
            Alert.alert(
              'Validate the otp and redirect to business and normal user account',
            )
          }
          color="#00B875"
          accessibilityLabel="Learn more about this purple button"
          style={style.getOtpButton}>
          <Text style={style.otpButtonText}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  loginContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  innerLoginContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 280,
  },
  branding: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    justifyContent: 'space-around',
  },
  brandingImg: {
    width: 45,
    height: 45,
  },
  brandingText: {
    fontSize: 24,
    color: '#777',
  },
  screenDescriptionContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  boldDescriptionTitle: {
    fontSize: 24,
    color: '#00B875',
  },
  smallDescriptionTitle: {
    fontSize: 12,
    color: '#707070',
  },
  textFieldOtp: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    borderRadius: 6,
    width: 300,
  },
  textFieldFocused: {
    borderColor: '#00B875',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: 300,
  },
  getOtpButton: {
    width: 170,
    height: 50,
    backgroundColor: '#00B875',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Login;
