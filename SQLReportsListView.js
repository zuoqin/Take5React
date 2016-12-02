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


var REPORT1_URL = 'http://192.168.123.145/Reports_SQLSERVER2016/report/Reports/Payslips/payslip01';
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


var ReportCell = require('./ReportCell');
var ReportDetail = require('./ReportDetail');

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

class SQLReportsListView extends Component {
  static title = 'SQL Reports';
  static description = 'SQL Reporting Services reports list';


  timeoutID = (null: any);
  isUpdated = true;

  constructor(props, context) {
    super(props, context);
    this.isUpdated = false;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isLoading: false,
      page: -1,
      searchMode: false,
      query: '',
      dataSource: this.ds.cloneWithRows([{name: 'Payroll Report',
            url: 'http://192.168.123.145/ReportServer_SQLSERVER2016/logon.aspx?ReturnUrl=http://192.168.123.145/ReportServer_SQLSERVER2016/Pages/ReportViewer.aspx?%2fReports%2fPayslips%2fpayslip02&rs:Command=Render'},
            {name: 'Another Payroll Report',
            url: 'http://192.168.123.145/ReportServer_SQLSERVER2016/logon.aspx?ReturnUrl=http://192.168.123.145/ReportServer_SQLSERVER2016/Pages/ReportViewer.aspx?%2fReports%2fPayslips%2fpayslip01&rs:Command=Render'}

            ]),
    };
  };


  componentDidMount() {
    this.isUpdated = true;
    this.getReports();    
  };

  getDataSource(reports: Array<any>): ListView.DataSource{
    this.isUpdated = false;
    this.setState({dataSource: this.ds.cloneWithRows(reports)});
    this.isUpdated = true;
  }

  setReports(responseData){
    console.log(responseData.length);
    this.state.isLoading = false;
    this.getDataSource(responseData);
  };


  getReports(){
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
          this.setReports([{name: 'Payroll Report',
            url: 'http://192.168.123.145/ReportServer_SQLSERVER2016/logon.aspx?ReturnUrl=http://192.168.123.145/ReportServer_SQLSERVER2016/Pages/ReportViewer.aspx?%2fReports%2fPayslips%2fpayslip02&rs:Command=Render'},
            {name: 'Another Payroll Report',
            url: 'http://192.168.123.145/ReportServer_SQLSERVER2016/logon.aspx?ReturnUrl=http://192.168.123.145/ReportServer_SQLSERVER2016/Pages/ReportViewer.aspx?%2fReports%2fPayslips%2fpayslip01&rs:Command=Render'}

            ]);
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
    report: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunction: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    var sTitle = '123456789012345';
    var nLength = 15;
    if(report.name !== undefined) 
    {
      console.log('story title: ' + report.name);
      sTitle = report.name;
    }
    nLength = sTitle.length;
    return (
      <ReportCell
        report={report}
        onSelect={() => this.selectMediaItem(report)}
        onHighlight={() => highlightRowFunction(sectionID,rowID)}
        onDeHighlight={() => highlightRowFunction(null,null)}
      />  
    );
  };

  selectMediaItem(reportItem) {

    var props = {onNavigate: this.props.passProps.onNavigate,
      url: reportItem.url,      
      name: reportItem.name
    }
    this.props.passProps.onNavigate(UIExplorerActions.ModuleAction('ReportDetail', props));
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

module.exports = SQLReportsListView;