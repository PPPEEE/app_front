import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator , createBottomTabNavigator} from 'react-navigation';


class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class Trade extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Trade!</Text>
      </View>
    );
  }
}

class Payment extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Payment!</Text>
      </View>
    );
  }
}

class Mall extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Mall!</Text>
      </View>
    );
  }
}

class Myself extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Myself!</Text>
      </View>
    );
  }
}


const RootStack = createBottomTabNavigator({
  '首页': Home,
  '交易': Trade,
  '支付': Payment,
  '商城': Mall,
  '我的': Myself
});


export default class Main extends Component {
  render() {
    return <RootStack/>;
  }
}