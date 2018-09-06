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
          type: 1
        })
      }).then((res) => {
        return res.json();
      }).then(((jsonData) => {
        this.setState({
          dataList: jsonData.data
        });
      }));
    });
  }
  constructor() {
    super();
    this.renderItem = this.renderItem.bind(this);
    this.state = {
      dataList: []
    };
  }
  renderItem = (item, index) => {
    var userPayInfo = item.item.user.userPayInfo;
    return (<TouchableOpacity
                        style={ styles.listItem }
                        showsHorizontalScrollIndicator={ false }
                        horizontal={ true }>
                <View style={ { width: 1080, justifyContent: 'space-between', flexDirection: 'row', padding: 40 } }>
                  <View style={ { flexDirection: 'row' } }>
                    <Image
                           source={ global.userDetail && global.userDetail.avatar ? {
                                      uri: global.userDetail.avatar
                                    } : defaultHead }
                           style={ { height: 120, width: 120, borderRadius: 60, marginTop: 30, marginRight: 40 } }></Image>
                    <View>
                      <View style={ { flexDirection: 'row', alignItems: 'center' } }>
                        <Text style={ { fontSize: 40, marginRight: 20, fontWeight: 'bold' } }>
                          { item.item.user.userName }
                        </Text>
                        { payment.map((url, index) => {
                            for (var o in userPayInfo) {
                              if (userPayInfo[o].payType === index) {
                          
                                return (<Image
                                               key={ index }
                                               source={ url }
                                               style={ { width: 35, height: 35, marginLeft: 10 } } />);
                              }
                            }
                            return;
                          }) }
                      </View>
                      <View style={ { marginTop: 20, marginLeft: 4 } }>
                        <Text style={ { fontSize: 34 } }>
                          限额
                          { ' ' + item.item.minNumber }
                        </Text>
                      </View>
                      <View style={ { marginTop: 20, marginLeft: 4 } }>
                        <Text style={ { fontSize: 34 } }>
                          编号:
                          { ' ' + item.item.id }
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={ { alignItems: 'flex-end' } }>
                    <Text style={ { fontSize: 40, fontWeight: 'bold', marginRight: 12 } }>
                      { `${item.item.type === 1 ? '买入:': '卖出:'} `+item.item.dealNumber }
                    </Text>
                    <Text style={ { fontSize: 34, margin: 12 } }>
                      实收:
                      <Text style={ { fontWeight: 'bold', fontSize: 34 } }>
                        { ' ' + item.item.money +' '}
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
          <View style={ { height: 1536 } }>
            <FlatList
                      data={ this.state.dataList }
                      keyExtractor={ (item, index) => {
                                       return item.id
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
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  listItem: {
    height: 258,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(82,21,117, 0.7)'
  }
});

