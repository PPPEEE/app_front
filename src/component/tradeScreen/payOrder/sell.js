/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import Resolutions from '../../../utils/resolutions';

var count = 0;
var payment = [require('../../../images/WeChat.png'), require('../../../images/Alipay.png'), require('../../../images/BankCard.png')];
var defaultHead = require('../../../images/nohead.jpg');
export default class wangSell extends Component {
  constructor() {
    super();
    this.state = {
      dataList: []
    };
    this.renderItem = this.renderItem.bind(this);
    this.getMoreList = this.getMoreList.bind(this);
  }
  componentWillMount() {
    storage.load({
      key: 'loginState'
    }).then((cache) => {
      token = cache.token;
      fetch(`${global.Config.FetchURL}/dks/dkByType`, {
        method: 'post',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "token": token
        },
        body: JSON.stringify({
          type: 1,
          pageNo: 1,
          pageSize: 10,
          status: '2'
        })
      }).then((res) => {
        return res.json();
      }).then(((jsonData) => {
        console.log(jsonData.data);
        this.setState({
          dataList: jsonData.data.result,
          pageNo: 1
        });
      }));
    });
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
        type: 1,
        pageNo: this.state.pageNo + 1,
        pageSize: 10,
        status: "2"
      })
    });
    res = await res.json();
    console.log(res);
    let dataList = this.state.dataList;
    dataList = dataList.concat(res.data.result);
    this.setState({
      dataList: dataList,
      pageNo: this.state.pageNo + 1
    });
  }
  renderItem = (item, index) => {
    var userPayInfo = item.item.user.userInfo;
    return (<TouchableOpacity
                              style={ styles.listItem }
                              showsHorizontalScrollIndicator={ false }
                              onPress={ () => {
                                          this.props.navigation.push('sellOrder', {
                                            orderId: item.item.id
                                          });
                                        } }
                              horizontal={ true }>
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
                  <Text style={ [styles.primaryFont, { marginRight: 20 }] }>
                    { `交易: ` + item.item.dealNumber }
                  </Text>
                  <Text style={ [styles.lightFont, { margin: 20 }] }>
                    实付:
                    <Text style={ [styles.primaryFont, { fontSize: 36 }] }>
                      { ' ' + Math.round(item.item.dealNumber*0.8) + ' ' }
                    </Text>
                    CNY
                  </Text>
                </View>
              </View>
            </TouchableOpacity> );
  }
  render() {
    return (
      <Resolutions.FixFullView>
        <SafeAreaView style={ styles.container }>
          <View style={ { height: 1450 } }>
            <FlatList
                      data={ this.state.dataList }
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
    borderBottomColor: 'rgb(208,192,227)',
    justifyContent: 'center'
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

