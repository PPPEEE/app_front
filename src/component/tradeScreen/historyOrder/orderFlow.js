/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, StatusBar, TouchableOpacity, TextInput, Alert, Image, Modal } from 'react-native';
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
      payment: [false, false, false],
      payInfo: []
    }
    this.payForOrder = this.payForOrder.bind(this);
  }

  async componentDidMount() {
    let order = this.props.navigation.getParam('order');
    console.log(order);
    let isBuyOrder = this.props.navigation.getParam('isBuyOrder');
    let dealNumber = this.props.navigation.getParam('dealNumber');
    this.setState({
      order: order,
      payInfo: order.user.userPayInfo,
      isBuyOrder: isBuyOrder,
      dealNumber: dealNumber,
      times: `${order.times-1}分${59}秒`
    });

    let totalSeconds = order.times * 60;
    let timer = setInterval(() => {
      totalSeconds--;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      this.setState({
        times: `${minutes}分${seconds}秒`
      });
    }, 1000);
  }

  payForOrder() {}

  _paymentRender = (pay, index) => {
    let paymentColor = this.state.payment[index] ? 'rgb(13,126,190)' : 'white';
    let paymentArr = ['微信', '支付宝', '银行卡'];
    let hasPaymentArr = this.state.payInfo.map((info) => info.payType);
    if (!hasPaymentArr.includes(index + 1)) {
      return null;
    }
    return (<View
                  style={ { marginTop: 40 } }
                  key={ index }>
              <View style={ { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' } }>
                { this.state.isBuyOrder ? <MaterialCommunityIcons
                                                                  name="check-circle-outline"
                                                                  style={ { color: paymentColor, fontSize: 50, marginRight: 20 } } /> : null }
                <Image
                       source={ payment[index] }
                       style={ { width: 50, height: 50, marginTop: 5 } }
                       resizeMode="cover" />
                <Text style={ { fontSize: 40, marginLeft: 20, color: 'rgb(255,255,255)' } }>
                  { paymentArr[index] }
                </Text>
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
    let user = this.state.order && this.state.order.user || {};
    let order = this.state.order || {};
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
                  订单:
                  { order.orderNumber }
                </Text>
              </View>
              <View style={ { marginTop: 40, marginBottom: 20 } }>
                <Text style={ { fontSize: 60, color: 'rgb(233,233,233)' } }>
                  您向
                  { user.userName }
                  { this.state.isBuyOrder ? '购买' : '出售' }PE
                </Text>
              </View>
              <View style={ { marginBottom: 20 } }>
                <Text style={ { fontSize: 40, color: 'white' } }>
                  { `交易数量:      ${this.state.dealNumber} PE` }
                </Text>
              </View>
              <View style={ { marginBottom: 20 } }>
                <Text style={ { fontSize: 40, color: 'white' } }>
                  { `交易金额:      ${this.state.dealNumber && Math.round(Number(this.state.dealNumber)*0.8)} CNY` }
                </Text>
              </View>
              <Text style={ { fontSize: 40, color: "rgb(147,147,147)", marginTop: 40 } }>
                卖方收款方式
              </Text>
            </View>
            <View style={ { justifyContent: 'flex-start', width: 900, borderBottomWidth: 2, borderBottomColor: 'rgb(255,255,255)', paddingBottom: 40 } }>
              { paymentsTitle.map(this._paymentRender) }
            </View>
            <View style={ { flexDirection: 'row', width: 900, justifyContent: 'flex-start', alignItems: 'center', margin: 40 } }>
              { this.state.isBuyOrder
                ? (<Text style={ { fontSize: 40, color: 'white' } }>
                     待支付,请于
                     <Text style={ { color: 'red' } }>
                       { this.state.times }
                     </Text>内向申佳支付
                     { this.state.dealNumber && Math.round(Number(this.state.dealNumber) * 0.8) }CNY
                   </Text>)
                : <Text style={ { fontSize: 40, color: 'white' } }>
                    等待对方支付,
                    { user.userName }将于
                    <Text style={ { color: 'red' } }>
                      { this.state.times }
                    </Text>内向您支付
                    <Text style={ { color: 'rgb(46,132,255)' } }>
                      { this.state.dealNumber && Math.round(Number(this.state.dealNumber) * 0.8) }CNY
                    </Text>
                  </Text> }
            </View>
          </View>
          <View style={ { flexDirection: 'row', height: 60, marginTop: 40, width: 1000, justifyContent: 'flex-start', alignItems: 'center' } }>
            <TouchableOpacity
                              onPress={ () => {
                                          this.setState({
                                            modalVisible: true
                                          })
                                        } }
                              style={ { marginLeft: 50 } }>
              <Text style={ { color: "rgb(255,255,255)", fontSize: 40 } }>
                常见问题
              </Text>
            </TouchableOpacity>
          </View>
          <View style={ { marginTop: 40 } }>
            { !this.state.isBuyOrder
              ? (<View style={ { borderRadius: 20, width: 1000, height: 150, borderWidth: 2, borderColor: 'rgb(255,255,255)', alignItems: 'center' } }>
                   <Text style={ { color: 'rgb(255,255,255)', fontSize: 60, textAlign: 'center', height: 150, lineHeight: 150 } }>
                     等待对方支付
                   </Text>
                 </View>)
              : (<TouchableOpacity onPress={ this.payForOrder }>
                   <ImageBackground
                                    style={ { borderRadius: 80, width: 1000, height: 150 } }
                                    source={ require('../../../images/Button_bg.jpg') }
                                    resizeMode="contain">
                     <Text style={ { color: 'white', fontSize: 60, textAlign: 'center', lineHeight: 140 } }>
                       去支付
                     </Text>
                   </ImageBackground>
                 </TouchableOpacity>) }
          </View>
          <Modal
                 animationType="slide"
                 transparent={ false }
                 presentationStyle="formSheet"
                 visible={ this.state.modalVisible }>
            <View style={ { marginTop: 22 } }>
              <View>
                <Text>
                  常见收款风险
                </Text>
                <Text>
                  请反复确认是否收到对方款项，不要相信任何催促放币的理由，确认收到款项后再放行数字资产，避免造成损失！
                </Text>
                <Text>
                  买方下单后一直未付款，如何处理
                </Text>
                <Text>
                  请反复确认是否收到对方款项，不要相信任何催促放币的理由，确认收到款项后再放行数字资产，避免造成损失！
                </Text>
                <TouchableOpacity onPress={ () => {
                                              this.setState({
                                                modalVisible: false
                                              })
                                            } }>
                  <Text>
                    Hide Modal
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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

