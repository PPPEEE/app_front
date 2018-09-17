/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, StatusBar, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import Resolutions from '../../../utils/resolutions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';

var payment = [require('../../../images/WeChat.png'), require('../../../images/Alipay.png'), require('../../../images/BankCard.png')];
var defaultHead = require('../../../images/nohead.jpg');

export default class buyOrder extends Component {

  constructor(props) {
    super();
    this.state = {
      buyColor: 'red',
      saleColor: 'white',
      PEBalance: '0',
      payment: [false, false, false]
    }
    this.payForOrder = this.payForOrder.bind(this);
  }

  async componentDidMount() {
    let orderId = this.props.navigation.getParam('orderId');
    console.log(orderId);
    let res = await fetch(`${global.Config.FetchURL}/dks/findDkById`, {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": global.token
      },
      body: JSON.stringify({
        id: orderId
      })
    })
    res = await res.json();
    this.setState({
      order: res.data
    });
    res = await fetch(`${global.Config.FetchURL}/balance/get`, {
      method: 'get',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": global.token
      }
    });
    res = await res.json();
    for (var o in res.data) {
      if (res.data[o].coinType === 0) {
        this.setState({
          PEBalance: res.data[o].balance
        })
      }
    }
  }

  async payForOrder() {
    let res = await fetch(`${global.Config.FetchURL}/dks/dkPurchase`, {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": global.token
      },
      body: JSON.stringify({
        id: this.state.order.id,
        dealNumber: this.state.amount
      })
    });
    res = await res.json();
    if (res.code === 200) {
      this.props.navigation.push('orderFlow', {
        id: res.data,
        dealNumber: this.state.amount,
        isNewOrder: true
      });
    }else{
      Alert.alert('提示', '买入处理异常');
    }

  }

  render() {
    const paymentsTitle = ['微信支付', '支付宝', '银行卡'];
    let userPayInfo = this.state.order && this.state.order.user && this.state.order.user.userPayInfo;
    return (
      <Resolutions.FixFullView>
        <StatusBar
                   translucent={ true }
                   backgroundColor='rgba(0,0,0,0)' />
        <ImageBackground
                         source={ require('../../../images/index_bg.jpg') }
                         style={ { width: 1080, height: 1920, paddingTop: 200, alignItems: 'center' } }
                         resizeMode='contain'>
          <View style={ [styles.rowContainer, styles.whiteCard] }>
            <View style={ { justifyContent: 'space-between', flexDirection: 'row', width: 880, borderBottomWidth: 2, borderBottomColor: 'rgb(223,207,242)', height: 210 } }>
              <View>
                <Text style={ { color: 'rgb(55,54,60)', fontSize: 40, marginBottom: 40 } }>
                  { this.state.order && this.state.order.user && this.state.order.user.userName }
                </Text>
                <Text style={ { color: 'rgb(107,97,115)', fontSize: 34, marginBottom: 40 } }>
                  { this.state.order && (`最小购买限额 ${this.state.order.minNumber}`) }
                </Text>
              </View>
              <View style={ { alignItems: 'flex-end' } }>
                <Text style={ { color: 'rgb(55,54,60)', fontSize: 40, marginBottom: 40 } }>
                  { this.state.order && this.state.order.dealNumber }
                </Text>
                <View style={ { marginBottom: 40, height: 34, flexDirection: 'row' } }>
                  { payment.map((url, index) => {
                      for (var o in userPayInfo) {
                        if (userPayInfo[o].payType === (index + 1)) {
                          return (<Image
                                         key={ index }
                                         source={ url }
                                         resizeMode='cover'
                                         style={ { width: 34, height: 34, marginLeft: 20 } } />);
                        }
                      }
                      return;
                    }) }
                </View>
              </View>
            </View>
            <View style={ { width: 880, marginTop: 40 } }>
              <Text style={ { fontSize: 34, color: 'rgb(161,154,173)' } }>
                { this.state.order && (`编号: ${this.state.order.orderNumber}`) }
              </Text>
            </View>
          </View>
          <View style={ styles.rowContainer }>
            <Text style={ styles.label }>
              买入数量
            </Text>
            <View style={ styles.formArea }>
              <TextInput
                         ref="tradeAmount"
                         placeholder="请输入您要交易的数量"
                         value={ this.state.amount }
                         style={ { fontSize: 40, padding: 0, margin: 0, color: this.state.invalidAmount ? 'red' : 'white' } }
                         placeholderTextColor="rgb(219,219,219)"
                         underlineColorAndroid="transparent"
                         keyboardType="numeric"
                         onChangeText={ (text) => {
                                          text = text.replace(/[^0-9]/g, '');
                                          if (Number(text) > this.state.order.dealNumber) {
                                            text = this.state.order.dealNumber + '';
                                          }
                                          this.setState({
                                            amount: text
                                          })
                                        } } />
            </View>
          </View>
          <View style={ [styles.rowContainer] }>
            <Text style={ styles.label }>
              实付金额
            </Text>
            <View style={ [styles.formArea, { flexDirection: 'row' }] }>
              <Text style={ styles.primaryFont }>
                { this.state.amount ? `${Math.round(Number(this.state.amount)*0.8)}` : 0 }
              </Text>
              <Text style={ styles.lightFont }>
                { ' CNY' }
              </Text>
            </View>
          </View>
          <View style={ [styles.rowContainer, { borderBottomWidth: 0, justifyContent: 'space-between', opacity: this.state.current === 'buy' ? 0 : 1 }] }>
          </View>
          <View>
            <TouchableOpacity
                              disabled={ this.state.payment.length < 1 || !this.state.amount || Number(this.state.amount) % 500 > 0 }
                              onPress={ this.payForOrder }>
              <ImageBackground
                               style={ { borderRadius: 80, width: 1000, height: 150 } }
                               source={ require('../../../images/Button_bg.jpg') }
                               resizeMode="contain">
                <Text style={ { color: 'white', fontSize: 60, textAlign: 'center', lineHeight: 140 } }>
                  确定买入
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={ { flexDirection: 'row', height: 60, marginTop: 40, width: 1000, justifyContent: 'flex-start', alignItems: 'center' } }>
            <MaterialCommunityIcons
                                    name="check-circle-outline"
                                    style={ { color: 'rgb(4,152,214)', fontSize: 40 } } />
            <Text style={ { width: 20, fontSize: 20, color: 'rgba(0,0,0,0)' } }>
              _
            </Text>
            <Text style={ { color: "rgb(147,147,147)", fontSize: 40 } }>
              同意并阅读
            </Text>
            <Text style={ { width: 20, fontSize: 20, color: 'rgba(0,0,0,0)' } }>
              _
            </Text>
            <Text style={ { color: "rgb(4,166,233)", fontSize: 40 } }>
              《交易协议》
            </Text>
          </View>
        </ImageBackground>
      </Resolutions.FixFullView>
      );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  whiteCard: {
    borderBottomWidth: 0,
    padding: 0,
    marginBottom: 40,
    backgroundColor: 'rgb(240,225,255)',
    borderRadius: 30,
    height: 450,
    width: 1000,
    flexDirection: 'column',
    alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 80,
    borderBottomWidth: 4,
    borderBottomColor: 'rgb(74,11,115)',
    width: 1000
  },
  underline: {
    borderBottomWidth: 4,
    borderBottomColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 180
  },
  label: {
    color: 'rgb(152,152,152)',
    fontSize: 40,
    width: 170
  },
  formArea: {
    width: 800,
    paddingLeft: 20
  },
  amount: {
    borderWidth: 4,
    width: 160,
    height: 90,
    fontSize: 40,
    textAlign: 'center',
    lineHeight: 90,
    marginRight: 30,
    color: 'white'
  },
  lightFont: {
    fontSize: 40,
    color: 'rgb(108,84,128)'
  },
  primaryFont: {
    fontSize: 40,
    color: 'white'
  }
});

