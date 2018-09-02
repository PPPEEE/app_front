/**
 * 买单
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Button,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';

var ITEM_HEIGHT = 150;

export default class buyList extends Component {

  _flatList;
  //每一个列表渲染的方法
  _renderItem = (item) => {
    var bgColor = item.index % 2 == 0 ? '#f6edfe' : '#ebe5f0';
    var orderType = item.item.type == '0' ? '买入: ' : '卖出: ';
    var buySeller = item.item.orderType == '0' ? '卖家: ' : '买家: ';
    var orderState = item.item.orderState == '0' ? '已完成' : '已超时';
    var orderStateColor = item.item.orderState == '0' ? 'green' : '#fb9c27';
    return (
      <View style={{flex: 1, height: ITEM_HEIGHT, backgroundColor: bgColor}}>
        <View style={styles.listViewTop}>
          <View>
            <Text style={{color: '#c33915'}}>{orderType + item.item.orderMoney+' PE'}</Text>
            <View style={{flexDirection: 'row',justifyContent: 'flex-start'}}>
              <Text style={styles.text}>{buySeller+item.item.buySellerNum}</Text>
              <Image
                style={{width: 15, height: 15, borderRadius: 15, margin:5}}
                source={require('../../images/WeChat.png')}
              />
            </View>
            <Text style={styles.text}>{'卖家手机: '+item.item.phone}</Text>
          </View>
          <View>
            <Text style={styles.text}>{item.item.orderMoney+' CNY'}</Text>
            <Text style={styles.text}>{'实付: '+item.item.payMoney+' CNY'}</Text>
          </View>  
        </View>
        <View style={styles.listViewBottom}>
          <Text style={{color: orderStateColor}}>状态: {orderState}</Text>
          <Text style={styles.text}>编号: {item.item.orderNum}</Text>
        </View>
      </View>
    )
  }
  //底部显示文字
  _footer = () => {
    return <Text style={[styles.txt, { backgroundColor: 'black' }]}>暂无更多数据</Text>;
  }
  //每一行的线
  _separator = () => {
    return <View style={{ height: 1, backgroundColor: '#d6bfe4' }} />;
  }
  _keyExtractor = (item, index) => item.id;

  render() {
    var data = [];
    for (var i = 0; i < 4; i++) {
      data.push({ 
        key: i,
        title: i + '',
        id: i,
        type: '0',
        orderMoney: '7000',
        payMoney: '5000',
        buySellerNum: '19276371872',
        phone: '15013559203',
        orderState: '0',
        orderNum: '7689123',
      });
    }
    console.log(data);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={(flatList) => this._flatList = flatList}
            ListFooterComponent={this._footer}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            //numColumns ={3}
            //columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}

            //getItemLayout={(data,index)=>( //可选的优化
            //{length: ITEM_HEIGHT, offset: (ITEM_HEIGHT+2) * index, index}
            //)}
            data={data}>
          </FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  txt: {
    textAlign: 'center',
    // textAlignVertical: 'center',
    color: 'white',
    fontSize: 30,
  },
  text: {
    color: 'black',
    fontSize: 14,
    marginTop: 3,
  },
  listViewContainer: {

  },
  listViewTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  orderState: {

  },
  listViewBottom: {
    flex: 1,
    padding: 20,
  }
});