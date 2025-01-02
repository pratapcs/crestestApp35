import React, { useEffect } from 'react';

import { Provider as StoreProvider } from "react-redux";
import { store } from './store/store';

import { SafeAreaProvider } from "react-native-safe-area-context";

import NavigationController from "./controllers/NavigationController";

import SplashScreen from 'react-native-splash-screen';


const App = () => {


    useEffect(() => {
        SplashScreen.hide();
        return () => {
        };

    }, []);


    return (
        <>
            <StoreProvider store={store}>
                <SafeAreaProvider style={{ flex: 1 }}>
                    <NavigationController />
                </SafeAreaProvider>
            </StoreProvider>
        </>
    );
};

export default App;