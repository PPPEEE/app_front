/**
 * PV明细
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SectionList,
  Text,
  Image,
} from 'react-native';
import Sicon from 'react-native-vector-icons/SimpleLineIcons';
import { createMaterialTopTabNavigator } from 'react-navigation';
import allTrade from './historyOrder/allTrade';
import buyList from './historyOrder/buyList';
import soldList from './historyOrder/soldList';
import completeList from './historyOrder/completeList';
import shensu from './historyOrder/shensu';


export default PVdetails = createMaterialTopTabNavigator({  
  allTrade: {
    screen: allTrade,
    navigationOptions: {
      tabBarLabel: '全部',
      tabBarIcon: ({ tintColor }) => <Sicon name="list" size={22} color={tintColor} />,
    },
  },
  buy: {
    screen: buyList,
    navigationOptions: {
      tabBarLabel: '我买的',
      tabBarIcon: ({ tintColor }) => <Sicon name="plus" size={22} color={tintColor} />,
    },
  },
  trade: {
    screen: soldList,
    navigationOptions: {
      tabBarLabel: '我卖的',
      tabBarIcon: ({ tintColor }) => <Sicon name="minus" size={22} color={tintColor} />,
    },
  },
  comlete: {
    screen: completeList,
    navigationOptions: {
      tabBarLabel: '已完成',
      tabBarIcon: ({ tintColor }) => <Sicon name="paper-clip" size={22} color={tintColor} />,
    },
  },
  shensu: {
    screen: shensu,
    navigationOptions: {
      tabBarLabel: '申诉',
      tabBarIcon: ({ tintColor }) => <Sicon name="info" size={22} color={tintColor} />,
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

