/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, FlatList, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import Resolutions from '../../../utils/resolutions';

var count = 0;
var payment = [require('../../../images/WeChat.png'), require('../../../images/Alipay.png'), require('../../../images/BankCard.png')];
var defaultHead = require('../../../images/nohead.jpg');
export default class entrust extends Component {
  componentWillMount() {
    storage.load({
      key: 'loginState'
    }).then((cache) => {
      token = cache.token;
      this.setState({
        token: token
      });
      fetch(`${global.Config.FetchURL}/dks/dkByType`, {
        method: 'post',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "token": token
        },
        body: JSON.stringify({
          type: 0
        })
      }).then((res) => {
        return res.json();
      }).then(((jsonData) => {
        this.setState({
          dataList: jsonData.data.filter((item) => {
            return item.status === 2;
          })
        });
      }));
    });
  }
  async revoke(id) {
    console(id);
    let res = await fetch(`${global.Config.FetchURL}/dks/dkClean`, {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": this.state.token
      },
      body: JSON.stringify({
        id: id
      })
    });
    res = await res.json();
    if (res.code === 200) {
      Alert.alert('提示', '撤销成功');
    }
    console.log(1)
    res = await fetch(`${global.Config.FetchURL}/dks/dkByType`, {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": this.state.token
      },
      body: JSON.stringify({
        type: 0
      })
    });
    res = await res.json();
    console.log(res.data)
    this.setState({
      dataList: res.data.filter((item) => {
        return item.status === 2;
      })
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
    return (<ScrollView
                        style={ styles.listItem }
                        showsHorizontalScrollIndicator={ false }
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
                              if (userPayInfo[o].payType === index) {
                          
                                return (<Image
                                               key={ index }
                                               source={ url }
                                               style={ { width: 40, height: 40, marginLeft: 10 } } />);
                              }
                            }
                            return;
                          }) }
                      </View>
                      <View style={ { marginTop: 20, marginLeft: 4 } }>
                        <Text style={ styles.lightFont }>
                          限额
                          { ' ' + item.item.minNumber }
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
                        { ' ' + item.item.money + ' ' }
                      </Text>
                      CNY
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={ () => {
                                              this.revoke(item.item.id)
                                            } }>
                  <Text style={ { fontSize: 60, lineHeight: 307, textAlign: 'center', color: 'white', backgroundColor: 'red', width: 307, height: 307 } }>
                    撤销
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView> );
  }
  render() {
    return (
      <Resolutions.FixFullView>
        <SafeAreaView style={ styles.container }>
          <View style={ { height: 1536 } }>
            <FlatList
                      data={ this.state.dataList }
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
    height: 307,
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

