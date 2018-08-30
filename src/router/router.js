import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MainPage from '../components/main/main';
import login from '../components/login/login';
import registry from '../components/login/registry';


const RootStack = createStackNavigator({
  Main: MainPage,
  Login: login,
//Registry: registry
},{
	initialRouteName: 'Main'
});

export default class Router extends Component {
  render() {
    return <RootStack/>;
  }
}