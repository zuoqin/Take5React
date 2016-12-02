'use strict';

const AppRegistry = require('AppRegistry');
const AsyncStorage = require('AsyncStorage');
const BackAndroid = require('BackAndroid');
const Dimensions = require('Dimensions');
const DrawerLayoutAndroid = require('DrawerLayoutAndroid');
const Linking = require('Linking');
const React = require('react');
const StatusBar = require('StatusBar');
const StyleSheet = require('StyleSheet');
const ToolbarAndroid = require('ToolbarAndroid');
const UIExplorerModuleContainer = require('./UIExplorerModuleContainer');
const UIExplorerModulesList = require('./UIExplorerModulesList');
const UIExplorerList = require('./UIExplorerList');
const UIExplorerNavigationReducer = require('./UIExplorerNavigationReducer');
const UIExplorerStateTitleMap = require('./UIExplorerStateTitleMap');
const UIManager = require('UIManager');
const URIActionMap = require('./URIActionMap');
const View = require('View');

const Alert = require('Alert');
const Text = require('Text');
const Login = require('./Login');

import type {UIExplorerNavigationState} from './UIExplorerNavigationReducer';

UIManager.setLayoutAnimationEnabledExperimental(true);

const DRAWER_WIDTH_LEFT = 56;

type Props = {
  appFromAppetizeParams: string,
};

type State = UIExplorerNavigationState & {
  externalModule: ?string,
};

class T5PHRMS extends React.Component {
  _handleAction: Function;
  _renderDrawerContent: Function;
  state: State;
  constructor(props: Props) {
    super(props);
    this.username='nacho';
    this.password='111';
    this._handleAction = this._handleAction.bind(this);
    this._renderDrawerContent = this._renderDrawerContent.bind(this);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButtonPress.bind(this));
  }

  componentDidMount() {
    Linking.getInitialURL().then((url) => {
      AsyncStorage.removeItem('UIExplorerAppState');
      //AsyncStorage.setItem('UIExplorerAppState', JSON.stringify({isLoggedIn: false}));
      AsyncStorage.getItem('UIExplorerAppState', (err, storedString) => {
        const moduleAction = URIActionMap(this.props.appFromAppetizeParams);
        const urlAction = URIActionMap(url);
        const launchAction = moduleAction || urlAction;
        if (err || !storedString) {
          const initialAction = launchAction || {type: 'InitialAction'};
     
          this.setState(UIExplorerNavigationReducer(null, initialAction));
          this.setState({isLoggedIn: false});
          return;
        }
        const storedState = JSON.parse(storedString);
        if (launchAction) {
          if( storedState.isLoggedIn === undefined || storedState.isLoggedIn === null){
            storedState.isLoggedIn = false;
          }          
          this.setState(UIExplorerNavigationReducer(storedState, launchAction));
          return;
        }
        if( storedState.isLoggedIn === undefined ){
          storedState.isLoggedIn = false;
        }
        this.setState(storedState);
      });
    });
  }

  render() {
    if (!this.state) {
      <View style={styles.drawerContentWrapper}>
      <Text> kjhjhkjhkjh </Text>

      </View>
      return null;
    }
    return (
      <View style={styles.drawerContentWrapper}>
     


      <DrawerLayoutAndroid
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
        keyboardDismissMode="on-drag"
        onDrawerOpen={() => {
          this._overrideBackPressForDrawerLayout = true;
        }}
        onDrawerClose={() => {
          this._overrideBackPressForDrawerLayout = false;
        }}
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={this._renderDrawerContent}
        statusBarBackgroundColor="#589c90">
        {this._renderApp()}
      </DrawerLayoutAndroid>      
      </View>



    );
  }

  _renderDrawerContent() {
    //console.log('inside render Drawer');
    if(this.state.isLoggedIn === true){
      return(
        <View style={styles.drawerContentWrapper}>
          
          <UIExplorerModulesList
            isLoggedIn={this.state.isLoggedIn}
            token = {this.state.token}
            list={UIExplorerList}
            displayTitleRow={true}
            disableSearch={false}
            onNavigate={this._handleAction}
          />
        </View>);
    }else{
      return
        (<View style={styles.drawerContentWrapper}>
          <Text> 'Please login to the system' </Text>
        </View>);
    }
  };

  setLoginUser(responsedata){
    //this._showAlert('Download', 'Logged in successfull: ' + responsedata.access_token);

    this.setState(
      {
        isLoggedIn: true,
        token: responsedata.access_token
      },
      () => AsyncStorage.setItem('UIExplorerAppState', JSON.stringify(this.state))
    );
    //this._renderDrawerContent();
    
  };

  _showAlert(title, message) {
    //console.log('1111111Ask me later pressed');
    // Works on both iOS and Android
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )    
  }

  
  onLogin(){

    var body = 'grant_type=password&username=' + this.username + '&password=' + this.password;

    console.log('trying to login with body: ' + body);
    var settings = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    };      
    fetch("http://192.168.123.33:3000/token", settings)
      .then((response) => response.json())
      .then((responseData) => {
        this.setLoginUser(responseData);
        console.log(responseData);
      })
      .catch((error) => {
        this._showAlert('Login', 'Logged in with error: ' + error.message);
        this.state.isLoading = false;
        this.state.resultsData = this.setPageGetResult([]);//this.getDataSource([])
      })    
  }

  
  _renderApp() {
    const {
      externalModule,
      stack,
    } = this.state;
    if (externalModule) {
      const Component = UIExplorerList.Modules[externalModule];
      return (
        <Component
          onModuleExit={() => {
            this._handleAction({ type: 'BackAction' });
          }}
          ref={(t5pmodule) => { this._moduleRef = t5pmodule; }}
        />
      );
    }
    const title = UIExplorerStateTitleMap(stack.routes[stack.index]);
    const index = stack.routes.length <= 1 ?  1 : stack.index;
    
    if (stack && stack.routes[index]) {
      const {key, passProps} = stack.routes[index];
      const T5PModule = UIExplorerList.Modules[key];
      return (
        <View style={styles.container}>
          <ToolbarAndroid
            logo={require('./ic_launcher.png')}
            navIcon={require('./ic_create_black.png')}
            onIconClicked={() => this.drawer.openDrawer()}
            style={styles.toolbar}
            title={title}
          />
          <UIExplorerModuleContainer
            module={T5PModule}
            passProps = {passProps}
            ref={(t5pmodule) => { this._moduleRef = t5pmodule; }}
          />
        </View>
      );
    }

    if(this.state.isLoggedIn === true){
      return (
        <View style={styles.container}>
          <ToolbarAndroid
            logo={require('./ic_launcher.png')}
            navIcon={require('./ic_create_black.png')}
            onIconClicked={() => this.drawer.openDrawer()}
            style={styles.toolbar}
            title={title}
          />
        <UIExplorerModulesList
        isLoggedIn={this.state.isLoggedIn}
        token = {this.state.token}
        onNavigate={this._handleAction}
        list={UIExplorerList}
        {...stack.routes[0]}
        />
        </View>)
    } else{
      return(  <View style={[styles.listContainer, this.props.style]}>


        <Login
        onLogin = {(event) => {
          this.onLogin(event);
          
          console.log('on login in index.android');
        }}
        
        onEndUserNameEditing={(event) => {
          console.log('user name finished change');
          var username = event.nativeEvent.text;
          console.log(username);

          this.username = username;
        }}

        onPasswordChange={(event) => {
          console.log('password finished editing');
          var password = event.nativeEvent.text;
          console.log(password);

          this.password = password;
        }}
        
        />        
      </View>)
    };
  }

  _handleAction(action: Object): boolean {
    this.drawer && this.drawer.closeDrawer();
    const newState = UIExplorerNavigationReducer(this.state, action);
    if (this.state !== newState) {
      this.setState(
        newState,
        () => AsyncStorage.setItem('UIExplorerAppState', JSON.stringify(this.state))
      );
      return true;
    }
    return false;
  }

  _handleBackButtonPress() {
    if (this._overrideBackPressForDrawerLayout) {
      // This hack is necessary because drawer layout provides an imperative API
      // with open and close methods. This code would be cleaner if the drawer
      // layout provided an `isOpen` prop and allowed us to pass a `onDrawerClose` handler.
      this.drawer && this.drawer.closeDrawer();
      return true;
    }
    if (
      this._moduleRef &&
      this._moduleRef.handleBackAction &&
      this._moduleRef.handleBackAction()
    ) {
      return true;
    }
    return this._handleAction({ type: 'BackAction' });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#E9EAED',
    height: 56,
  },
  drawerContentWrapper: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('T5PHRMS', () => T5PHRMS);
