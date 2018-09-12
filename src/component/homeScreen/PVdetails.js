/**
 * PV明细
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Sicon from 'react-native-vector-icons/SimpleLineIcons';
import { createMaterialTopTabNavigator, SafeAreaView } from 'react-navigation';

/**
  0、冻结                DK页面（冻结）
  1、对冲奖励 DN+                  DN页面（）
  2、直推奖励(转账) DK+         DK页面
  3、团队兑换奖励 DN- DK+  DK页面   DN页面
  4、团队流通奖励 DN- DK+  DK页面   DN页面
  5、每日释放 DN- DK+     DK页面   DN页面
  10、正常兑换            DK页面   DN页面
  11、正常转账 DK-        DK页面
  12、正常买卖 +DK  -DK   DK页面   DN页面（唯一带符号的一个） 
 */

class InRecord extends Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
      isRefresh: false,
      page: {
        pageNo: 1,
        pageSize: 10
      }
    };
  }
  componentWillMount() {
    this.fetchAllData()
  }
  fetchAllData = (page = { pageNo: 1, pageSize: 10 }) => {
    fetch(`${global.Config.FetchURL}/balance/incomeList`, {
      method: 'post',
      headers: {
        "Accept": global.Config.Accept,
        "Content-Type": global.Config.ContentType,
        "token": global.token
      },
      body: JSON.stringify({
        coinType: 1,       //币种,0DK,1DN
        incomeType: 1,  //收支类型,1为收入,2为支出,不填为全部
        pageNo: page.pageNo,
        pageSize: page.pageSize
      })
    }).then((res) => {
      return res.json();
    }).then((jsonData) => {
      this.setState({
        dataList: jsonData.data,
        page: { pageNo: 1, pageSize: 10 }
      });
    });

  }
  //加载更多
  _onLoadMore = () => {
    fetch(`${global.Config.FetchURL}/balance/incomeList`, {
      method: 'post',
      headers: {
        "Accept": global.Config.Accept,
        "Content-Type": global.Config.ContentType,
        "token": global.token
      },
      body: JSON.stringify({
        coinType: 1,       //币种,0DK,1DN
        incomeType: 1,  //收支类型,1为收入,2为支出,不填为全部，3为加速
        pageNo: ++this.state.page.pageNo,
        pageSize: this.state.page.pageSize
      })
    }).then((res) => {
      return res.json();
    }).then((jsonData) => {
      if (jsonData.data.length > 0) {
        let tempList = this.state.dataList;
        this.setState({
          dataList: tempList.concat(jsonData.data)
        });
      } else {
        this.state.page.pageNo--;
      }
    });
  }
  //每一个列表渲染的方法
  _renderItem = (item) => {
    let orderTypeItem;//类型
    switch (item.item.bonusType) {
      case 1:
        orderTypeItem = '对冲奖励';
        break;
      case 10:
        orderTypeItem = '兑换';
        break;
    }
    return (
      <View style={{ flex: 1, height: 90 }}>
        <View style={styles.container}>
          <View style={styles.listViewLeft}>
            <Text style={styles.txt1}>{'记录时间: ' + item.item.addTime}</Text>
            <Text style={styles.text}>{item.item.addTime.slice(0, 10) + orderTypeItem}</Text>
          </View>
          <View style={styles.listViewRight}>
            <Text style={styles.txtGreen}>{item.item.amount}</Text>
          </View>
        </View>
      </View>
    )
  }
  //底部显示文字
  _footer = () => {
    return <Text style={[styles.txt2, { backgroundColor: '#FFFFFF' }]}>暂无更多数据</Text>;
  }
  //每一行的线
  _separator = () => {
    return <View style={{ height: 1, backgroundColor: '#d6bfe4' }} />;
  }
  _keyExtractor = (item, index) => item.id + '';

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            ListFooterComponent={this._footer}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            getItemLayout={(data, index) => (
              { length: 90, offset: 90 * index, index }
            )}
            onRefresh={this.fetchAllData}
            refreshing={this.state.isRefresh}
            onEndReached={this._onLoadMore}
            onEndReachedThreshold={0.3}
            data={this.state.dataList}>
          </FlatList>
        </View>
      </View>
    );
  }
}

class OutRecord extends Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
      isRefresh: false,
      page: {
        pageNo: 1,
        pageSize: 10
      }
    };
  }
  componentWillMount() {
    this.fetchAllData()
  }
  fetchAllData = (page = { pageNo: 1, pageSize: 10 }) => {
    fetch(`${global.Config.FetchURL}/balance/incomeList`, {
      method: 'post',
      headers: {
        "Accept": global.Config.Accept,
        "Content-Type": global.Config.ContentType,
        "token": global.token
      },
      body: JSON.stringify({
        coinType: 1,       //币种,0DK,1DN
        incomeType: 2,  //收支类型,1为收入,2为支出,不填为全部
        pageNo: page.pageNo,
        pageSize: page.pageSize
      })
    }).then((res) => {
      return res.json();
    }).then(((jsonData) => {
      this.setState({
        dataList: jsonData.data,
        page: { pageNo: 1, pageSize: 10 }
      });
    }));
  }
  //加载更多
  _onLoadMore = () => {
    fetch(`${global.Config.FetchURL}/balance/incomeList`, {
      method: 'post',
      headers: {
        "Accept": global.Config.Accept,
        "Content-Type": global.Config.ContentType,
        "token": global.token
      },
      body: JSON.stringify({
        coinType: 1,       //币种,0DK,1DN
        incomeType: 2,  //收支类型,1为收入,2为支出,不填为全部，3为加速
        pageNo: ++this.state.page.pageNo,
        pageSize: this.state.page.pageSize
      })
    }).then((res) => {
      return res.json();
    }).then((jsonData) => {
      if (jsonData.data.length > 0) {
        let tempList = this.state.dataList;
        this.setState({
          dataList: tempList.concat(jsonData.data)
        });
      } else {
        this.state.page.pageNo--;
      }
    });
  }
  //每一个列表渲染的方法
  _renderItem = (item) => {
    var orderTypeItem;//类型
    switch (item.item.bonusType) {
      case 5:
        orderTypeItem = '每日释放';
        break;
    }
    return (
      <View style={{ flex: 1, height: 90 }}>
        <View style={styles.container}>
          <View style={styles.listViewLeft}>
            <Text style={styles.txt1}>{'记录时间: ' + item.item.addTime}</Text>
            <Text style={styles.text}>{item.item.addTime.slice(0, 10) + orderTypeItem}</Text>
          </View>
          <View style={styles.listViewRight}>
            <Text style={styles.txtRed}>{item.item.amount}</Text>
          </View>
        </View>
      </View>
    )
  }
  //底部显示文字
  _footer = () => {
    return <Text style={[styles.txt2, { backgroundColor: '#FFFFFF' }]}>暂无更多数据</Text>;
  }
  //每一行的线
  _separator = () => {
    return <View style={{ height: 1, backgroundColor: '#d6bfe4' }} />;
  }
  _keyExtractor = (item, index) => item.id + '';

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            ListFooterComponent={this._footer}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            getItemLayout={(data, index) => (
              { length: 90, offset: 90 * index, index }
            )}
            onRefresh={this.fetchAllData}
            refreshing={this.state.isRefresh}
            onEndReached={this._onLoadMore}
            onEndReachedThreshold={0.3}
            data={this.state.dataList}>
          </FlatList>
        </View>
      </View>
    );
  }
}

class OutFastRecord extends Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
      isRefresh: false,
      page: {
        pageNo: 1,
        pageSize: 10
      }
    };
  }
  componentWillMount() {
    this.fetchAllData()
  }
  fetchAllData = (page = { pageNo: 1, pageSize: 10 }) => {
    fetch(`${global.Config.FetchURL}/balance/incomeList`, {
      method: 'post',
      headers: {
        "Accept": global.Config.Accept,
        "Content-Type": global.Config.ContentType,
        "token": global.token
      },
      body: JSON.stringify({
        coinType: 1,       //币种,0DK,1DN
        incomeType: 3,  //收支类型,1为收入,2为支出,不填为全部，3为加速
        pageNo: page.pageNo,
        pageSize: page.pageSize
      })
    }).then((res) => {
      return res.json();
    }).then((jsonData) => {
      this.setState({
        dataList: jsonData.data,
        page: { pageNo: 1, pageSize: 10 }
      });
    });
  }
  //加载更多
  _onLoadMore = () => {
    fetch(`${global.Config.FetchURL}/balance/incomeList`, {
      method: 'post',
      headers: {
        "Accept": global.Config.Accept,
        "Content-Type": global.Config.ContentType,
        "token": global.token
      },
      body: JSON.stringify({
        coinType: 1,       //币种,0DK,1DN
        incomeType: 3,  //收支类型,1为收入,2为支出,不填为全部，3为加速
        pageNo: ++this.state.page.pageNo,
        pageSize: this.state.page.pageSize
      })
    }).then((res) => {
      return res.json();
    }).then((jsonData) => {
      if (jsonData.data.length > 0) {
        let tempList = this.state.dataList;
        this.setState({
          dataList: tempList.concat(jsonData.data)
        });
      } else {
        this.state.page.pageNo--;
      }
    });
  }
  //每一个列表渲染的方法
  _renderItem = (item) => {
    var orderTypeItem;//类型
    switch (item.item.bonusType) {
      case 3:
        orderTypeItem = '团队兑换奖励';
        break;
      case 4:
        orderTypeItem = '团队流通奖励';
        break;
    }
    return (
      <View style={{ flex: 1, height: 90 }}>
        <View style={styles.container}>
          <View style={styles.listViewLeft}>
            <Text style={styles.txt1}>{'记录时间: ' + item.item.addTime}</Text>
            <Text style={styles.text}>{item.item.addTime.slice(0, 10) + orderTypeItem}</Text>
          </View>
          <View style={styles.listViewRight}>
            <Text style={styles.txtBlack}>{item.item.amount}</Text>
          </View>
        </View>
      </View>
    )
  }
  //底部显示文字
  _footer = () => {
    return <Text style={[styles.txt2, { backgroundColor: '#FFFFFF' }]}>暂无更多数据</Text>;
  }
  //每一行的线
  _separator = () => {
    return <View style={{ height: 1, backgroundColor: '#d6bfe4' }} />;
  }
  _keyExtractor = (item, index) => item.id + '';

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            ListFooterComponent={this._footer}
            ItemSeparatorComponent={this._separator}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            getItemLayout={(data, index) => (
              { length: 90, offset: 90 * index, index }
            )}
            onRefresh={this.fetchAllData}
            refreshing={this.state.isRefresh}
            onEndReached={this._onLoadMore}
            onEndReachedThreshold={0.3}
            data={this.state.dataList}>
          </FlatList>
        </View>
      </View>
    );
  }
}

//Tab
export default PEdetails = createMaterialTopTabNavigator(
  {
    InRecord: {
      screen: InRecord,
      navigationOptions: {
        tabBarLabel: '收入',
        tabBarIcon: ({ tintColor }) => <Sicon name="list" size={22} color={tintColor} />,
      },
    },
    OutRecord: {
      screen: OutRecord,
      navigationOptions: {
        tabBarLabel: '释放',
        tabBarIcon: ({ tintColor }) => <Sicon name="list" size={22} color={tintColor} />,
      },
    },
    OutFastRecord: {
      screen: OutFastRecord,
      navigationOptions: {
        tabBarLabel: '加速释放',
        tabBarIcon: ({ tintColor }) => <Sicon name="list" size={22} color={tintColor} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#c13a16',
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      pressColor: '#823453',
      pressOpacity: 0.8,
      style: {
        backgroundColor: '#441272',
      },
      labelStyle: {
        fontSize: 12,
        margin: 1
      },
      indicatorStyle: { marginBottom: 2, height: 2, backgroundColor: '#c13a16' }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    },
    swipeEnabled: true,
    animationEnabled: false,
    lazy: true,
    backBehavior: 'none',
  });

//样式
const styles = StyleSheet.create({
  txt1: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
    fontSize: 16,
  },
  txt2: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#545557',
    fontSize: 14,
  },
  txtBlack: {
    color: '#000000',
    fontSize: 14,
  },
  txtRed: {
    color: 'red',
    fontSize: 14,
  },
  txtGreen: {
    color: 'green',
    fontSize: 14,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  listViewLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '70%',
    padding: 10,
  },
  listViewRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '30%',
    padding: 10,
  }
});
