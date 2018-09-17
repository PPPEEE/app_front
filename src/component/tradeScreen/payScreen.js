/**
 * 
 */
import React, { Component } from 'react';
import { StyleSheet, View, SectionList, Text, Image, Platform, StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import wantBuy from './payOrder/buy';
import wantSell from './payOrder/sell';
import wantEntrust from './payOrder/entrust';
import wantPublish from './payOrder/publish';
import tradeScreen from './tradeScreen';

var navHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 64;

export default payScreen = createMaterialTopTabNavigator({
  wantBuy: {
    screen: wantBuy,
    navigationOptions: {
      tabBarLabel: '我要买',
      tabBarIcon: ({tintColor}) => <MIcons
                                           name="cart"
                                           size={ 22 }
                                           color={ tintColor } />,
    },
  },
  wantSell: {
    screen: wantSell,
    navigationOptions: {
      tabBarLabel: '我要卖',
      tabBarIcon: ({tintColor}) => <MIcons
                                           name="cart-outline"
                                           size={ 22 }
                                           color={ tintColor } />,
    },
  },
  wantPublish: {
    screen: wantPublish,
    navigationOptions: {
      tabBarLabel: '发布',
      tabBarIcon: ({tintColor}) => <MIcons
                                           name="table-edit"
                                           size={ 22 }
                                           color={ tintColor } />,
      tabBarOnPress: ({navigation}) => {
        navigation.push('publish')
      }
    },
  },
  wantEntrust: {
    screen: wantEntrust,
    navigationOptions: {
      tabBarLabel: '委托',
      tabBarIcon: ({tintColor}) => <MIcons
                                           name="alarm-plus"
                                           size={ 22 }
                                           color={ tintColor } />
    },
  },
  tradeScreen: {
    screen: tradeScreen,
    navigationOptions: {
      tabBarLabel: '订单',
      tabBarIcon: ({tintColor}) => <MIcons
                                           name="file-document-box-outline"
                                           size={ 22 }
                                           color={ tintColor } />,
      tabBarOnPress: ({navigation}) => {
        navigation.push('tradeScreen')
      },
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
        paddingTop: navHeight
      },
      labelStyle: {
        fontSize: 12,
        margin: 1
      },
      indicatorStyle: {
        marginBottom: 2,
        height: 2,
        backgroundColor: '#c13a16'
      }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    },
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    backBehavior: 'none',
  });

