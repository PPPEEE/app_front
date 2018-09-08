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
export default class wantBuy extends Component {
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
          type: 2
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
                              onPress={ () => {
                                          this.props.navigation.push('buyOrder');
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
                                       console.log(new String(index));
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

