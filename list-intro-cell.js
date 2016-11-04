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
  ProgressBarAndroid,
  TouchableHighlight,
  Image,
} from 'react-native';


var styles = StyleSheet.create({
  cellContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 1
  },

  cellImage: {
    height: 80,
    width: 60,
    marginRight: 8,
    resizeMode: 'contain'
  },

  cellTextContainer: {
    flex: 1,
  },

  cellTextPublished: {
    color: '#000000',
    flex: 1,
    fontSize: 10
  },
  cellTextTitle: {
    flex: 1,
    backgroundColor: '#2E6DA4',
    fontWeight: 'bold',
    color: '#FFFFFF',
    height: 40
  },

  cellTextIntroduction: {
    flex: 1,
    backgroundColor: BGWASH,
    height: 110    
  },

  mediaName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  mediaDescription: {
    fontSize: 12,
    color: '#999',
    flex: 1
  },
  mediaYear: {
    fontWeight: 'bold'
  }
});

var BGWASH = 'rgba(255,255,255,0.8)';
class ListIntroCell extends Component {

  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onDeHighlight}
        >
          <View style={styles.cellContainer}>

            <View style={styles.cellTextContainer}>

              <WebView
                style={{
                  backgroundColor: '#2E6DA4',
                  height: 30
                }}
                height={30}
                source={{html: ('<div style="color:white">' + (this.props.story.Title == undefined ? '':this.props.story.Title) +'</div>')}}
              />              
              <WebView
                style={{
                  backgroundColor: BGWASH,
                  height: 110
                }}
                source={{html: this.props.story.Introduction}}
              />   

              <WebView
                style={{
                  backgroundColor: BGWASH,
                  height: 30
                }}
                source={{html: this.props.story.Published}}
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
};


module.exports = ListIntroCell;