/**
 * 
 */
import React, { Component } from 'react';
import { YellowBox, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Storage from 'react-native-storage';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

import welcomePage from './src/welcomePage'; //登陆主页
import main from './src/main' //第一个Tab
import Login from './src/component/loginScreen/login';
import myTeam from './src/component/userScreen/userMenu/myTeam';
import modifyNiki from './src/component/userScreen/userMenu/modifyNiki';
import Register from './src/component/loginScreen/register';
import tradeScreen from './src/component/tradeScreen/tradeScreen';

export default App = createStackNavigator({
  welcome: {
    screen: welcomePage,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      header: null,
    })
  },
  register: { screen: Register },
  main: {
    screen: main,
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
  },
  myTeam: {
    screen: myTeam,
    navigationOptions: ({ navigation }) => ({
      title: '我的团队',
      headerTitleStyle: {
        color: '#FFFFFF',
      },
      headerStyle: {
        backgroundColor: '#551670',
      },
      headerTintColor: '#FFFFFF',
    }),
  },
  modifyNiki: {
    screen: modifyNiki,
    navigationOptions: ({ navigation }) => ({
      title: '修改昵称',
      headerTitleStyle: {
        color: '#FFFFFF',
      },
      headerStyle: {
        backgroundColor: '#551670',
      },
      headerTintColor: '#FFFFFF',
    }),
  },
  tradeScreen: {
    screen: tradeScreen,
    navigationOptions: ({ navigation }) => ({
      title: '我的交易',
      headerTitleStyle: {
        color: '#FFFFFF',
      },
      headerStyle: {
        backgroundColor: '#551670',
      },
      headerTintColor: '#FFFFFF',
    }),
  },
},
  {
    initialRouteName: 'welcome', // 默认显示界面
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

var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24 * 7,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // 你可以在构造函数这里就写好sync的方法
  // 或是在任何时候，直接对storage.sync进行赋值修改
  // 或是写到另一个文件里，这里require引入
  // sync: require('你可以另外写一个文件专门处理sync')  
});
storage.sync = {
  // sync方法的名字必须和所存数据的key完全相同
  // 方法接受的参数为一整个object，所有参数从object中解构取出
  // 这里可以使用promise。或是使用普通回调函数，但需要调用resolve或reject。
  userBasicInfo(params) {
    storage.load({
      key: 'loginState'
    }).then(ret => {
      const url = global.Config.FetchURL + '/user/findUserBy';
      const opts = {
        method: 'POST',
        headers: {
          'Accept': global.Config.Accept,
          'Content-Type': global.Config.ContentType,
          'token': ret.token
        },
      }
      let { id, resolve, reject } = params;
      fetch(url, opts).then(response => {
        return response.json();
      }).then(json => {
        console.log(json);
        if (json && json.data) {
          var newData = {
            UID: json.data.id,
            level: json.data.userLevel,
            phone: json.data.telephone,
            refereeId: json.data.refereeId,
            address: json.data.address,
            payInfo: json.data.userPayInfo
          }
          storage.save({
            key: 'userBasicInfo',
            data: newData,
          });
          // 成功则调用resolve
          resolve && resolve(newData);
        } else {
          // 失败则调用reject
          reject && reject(new Error('data parse error'));
        }
      }).catch(err => {
        console.warn(err);
        reject && reject(err);
      });
    });
  }

}

// 最好在全局范围内创建一个（且只有一个）storage实例，方便直接调用

// 对于web
// window.storage = storage;

// 对于react native
global.storage = storage;
global.Config = {
  'FetchURL': 'http://120.78.205.55:8081',
  'Accept': 'application/json',
  'ContentType': 'application/json;charset=UTF-8',
};
// 这样，在此**之后**的任意位置即可以直接调用storage
// 注意：全局变量一定是先声明，后使用
// 如果你在某处调用storage报错未定义
// 请检查global.storage = storage语句是否确实已经执行过了