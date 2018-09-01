/**
 * 
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from 'react-navigation';
import allTrade from './allTrade';


export default tradeScreen = createMaterialTopTabNavigator({  
  allTrade: {
    screen: allTrade,
    navigationOptions: {
      tabBarLabel: '全部',
      tabBarIcon: ({ tintColor }) => <Ionicons name="home" size={24} color={tintColor} />,
    },
  },
  buy: {
    screen: allTrade,
    navigationOptions: {
      tabBarLabel: '我买的',
      tabBarIcon: ({ tintColor }) => <Ionicons name="home" size={24} color={tintColor} />,
    },
  },
  trade: {
    screen: allTrade,
    navigationOptions: {
      tabBarLabel: '我卖的',
      tabBarIcon: ({ tintColor }) => <Ionicons name="credit-card" size={26} color={tintColor} />,
    },
  },
  comlete: {
    screen: allTrade,
    navigationOptions: {
      tabBarLabel: '已完成',
      tabBarIcon: ({ tintColor }) => <Ionicons name="credit-card" size={26} color={tintColor} />,
    },
  },
  shensu: {
    screen: allTrade,
    navigationOptions: {
      tabBarLabel: '申诉',
      tabBarIcon: ({ tintColor }) => <Ionicons name="credit-card" size={26} color={tintColor} />,
    },
  },
},
{
  tabBarOptions: {
    activeTintColor: '#c13a16',
    showIcon: true,
    showLabel: true,
    upperCaseLabel: false,
    pressColor: '#823453',
    pressOpacity: 0.8,
    style: {
      backgroundColor: '#441272',
    },
    labelStyle: {
      fontSize: 12,
      margin: 1
    },
    indicatorStyle: { marginBottom:2,height:2, backgroundColor: '#c13a16' }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
  },
  swipeEnabled: true,
  animationEnabled: false,
  lazy: true,
  backBehavior: 'none',
});

