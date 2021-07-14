import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AppConfig from '../../AppConfig.json';

function Earning() {
  //----------------------Details of earnings----------------------------

  const totalBalanceInWallet = 10000;
  const todayEarning = 1000;
  const weekEarning = 5000;

  //----------------------Handle withdraw button----------------------------

  const handleWithdraw = () => {
    return null;
  };

  return (
    <View style={style.earningContainer}>
      <View style={style.totalBalanceInWalletContainer}>
        <View style={style.moneyContainer}>
          <Text style={style.currencySymbol}>₹</Text>
          <Text style={style.currency}>{totalBalanceInWallet}</Text>
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Total balance in wallet</Text>
        </View>
      </View>

      <View style={style.weekAndTodayContainer}>
        <View style={style.weekAndTodayInnerContainer}>
          <View style={style.weekAndTodayInnerContainerForMoney}>
            <Text style={style.currencySymbolSmall}>₹</Text>
            <Text style={style.currencySmall}>{todayEarning}</Text>
          </View>
          <View style={style.smallTitleContianer}>
            <Text style={style.smallTitle}>Today</Text>
          </View>
        </View>

        <View style={style.weekAndTodayInnerContainer}>
          <View style={style.weekAndTodayInnerContainerForMoney}>
            <Text style={style.currencySymbolSmall}>₹</Text>
            <Text style={style.currencySmall}>{weekEarning}</Text>
          </View>
          <View style={style.smallTitleContianer}>
            <Text style={style.smallTitle}>Week</Text>
          </View>
        </View>
      </View>

      {/*----------------------Withdraw button---------------------------- */}

      <View style={style.withdrawButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={style.withdrawButton}
          onPress={handleWithdraw}>
          <Text style={style.withdrawButtonText}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  earningContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalBalanceInWalletContainer: {
    width: '90%',
    height: 150,
    marginVertical: 50,
    backgroundColor: AppConfig.primaryColor,
    borderRadius: 6,
    borderBottomWidth: 0,
    shadowColor: AppConfig.primaryColor,
    shadowOffset: {width: 0, height: 14},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 30,
    justifyContent: 'center',
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
    borderRadius: 6,
    marginHorizontal: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: AppConfig.primaryColor,
  },
  withdrawButton: {
    width: '90%',
    height: 40,
    backgroundColor: AppConfig.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 10,
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  weekAndTodayContainer: {
    width: '90%',
    height: 120,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekAndTodayInnerContainer: {
    width: '47%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: AppConfig.primaryColor,
    shadowOffset: {width: 0, height: 14},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekAndTodayInnerContainerForMoney: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  currencySymbolSmall: {
    fontSize: 16,
    color: AppConfig.primaryColor,
  },
  currencySmall: {
    color: AppConfig.primaryColor,
    fontSize: 24,
  },
  smallTitleContianer: {
    width: '90%',
    marginBottom: -17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#A4A4A4',
    height: 25,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  smallTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  withdrawButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Earning;
