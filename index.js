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

const RNRedux = () => (
    <Provider store={store}>
        <PopupRootProvider>
            <App />
        </PopupRootProvider>
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
// AppRegistry.registerComponent(appName, () => App);
