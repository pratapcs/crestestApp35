import React, { useEffect, useState } from 'react';

import { Provider as StoreProvider } from "react-redux";
import { store } from './store/store';

import { SafeAreaProvider } from "react-native-safe-area-context";

import NavigationController from "./controllers/NavigationController";

import SplashScreen from 'react-native-splash-screen';

import inAppMessaging from '@react-native-firebase/in-app-messaging';

import NetInfo from '@react-native-community/netinfo';

import NoData from './components/NoData';

import {
    View,
    StyleSheet,
    BackHandler,
} from 'react-native';

let unsubscribe;
let appStateUnsubscribe;

const App = () => {

    const [isConnected, setIsConnected] = useState('')
    const [connectionType, setConnectionType] = useState('')


    useEffect(() => {
        SplashScreen.hide();
        inAppMessaging().setMessagesDisplaySuppressed(false);

        unsubscribe = NetInfo.addEventListener(state => {
            if (connectionType != state.type && isConnected != state.isConnected) {
                setConnectionType(state.type);
                setIsConnected(state.isConnected)
            }
        });
    });

    onPressExitHandler = () => {
        BackHandler.addEventListener(
            "hardwareBackPress",
            BackHandler.exitApp()
        );
    }


    return (
        <>
            <StoreProvider store={store}>
                <SafeAreaProvider style={{ flex: 1 }}>
                    <NavigationController />
                    {
                        isConnected || isConnected == null ? (

                            null

                        ) : (

                            <View style={styles.netConnectionView}>
                                <View style={styles.netConnectionInnerView}>
                                    <NoData
                                        title={"You're offline"}
                                        subtitle={'Check Your internet connection and try again'}
                                        imageIcon={require('./assets/images/no_internet_connection_icon.png')}
                                        goBackIcon={true}
                                        goBackScreen={() => this.onPressExitHandler()}
                                        isIcon={true}
                                        isbackcolor={true}
                                        backColor='#137999'
                                        btnTitle={'EXIT FROM APP'}
                                    />
                                </View>
                            </View>
                        )}
                </SafeAreaProvider>
            </StoreProvider>
        </>
    );
};

export default App;

const styles = StyleSheet.create(
    {
        netConnectionView:
        {
            position: "absolute",
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(0,0,0,0.6)',
            backgroundColor: '#023763',
            justifyContent: 'center',
            alignItems: 'center',
        },

        netConnectionInnerView:
        {
            backgroundColor: 'black',
        },

        container:
        {
            flex: 1,
            backgroundColor: '#023763',
        },


        centeredView: {
            flex: 1,
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundColor: '#023763',
            alignItems: 'center',
            justifyContent: 'center',
        },
        markSolutionbackground:
        {
            width: 270,
            height: 150,
            backgroundColor: '#f1463e',
            alignItems: 'center',
            padding: 10,
            borderRadius: 15,
        },
        statusTex:
        {
            color: '#ffffff',
            fontSize: 16,
            marginVertical: 10,
        },
        buttonMainContainer:
        {
            flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 15,
        },
        buttonStyle:
        {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#36424a',
            padding: 6,
            width: 100,
            height: 33,
            borderRadius: 10,
        },
        rejectText:
        {
            textAlign: 'center',
            color: '#5cc151',
            textTransform: 'uppercase',
        },
        confirmText:
        {
            textAlign: 'center',
            color: '#f1463e',
            textTransform: 'uppercase',
        },

    }); 