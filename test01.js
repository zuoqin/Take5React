'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = ReactNative;
var UIExplorerBlock = require('./UIExplorerBlock');
var UIExplorerPage = require('./UIExplorerPage');

var SwitchAndroid = require('SwitchAndroid');
var ToolbarAndroid = require('ToolbarAndroid');

class T5PHRMS extends React.Component {
  static title = '<ToolbarAndroid>';
  static description = 'Examples of using the Android toolbar.';

  state = {
    actionText: 'Example app with toolbar component',
    toolbarSwitch: false,
    colorProps: {
      titleColor: '#3b5998',
      subtitleColor: '#6a7180',
    },
  };

  render() {
    return (
      <UIExplorerPage title="<ToolbarAndroid>">
        <UIExplorerBlock title="Toolbar with title/subtitle and actions">
          <ToolbarAndroid
            actions={toolbarActions}
            navIcon={require('./ic_menu_black.png')}
            onActionSelected={this._onActionSelected}
            onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
            style={styles.toolbar}
            subtitle={this.state.actionText}
            title="Toolbar" />
          <Text>{this.state.actionText}</Text>
        </UIExplorerBlock>
        <UIExplorerBlock title="Toolbar with logo & custom title view (a View with Switch+Text)">
          <ToolbarAndroid
            logo={require('./ic_launcher.png')}
            style={styles.toolbar}>
            <View style={{height: 56, flexDirection: 'row', alignItems: 'center'}}>
              <SwitchAndroid
                value={this.state.toolbarSwitch}
                onValueChange={(value) => this.setState({'toolbarSwitch': value})} />
              <Text>{'\'Tis but a switch'}</Text>
            </View>
          </ToolbarAndroid>
        </UIExplorerBlock>
        <UIExplorerBlock title="Toolbar with no icon">
          <ToolbarAndroid
            actions={toolbarActions}
            style={styles.toolbar}
            subtitle="There be no icon here" />
        </UIExplorerBlock>
        <UIExplorerBlock title="Toolbar with navIcon & logo, no title">
          <ToolbarAndroid
            actions={toolbarActions}
            logo={require('./ic_launcher.png')}
            navIcon={require('./ic_menu_black.png')}
            style={styles.toolbar} />
        </UIExplorerBlock>
        <UIExplorerBlock title="Toolbar with custom title colors">
          <ToolbarAndroid
            navIcon={require('./ic_menu_black.png')}
            onIconClicked={() => this.setState({colorProps: {}})}
            title="Wow, such toolbar"
            style={styles.toolbar}
            subtitle="Much native"
            {...this.state.colorProps} />
          <Text>
            Touch the icon to reset the custom colors to the default (theme-provided) ones.
          </Text>
        </UIExplorerBlock>
        <UIExplorerBlock title="Toolbar with remote logo & navIcon">
          <ToolbarAndroid
            actions={[{title: 'Bunny', icon: require('./bunny.png'), show: 'always'}]}
            logo={require('./hawk.png')}
            navIcon={require('./bunny.png')}
            title="Bunny and Hawk"
            style={styles.toolbar} />
        </UIExplorerBlock>
        <UIExplorerBlock title="Toolbar with custom overflowIcon">
          <ToolbarAndroid
            actions={toolbarActions}
            overflowIcon={require('./bunny.png')}
            style={styles.toolbar} />
        </UIExplorerBlock>
      </UIExplorerPage>
    );
  }

  _onActionSelected = (position) => {
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title,
    });
  };
}

var toolbarActions = [
  {title: 'Create', icon: require('./ic_create_black.png'), show: 'always'},
  {title: 'Filter'},
  {title: 'Settings', icon: require('./ic_settings_black.png'), show: 'always'},
];

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
});


AppRegistry.registerComponent('T5PHRMS', () => T5PHRMS);