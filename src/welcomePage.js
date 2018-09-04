/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import CheckUpdate from './component/CheckUpdate';

export default class MainPage extends Component {

  //弹出升级modal
  setNewVersion = (e) => {
    this.childFN.setModalVisible(false)
  }
  //绑定检测version的Modal方法
  newVersionState = (ref) => {
    this.childFN = ref
  }
  //检查版本请求
  fetchVersion = () => {

  }

  //render完之后获取用户信息
  componentDidMount() {
    storage.load({
      key: 'loginState',
    }).then(ret => {
      // found data go to then() // console.log(ret.token);
      this.fetchUserBefore();
      setTimeout(() => {
        if (ret.token !== null) {
          this.props.navigation.replace('main');
        }
      }, 2000)
    }).catch(err => {
      // any exception including data not found goes to catch() // console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          this.props.navigation.replace('login');
          break;
        case 'ExpiredError':
          // TODO
          this.props.navigation.replace('login');
          break;
      }
    });
  }
  fetchUserBefore() {
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
      this.fetchUserInfo(url, opts);
    }).catch(err => {
      // 如果没有找到数据且没有sync方法，
      // 或者有其他异常，则在catch中返回
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    })
  }
  fetchUserInfo(url, opts) {
    fetch(url, opts)
      .then((response) => response.json())
      .then(
        (responseJson) => {
          if (!responseJson.data) {
            console.log('获取用户数据失败');
            this.props.navigation.replace('login');
          } else {
            storage.save({
              key: 'userBasicInfo',  // 注意:请不要在key中使用_下划线符号!
              data: {
                UID: responseJson.data.id,
                level: responseJson.data.userLevel,
                phone: responseJson.data.telephone,
                refereeId: responseJson.data.refereeId,
                address: responseJson.data.address,
                payInfo: responseJson.data.userPayInfo
              },
            });
          }
        }
      )
      .catch((error) => console.error(error))
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('./images/backgroundImg.jpg')}
          style={{ width: '100%', height: '100%' }}>
          <View style={styles.content}>
            <Button
              containerStyle={{ padding: 10, height: 45, width: '90%', margin: '5%', overflow: 'hidden', borderRadius: 4, backgroundColor: '#441272' }}
              disabledContainerStyle={{ backgroundColor: '#441272' }}
              style={{ fontSize: 20, color: '#FFFFFF' }}
              onPress={() => this.props.navigation.replace('main')}
            >欢迎进入DCCB
            </Button>
            <CheckUpdate newVersionState={this.newVersionState} />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  }
});

