/**
 * 修改登录密码
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';
import { SafeAreaView } from 'react-navigation';

export default class modifyPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwd: '',
      newPwd: '',
      newPwd2: ''
    };
  }

  _savePwd = () => {
    if(this.state.newPwd !== this.state.newPwd2){
      alert('请输入两次相同的新密码');
      return;
    }
    storage.load({
      key: 'loginState',
    }).then(ret => {
      const url = global.Config.FetchURL + '/user/setNewPwd';
      const opt = {
        method: 'post',
        headers: {
          'Content-Type': global.Config.ContentType,
          'Accept': global.Config.Accept,
          'token': ret.token
        },
        body: JSON.stringify(this.state)
      }
      this._savePwdReq(url, opt);
    });
  }
  _savePwdReq(url, opt){
    fetch(url, opt)
    .then((response) => response.json())
    .then(responseData => {
      if (responseData.code == 200) {
        this.props.navigation.popToTop()
      } else {
        alert(responseData.message);
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../../../images/user_bg.jpg')} style={{ flex: 1 }} >
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>旧密码</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(pwd) => this.setState({pwd})}
                value={this.state.pwd}
                underlineColorAndroid="transparent"
                placeholder="请填写您的旧密码"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>新密码</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(newPwd) => this.setState({newPwd})}
                value={this.state.newPwd}
                underlineColorAndroid="transparent"
                placeholder="请填写您的新密码"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>确认新密码</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(newPwd2) => this.setState({newPwd2})}
                value={this.state.newPwd2}
                underlineColorAndroid="transparent"
                placeholder="请确认您的新密码"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <ImageBackground source={require('../../../images/Button_bg.jpg')} style={styles.buttonstyle} >
              <Button
                containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4 }}
                disabledContainerStyle={{ backgroundColor: '#441272' }}
                onPress={this._savePwd}
                style={{ fontSize: 20, color: '#FFFFFF' }}>
                确定提交
              </Button>
            </ImageBackground>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  listOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    padding: 10
  },
  listLeft:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'white'
  },
  txt: {
    color: 'white',
    fontSize: 16,
    margin: 10,
    width: '35%'
  },
  txtInput: {
    padding: 0,
    height: 60,
    width: '65%',
    fontSize: 16,
    color: '#FFFFFF'
  },
  buttonstyle: {
    flex: 1, height: 45, width: '90%', margin: '5%'
  }
  
});