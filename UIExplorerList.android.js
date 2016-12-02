'use strict';

export type UIExplorerModule = {
  key: string,
  module: Object,
};

const ComponentExamples: Array<UIExplorerModule> = [
  {
    key: 'newemplist',
    module: require('./NewEmployees'),
  },
  {
    key: 'NewEmployeeDetail',
    module: require('./NewEmployeeDetail'),
  },
  {
    key: 'ImageExample',
    module: require('./ImageExample'),
  },
  {
    key: 'ListViewExample',
    module: require('./ListViewExample'),
  },
  {
    key: 'ReportDetail',
    module: require('./ReportDetail'),
  },
  {
    key: 'ListViewPagingExample',
    module: require('./ListViewPagingExample'),
  },
  {
    key: 'ModalExample',
    module: require('./ModalExample'),
  },
  {
    key: 'templatelist',
    module: require('./ContractTemplateSetup'),
  },
  {
    key: 'ProgressBarAndroidExample',
    module: require('./ProgressBarAndroidExample'),
  },
  {
    key: 'RefreshControlExample',
    module: require('./RefreshControlExample'),
  },
  {
    key: 'ScrollViewSimpleExample',
    module: require('./ScrollViewSimpleExample'),
  },
  {
    key: 'SliderExample',
    module: require('./SliderExample'),
  },
  {
    key: 'StatusBarExample',
    module: require('./StatusBarExample'),
  },
  {
    key: 'SwipeableListViewExample',
    module: require('./SwipeableListViewExample')
  },
  {
    key: 'SwitchExample',
    module: require('./SwitchExample'),
  },

  {
    key: 'payrollposting',
    module: require('./SQLReportsListView'),
  },
  {
    key: 'ToolbarAndroidExample',
    module: require('./ToolbarAndroidExample'),
  },
  {
    key: 'TouchableExample',
    module: require('./TouchableExample'),
  },
  {
    key: 'ViewExample',
    module: require('./ViewExample'),
  },
  {
    key: 'ViewPagerAndroidExample',
    module: require('./ViewPagerAndroidExample'),
  },
  {
    key: 'WebViewExample',
    module: require('./WebViewExample'),
  },
  {
    key: 'payrollcalculation',
    module: require('./PayrollCalculation'),
  },  
];

const APIExamples: Array<UIExplorerModule> = [
  {
    key: 'AccessibilityAndroidExample',
    module: require('./AccessibilityAndroidExample'),
  },
  {
    key: 'AlertExample',
    module: require('./AlertExample').AlertExample,
  },
  {
    key: 'AppStateExample',
    module: require('./AppStateExample'),
  },
  {
    key: 'CameraRollExample',
    module: require('./CameraRollExample'),
  },
  {
    key: 'ClipboardExample',
    module: require('./ClipboardExample'),
  },
  {
    key: 'DatePickerAndroidExample',
    module: require('./DatePickerAndroidExample'),
  },
  {
    key: 'GeolocationExample',
    module: require('./GeolocationExample'),
  },
  {
    key: 'ImageEditingExample',
    module: require('./ImageEditingExample'),
  },
  {
    key: 'LinkingExample',
    module: require('./LinkingExample'),
  },
  {
    key: 'LayoutAnimationExample',
    module: require('./LayoutAnimationExample'),
  },
  {
    key: 'LayoutExample',
    module: require('./LayoutExample'),
  },
  {
    key: 'NativeAnimationsExample',
    module: require('./NativeAnimationsExample'),
  },
  {
    key: 'NavigationExperimentalExample',
    module: require('./NavigationExperimental/NavigationExperimentalExample'),
  },
  {
    key: 'NetInfoExample',
    module: require('./NetInfoExample'),
  },
  {
    key: 'OrientationChangeExample',
    module: require('./OrientationChangeExample'),
  },
  {
    key: 'PanResponderExample',
    module: require('./PanResponderExample'),
  },
  {
    key: 'PermissionsExampleAndroid',
    module: require('./PermissionsExampleAndroid'),
  },
  {
    key: 'PointerEventsExample',
    module: require('./PointerEventsExample'),
  },
  {
    key: 'RTLExample',
    module: require('./RTLExample'),
  },
  {
    key: 'ShareExample',
    module: require('./ShareExample'),
  },
  {
    key: 'TimePickerAndroidExample',
    module: require('./TimePickerAndroidExample'),
  },
  {
    key: 'TimerExample',
    module: require('./TimerExample'),
  },
  {
    key: 'ToastAndroidExample',
    module: require('./ToastAndroidExample'),
  },
  {
    key: 'TransformExample',
    module: require('./TransformExample'),
  },
  {
    key: 'VibrationExample',
    module: require('./VibrationExample'),
  },
  {
    key: 'WebSocketExample',
    module: require('./WebSocketExample'),
  },
  {
    key: 'XHRExample',
    module: require('./XHRExample'),
  },
];

const Modules = {};

APIExamples.concat(ComponentExamples).forEach(Example => {
  Modules[Example.key] = Example.module;
});

const UIExplorerList = {
  APIExamples,
  ComponentExamples,
  Modules,
};

module.exports = UIExplorerList;
