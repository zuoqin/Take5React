'use strict';
import React, { Component } from 'react';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  StatusBar,
  Navigator,
  TextInput,
  TouchableWithoutFeedback,
  ListView,
  BackAndroid, 
  ProgressBarAndroid
} from 'react-native';




var styles = require('./styles');
var BGWASH = 'rgba(255,255,255,0.8)';
const Dimensions = require('Dimensions');
const AndroidWindow = Dimensions.get('window');

var references = new Array();
var STORY_URL = 'http://www.take5people.cn:8083/story/';
//var STORY_URL = 'http://192.168.123.118:8083/story/';

class NewEmployeeDetail extends Component {
  render() {
    return (
      
      <View style={styles.global.content}>         
        <Text>{this.props.passProps.empid}</Text>
        <Text>{this.props.passProps.empname}</Text>
        <Text>{this.props.passProps.birthday}</Text>
      </View>
    );
  }

  _handlePress1() {
    console.log('2222Ask me later pressed');
    this.props.navigator.pop()
    //push({
    //  title: 'Stories List',
    //  component: StoriesListView,
    //  id: 'StoriesList'
    //});
  }  


  _showAlert(title, message) {
    console.log('1111111Ask me later pressed');
    // Works on both iOS and Android
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )    
  }  

};



module.exports = NewEmployeeDetail;