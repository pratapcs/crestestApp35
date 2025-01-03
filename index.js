/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
//import App from './App';
import App from './src/App';
import { name as appName } from './app.json';

import { Provider } from 'react-redux';
import { store } from './src/store/store';

import { Root as PopupRootProvider } from 'react-native-popup-confirm-toast';

import {Text, TextInput} from 'react-native';

const RNRedux = () => (
    <Provider store={store}>
        <PopupRootProvider>
            <App />
        </PopupRootProvider>
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
// AppRegistry.registerComponent(appName, () => App);

//ADD this 
if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
    TextInput.defaultProps.allowFontScaling = false;
}