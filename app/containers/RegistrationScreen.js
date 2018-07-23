
import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Logger from '../lib/Logger';
import ApiService from '../services/ApiService';

import styles from '../Styles';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '',
      password: '',
      password_confirmation: '',
      showErrors: false};
  }

  registerPressed() {
    let params = {email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      confirm_success_url: null,
      confirm_success_url: 'https://www.google.com'}

    Logger.log(this.state);

    ApiService.postRequest('auth', params)
      .then((responseData) => {
        Logger.log('Registration successful!');
        this.props.navigation.navigate('Dashboard');
      })
      .catch((error) => {
        Logger.logError(error);
        Logger.log('Registration failed');
        this.setState({showErrors: true});
      });
  }

  render() {
    return (
      <View>
        <View>
          <Text>Register Here</Text>
        </View>
        <View>
          { this.state.showErrors &&
            <Text>There were errors with your registration.</Text>
          }
          <TextInput placeholder='Email'
              style={styles.textInput}
              onChangeText={ (input) => { this.setState({email: input}); } }
              value={this.state.email}
            />
          <TextInput placeholder='Password'
              style={styles.textInput}
              onChangeText={ (input) => { this.setState({password: input}); } }
              value={this.state.password}
              secureTextEntry={true}
            />
          <TextInput placeholder='Re-enter password'
              style={styles.textInput}
              onChangeText={(input) => { this.setState({password_confirmation: input}); } }
              value={this.state.password_confirmation}
              secureTextEntry={true}
            />

          <Button title="Register"
            onPress={() => this.registerPressed()}
            />
        </View>
      </View>
    )
  }


}
