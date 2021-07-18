import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AppConfig from '../../../../AppConfig.json';

function EarningTab() {
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
          <Text style={style.currency}>{"₹"} {totalBalanceInWallet}</Text>
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Balance earned till date</Text>
        </View>
      </View>

      <View style={style.totalBalanceInWalletContainer}>
        <View style={style.moneyContainer}>
          <Text style={style.currency}>{"₹"} {totalBalanceInWallet}</Text>
        </View>
        <View style={style.titleContainer}>
          <Text style={style.titleText}>Outstanding Balance</Text>
        </View>
      </View>

      <TouchableOpacity
          activeOpacity={0.6}
          style={style.withdrawButton}
          onPress={handleWithdraw}>
          <Text style={style.withdrawButtonText}>Withdraw</Text>
      </TouchableOpacity>

      <View style={style.horizontalRule} />

      {/* <Text style={style.summary}>Summary</Text>

      <View style={{width: "100%", flexDirection: "row"}}>
        <View style={{flex: 1}}>
          <View style={style.cardContainer}>
            <Text style={style.cardAmount}>₹ 5000</Text>
            <Text style={style.cardTitle}>Today</Text>
          </View>
        </View>
        <View style={{width: 20}}></View>
        <View style={{flex: 1}}>
          <View style={style.cardContainer}>
            <Text style={style.cardAmount}>₹ 5000</Text>
            <Text style={style.cardTitle}>This week</Text>
          </View>
        </View>
      </View>

      <View style={style.cardContainer}>
        <Text style={style.cardAmount}>₹ 5000</Text>
        <Text style={style.cardTitle}>This month</Text>
      </View> */}
    </View>
  );
}

const style = StyleSheet.create({
  earningContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: "flex-start",
    alignItems: 'center',
    padding: 10
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
    elevation: 30,
    justifyContent: 'center',
    marginBottom: 20
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
    height: 40,
    backgroundColor: AppConfig.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  withdrawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  horizontalRule: {
    width: "100%",
    height: 1,
    backgroundColor: "#E3E3E3",
    marginBottom: 20
  },
  summary: {
    color: "#000",
    fontSize: 24,
    alignSelf: "flex-start",
    marginBottom: 20
  },
  cardContainer: {
    width: "100%",
    padding: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 3,
    elevation: 1,
    shadowColor: "#eeeeee",
    marginBottom: 20
  },
  cardAmount: {
    fontSize: 28,
    color: AppConfig.primaryColor,
    fontWeight: "bold",
    paddingVertical: 20,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  cardTitle: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: AppConfig.primaryColor,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: "100%",
    paddingVertical: 5,
    borderRadius: 3
  }
});


export default EarningTab;
