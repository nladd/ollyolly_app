
import React from 'react';
import { Button } from 'react-native';

import { createStackNavigator } from 'react-navigation';

import LoginScreen from '..//containers/LoginScreen';
import RegistrationScreen from '../containers/RegistrationScreen';
import DashboardScreen from '../containers/DashboardScreen';
import AccountsScreen from '../containers/AccountsScreen';
import WebViewScreen from '../containers/WebViewScreen';

export default Navigator = createStackNavigator(
  // routes
  {
    Login: {
      screen: LoginScreen
    },
    Registration: {
      screen: RegistrationScreen
    },
    Dashboard: {
      screen: DashboardScreen
    },
    Accounts: {
      screen: AccountsScreen
    },
    WebView: {
      screen: WebViewScreen
    },
  },
  // options
  {
    initialRouteName: 'Login',
    navigationOptions: ({navigation}) => {
      return {
        headerRight: (
          <Button
            onPress={() => {
              navigation.navigate('Dashboard');
            }}
            title="Menu"
            color="#23b"
          />
        ),
      };
    },
  }

);

