/**
 * Created by mengqingdong on 2017/4/19.
 */
import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Button from 'react-native-button';
import Resolutions from '../../../utils/resolutions';

var count = 0;
var payment = [require('../../../images/WeChat.png'), require('../../../images/Alipay.png'), require('../../../images/BankCard.png')];
export default class entrust extends Component {
  constructor() {
    super();
    this.renderItem = this.renderItem.bind(this);
  }
  renderItem = (item) => {

    return (<ScrollView
                        key={ item.key }
                        style={ styles.listItem }
                        showsHorizontalScrollIndicator={ false }
                        horizontal={ true }>
              <View style={ { flexDirection: 'row', width: 1339 } }>
                <View style={ { width: 1080, justifyContent: 'space-between', flexDirection: 'row', padding: 40 } }>
                  <View style={ { flexDirection: 'row'} }>
                    <Image
                           source={ require('../../../images/nohead.jpg') }
                           style={ { height: 120, width: 120, borderRadius: 60, marginTop: 30 ,marginRight: 40} }></Image>
                    <View>
                      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 40,marginRight:20,fontWeight: 'bold',marginLeft: 12}}>
                          { '宁静' }
                        </Text>
                        { payment.map((url) => {
                            return (<Image
                                           source={ url }
                                           style={ { width: 35, height: 35 ,margin: 5} } />);
                          }) }
                      </View>
                      <View style={{margin: 12}}>
                        <Text style={{fontSize: 34}}>限额{' '+0}</Text>
                      </View>
                      <View style={{margin: 12}}>
                        <Text style={{fontSize: 34}}>编号:{' '+'************1998'}</Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text>
                      交易区
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={ () => {
                                            } }>
                  <Text style={ { fontSize: 60, lineHeight: 258, textAlign: 'center', color: 'white', backgroundColor: 'red', width: 258, height: 258 } }>
                    撤销
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView> );
  }
  render() {
    var data = [{
      key: 'Devin'
    }, {
      key: 'Jackson'
    }, {
      key: 'James'
    }, {
      key: 'Joel'
    }, {
      key: 'John'
    }, {
      key: 'Jillian'
    }, {
      key: 'Jimmy'
    }, {
      key: 'Julie'
    }];
    return (
      <Resolutions.FixFullView>
        <SafeAreaView style={ styles.container }>
          <View style={ { height: 1536 } }>
            <FlatList
                      data={ data }
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

