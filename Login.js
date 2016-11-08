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

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  AsyncStorage,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  View
} = ReactNative;
//var PickerItemIOS = PickerIOS.Item;

var mystyles = require('./styles');


var STORAGE_KEY = '@AsyncStorageExample:key';
var COLORS = ['red', 'orange', 'yellow', 'green', 'blue'];

class Login extends React.Component {
  state = {
    selectedValue: COLORS[0],
    messages: [],
  };


  constructor(props) {
    super(props);

    //binding function
    //this.onLogin = this.onLogin.bind(this);
    
  }

  
  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){
        this.setState({selectedValue: value});
        this._appendMessage('Recovered selection from disk: ' + value);
      } else {
        this._appendMessage('Initialized with no selection on disk.');
      }
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
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
    //var color = this.state.selectedValue;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 600,}}
      >
        <Text
          style={{width: 250, height: 30, backgroundColor: 'powderblue'}}>
          Enter user name:
        </Text>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='Login name...'
          enablesReturnKeyAutomatically={true}
          style={{width: 250, height: 50, backgroundColor: 'white'}}
          onChange={this.props.onUserNameChange}
          onEndEditing={this.props.onEndUserNameEditing}
          onSubmitEditing={this.props.onSubmitUser}
        />

        <Text
          style={{width: 250, height: 30, backgroundColor: 'powderblue'}}>
          Enter password:
        </Text>
        <TextInput
          secureTextEntry ={true}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='password...'
          enablesReturnKeyAutomatically={true}
          style={{width: 250, height: 50, backgroundColor: 'white'}}
          onChange={this.props.onPasswordChange}
          onEndEditing={this.props.onEndPasswordEditing}
          onSubmitEditing={this.props.onSubmitPassword}
        />      

         <TouchableHighlight
         style={{width: 250, height: 50, backgroundColor: 'white'}}
         onPress={this.props.onLogin.bind(this)}>
         <Image
         style={mystyles.button}
         source={require('./login.jpg')}
         />
         </TouchableHighlight>         
      </View>       
    

      
      
    );
  }

  _onValueChange = async (selectedValue) => {
    this.setState({selectedValue});
    try {
      await AsyncStorage.setItem(STORAGE_KEY, selectedValue);
      this._appendMessage('Saved selection to disk: ' + selectedValue);
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  };

  _removeStorage = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      this._appendMessage('Selection removed from disk.');
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  };

  _appendMessage = (message) => {
    this.setState({messages: this.state.messages.concat(message)});
  };
}

module.exports = Login;
