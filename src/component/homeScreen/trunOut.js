/**
 * 转入
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TextInput,
  ToastAndroid,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Sicon from 'react-native-vector-icons/SimpleLineIcons';
import Button from 'react-native-button';
import { createMaterialTopTabNavigator, SafeAreaView } from 'react-navigation';

export default class trunIn extends Component {
  constructor() {
    super();
    this.state = {
      pe: '***',
      phone: '',
      address: '',
      seconds: 60,
      verificode: '',
      amount: ''
    };
  }
  componentWillMount() {
    storage.load({
      key: 'userBasicInfo'
    }).then(ret => {
      this.setState({
        phone: ret.phone,
      })
    })
    this.state.pe = this.props.navigation.getParam('pe', '******');
    // this._fetchImageData()
  }
  _doFetch = () => {
    fetch(`${global.Config.FetchURL}/transfer/transfer`, {
      method: 'get',
      headers: {
        "Accept": global.Config.Accept,
        "Content-Type": global.Config.ContentType,
        "token": global.token
      },
      body: JSON.stringify({
        'address': this.state.address,
        'amount': this.state.amount,
        'verificode': this.state.verificode
      })
    }).then((res) => {
      return res.json();
    }).then((jsonData) => {
      if(jsonData.code === 0){
        ToastAndroid.show("转账成功", ToastAndroid.SHORT);
      }
    });
  }
  _fetchTransfer = () => {
    if(this.state.address.length>0 && this.state.amount.length > 0 && this.state.verificode.length > 0){
      this._doFetch();
    }else{
      ToastAndroid.show("请填写完整", ToastAndroid.SHORT);
    }
  }
  _sendVerifiCode = () => {
    fetch('http://120.78.205.55:8081/user/sendCode', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        'areaCode': this.state.areaCode,
        'mobile': this.state.phone,
        'type': 6//注册1，修改登录密码2，支付密码3，绑定邮箱4，提现5，转出6，重置交易密码7
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

  render() {
    return (
      <ImageBackground source={require('../../images/user_bg.jpg')} style={{ flex: 1 }} >
        <View style={styles.container}>
          <View style={{height: 200, justifyContent: 'center'}}>
            <Text style={styles.txt}>您的PE数量</Text>
            <Text style={styles.txt1}>{this.state.pe}</Text>
          </View>
            <View style={styles.listOne}>
              <View style={styles.listLeft}>
                <Text style={styles.txt}>转账数量</Text>
                <TextInput
                  style={styles.txtInput}
                  onChangeText={(address) => this.setState({address})}
                  value={this.state.address}
                  placeholderTextColor="#969696"
                  underlineColorAndroid="transparent"
                  placeholder="请填写您要转账的数量"
                />
              </View>
            </View>
            <View style={styles.listOne}>
              <View style={styles.listLeft}>
                <Text style={styles.txt}>收款账户</Text>
                <TextInput
                  style={styles.txtInput}
                  onChangeText={(amount) => this.setState({amount})}
                  value={this.state.amount}
                  placeholderTextColor="#969696"
                  underlineColorAndroid="transparent"
                  placeholder="请填写钱包地址"
                />
              </View>
            </View>
            <View style={styles.listOne}>
              <View style={styles.listLeft}>
                <Text style={styles.txt}>验证码</Text>
                  <TextInput
                    placeholder="请填写验证码"
                    style={[styles.txtInput,{width: '40%'}]}
                    placeholderTextColor="#969696"
                    underlineColorAndroid="transparent"
                    maxLength={ 6 }
                    onBlur={ this.checkVerifiCode }
                    onChangeText={ (text) => this.setState({
                                    verificode: text
                                  }) } />
                  <TouchableOpacity
                    style={ { width: '25%', height: 30, marginTop: 0, marginLeft: 10, backgroundColor: '#3A9AF5', justifyContent: 'center', alignItems: 'center', borderRadius: 5 } }
                    onPress={ this._sendVerifiCode }
                    disabled={ this.state.isSendCode }>
                  <Text style={ { fontSize: 16, color: '#0C2956' } }>
                    { this.state.isSendCode ? ('重新发送(' + this.state.seconds + ')') : '获取验证码' }
                  </Text>
                </TouchableOpacity>
                </View>
            </View>
          <ImageBackground source={require('../../images/Button_bg.jpg')} style={styles.buttonstyle} >
            <Button
              containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4 }}
              disabledContainerStyle={{ backgroundColor: '#441272' }}
              onPress={() => this._fetchTransfer()}
              style={{ fontSize: 20, color: '#FFFFFF' }}>
              确定
            </Button>
          </ImageBackground>
        </View>
      </ImageBackground>
    );
  }
}



//样式
const styles = StyleSheet.create({
  txt1: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FF99FF',
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // padding: 10
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
    width: '20%'
  },
  txtInput: {
    padding: 0,
    height: 60,
    width: '65%',
    fontSize: 16,
    color: '#FFFFFF'
  },
  buttonstyle: {
    height: 45, width: '90%', margin: '5%'
  }
});
