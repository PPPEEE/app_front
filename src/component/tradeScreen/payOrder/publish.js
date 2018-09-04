/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import Resolutions from '../../../utils/resolutions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';

export default class publish extends Component {
  constructor(props) {
    super();
    this.state = {
      buyColor: 'red',
      saleColor: 'white',
      Balance: '55.75885'
    }

    this.changeState = (stateName) => {
      let state;
      if (stateName === 'buy') {
        state = {
          buyColor: 'red',
          saleColor: 'white',
          current: 'buy',
          amount: '',
          payment: 0,
          paymentTime: '30分钟'
        };
      } else {
        state = {
          buyColor: 'white',
          saleColor: 'red',
          current: 'sale',
          amount: '',
          payment: 0,
          paymentTime: '30分钟'
        }
      }
      this.setState(state);
    }

    setTimeout(() => {
      this.changeState(this.props.navigation.getParam('whichState', 'buy'));
    }, 0);
  }
  render() {
    const amoutArr = ['500', '1000', '1500', '2000'];
    const payments = ['微信支付', '支付宝', '银行卡'];
    const amoutsRender = (amount) => {
      let borderColor = amount === this.state.amount ? 'rgb(159,68,184)' : 'rgb(90,22,133)'
      return (<TouchableOpacity
                                onPress={ () => {
                                            this.setState({
                                              amount: amount
                                            })
                                          } }
                                key={ 'amount' + amount }>
                <Text style={ [styles.amount, { borderColor: borderColor }] }>
                  { amount }
                </Text>
              </TouchableOpacity>);
    };
    const paymentRender = (payment, index) => {
      let paymentColor = index === this.state.payment - 1 ? 'rgb(13,126,190)' : 'white';
      return (<TouchableOpacity
                                onPress={ () => {
                                            this.setState({
                                              payment: index + 1
                                            })
                                          } }
                                style={ { marginRight: 40 } }
                                key={ 'payment' + index }>
                <Text>
                  <MaterialCommunityIcons
                                          name="check-circle-outline"
                                          style={ { color: paymentColor, fontSize: 40 } } />
                  <Text style={ { width: 40, fontSize: 20, color: 'rgba(0,0,0,0)' } }>
                    _
                  </Text>
                  <Text style={ { color: 'white', fontSize: 40, paddingLeft: 40, width: 200 } }>
                    { payment }
                  </Text>
                </Text>
              </TouchableOpacity>);
    }
    return (
      <Resolutions.FixFullView>
        <StatusBar
                   translucent={ true }
                   backgroundColor='rgba(0,0,0,0)' />
        <ImageBackground
                         source={ require('../../../images/index_bg.jpg') }
                         style={ { width: 1080, height: 1920, paddingTop: 200, alignItems: 'center' } }
                         resizeMode='contain'>
          <View style={ [styles.rowContainer, { borderBottomWidth: 0 }] }>
            <View style={ styles.underline }></View>
            <TouchableOpacity
                              style={ [styles.underline, { borderBottomColor: this.state.buyColor, width: 280 }] }
                              activeOpacity={ 1 }
                              onPress={ () => {
                                          this.changeState('buy')
                                        } }>
              <Text style={ { color: this.state.buyColor, fontSize: 50 } }>
                买单
              </Text>
              <Text style={ { color: this.state.buyColor, fontSize: 30 } }>
                pay the bill
              </Text>
            </TouchableOpacity>
            <View style={ [styles.underline, { width: 180 }] }></View>
            <TouchableOpacity
                              style={ [styles.underline, { borderBottomColor: this.state.saleColor, width: 280 }] }
                              activeOpacity={ 1 }
                              onPress={ () => {
                                          this.changeState('sale')
                                        } }>
              <Text style={ { color: this.state.saleColor, fontSize: 50 } }>
                卖单
              </Text>
              <Text style={ { color: this.state.saleColor, fontSize: 30 } }>
                vouchers of sale
              </Text>
            </TouchableOpacity>
            <View style={ styles.underline }></View>
          </View>
          <View style={ styles.rowContainer }>
            <Text style={ styles.label }>
              交易数量
            </Text>
            <View style={ styles.formArea }>
              <TextInput
                         ref="tradeAmount"
                         placeholder="请输入您要交易的总数量"
                         value={ this.state.amount }
                         style={ { fontSize: 40, padding: 0, margin: 0, color: 'white' } }
                         placeholderTextColor="rgb(219,219,219)"
                         underlineColorAndroid="transparent"
                         onChangeText={ (text) => this.setState({
                                          amount: text
                                        }) } />
              <View style={ { flexDirection: 'row', marginTop: 40 } }>
                { amoutArr.map(amoutsRender) }
              </View>
              <Text style={ { color: 'rgb(152,152,152)', fontSize: 36, marginTop: 40 } }>
                交易数量只能为500的倍数
              </Text>
            </View>
          </View>
          <View style={ [styles.rowContainer] }>
            <Text style={ styles.label }>
              付款方式
            </Text>
            <View style={ [styles.formArea, { flexDirection: 'row' }] }>
              { payments.map(paymentRender) }
            </View>
          </View>
          <View style={ styles.rowContainer }>
            <Text style={ styles.label }>
              付款时间
            </Text>
            <View style={ [styles.formArea, { justifyContent: 'space-between', flexDirection: 'row' }] }>
              <ModalDropdown
                             ref="myDropdown"
                             options={ ['30分钟', '60分钟', '90分钟', '120分钟',] }
                             textStyle={ { fontSize: 40, color: 'white' } }
                             dropdownStyle={ { width: '60%' } }
                             defaultIndex={ 0 }
                             defaultValue={ '30分钟' }
                             onSelect={ (index, value) => {
                                          this.setState({
                                            paymentTime: value
                                          });
                                        } }
                             dropdownTextStyle={ { fontSize: 14 } } />
              <MaterialCommunityIcons
                                      name="chevron-down"
                                      style={ { color: 'white', fontSize: 60 } } />
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
                { this.state.Balance }
              </Text>
            </Text>
            <TouchableOpacity style={ { borderWidth: 2, borderColor: 'rgb(63,32,92)', padding: 4, borderRadius: 8, backgroundColor: 'rgb(48,7,85)' } }>
              <Text style={ { color: 'white', fontSize: 32 } }>
                全量买入
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
                              style={ {} }
                              onPress={ () => {
                                        } }>
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
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 60,
    paddingBottom: 60,
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
  }
});

