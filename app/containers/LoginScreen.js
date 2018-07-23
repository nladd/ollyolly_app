
import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';

import styles from '../Styles';
import Logger from '../lib/Logger';
import ApiService from '../services/ApiService';
import AsyncStorageService from '../services/AsyncStorageService';

export default class LoginScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Login',
    };
  };

  constructor(props) {
    super(props);
    this.state = {email: '',
      password: '',
      showErrors: false
    };
  }

  loginPressed() {
    Logger.log("Submit pressed");
    let params = {email: this.state.email,
      password: this.state.password,
      confirm_success_url: null}

    ApiService.postRequest('auth/sign_in', params)
      .then((responseData) => {
        Logger.log('Login successful!');
        Logger.log(responseData);

        this.props.navigation.navigate('Dashboard');
      })
      .catch((error) => {
        this.setState({showErrors: true});
        Logger.logError(error);
      });

  }

  render() {
    return (
      <View>
        <View>
          <Text>Olly Olly App</Text>
          <Text>Set Your Portfolio Free</Text>
        </View>
        <View>
          { this.state.showErrors &&
            <Text>Login failed. Please try again.</Text>
          }
          <TextInput placeholder='Email'
            style={styles.textInput}
            onChangeText={(input) => this.setState({email: input})}
            value={this.state.email}
          />
          <TextInput placeholder='Password'
            style={styles.textInput}
            onChangeText={(input) => this.setState({password: input})}
            value={this.state.password}
            secureTextEntry={true}
          />
          <Button title="Login"
            onPress={() => this.loginPressed()}
          />
        </View>
        <View>
          <Button title="Sign Up"
            onPress={() => { this.props.navigation.navigate('Registration'); }}
          />
        </View>
      </View>
    )
  }


}
