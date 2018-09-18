/**
 * 买单
 */
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, Button, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';

var ITEM_HEIGHT = 150;
var status = ['已取消', '已完成', '未完成', '未付款', '已超时', '已冻结', '已付款', '已申诉'];
type page = {};

export default class buyList extends Component {
  constructor() {
    super();
    this.state = {

    };
    page = {
      pageNo: 1,
      pageSize: 10,
      pageTotal: 0
    }

    this.getMoreList = this.getMoreList.bind(this);
  }
  async componentDidMount() {
    let res = await fetch(`${global.Config.FetchURL}/dks/findByCurrentUser`, {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": global.token
      },
      body: JSON.stringify({
        type: '1',
        pageNo: page.pageNo,
        pageSize: page.pageSize,
      })
    })

    res = await res.json();
    console.log(res);
    if (res.code === 200) {
      this.setState({
        dataList: res.data.result.map(this.filterData)
      });
      page.pageTotal = res.data.pageTotal;
    }
  }

  filterData(item) {
    return {
      id: item.id,
      dealNumber: item.dealNumber,
      orderNumber: item.orderNumber,
      status: item.status,
      payUser: item.payUser
    };
  }

  async getMoreList() {
    if (page.pageTotal <= page.pageNo) {
      return;
    }
    page.pageNo++; 
    let res = await fetch(`${global.Config.FetchURL}/dks/findByCurrentUser`, {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": global.token
      },
      body: JSON.stringify({
        type: "1",
        pageNo: page.pageNo,
        pageSize: 10
      })
    })
    res = await res.json();
    let dataList = this.state.dataList;
    dataList = dataList.concat(res.data.result.map(this.filterData));
    page.pageTotal = res.data.pageTotal;
    this.setState({
      dataList: dataList
    });
  }

  //每一个列表渲染的方法
  _renderItem = (item) => {
    var isBuyOrder = item.item.type === 1;

    return (
      <TouchableOpacity
                        style={ { flex: 1, height: ITEM_HEIGHT, backgroundColor: item.index % 2 == 0 ? '#f6edfe' : '#ebe5f0' } }
                        onPress={ () => {
                                    if (item.item.status === 3 || item.item.status === 6) {
                                      this.props.navigation.push('orderFlow', {
                                        id: item.item.id,
                                        dealNumber: item.item.dealNumber,
                                        isNewOrder: false
                                      })
                                    }
                                  } }>
        <View style={ styles.listViewTop }>
          <View>
            <Text style={ [styles.text,{marginTop: -3}] }>
              { (isBuyOrder ? '买入: ' : '卖出: ') + item.item.dealNumber + ' PE' }
            </Text>
            <View>
              <View style={ { flexDirection: 'row', justifyContent: 'flex-start' } }>
                <Text style={ styles.text }>
                  { (isBuyOrder ? '卖家' : '买家') + ': ' + (!item.item.payUser ? '无' : item.item.payUser.userName) }
                </Text>
                <Image
                       style={ { width: 15, height: 15, borderRadius: 15, margin: 5 } }
                       source={ require('../../../images/WeChat.png') } />
              </View>
              <Text style={ styles.text }>
                { (isBuyOrder ? '卖家' : '买家') + '手机: ' + (!item.item.payUser ? '无' : item.item.payUser.telephone) }
              </Text>
            </View>
          </View>
          <View>
            <Text style={ styles.text }>
              { item.item.dealNumber + ' CNY' }
            </Text>
            <Text style={ styles.text }>
              { isBuyOrder ? '实付: ' : '实收: ' }
              <Text style={ { color: isBuyOrder ? '#c33915' : 'green' } }>
                { ((!item.item.payUser && item.item.status !== 1) ? 0 : Math.round(item.item.dealNumber * 0.8)) + ' CNY' }
              </Text>
            </Text>
          </View>
        </View>
        <View style={ styles.listViewBottom }>
          <Text style={ { color: item.item.status == 1 ? 'green' : '#fb9c27' } }>
            状态:
            { status[item.item.status] }
          </Text>
          <Text style={ styles.text }>
            编号:
            { item.item.orderNumber }
          </Text>
        </View>
        <View style={ { height: 1, backgroundColor: '#d6bfe4' } } />
      </TouchableOpacity>
    )
  }
  //底部显示文字
  _footer = () => {
    return <Text style={ [styles.txt, { backgroundColor: 'rgb(68,20,113)' }] }>
             { this.state.pageNo < this.state.pageTotal ? '上拉获取更多数据' : '暂无更多数据' }
           </Text>;
  }
  //每一行的线
  _separator = () => {
    return <View style={ { height: 1, backgroundColor: '#d6bfe4' } } />;
  }
  _keyExtractor = (item, index) => index;

  render() {
    return (
      <View style={ { flex: 1 } }>
        <View style={ { flex: 1 } }>
          <FlatList
                    renderItem={ this._renderItem }
                    keyExtractor={ this._keyExtractor }
                    onEndReached={ this.getMoreList }
                    onEndReachedThreshold={ 0.4 }
                    getItemLayout={ (data, index) => ({
                                      length: ITEM_HEIGHT,
                                      offset: ITEM_HEIGHT * index,
                                      index
                                    }) }
                    data={ this.state.dataList } />
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  txt: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  text: {
    color: 'black',
    fontSize: 14,
    marginTop: 3,
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
    paddingTop: 10
  }
});