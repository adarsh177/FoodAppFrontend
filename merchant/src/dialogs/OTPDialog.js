import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {OTP} from 'react-native-otp-form';
import AppConfig from '../../AppConfig.json';

function OTPDialog(props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.show}
      onRequestClose={() => {
        props.close();
      }}>
      <View style={style.mainContainer}>
        <View style={style.OtpModalInnerContainer}>
          <Text style={style.boldDescriptionTitle}>OTP</Text>
          <Text style={style.smallDescriptionTitle}>
            Verification code is sent to your mobile number
          </Text>
          <Text style={style.numberAndResendOtp}>{props.phone}</Text>
          <OTP
            codeCount={6}
            containerStyle={{marginVertical: 20}}
            otpStyles={{
              backgroundColor: '#FAFAFA',
              fontSize: 20,
            }}
            onFinish={() => {}}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            style={style.getOtpButton}
            onPress={() => {
              props.navigation.push('onboarding');
            }}>
            <Text style={style.otpButtonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
            <Text style={style.numberAndResendOtp}>Resend OTP</Text>
          </TouchableOpacity>
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
  otpModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  OtpModalInnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    width: '100%',
    width: '90%',
    borderRadius: 3,
  },
  numberAndResendOtp: {
    color: AppConfig.primaryColor,
    fontSize: 14,
    marginTop: 20,
  },
  textFieldOtp: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    borderRadius: 3,
    width: '100%',
  },
  textFieldFocused: {
    borderColor: AppConfig.primaryColor,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 3,
    width: '100%',
    marginTop: 20,
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

export default OTPDialog;
