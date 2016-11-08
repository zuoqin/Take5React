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

var styles = require('./styles');
const Dimensions = require('Dimensions');
const AndroidWindow = Dimensions.get('window');
var TimerMixin = require('react-timer-mixin');

const UIExplorerActions = require('./UIExplorerActions');


var API_URL = 'http://www.take5people.cn:8083/api/search/';
var PAGE_URL = 'http://www.take5people.cn:8083/api/page/';
var STORY_URL = 'http://www.take5people.cn:8083/api/story/';

// var API_URL = 'http://192.168.123.118:8083/api/search/';
// var PAGE_URL = 'http://192.168.123.118:8083/api/page/';
// var STORY_URL = 'http://192.168.123.118:8083/api/story/';


var LOADING = {};
var resultsCache = {
  dataForQuery: {}
};


var resultsPagesCache = {
  dataForPage: {}
};


var resultsStoriesCache = {
  dataForQuery: {}
};


var NewEmployeeCell = require('./NewEmployeeCell');
var NewEmployeeDetail = require('./NewEmployeeDetail');

var STORAGE_KEY = '@ZeroHedge:key';


class SearchBar extends Component {
  
  constructor(props, context) {
    super(props, context);
  };  
  render() {
    return (
      <View style={styles.listView.searchBar}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='Search for stories...'
          returnKeyType='search'
          enablesReturnKeyAutomatically={true}
          style={styles.listView.searchBarInput}
          onChange={this.props.onSearch}
          onEndEditing={this.props.onEndEditing}
          onSubmitEditing={this.props.onSubmitEditing}
        />

        

      </View>

    )
  }
}

class NewEmployeesListView extends Component {
  static title = 'NewEmployees';
  static description = 'New Employees List';


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
    };
  };


  componentDidMount() {
    this.isUpdated = true;
    this.getEmployees();    
  };

  getDataSource(employees: Array<any>): ListView.DataSource{
    this.isUpdated = false;
    this.setState({dataSource: this.ds.cloneWithRows(employees)});
    this.isUpdated = true;
    return this.state.dataSource.cloneWithRows(employees);
  }

  setEmployees(responseData){
    console.log(responseData.length);
    this.state.isLoading = false;
    this.getDataSource(responseData);
  };


  getEmployees(){
    if (this.isUpdated == false) {
      this._showAlert('Download', 'Download page failed');
      return;
    }
    
    if (this.state.isLoading == true) {
      this._showAlert('Download', 'Downloading, please wait...');
      return;
    }
    this.state.isLoading = true;

    var settings = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': 'Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJuYWNobyIsImV4cCI6MTQ3NTk5ODQ0NCwiaWF0IjoxNDc1OTEyMDQ0fQ.',
      },
    };      
    fetch("http://192.168.123.33:3000/api/empnew", settings)
      .then((response) => response.json())
      .then((responseData) => {
          this.setEmployees(responseData);
          console.log('On Get Page ');
        })
      .catch((error) => {
        this._showAlert('Download', 'Download New Employees failed with error: ' + error.message);
        this.state.isLoading = false;
      });

  };

  renderSeparator(
    sectionID: number | string,
    rowID: number | string,
    adjacentRowHighlighted: boolean
  ) {
    return (
      <View
        key={"SEP_" + sectionID + "_" + rowID}
        style={[styles.listView.rowSeparator, adjacentRowHighlighted && styles.listView.rowSeparatorHighlighted]}
      />
    );
  };

  renderRow(
    employee: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunction: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    var sTitle = '123456789012345';
    var nLength = 15;
    if(employee.empname !== undefined) 
    {
      console.log('story title: ' + employee.empname);
      sTitle = employee.empname;
    }
    nLength = sTitle.length;
    return (
      <NewEmployeeCell
        employee={employee}
        onSelect={() => this.selectMediaItem(employee)}
        onHighlight={() => highlightRowFunction(sectionID,rowID)}
        onDeHighlight={() => highlightRowFunction(null,null)}
      />  
    );
  };

  selectMediaItem(employeeItem) {

    var props = {onNavigate: this.props.passProps.onNavigate,
      empid: employeeItem.empid,
      birthday: employeeItem.birthday,
      empname: employeeItem.empname
    }
    this.props.passProps.onNavigate(UIExplorerActions.ExampleAction('NewEmployeeDetail', props));
  };

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
  render() {
    return (
     
      <View>
       <SearchBar
          onPage = {(event) => {
            this.getPage(event);
              
            console.log('on press page');
          }}

          onSearch={(event) => {
            var searchString = event.nativeEvent.text;
            console.log(searchString);
          }}



          onEndEditing={(event) => {
            console.log('jkhkjhkj');
            var searchString = event.nativeEvent.text;
            console.log(searchString);
          }}
          
          onSubmitEditing={(event) => {
            console.log('On Submit Editing');
            var searchString = event.nativeEvent.text;
            console.log('Input string ' + searchString);


            //this.clearTimeout(this.timeoutID);
            //this.timeoutID = this.setTimeout(() => this.searchMedia(searchString), 1000);  
            this.searchMedia(searchString);
          }}
        />

        <ListView
          style={styles.listView.list}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          //automaticallyAdjustContentInsets={true}
          //initialListSize={20}
          //renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          //renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.listView.searchBar} />}
        />
        
      </View>
    )
  }
};

module.exports = NewEmployeesListView;