/**
 * 
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import Button from 'react-native-button';

export default class modifyNiki extends Component {  
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      
    };
  }
  render(){
    return (
      <View style={{flex:1, backgroundColor: '#431673', justifyContent: 'center',}}>
        <View style={{flex:0.6,flexDirection: 'row',justifyContent:'center',alignItems: 'center',}}>
          <TextInput
            style={{height: 40, width: '80%',borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
        <View style={{flex:0.4,flexDirection: 'row',justifyContent:'center'}}>
          <ImageBackground source={require('../../../images/Button_bg.jpg')} style={styles.buttonstyle} >
            <Button
              containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4 }}
              disabledContainerStyle={{ backgroundColor: '#441272' }}
              style={{ fontSize: 20, color: '#FFFFFF' }}>
              确定
            </Button>
          </ImageBackground>
        </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  buttonstyle: {
    flex: 1 , height: 45, width: '90%', margin: '5%'
  }
});

