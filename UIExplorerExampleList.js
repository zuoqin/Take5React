/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

const ListView = require('ListView');
const AsyncStorage = require('AsyncStorage');
const React = require('react');
const StyleSheet = require('StyleSheet');
const Text = require('Text');
const TextInput = require('TextInput');
const TouchableHighlight = require('TouchableHighlight');
const View = require('View');
const Alert = require('Alert');
const UIExplorerActions = require('./UIExplorerActions');
const UIExplorerStatePersister = require('./UIExplorerStatePersister');

import type {
  UIExplorerExample,
} from './UIExplorerList.ios';

import type {
  PassProps,
} from './UIExplorerStatePersister';

import type {
  StyleObj,
} from 'StyleSheetTypes';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
});

type Props = {
  onNavigate: Function,
  list: {
    ComponentExamples: Array<UIExplorerExample>,
    APIExamples: Array<UIExplorerExample>,
  },
  persister: PassProps<*>,
  searchTextInputStyle: StyleObj,
  style?: ?StyleObj,
};

class UIExplorerExampleList extends React.Component {
  props: Props


  constructor(props, context) {
    super(props, context);
    var arr = [ {Body: "",
      Introduction: "jhkjkjkja ...",Published: "01/26/2014 - 13:23",
      Reference: "xhcmdlLWNhc2gtd2l0aGRyYXdhbC1saW1pdA==",
      Title: "Furious Backlash Forces HSBC To Scrap Large Cash Withdrawal Limit",
      Updated: "2016-03-08T15:55:12.2058442+08:00"} ];
    this.isUpdated = false;
    this.ds = ds;
    this.state = {
      isLoading: false,
      dataSource: this.ds.cloneWithRowsAndSections({
        components: [],//this.props.list.ComponentExamples,
        apis: [],//this.props.list.APIExamples,
      }),
      resultsData: this.ds.cloneWithRowsAndSections({
        components: this.props.list.ComponentExamples,
        apis: this.props.list.APIExamples,
      }),
    };
  };

  componentDidMount() {
    this.isUpdated = true;
    if(this.props.isLoggedIn === true){
       this.getMenus();
    }
  };


  render(): ?ReactElement<any> {
    const filterText = this.props.persister.state.filter;
    const filterRegex = new RegExp(String(filterText), 'i');
    const filter = (example) => filterRegex.test(example.module.title);


    console.log(this.props.persister.state.filter);
    var componentsList = this.props.list.ComponentExamples.filter(filter);

    const dataSource = ds.cloneWithRowsAndSections({
      components: componentsList,
      apis: this.props.list.APIExamples.filter(filter),
    });


    if(this.props.isLoggedIn === true){
         return  <View style={[styles.listContainer, this.props.style]}>
          {this._renderTitleRow()}
          {this._renderTextInput()}
          <ListView
          style={styles.list}
          dataSource={dataSource}
          renderRow={this._renderExampleRow.bind(this)}
          renderSectionHeader={this._renderSectionHeader}
          enableEmptySections={true}
          keyboardShouldPersistTaps={true}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode='on-drag'
          />
          </View>
    }
    else{
      return  <View style={[styles.listContainer, this.props.style]}>
      <Text> jjgjhgjhghjg </Text>
      </View>
    }
      
  };


  _renderTitleRow(): ?ReactElement<any> {
    if (!this.props.displayTitleRow) {
      return null;
    }
    return this._renderRow(
      'T5P HRMS',
      'Now you can',
      'home_key',
      () => {
        this.props.onNavigate(
          UIExplorerActions.ExampleListWithFilter('')
        );
      }
    );
  }

  _renderTextInput(): ?ReactElement<any> {
    if (this.props.disableSearch) {
      return null;
    }
    return (
      <View style={styles.searchRow}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          onChangeText={text => {
            this.props.persister.setState(() => ({filter: text}));
          }}
          placeholder="Search..."
          underlineColorAndroid="transparent"
          style={[styles.searchTextInput, this.props.searchTextInputStyle]}
          testID="explorer_search"
          value={this.props.persister.state.filter}
        />
      </View>
    );
  }

  _renderSectionHeader(data: any, section: string): ?ReactElement<any> {
    return (
      <View>
        <Text style={styles.sectionHeader}>
          {section.toUpperCase()}
        </Text>
      </View>
    );
  }

  _renderExampleRow(example: {key: string, module: Object}): ?ReactElement<any> {
    return this._renderRow(
      example.module.title,
      example.module.description,
      example.key,
      () => this._handleRowPress(example.key)
    );
  }

  _renderRow(title: string, description: string, key: ?string, handler: ?Function): ?ReactElement<any> {
    return (
      <View key={key || title}>
        <TouchableHighlight onPress={handler}>
          <View style={styles.row}>
            <Text style={styles.rowTitleText}>
              {title}
            </Text>
            <Text style={styles.rowDetailText}>
              {description}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  }


  setPageGetResult(responseData){
    console.log('looping over menus');
    //this._showAlert(responseData.length.toString(), "responseData count");
    var menus = [];
    for(var i=0;i<responseData.length;i++){
      var newMenu =         {
          key: responseData[i].name,
          module: null
        };

      for(var j=0; j< this.props.list.ComponentExamples.length; j++){
        if(this.props.list.ComponentExamples[j].key === newMenu.key){
          newMenu.module = this.props.list.ComponentExamples[j].module;
        }
      }
      console.log(newMenu);
      menus.push(newMenu);
    }

    //this.props.list.ComponentExamples.filter(filter);
    //menus.push( this.props.list.ComponentExamples.filter(filter) );

    //this._showAlert(menus.length.toString(), "Menus count");
    this.state.resultsData = this.getDataSource(menus);
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

  getMenus(){
    var token = this.props.token;
    
    if( token !== undefined && token.length > 0){
      console.log('provide token in getMenus' + token);
      var bearer = 'Bearer ' + token;
      var settings = {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': bearer,
        },      
      };      
      fetch("http://192.168.123.145:3000/api/sysmenu2", settings)
        .then((response) => response.json())
        .then((responseData) => {
            this.setPageGetResult(responseData);
            console.log(responseData);
          })
        .catch((error) => {
          this._showAlert('Download', 'Download menus failed with error: ' + error.message);
          this.state.isLoading = false;
          this.state.resultsData = this.setPageGetResult([]);//this.getDataSource([])
        })
    }
  }

  getDataSource(menus: Array<any>): ListView.DataSource{
    this.isUpdated = false;

    this.props.list.ComponentExamples = menus;
    this.props.list.APIExamples = [],




    this.setState({dataSource: this.ds.cloneWithRowsAndSections({
      components: this.props.list.ComponentExamples,
      apis: this.props.list.APIExamples
    }) });
    this.isUpdated = true;
    return this.state.dataSource.cloneWithRowsAndSections({
      components: this.props.list.ComponentExamples,
      apis: this.props.list.APIExamples
    });
  }  

  _handleRowPress(exampleKey: string): void {
    this.props.onNavigate(UIExplorerActions.ExampleAction(exampleKey));
  }
}

UIExplorerExampleList = UIExplorerStatePersister.createContainer(UIExplorerExampleList, {
  cacheKeySuffix: () => 'mainList',
  getInitialState: () => ({filter: ''}),
});

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  sectionHeader: {
    padding: 5,
    fontWeight: '500',
    fontSize: 11,
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowTitleText: {
    fontSize: 17,
    fontWeight: '500',
  },
  rowDetailText: {
    fontSize: 15,
    color: '#888888',
    lineHeight: 20,
  },
  searchRow: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
    paddingVertical: 0,
    height: 35,
  },
});

module.exports = UIExplorerExampleList;
