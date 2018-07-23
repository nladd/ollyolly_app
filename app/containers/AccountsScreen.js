import React from 'react';
import { Text, TextInput, View, Button, FlatList } from 'react-native';

import styles from '../Styles';
import Logger from '../lib/Logger';
import Constants from '../lib/Constants';
import ApiService from '../services/ApiService';


export default class AccountsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Linked Accounts',
    };
  };

  constructor(props) {
    super(props);

    ApiService.getRequest('yodlee_user/accounts')
      .then((responseData) => {
        Logger.log('Retrieved accounts');
        this.setState({accounts: responseData,
          isLoading: false});
      })
      .catch((error) => {
        this.setState({showErrors: true, isLoading: false});
      });

    this.state = {isLoading: true, showErrors: false};

  }


  render() {

    if( !this.state.isLoading && !this.state.showErrors) {
      return(
        <View>
          <FlatList
            data={this.state.accounts['account']}
            renderItem={({item}) => <Text>{item.providerName} - {item.accountName}</Text> }
            keyExtractor={(item, index) => { item.accountNumber }}
          />
        </View>
      );
    } else if( this.state.showErrors) {
      return(
        <View>
          <Text>Failed to retrieve your accounts. Please check your internet connection and try again.</Text>
        </View>
      );
    } else {
      return(
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

  }

}
