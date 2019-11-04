/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Actions } from 'react-native-router-flux';
import Router from './src/Router';

export default class App extends Component {


  async checkUser() {
    
    this.token = await AsyncStorage.getItem('token');
  
    if (this.token !== undefined && this.token !== null) {
      console.log('checkUser IN IF : ');
      this.setState({ check: true });
      Actions.login();
    } else {
      console.log('checkUser IN Else : ')
      this.setState({ check: false });
      Actions.Register();
    }

  }
  async componentDidMount() {

    await  this.checkUser();  
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Router />
      </View>
    );
  }
}

