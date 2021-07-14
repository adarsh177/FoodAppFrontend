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
import AppConfig from '../AppConfig.json';

function Login(props) {
  const [number, onChangeNumber] = React.useState(null);
  const [Focus, setFocus] = useState(false); //CHANGING THE BORDER COLOUR WHEN FOCUSED
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, onfinishOtp] = useState(null); //otp has the value of otp entered by the user
  //submit otp function--------------------------------------
  const submitOtp = () => {
    console.log(`${otp}`);
    props.navigation.navigate('onBoarding');
  };

  // resend otp function------------------------------------
  const reSendOTP = () => {
    Alert.alert('Innitiate resend OTP');
  };

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

        {/* Text field for mobile number ---------------------- */}

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

        {/* Get OTP button  -----------------------------------*/}

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setModalVisible(true)}
          color={AppConfig.primaryColor}
          accessibilityLabel="Get OTP button"
          style={style.getOtpButton}>
          <Text style={style.otpButtonText}>Get OTP</Text>
        </TouchableOpacity>

        {/*Modal for otp verification ----------------------------------- */}
        <View style={style.otpModalContainer}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={style.OtpModalInnerContainer}>
              <Text style={style.boldDescriptionTitle}>OTP</Text>
              <Text style={style.smallDescriptionTitle}>
                Verification code is sent to your mobile number
              </Text>
              <Text style={style.numberAndResendOtp}>{number}</Text>
              <OTP
                codeCount={6}
                containerStyle={{marginVertical: 20}}
                otpStyles={{
                  backgroundColor: '#FAFAFA',
                  fontSize: 20,
                }}
                onFinish={onfinishOtp}
              />
              <TouchableOpacity
                activeOpacity={0.6}
                style={style.getOtpButton}
                onPress={submitOtp}>
                <Text style={style.otpButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} onPress={reSendOTP}>
                <Text style={style.numberAndResendOtp}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
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
    color: AppConfig.primaryColor,
    marginVertical: 10,
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
    borderColor: AppConfig.primaryColor,
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 6,
    width: 300,
  },
  getOtpButton: {
    width: 170,
    height: 50,
    backgroundColor: AppConfig.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Modal Styles ------------------------------------
  otpModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  OtpModalInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberAndResendOtp: {
    color: AppConfig.primaryColor,
    fontSize: 14,
    marginTop: 20,
  },
});

export default Login;
