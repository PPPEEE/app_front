/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, StatusBar, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import Resolutions from '../../../utils/resolutions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';

let paymentsArr = [null, null, null]; //微信,支付宝,银行
let token = '';

export default class sellOrder extends Component {


  constructor(props) {
    super();
    this.state = {
      buyColor: 'red',
      saleColor: 'white',
      DKBalance: '0',
      payment: [false, false, false]
    }

    this.changeState = (stateName) => {
      let state;
      if (stateName === 'buy') {
        state = {
          buyColor: 'red',
          saleColor: 'white',
          current: 'buy',
          amount: '',
          payment: [false, false, false],
          paymentTime: '30分钟',
        };
      } else {
        state = {
          buyColor: 'white',
          saleColor: 'red',
          current: 'sale',
          amount: '',
          payment: [false, false, false],
          paymentTime: '30分钟'
        }
      }
      this.setState(state);
    }
    this.allIn = this.allIn.bind(this);
    setTimeout(() => {
      this.changeState(this.props.navigation.getParam('whichState', 'buy'));
    }, 0);
  }

  componentWillMount() {
    storage.load({
      key: 'loginState'
    }).then((cache) => {
      token = cache.token;
      fetch(`${global.Config.FetchURL}/dks/findTotal`, {
        method: 'post',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "token": token
        }
      }).then((res) => {
        return res.json();
      }).then(((jsonData) => {
        this.setState({
          DKBalance: jsonData.data
        });
      }));
      fetch(`${global.Config.FetchURL}/user/findUserPayInfo`, {
        method: 'post',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "token": token
        }
      }).then((res) => {
        return res.json();
      }).then((jsonData) => {
        jsonData.data.map((item) => {
          paymentsArr[item.payType - 1] = item;
          return item;
        })
      });
    })
  }


  allIn() {
    let amount = Math.ceil(Number(this.state.DKBalance) / 500) * 500;
    this.setState({
      amount: amount + ''
    });
  }

  render() {
    const amoutArr = ['500', '1000', '1500', '2000'];
    const paymentsTitle = ['微信支付', '支付宝', '银行卡'];

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
                400
              </Text>
              <Text style={ styles.lightFont }>
                { ' CNY' }
              </Text>
            </View>
          </View>
          <View style={ [styles.rowContainer, { borderBottomWidth: 0, justifyContent: 'space-between', opacity: this.state.current === 'buy' ? 0 : 1 }] }>
            <Text>
              <Text style={ { fontSize: 40, color: 'white' } }>
                您当前可售DK:
              </Text>
              <Text style={ { color: 'rgba(0,0,0,0)', fontSize: 20, width: 20 } }>
                _
              </Text>
              <Text style={ { fontSize: 40, color: 'white' } }>
                { this.state.DKBalance }
              </Text>
            </Text>
            <TouchableOpacity
                              style={ { borderWidth: 2, borderColor: 'rgb(63,32,92)', padding: 4, borderRadius: 8, backgroundColor: 'rgb(48,7,85)' } }
                              onPress={ this.allSale }>
              <Text style={ { color: 'white', fontSize: 32 } }>
                全量卖出
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
                              disabled={ this.state.payment.length < 1 || !this.state.amount || Number(this.state.amount) % 500 > 0 }
                              onPress={ this.publishDK }>
              <ImageBackground
                               style={ { borderRadius: 80, width: 1000, height: 150 } }
                               source={ require('../../../images/Button_bg.jpg') }
                               resizeMode="contain">
                <Text style={ { color: 'white', fontSize: 60, textAlign: 'center', lineHeight: 140 } }>
                  确定发布
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
    marginBottom: 40,
    backgroundColor: 'rgb(240,225,255)',
    borderRadius: 30,
    height: 450,
    width: 1000
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

