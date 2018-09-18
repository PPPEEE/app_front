/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, StatusBar, TouchableOpacity, TextInput, Alert, Image, Modal, Clipboard } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import Resolutions from '../../../utils/resolutions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalDropdown from 'react-native-modal-dropdown';

var payment = [require('../../../images/WeChat.png'), require('../../../images/Alipay.png'), require('../../../images/BankCard.png')];
var defaultHead = require('../../../images/nohead.jpg');
var orderRefreshTimer;

export default class orderFlow extends Component {

  constructor(props) {
    super();
    this.state = {
      order: {},
      buyColor: 'red',
      saleColor: 'white',
      PEBalance: '0',
      payment: [false, false, false],
      modalVisible: false,
      qrCodeVisible: false,
      payInfo: []
    }
    this.nextFlow = this.nextFlow.bind(this);
    this.refreshFlow = this.refreshFlow.bind(this);
  }

  getBtnTitle(type, status) {
    var title = '';
    if (status === 3) {
      title = type === 1 ? '确认付款' : '等待付款';
      return title;
    }

    if (status === 6) {
      title = type === 1 ? '等待确认收款' : '确认收款';
    }

    if (status === 1) {
      title = '已完成';
    }
    return title;
  }

  componentWillUnmount() {
    clearInterval(orderRefreshTimer);
  }

  async componentDidMount() {
    let orderId = this.props.navigation.getParam('id');
    let isNewOrder = this.props.navigation.getParam('isNewOrder');
    let order = await this.getOrderInfo(orderId);
    let totalSeconds = 0;

    if (!isNewOrder) {
      let res = await fetch(`${global.Config.FetchURL}/dks/getExpiryTime`, {
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
      totalSeconds = res.data;
    } else {
      totalSeconds = order.times * 60;
    }
    
    this.setState({
      order: order,
      payInfo: order.type === 1 ? order.payUser.userPayInfo : order.user.userInfo,
      isBuyOrder: order.type === 1,
      dealNumber: order.dealNumber,
      buttonTitle: this.getBtnTitle(order.type, order.status),
      times: `${Math.floor(totalSeconds/60)}分${Math.floor(totalSeconds%60)}秒`
    });

    let timer = setInterval(() => {
      if (totalSeconds === 1) {
        clearInterval(timer);
      }
      totalSeconds--;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      this.setState({
        times: `${minutes}分${seconds}秒`
      });
    }, 1000);

    orderRefreshTimer = setInterval(() => {
      this.refreshFlow(this.state.order.id)
    }, 15000);
  }

  async getOrderInfo(orderId) {
    let res = await fetch(`${global.Config.FetchURL}/dks/findDkById`, {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": global.token
      },
      body: JSON.stringify({
        id: orderId,
      })
    });
    res = await res.json();
    return res.data;
  }

  async nextFlow() {
    if (this.state.order.status === 3 && this.state.order.type === 1) {
      let res = await fetch(`${global.Config.FetchURL}/dks/paymentCommitOder`, {
        method: 'post',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "token": global.token
        },
        body: JSON.stringify({
          id: this.state.order.id,
        })
      });
      res = await res.json();
      if (res.code === 200) {
        Alert.alert('提示', '确认付款成功,请等待对方确认收款');
        this.refreshFlow(this.state.order.id);
      }
    }

    if (this.state.order.status === 6 && this.state.order.type === 2) {
      let res = await fetch(`${global.Config.FetchURL}/dks/commit`, {
        method: 'post',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "token": global.token
        },
        body: JSON.stringify({
          id: this.state.order.id,
        })
      });
      res = await res.json();
      if (res.code === 200) {
        Alert.alert('提示', '确认收款成功,所售资产将放行给对方');
        this.refreshFlow(this.state.order.id);
      }
    }
  }

  async refreshFlow(id) {
    let order = await this.getOrderInfo(id);
    this.setState({
      order: order,
      buttonTitle: this.getBtnTitle(order.type, order.status),
    });
  }

  _paymentRender = (pay, index) => {
    let paymentColor = this.state.payment[index] ? 'rgb(13,126,190)' : 'white';
    let paymentArr = ['微信', '支付宝', '银行卡'];
    let payInfo;
    let hasPaymentArr = this.state.payInfo.map((info) => {
      if (info.payType === index + 1) {
        payInfo = info;
      }
      return info.payType;
    });
    if (!hasPaymentArr.includes(index + 1)) {
      return null;
    }
    return (<View
                  style={ { marginTop: 40 } }
                  key={ index }>
              <View style={ { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' } }>
                <Image
                       source={ payment[index] }
                       style={ { width: 50, height: 50, marginTop: 5 } }
                       resizeMode="cover" />
                <Text style={ { fontSize: 40, marginLeft: 20, color: 'rgb(255,255,255)' } }>
                  { paymentArr[index] }
                </Text>
                <TouchableOpacity onPress={ () => {
                                              if (index === 2) {
                                                Clipboard.setString(payInfo.qrCode + '');
                                                Alert.alert('提示', '已复制银行卡号到粘贴板');
                                                this.setState({
                                                  openQrCode: true
                                                });
                                                return;
                                              }
                                              this.setState({
                                                accountId: payInfo.accountId,
                                                qrCodeVisible: true,
                                                openQrCode: true
                                              })
                                            } }>
                  { index === 2 ? (
                    <MaterialCommunityIcons
                                            name="content-paste"
                                            style={ { color: 'white', fontSize: 50, marginLeft: 40 } } />
                    ) : (
                    <MaterialCommunityIcons
                                            name="qrcode"
                                            style={ { color: 'white', fontSize: 50, marginLeft: 40 } } />
                    ) }
                </TouchableOpacity>
              </View>
              <View style={ { flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20 } }>
                <Text style={ { color: 'white', fontSize: 40 } }>
                  { this.state.order && this.state.order.payUser && this.state.order.payUser.userName }
                </Text>
                <Text style={ { color: 'white', fontSize: 40, paddingLeft: 20 } }>
                  { payInfo.qrCode }
                </Text>
                <Text style={ { color: 'white', fontSize: 40, paddingLeft: 20 } }>
                  { index === 2 ? payInfo.Bank : '' }
                </Text>
              </View>
            </View>);
  }
  render() {
    const paymentsTitle = ['微信支付', '支付宝', '银行卡'];
    let user = this.state.order && this.state.order.payUser || {};
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
              { this.state.order.status !== 3 && this.state.order.status !== 6 ? null : (this.state.isBuyOrder
                  ? (<Text style={ { fontSize: 40, color: 'white' } }>
                       待支付,请于
                       <Text style={ { color: 'red' } }>
                         { this.state.times }
                       </Text>内向
                       { user.userName }支付
                       <Text style={ { color: 'rgb(46,132,255)' } }>
                         { this.state.dealNumber && Math.round(Number(this.state.dealNumber) * 0.8) }CNY
                       </Text>
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
                    </Text>) }
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
            <TouchableOpacity onPress={ this.nextFlow }>
              <ImageBackground
                               style={ { borderRadius: 80, width: 1000, height: 150 } }
                               source={ require('../../../images/Button_bg.jpg') }
                               resizeMode="contain">
                <Text style={ { color: 'white', fontSize: 60, textAlign: 'center', lineHeight: 140 } }>
                  { this.state.buttonTitle }
                </Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <Modal
                 animationType="slide"
                 transparent={ true }
                 visible={ this.state.modalVisible }>
            <TouchableOpacity
                              style={ { width: "100%", height: "100%" } }
                              onPress={ () => {
                                          this.setState({
                                            modalVisible: false
                                          })
                                        } }>
              <View style={ { backgroundColor: "rgba(0,0,0,0.5)", width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center' } }>
                <View style={ { height: '60%', width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20 } }>
                  <Text style={ { fontWeight: 'bold', marginBottom: 15, marginTop: 15 } }>
                    常见收款风险
                  </Text>
                  <Text>
                    请反复确认是否收到对方款项，不要相信任何催促放币的理由，确认收到款项后再放行数字资产，避免造成损失！
                  </Text>
                  <Text style={ { fontWeight: 'bold', marginBottom: 15, marginTop: 15 } }>
                    买方下单后一直未付款，如何处理
                  </Text>
                  <Text>
                    目前暂时不支持取消订单，请等待后续更新。未收到款项前请勿点击放行数字资产。
                  </Text>
                  <Text style={ { fontWeight: 'bold', marginBottom: 15, marginTop: 15 } }>
                    未及时确认收款放行数字资产会造成什么影响
                  </Text>
                  <Text>
                    收到款项后，若您未及时放行，这会影响您在平台的信誉；同时，未处理之前您的资产也会一直冻结在平台钱包。
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
          <Modal
                 animationType="slide"
                 transparent={ true }
                 visible={ this.state.qrCodeVisible }>
            <TouchableOpacity
                              style={ { backgroundColor: "rgba(0,0,0,0.5)", width: "100%", height: "100%", alignItems: 'center', justifyContent: 'center' } }
                              onPress={ () => {
                                          this.setState({
                                            qrCodeVisible: false
                                          })
                                        } }>
              <Image
                     source={ { uri: global.Config.FetchURL + '/upload/' + this.state.accountId } }
                     style={ { width: '80%', height: '60%' } }
                     resizeMode="contain" />
            </TouchableOpacity>
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

