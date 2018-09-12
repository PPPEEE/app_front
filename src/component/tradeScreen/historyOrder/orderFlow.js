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

export default class orderFlow extends Component {

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

  payForOrder() {}

  _paymentRender = (pay, index) => {
    let paymentColor = this.state.payment[index] ? 'rgb(13,126,190)' : 'white';
    return (<View
                  style={ { marginTop: 40 } }
                  key={ index }>
              <View style={ { flexDirection: 'row', justifyContent: 'flex-start' } }>
                <MaterialCommunityIcons
                                        name="check-circle-outline"
                                        style={ { color: paymentColor, fontSize: 50 } } />
                <Image
                       source={ payment[index] }
                       style={ { width: 50, height: 50, marginLeft: 40 } } />
                { index === 2 ? (
                  null
                  ) : (
                  <MaterialCommunityIcons
                                          name="qrcode"
                                          style={ { color: 'white', fontSize: 50, marginLeft: 40 } } />
                  ) }
              </View>
              <View style={ { flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20 } }>
                <Text style={ { color: 'white', fontSize: 40 } }>
                  { '申佳' }
                </Text>
                <Text style={ { color: 'white', fontSize: 40, paddingLeft: 20 } }>
                  { index === 2 ? '6501366920415013669204' : '15013669204' }
                </Text>
                <Text style={ { color: 'white', fontSize: 40, paddingLeft: 20 } }>
                  { index === 2 ? '农业银行' : '' }
                </Text>
              </View>
            </View>);
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
          <View style={ { width: 1000, borderWidth: 2, borderColor: 'rgb(255,255,255)', alignItems: 'center', paddingTop: 40 } }>
            <View style={ { justifyContent: 'flex-start', width: 900, borderBottomWidth: 2, borderBottomColor: 'rgb(255,255,255)' } }>
              <View>
                <Text style={ { fontSize: 40, color: "rgb(147,147,147)" } }>
                  订单: #115366853040577
                </Text>
              </View>
              <View style={ { marginTop: 40, marginBottom: 20 } }>
                <Text style={ { fontSize: 60, color: 'rgb(233,233,233)' } }>
                  您向
                  { '申佳' }购买PE
                </Text>
              </View>
              <View style={ { marginBottom: 20 } }>
                <Text style={ { fontSize: 40, color: 'white' } }>
                  { `交易数量:      500 PE` }
                </Text>
              </View>
              <View style={ { marginBottom: 20 } }>
                <Text style={ { fontSize: 40, color: 'white' } }>
                  { `交易金额:      400 CNY` }
                </Text>
              </View>
              <Text style={ { fontSize: 40, color: "rgb(147,147,147)", marginTop: 40 } }>
                选择付款方式
              </Text>
            </View>
            <View style={ { justifyContent: 'flex-start', width: 900, borderBottomWidth: 2, borderBottomColor: 'rgb(255,255,255)', paddingBottom: 40 } }>
              { paymentsTitle.map(this._paymentRender) }
            </View>
            <View style={ { flexDirection: 'row', width: 900, justifyContent: 'flex-start', alignItems: 'center', margin: 40 } }>
              <Text style={ { fontSize: 40, color: 'white' } }>
                待支付,请于
                <Text style={ { color: 'red' } }>
                  14分35秒
                </Text>内向申佳支付400CNY
              </Text>
            </View>
          </View>
          <View style={ { marginTop: 80 } }>
            <TouchableOpacity
                              disabled={ (!this.state.payment[0] && !this.state.payment[1] && !this.state.payment[2]) || !this.state.amount || Number(this.state.amount) % 500 > 0 }
                              onPress={ this.publishDK }>
              <ImageBackground
                               style={ { borderRadius: 80, width: 1000, height: 150 } }
                               source={ require('../../../images/Button_bg.jpg') }
                               resizeMode="contain">
                <Text style={ { color: 'white', fontSize: 60, textAlign: 'center', lineHeight: 140 } }>
                  去支付
                </Text>
              </ImageBackground>
            </TouchableOpacity>
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

