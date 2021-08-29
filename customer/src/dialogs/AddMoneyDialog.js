import Dinero from 'dinero.js';
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
import {
  AddWalletBalance,
  GetProfile,
  GetWalletBalance,
} from '../APIs/ProfileManager';
import GetCurrencySymbol, {
  GetCurrencySymbolFromId,
} from '../CurrencyManager/CurrencyManager';
import RazorpayCheckout from 'react-native-razorpay';
import {
  CardField,
  useStripe,
  confirmPayment,
} from '@stripe/stripe-react-native';

function AddMoneyDialog(props) {
  const [money, setMoney] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const close = () => {
    setMoney('');
    setLoading(false);

    props.close();
  };

  const addMoney = () => {
    if (money.length === 0) return;

    setLoading(true);
    const balanceToAdd = Dinero({
      amount: Math.round(100 * parseFloat(money)),
      currency: walletBalance.currency,
    });
    AddWalletBalance(balanceToAdd.toJSON())
      .then(orderInfo => {
        if (orderInfo) {
          if (orderInfo.gateway === 'STRIPE') {
            console.log('Starting Stripe');
            CheckOutStripe(orderInfo.stripeInfo);
          } else {
            console.log('Starting Razorpay');
            CheckOutRazorpay(orderInfo.razorpayInfo);
          }
          console.log('Starting Stripe');
        } else {
          alert('Error adding money to your wallet');
        }
      })
      .catch(err => alert('Error adding money to your wallet: ' + err))
      .finally(() => setLoading(false));
  };

  const CheckOutStripe = async orderInfo => {
    try {
      const {error} = await initPaymentSheet({
        customerId: orderInfo.customer,
        customerEphemeralKeySecret: orderInfo.ephemeralKey,
        paymentIntentClientSecret: orderInfo.paymentIntent,
      });

      if (!error) {
        const Result = await presentPaymentSheet({});

        if (Result.error) {
          Alert.alert(`Error code: ${presentError.code}`, presentError.message);
        } else {
          Alert.alert(
            'Payment Confirmed!',
            'Your payment has been confirm and will shortly reflect in your wallet',
          );
          close();
        }
      } else {
        console.log('sTRIPE ERROR', error);
        Alert.alert('Payment Error', 'Error making payment at the moment');
      }
    } catch (err) {
      console.log('sTRIPE ERROR', err);
      Alert.alert('Payment Error', 'Error making payment at the moment');
    }
  };

  const CheckOutRazorpay = orderInfo => {
    var options = {
      image:
        'https://www.goodforlowprice.com/wp-content/uploads/2021/07/logo-2-1-49x49.png',
      currency: 'INR',
      key: 'rzp_test_CrWreMS3wr9QFy',
      amount: orderInfo.amount_due,
      name: 'Good For Low Price',
      order_id: orderInfo.id,
      theme: {color: AppConfig.primaryColor},
      prefill: {
        contact: profile.phone,
        name: profile.name,
      },
    };

    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        Alert.alert(
          'Payment Confirmed!',
          'Your payment has been confirm and will shortly reflect in your wallet',
        );
        close();
      })
      .catch(error => {
        // handle failure
        alert(`Error Processing your payment at the moment, please try again.`);
      });
  };

  useEffect(() => {
    GetWalletBalance().then(bal => {
      console.log('Wallet', bal);
      setWalletBalance(bal ?? {amount: 0, currency: 'INR'});
    });

    GetProfile().then(val => setProfile(val));
  }, [props]);

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
          <Text style={style.title}>Add Money</Text>
          <Text style={style.subtitle}>
            Current balance:{' '}
            {walletBalance !== null && walletBalance !== undefined
              ? `${GetCurrencySymbolFromId(walletBalance.currency)} ${Dinero(
                  walletBalance,
                ).toUnit()}`
              : `0`}
          </Text>
          <TextInput
            placeholder={GetCurrencySymbolFromId(
              walletBalance !== null && walletBalance !== undefined
                ? walletBalance.currency
                : 'INR',
            )}
            keyboardType="numeric"
            style={style.feedbackBox}
            onChangeText={setMoney}
          />
          {loading ? (
            <ActivityIndicator size="large" color={AppConfig.primaryColor} />
          ) : (
            <TouchableOpacity activeOpacity={0.8} onPress={addMoney}>
              <Text style={style.sendBtn}>Add Money</Text>
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
    marginBottom: 20,
  },
  feedbackBox: {
    padding: 10,
    borderWidth: 1,
    borderColor: AppConfig.primaryColor,
    borderRadius: 3,
    marginBottom: 20,
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
  },
});

export default AddMoneyDialog;
