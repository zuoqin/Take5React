'use strict';

const React = require('react');
const {
  Platform,
} = require('react-native');
const UIExplorerBlock = require('./UIExplorerBlock');
const UIExplorerPage = require('./UIExplorerPage');
const View = require('View');
const invariant = require('fbjs/lib/invariant');

class UIExplorerExampleContainer extends React.Component {
  renderExample(example, i) {
    // Filter platform-specific examples
    var {title, description, platform} = example;
    if (platform) {
      if (Platform.OS !== platform) {
        return null;
      }
      title += ' (' + platform + ' only)';
    }
    return (
      <UIExplorerBlock
        key={i}
        title={title}
        description={description}>
        {example.render()}
      </UIExplorerBlock>
    );
  }

  render(): ReactElement<any> {
    if (!this.props.module.examples) {
      var props = {
        onNavigate: this.props.passProps.onNavigate,
        empname: this.props.passProps.empname,
        empid: this.props.passProps.empid,
        birthday: this.props.passProps.birthday
      };
      return <this.props.module 
        passProps = {props}
      />
    }

    return (
      <UIExplorerPage title={this.props.title}>
        {this.props.module.examples.map(this.renderExample)}
      </UIExplorerPage>
    );
  }
}

module.exports = UIExplorerExampleContainer;
