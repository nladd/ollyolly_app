
import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

import styles from '../Styles';
import Logger from '../lib/Logger';
import Constants from '../lib/Constants';


export default class DashboardScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Dashboard',
    };
  };

  constructor(props) {
    super(props);
  }

  linkAccounts() {
    this.props.navigation.navigate('WebView', {url: Constants.fastlink_url()});
  }

  render() {

    return (
      <View>
        <Text>Your Performance</Text>
        <Text onPress={() => { this.props.navigation.navigate('Accounts'); }}>Linked Accounts</Text>
        <Button
          title='Link Accounts'
          onPress={() => { this.linkAccounts(); }}
        >
          Link Accounts
        </Button>
      </View>
    );

  }

}
