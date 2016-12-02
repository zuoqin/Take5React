'use strict';

const React = require('react');
const {
  Platform,
} = require('react-native');
const UIExplorerBlock = require('./UIExplorerBlock');
const UIExplorerPage = require('./UIExplorerPage');
const View = require('View');
const invariant = require('fbjs/lib/invariant');

class UIExplorerModuleContainer extends React.Component {
  renderModule(module, i) {
    // Filter platform-specific modules
    var {title, description, platform} = module;
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
        {module.render()}
      </UIExplorerBlock>
    );
  }

  render(): ReactElement<any> {
    if (!this.props.module.modules) {      
      return <this.props.module 
        passProps = {this.props.passProps}
      />
    }

    return (
      <UIExplorerPage title={this.props.title}>
        {this.props.module.modules.map(this.renderModule)}
      </UIExplorerPage>
    );
  }
}

module.exports = UIExplorerModuleContainer;
