
import React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import styles from '../Styles';
import Logger from '../lib/Logger';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {email: '',
                  password: ''};
  }

  loginPressed() {
    Logger.log("Submit pressed");
  }

  render() {
    return (
      <View>
        <View>
          <Text>Olly Olly App</Text>
          <Text>Set Your Portfolio Free</Text>
        </View>
        <View>
          <TextInput placeholder='Email'
            style={styles.textInput}
            onChange={(input) => this.setState({email: input})}
            value={this.state.email}
          />
          <TextInput placeholder='Password'
            style={styles.textInput}
            onChange={(input) => this.setState({password: input})}
            value={this.state.password}
            secureTextEntry={true}
          />
          <Button title="Login"
            onPress={this.loginPressed}
          />
        </View>
        <View>
          <Button title="Sign Up"
            onPress={() => { this.props.navigation.navigate('Registration') }}
          />
        </View>
      </View>
    )
  }


}
