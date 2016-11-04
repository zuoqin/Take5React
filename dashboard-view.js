'use strict';

import React, { Component } from 'react';
import {
  AsyncStorage,
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  StatusBar,
  Navigator,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ListView,
  ScrollView,
  ProgressBarAndroid,
  RecyclerViewBackedScrollView,
} from 'react-native';

var styles1 = require('./styles');

var SYSMENU_URL = 'http://192.168.123.33:3000/api/sysmenu';
var PAGE_URL = 'http://192.168.123.33:3000//api/page/';
var STORY_URL = 'http://192.168.123.33:3000//api/story/';


var LOADING = {};

var ListIntroCell = require('./list-intro-cell');

class DashboardView extends Component { 
  timeoutID = (null: any);
  isUpdated = true;

  constructor(props, context) {
    super(props, context);
    var arr = [ {Body: "",
      Introduction: "jhkjkjkja ...",Published: "01/26/2014 - 13:23",
      Reference: "xhcmdlLWNhc2gtd2l0aGRyYXdhbC1saW1pdA==",
      Title: "Furious Backlash Forces HSBC To Scrap Large Cash Withdrawal Limit",
      Updated: "2016-03-08T15:55:12.2058442+08:00"} ];
    this.isUpdated = false;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: false,
      page: -1,
      searchMode: false,
      query: '',
      dataSource: this.ds.cloneWithRows(['7 Harsh Realities Of Life Millennials Need To Understand', 'Millennials. They may not yet be the present, but they’re certainly the future. These young, uninitiated minds will someday soon become our politicians, doctors, scientists, chefs, television producers, fashion designers, manufacturers, and, one would hope, the new proponents of liberty. But are they ready for it? It’s time millennials understood these 7 harsh realities of life so we don’t end up with a generation of gutless adult babies running the show.','Japanese Government Bond Futures Are Flash-Crashing (Again)', 'Remember that once-in-a-lifetime, ']),
      resultsData: this.ds.cloneWithRows(['Japanese Government Bond Futures Are Flash-Crashing (Again)', 'Remember that once-in-a-lifetime, '])
    };
  };


  componentDidMount() {
    this.isUpdated = true;
    //this._loadInitialState().done();
    //this.getPage(0);    
  };


  render() {
    return (     
      <View>
        <ListView
          style={styles1.listView.list}
          dataSource={this.state.dataSource}  
          renderRow={(data) => <View><Text>{data}</Text></View>}
        />        
      </View>
    )
  }
};

module.exports = DashboardView;