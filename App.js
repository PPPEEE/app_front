/**
 * 
 */
import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { createStackNavigator } from 'react-navigation';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import welcomePage from './src/welcomePage'; //登陆主页
import main from './src/main' //第一个Tab
import Login from './src/component/loginScreen/login';

export default App = createStackNavigator({
  welcome: {
    screen: welcomePage,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      header: null,
    })
  },
  // regiter: {screen: ImageDemo,},
  main: {
    screen: main,
  },
},
  {
    initialRouteName: 'login', // 默认显示界面
    // navigationOptions: {
    //     header: {
    // backTitle: 'Back',
    // style:styles.header,
    // right: <Button title="Info" />,
    // left:<Button title="left" />,
    // titleStyle:styles.title,
    // visible:true,
    // title: 'ProfileScreen',
    // tintColor:'yellow',
    // gesturesEnabled:true,
    // },
    // },
    // headerMode:'screen',
  }
);
