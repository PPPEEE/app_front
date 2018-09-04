/**
 * 我的团队
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
} from 'react-native';
import Button from 'react-native-button';
import { SafeAreaView } from 'react-navigation';

var ITEM_HEIGHT = 90;

export default class myTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.fetchTeam();
    //level  0 临时 1普通  2VIP
  }

  fetchTeam() {
    storage.load({
      key: 'loginState'
    }).then(ret => {
      const url = global.Config.FetchURL + '/user/myTeam';
      const opts = {
        method: 'POST',
        headers: {
          'Accept': global.Config.Accept,
          'Content-Type': global.Config.ContentType,
          'token': ret.token
        },
      }
      fetch(url, opts)
        .then((res) => res.json())
        .then((resJson) => { 
          console.log(resJson)
          this.setState({ users: resJson.data });
        })
    })

  }

  _flatList;
  //每一个列表渲染的方法
  _renderItem = (item) => {
    var bgColor = item.index % 2 == 0 ? '#f6edfe' : '#ebe5f0';
    //头像，   名字，UID，电话，  会员等级
    return (
      <View style={[{ height: ITEM_HEIGHT }, styles.listViewContainer]}>
        <View style={styles.listViewLeft}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 60, marginRight: 10 }}
            source={require('../../../images/user.png')}
          />
          <View style={styles.listViewMiddle}>
            <Text style={styles.textN}>昵称: {item.item.name}</Text>
            <Text style={styles.textU}>UID: {item.item.UID}</Text>
            <Text style={styles.textP}>电话: {item.item.phone}</Text>
          </View>
        </View>
        <View style={styles.listViewRight}>
          <View>
            <Button
              containerStyle={{ padding: 4, width: 80, height: 25, overflow: 'hidden', borderRadius: 10 ,backgroundColor:'#fb9c27' }}
              disabledContainerStyle={{ backgroundColor: '#441272' }}
              style={{ fontSize: 12, color: '#FFFFFF' }}>
              {item.item.level}
            </Button>
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
  _keyExtractor = (item, index) => item.key;

  render() {
    var data = [];
    var tempLevel;
    for (var i = 0; i < this.state.users.length; i++) {
      if(this.state.users[i].userLevel == 0){
        tempLevel = '临时会员';
      }else if(this.state.users[i].userLevel == 1){
        tempLevel = '普通会员';
      }else if(this.state.users[i].userLevel == 2){
        tempLevel = 'VIP会员';
      }
      data.push({
        key: this.state.users[i].id,
        level: tempLevel,
        name: this.state.users[i].userName,
        UID: this.state.users[i].id,
        phone: this.state.users[i].telephone,
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
    fontSize: 16,
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
  },
});