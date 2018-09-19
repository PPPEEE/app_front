/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import Resolutions from '../../../utils/resolutions';
import Loading from '../../../utils/loading';

var count = 0;
var payment = [require('../../../images/WeChat.png'), require('../../../images/Alipay.png'), require('../../../images/BankCard.png')];
var defaultHead = require('../../../images/nohead.jpg');
export default class entrust extends Component {
  constructor() {
    super();
    this.renderItem = this.renderItem.bind(this);
    this.getMoreList = this.getMoreList.bind(this);
    this.revoke = this.revoke.bind(this);
    this.state = {
      dataList: []
    };
  }
  componentDidMount() {
    storage.load({
      key: 'loginState'
    }).then((cache) => {
      token = cache.token;
      fetch(`${global.Config.FetchURL}/dks/dkByType`, {
        method: 'post',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "token": global.token
        },
        body: JSON.stringify({
          type: "0",
          pageNo: 1,
          pageSize: 10,
          status: "2"
        })
      }).then((res) => {
        return res.json();
      }).then(((jsonData) => {
        this.setState({
          dataList: jsonData.data.result,
          pageTotal: jsonData.data.pageTotal,
          pageNo: 1
        });
      }));
    });
  }

  async revoke(id, index) {
    this.setState({
      showLoading: true
    })

    let res = await fetch(`${global.Config.FetchURL}/dks/dkClean`, {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": global.token
      },
      body: JSON.stringify({
        id: id
      })
    });
    res = await res.json();
    let dataList = this.state.dataList.concat();
    dataList.splice(index, 1);
    this.setState({
      dataList: dataList,
      showLoading: false
    })
    if (res.code === 200) {
      ToastAndroid.show("撤销成功", ToastAndroid.SHORT);
    }
  }

  async getMoreList() {
    if (this.state.pageTotal <= this.state.pageNo) {
      return;
    }
    let res = await fetch(`${global.Config.FetchURL}/dks/dkByType`, {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": global.token
      },
      body: JSON.stringify({
        type: "0",
        pageNo: this.state.pageNo + 1,
        pageSize: 10,
        status: "2"
      })
    })
    res = await res.json();
    let dataList = this.state.dataList;
    dataList = dataList.concat(res.data.result);
    this.setState({
      dataList: dataList,
      pageNo: this.state.pageNo + 1
    });
  }

  renderItem = (item, index) => {
    var userPayInfo = item.item.user.userInfo;
    return (
      <ScrollView
                  style={ styles.listItem }
                  showsHorizontalScrollIndicator={ false }
                  ref={ (scrollView) => {
                          if (scrollView !== null) {
                            scrollView.scrollTo({
                              x: this.props.scrollOffset
                            });
                          }
                        } }
                  horizontal={ true }>
        <View style={ { flexDirection: 'row', width: 1387, justifyContent: 'center' } }>
          <View style={ { width: 1080, justifyContent: 'space-between', flexDirection: 'row', padding: 50 } }>
            <View style={ { flexDirection: 'row' } }>
              <Image
                     source={ global.userDetail && global.userDetail.avatar ? {
                                uri: global.userDetail.avatar
                              } : defaultHead }
                     resizeMode="cover"
                     style={ { height: 150, width: 150, borderRadius: 75, marginTop: 20, marginRight: 40 } }></Image>
              <View>
                <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                  <Text style={ [styles.primaryFont, { marginRight: 20 }] }>
                    { item.item.user.userName }
                  </Text>
                  { payment.map((url, index) => {
                      for (var o in userPayInfo) {
                        if (userPayInfo[o].payType === (index + 1)) {
                    
                          return (<Image
                                         key={ index }
                                         source={ url }
                                         style={ { width: 36, height: 36, marginLeft: 10 } } />);
                        }
                      }
                      return;
                    }) }
                </View>
                <View style={ { marginTop: 20, marginLeft: 4 } }>
                  <Text style={ styles.lightFont }>
                    限额
                    { ' ' + (item.item.minNumber ? item.item.minNumber : 0) }
                  </Text>
                </View>
                <View style={ { marginTop: 20, marginLeft: 4 } }>
                  <Text style={ styles.lightFont }>
                    编号:
                    { ' ' + item.item.orderNumber }
                  </Text>
                </View>
              </View>
            </View>
            <View style={ { alignItems: 'flex-end' } }>
              <Text style={ [styles.lightFont, { marginRight: 20 }] }>
                { "交易总量: " }
                <Text style={ styles.primaryFont }>
                  { ' '+Math.round(item.item.money * 1.25) + ' PE' }
                </Text>
              </Text>
              <Text style={ [styles.lightFont, { marginTop: 20, marginRight: 20 }] }>
                { `总金额: ` }
                <Text style={ [styles.primaryFont, { fontSize: 36 }] }>
                  { ' ' + item.item.money + ' CNY' }
                </Text>
              </Text>
              <Text style={ [styles.lightFont, { marginTop: 20, marginRight: 20 }] }>
                <Text style={ {} }>
                  { `${item.item.type === 1 ? '已付' : '已收'}: ` }
                </Text>
                <Text style={ [styles.primaryFont, { fontSize: 36, color: item.item.type === 1 ? 'red' : 'green' }] }>
                  { ' ' + Math.round(item.item.money - item.item.dealNumber * 0.8) + ' CNY' }
                </Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={ () => {
                                        this.revoke(item.item.id, index)
                                      } }>
            <Text style={ { fontSize: 60, lineHeight: 307, textAlign: 'center', color: 'white', backgroundColor: 'red', width: 307, height: 307 } }>
              撤销
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
  render() {
    return (
      <Resolutions.FixFullView>
        <SafeAreaView style={ styles.container }>
          <Loading
                   animating={ this.state.showLoading }
                   style={ { marginTop: -280 } }
                   size={ 180 } />
          <View style={ { height: 1450 } }>
            <FlatList
                      data={ this.state.dataList }
                      initialNumToRender={ 5 }
                      getItemLayout={ (data, index) => ({
                                        length: 307,
                                        offset: 307 * index,
                                        index
                                      }) }
                      scrollOffset={ this.state.scrollOffset }
                      onEndReached={ this.getMoreList }
                      onEndReachedThreshold={ 0.3 }
                      keyExtractor={ (item, index) => {
                                       return new String(index)
                                     } }
                      renderItem={ this.renderItem } />
          </View>
        </SafeAreaView>
      </Resolutions.FixFullView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(246,237,254)'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  listItem: {
    height: 290,
    borderBottomWidth: 4,
    borderBottomColor: 'rgb(208,192,227)'
  },
  primaryFont: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'rgb(47,47,47)'
  },
  lightFont: {
    color: 'rgb(147, 143, 153)',
    fontSize: 36
  }
});

