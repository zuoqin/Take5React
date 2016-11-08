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

    this.isUpdated = false;
    this.ds = ds;
    this.state = {
      isLoading: false,
      dataSource: this.ds.cloneWithRowsAndSections({}),
    };
    this.list={};
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



    var keys = [];
    for (var key in this.list) {
      if (this.list.hasOwnProperty(key)) {
        keys.push(key);
      }
    }

    var filteredList = {};

    for (var i = 0; i < keys.length; i++) {
        filteredList[keys[i]] = this.list[keys[i]].filter(filter);
    }

    const dataSource = ds.cloneWithRowsAndSections(filteredList);


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



  changeMenuStructure(responseData, menu){
    var parent = {};
    if(menu.menulevel !== null && menu.menulevel !== undefined && menu.menulevel !== 0){
      if(menu.menucode !== null && menu.menucode !== undefined && menu.menucode.length > 0){
        for(var i=0;i<responseData.length;i++){
          if(responseData[i].submenu == menu.menucode){
            parent = responseData[i];
            break;
          }
        }
        if(parent.menulevel !== null && parent.menulevel !== undefined && parent.menulevel !== 0){
          menu.parent = this.changeMenuStructure(responseData, parent);
        }
        else {
          if(parent.menulevel !== null && parent.menulevel !== undefined && parent.menulevel === 0){
            return parent;
          }
          else{
            return '';
          }
        } 
      } else{
        return '';
      }
    } else{
      return '';
    }
  }

  setPageGetResult(responseData){
    console.log('looping over menus');
    this.list = {};
    //this._showAlert(responseData.length.toString(), "responseData count");
    for(var i=0;i<responseData.length;i++){
      if(responseData[i].menulevel == 0){
        this.list[responseData[i].name] = [];
      } else{
        responseData[i].parent = this.changeMenuStructure(responseData, responseData[i]);
      }
    }


    for(var i=0;i<responseData.length;i++){
      var newMenu = {
          key: responseData[i].urltarget,
          module: null,
        };

      for(var j=0; j< this.props.list.ComponentExamples.length; j++){
        if(this.props.list.ComponentExamples[j].key === newMenu.key){
          newMenu.module = this.props.list.ComponentExamples[j].module;
          this.list[responseData[i].parent.name].push(newMenu);
        }
      }
      console.log(newMenu);
    }

    this.setState({dataSource: this.ds.cloneWithRowsAndSections(this.list)});
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
      fetch("http://192.168.123.33:3000/api/sysmenu", settings)
        .then((response) => response.json())
        .then((responseData) => {
            this.setPageGetResult(responseData);
            console.log(responseData);
          })
        .catch((error) => {
          this._showAlert('Download', 'Download menus failed with error: ' + error.message);
          this.state.isLoading = false;
          //this.state.resultsData this.setPageGetResult([]); //this.getDataSource([])
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
    var props = {onNavigate: this.props.onNavigate};
    this.props.onNavigate(UIExplorerActions.ExampleAction(exampleKey, props));
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
