'use strict';
import React, {
  StyleSheet,
} from 'react-native';

const Dimensions = require('Dimensions');
const AndroidWindow = Dimensions.get('window');

module.exports = StyleSheet.create({
  searchBar: {
    marginTop: 1,
    padding: 1,
    paddingLeft: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101010',
  },

  touchableButton: {
    shadowColor: '#999999',
    paddingLeft: 1,
    paddingRight: 1,
  },

  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
    padding: 3,
    backgroundColor: '#FFF', // 40% opaque
    borderRadius: 10,
    borderColor: '#F0F',
    borderWidth: 10,
    borderStyle: 'solid'
  },


  navbarButton: {
    width: 50,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  
  list: {
    height: AndroidWindow.height - 77,
    flex: 1
  },

  spinner: {
    width: 30
  },
  rowSeparator: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHighlighted: {
    opacity: 0.0
  },
  emptyList: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  emptyListText: {
    marginTop: 80,
    color: '#999'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});

