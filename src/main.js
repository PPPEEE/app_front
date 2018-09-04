/**
 * APP主页
 */
import React, { Component } from 'react';
import { StyleSheet, View, SectionList, Text, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'; // 5.0.0
import IconF from 'react-native-vector-icons/Ionicons'; // 5.0.0
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';

import homeScreen from './component/homeScreen/homeScreen';
import payScreen from './component/tradeScreen/payScreen';
import scanCode from './component/scanCode';
import userScreen from './component/userScreen/userScreen';


const TabBarComponent = (props) => (<ImageBackground
  {...props}
  source={require('./images/bottom_Nav.png')}
  style={styles.tabBarComponent}>
  <BottomTabBar {...props} style={{ backgroundColor: 'transparent' }} />
</ImageBackground>);


export default Home = createBottomTabNavigator(
  {
    Home: {
      screen: homeScreen,
      navigationOptions: {
        tabBarLabel: '首页',
        headerMode: 'none',
        tabBarIcon: ({ tintColor }) => <Icon
          name="home"
          size={20}
          color={tintColor} />,
      },
    },
    trade: {
      screen: payScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '交易',
        tabBarIcon: ({ tintColor }) => <Icon
          name="credit-card"
          size={20}
          color={tintColor} />,
      }),
    },
    scanCode: {
      screen: scanCode,
      navigationOptions: {
        tabBarLabel: '支付',
        tabBarIcon: ({ tintColor }) => <IconF
          name="ios-qr-scanner"
          size={20}
          color={tintColor} />,
      },
    },
    userMain: {
      screen: userScreen,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({ tintColor }) => <IconF
          name="ios-body"
          size={20}
          color={tintColor} />,
      },
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#A78ABA',
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      pressColor: '#823453',
      pressOpacity: 0.8,
      labelStyle: {
        fontSize: 12,
        margin: 1
      },
      indicatorStyle: {
        height: 0
      }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    backBehavior: 'none',
    tabBarComponent: props => <TabBarComponent {...props} />
  });

const styles = StyleSheet.create({
  tabBarComponent: {
    borderTopWidth: .5,
    borderTopColor: '#A028EA',
    height: '8%'
    
  }
})