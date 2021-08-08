import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AppConfig from '../../../../AppConfig.json';
import {GetProfile} from '../../../APIs/ProfileManager';
import {GetCurrencySymbolFromId} from '../../../CurrencyManager/CurrencyManager';
import Dinero from 'dinero.js';
import RazorpayAccountInfoDialog from '../../../dialogs/RazorpayAccountInfoDialog';

function EarningTab(props) {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [showRazorpayAccountInfoDialog, setShowRazorpayAccountInfoDialog] =
    useState(false);

  const handleStripClicked = () => {
    props.navigation.push('webviewScreen');
    return null;
  };

  const loadProfile = () => {
    GetProfile().then(val => setProfile(val));
  };

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      console.log('foccuessedddd');
      loadProfile();
    });

    loadProfile();
  }, []);

  return (
    <ScrollView
      style={style.earningContainer}
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadProfile} />
      }>
      <Text style={style.hint}>These are your total earnings till date</Text>
      <View style={style.totalBalanceInWalletContainer}>
        <View style={style.moneyContainer}>
          {profile.totalEarnings !== null &&
          profile.totalEarnings !== undefined ? (
            <Text style={style.currency}>
              {GetCurrencySymbolFromId(profile.totalEarnings.currency)}
              {Dinero(profile.totalEarnings).toUnit()}
            </Text>
          ) : (
            <Text style={style.currency}>0</Text>
          )}
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Earnings till date</Text>
        </View>
      </View>

      <Text style={style.hint}>
        This is your outstanding amount which is yet to be settled. Settelments
        are made everyday and could take upto 2-3 business-days to reflect in
        your account.
      </Text>
      <View style={style.totalBalanceInWalletContainer}>
        <View style={style.moneyContainer}>
          {profile.walletBalance !== null &&
          profile.walletBalance !== undefined ? (
            <Text style={style.currency}>
              {GetCurrencySymbolFromId(profile.walletBalance.currency)}
              {Dinero(profile.walletBalance).toUnit()}
            </Text>
          ) : (
            <Text style={style.currency}>0</Text>
          )}
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Outstanding Balance</Text>
        </View>
      </View>
      <View style={style.horizontalRule} />

      <Text style={style.summary}>Account Information</Text>

      {/* Connect Stripe / Dashboard option */}
      {profile.location?.country !== 'India' && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={style.withdrawButton}
          onPress={handleStripClicked}>
          <Text style={style.withdrawButtonText}>
            {profile.paymentAccountComplete ? 'Open' : 'Connect'}{' '}
            <Text style={{fontWeight: 'bold', fontSize: 20}}>stripe</Text>
          </Text>
        </TouchableOpacity>
      )}

      {/* Razorpay card */}
      {profile.location?.country === 'India' && (
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            style.withdrawButton,
            {backgroundColor: AppConfig.primaryColor},
          ]}
          onPress={() => setShowRazorpayAccountInfoDialog(true)}>
          <Text style={[style.withdrawButtonText, {fontWeight: 'bold'}]}>
            {profile.paymentAccountComplete ? "Edit" : "Add"} Account Info
          </Text>
        </TouchableOpacity>
      )}

      <RazorpayAccountInfoDialog
        show={showRazorpayAccountInfoDialog}
        profile={profile}
        close={() => {
          loadProfile();
          setShowRazorpayAccountInfoDialog(false);
        }}
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  earningContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10,
  },
  hint: {
    width: '100%',
    fontSize: 14,
    color: 'grey',
    marginVertical: 5,
  },
  totalBalanceInWalletContainer: {
    width: '100%',
    height: 150,
    backgroundColor: AppConfig.primaryColor,
    borderRadius: 3,
    borderBottomWidth: 0,
    shadowColor: AppConfig.primaryColor,
    shadowOffset: {width: 0, height: 14},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: 'center',
    marginBottom: 20,
  },
  moneyContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  currencySymbol: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '700',
  },
  currency: {
    fontSize: 45,
    color: '#fff',
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -15,
    marginTop: 20,
    backgroundColor: '#fff',
    height: 35,
    borderRadius: 3,
    marginHorizontal: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: AppConfig.primaryColor,
  },
  withdrawButton: {
    width: '100%',
    backgroundColor: AppConfig.stripeColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 10,
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  horizontalRule: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
    marginBottom: 10,
  },
  summary: {
    color: '#000',
    fontSize: 22,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  cardContainer: {
    width: '100%',
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 3,
    elevation: 1,
    shadowColor: '#eeeeee',
    marginBottom: 20,
  },
  cardAmount: {
    fontSize: 28,
    color: AppConfig.primaryColor,
    fontWeight: 'bold',
    paddingVertical: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    backgroundColor: AppConfig.primaryColor,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
    paddingVertical: 5,
    borderRadius: 3,
  },
});

export default EarningTab;
