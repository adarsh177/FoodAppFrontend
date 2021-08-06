/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {StripeProvider} from '@stripe/stripe-react-native';

AppRegistry.registerComponent(appName, () => AppHandle);

const AppHandle = () => {
  return (
    <StripeProvider publishableKey="pk_test_51JI1jID3gWELEILB7VFkSxoBFDtYji6aNZl6BMEWEYk8vqf1VgytoZiBvqDOTm7aOCfCWCfdfDsFpGvDDlESu8SU00yjPyzvH5">
      <App />
    </StripeProvider>
  );
};
