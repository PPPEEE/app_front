/**
 * APP主页
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Image,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'; // 5.0.0
import IconF from 'react-native-vector-icons/Ionicons'; // 5.0.0
import { createBottomTabNavigator } from 'react-navigation';
import homeScreen from './component/homeScreen/homeScreen';
import userScreen from './component/userScreen/userScreen';


export default Home = createBottomTabNavigator({
  Home: {
    screen: homeScreen,
    navigationOptions: {
      tabBarLabel: '首页',
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={24} color={tintColor} />,
    },
  },
  userMain: {
    screen: userScreen,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor }) => <IconF name="ios-body" size={26} color={tintColor} />,
    },
  },
});