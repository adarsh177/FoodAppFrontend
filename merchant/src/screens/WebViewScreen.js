import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  StyleSheet,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import AppConfig from '../../AppConfig.json';
import {GetStripeAccountLink} from '../APIs/ProfileManager';

function WebViewScreen(props) {
  const [webUri, setWebUri] = useState();
  const [showLoading, setShowLoading] = useState(true);
  const REFRESH_URL = 'https://www.goodforlowprice.com/config/stripe_refresh';
  const RETURN_URL = 'https://www.goodforlowprice.com/config/stripe_return';

  const reloadAccountLink = () => {
    setShowLoading(true);

    GetStripeAccountLink()
      .then(link => {
        console.log(link);
        setWebUri(link);
      })
      .catch(err => {
        Alert.alert('Error', 'Error opening stripe, please try again later', [
          {
            onPress: props.navigation.pop(),
            text: 'Ok',
            style: 'destructive',
          },
        ]);
      })
      .finally(() => setShowLoading(false));
  };

  useEffect(() => {
    reloadAccountLink();

    // setting back handler
    const backSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Alert.alert(
          'Are you sure?',
          'Going back midway might result in loss of progress',
          [
            {
              onPress: () => props.navigation.pop(),
              text: 'Go Back',
              style: 'default',
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ],
        );
        return true;
      },
    );

    return () => backSubscription.remove();
  }, []);

  return (
    <View style={Style.mainContainer}>
      <WebView
        containerStyle={Style.webView}
        source={{uri: webUri}}
        onLoadStart={ev => {
          if (ev.nativeEvent.url === REFRESH_URL) {
            ev.preventDefault();
            reloadAccountLink();
          } else if (ev.nativeEvent.url === RETURN_URL) {
            ev.preventDefault();
            props.navigation.pop();
          }
        }}
        onLoadProgress={ev => {
          setShowLoading(ev.nativeEvent.progress < 1);
        }}
      />
      {showLoading && (
        <ActivityIndicator
          style={Style.loader}
          size="large"
          color={AppConfig.stripeColor}
        />
      )}
    </View>
  );
}

const Style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  webView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  loader: {
    margin: 20,
    zIndex: 5,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});

export default WebViewScreen;
