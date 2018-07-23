
import React from 'react';
import { WebView } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Logger from '../lib/Logger';
import ApiService from '../services/ApiService';

export default class WebViewScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: this.props.navigation.getParam('url', this.props.url),
    }
  }

  render() {
    Logger.log(this.state.url);
    return (
      <WebView
        source={{uri: this.state.url}}
        style={{width: '100%', height: '100%'}}
      />
    )
  }

}
