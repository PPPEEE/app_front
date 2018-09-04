/**
 * 我的团队
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

var ITEM_HEIGHT = 90;

export default class myTeam extends Component {

  _flatList;
  //每一个列表渲染的方法
  _renderItem = (item) => {
    var bgColor = item.index % 2 == 0 ? '#f6edfe' : '#ebe5f0';
    //头像，   名字，UID，电话，  会员等级
    return (
      <View style={[{ height: ITEM_HEIGHT },styles.listViewContainer]}>
        <View style={styles.listViewLeft}>
          <Image
            style={{width: 50, height: 50, borderRadius: 60, marginRight: 10}}
            source={require('../../../images/user.png')}
          />
          <View style={styles.listViewMiddle}>
            <Text style={styles.textN}>昵称: {item.item.name}</Text>
            <Text style={styles.textU}>UID: {item.item.uid}</Text>
            <Text style={styles.textP}>电话: {item.item.phone}</Text>
          </View>
        </View>
        <View style={styles.listViewRight}>
          <View>
            <Text>合格会员</Text>
          </View>
        </View>
      </View>
    )
  }
  //底部显示文字
  _footer = () => {
    return <Text style={[styles.txt, { backgroundColor: '#d6bfe4' }]}>暂无更多数据</Text>;
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
        level: '7000',
        name: '5000',
        uid: '19276371872',
        phone: '15013559203',
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
  textN: {
    color: 'black',
    fontSize: 14,
    marginTop: 3,
  },
  textU: {
    color: '#656667',
    fontSize: 14,
    marginTop: 3,
  },
  textP: {
    color: '#98999a',
    fontSize: 12,
    marginTop: 3,
  },
  listViewContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f6edfe',
    padding: 15,
  },
  listViewLeft: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  listViewMiddle: {
    flex: 0.7,
    flexDirection: 'column',
  },
  listViewRight: {
    flex: 0.2,
  }
});