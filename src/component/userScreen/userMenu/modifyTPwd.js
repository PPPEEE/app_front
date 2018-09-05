/**
 * 修改支付密码
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Button from 'react-native-button';
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class modifyTPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payPwd: '',
      isSendCode: false,
      seconds: 60,
      areaCode: '86',
      mobile: '',
      type: '1'
    };
  }

  //发送验证码
  sendVerifiCode = () => {
    fetch('http://120.78.205.55:8081/user/sendCode', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'areaCode': this.state.areaCode,
        'mobile': this.state.mobile,
        'type': this.state.type
      })
    }).then((res) => {
      return res.json();
    }).catch(error => {

    });
    this.setState({
      isSendCode: true
    });
    let timer = setInterval(() => {
      if (this.state.seconds < 1) {
        clearInterval(timer);
        this.setState({
          seconds: 60,
          isSendCode: false
        })
      }
      this.setState({
        seconds: this.state.seconds - 1
      })
    }, 1000)
  }

  _saveTPwd = () => {
    storage.load({
      key: 'loginState',
    }).then(ret => {
      const url = global.Config.FetchURL + '/user/setPayPwd';
      const opt = {
        method: 'post',
        headers: {
          'Content-Type': global.Config.ContentType,
          'Accept': global.Config.Accept,
          'token': ret.token
        },
        body: JSON.stringify({payPwd: this.state.payPwd})
      }
      this._saveTPwdReq(url, opt);
    });
  }
  _saveTPwdReq(url, opt){
    fetch(url, opt)
    .then((response) => response.json())
    .then(responseData => {
      console.log(responseData);
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
              <Text style={styles.txt}>新支付密码</Text>
              <TextInput
                style={styles.txtInput}
                onChangeText={(payPwd) => this.setState({payPwd})}
                value={this.state.payPwd}
                placeholderTextColor="#969696"
                underlineColorAndroid="transparent"
                placeholder="请填写您的新支付密码"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>手机号码</Text>
              <Text style={styles.txt}>15013332222</Text>
            </View>
          </View>
          <View style={styles.listOne}>
            <View style={styles.listLeft}>
              <Text style={styles.txt}>短信验证码</Text>
              <Text style={ { fontSize: 16, width: 40, height: 30, color: 'white', paddingTop: 5, marginRight: 0 } }>
                { '+' + this.state.areaCode }
                <Icon
                      name="caret-down"
                      style={ { fontSize: 10, color: 'white' } } />
              </Text>
              <TextInput
                placeholder="请填写验证码"
                style={  { width: 100,fontSize: 16,color: '#FFFFFF' } }
                placeholderTextColor="#969696"
                underlineColorAndroid="transparent"
                maxLength = {6}
                onBlur={this.checkVerifiCode}
                onChangeText={ (text) => this.setState({
                                verificode: text
                              }) } />
              <TouchableOpacity
                style={ { width: 80, height: 30, marginTop: 5, marginLeft: 15, backgroundColor: '#3A9AF5', justifyContent: 'center', alignItems: 'center', borderRadius: 10 } }
                onPress={ this.sendVerifiCode }
                disabled={ this.state.isSendCode }>
                <Text style={ { fontSize: 12, color: '#0C2956' } }>
                  { this.state.isSendCode ? ('重新发送(' + this.state.seconds + ')') : '获取验证码' }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.listOne}>
            <ImageBackground source={require('../../../images/Button_bg.jpg')} style={styles.buttonstyle} >
              <Button
                containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4 }}
                disabledContainerStyle={{ backgroundColor: '#441272' }}
                onPress={this._saveTPwd}
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
    width: '30%'
  },
  txtInput: {
    padding: 0,
    height: 60,
    width: '70%',
    fontSize: 16,
    color: '#FFFFFF'
  },
  buttonstyle: {
    flex: 1, height: 45, width: '90%', margin: '5%'
  }
  
});