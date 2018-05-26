import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from './app/containers/LoginScreen';
import RegistrationScreen from './app/containers/RegistrationScreen';

const NavigationRouter = createStackNavigator(
  // routes
  {
    Login: {
      screen: LoginScreen
    },
    Registration: {
      screen: RegistrationScreen
    }
  },
  // options
  {
    initialRouteName: 'Login'
  }

);

export default class App extends React.Component {
  render() {
    return (
      <NavigationRouter />
    );
  }
}


