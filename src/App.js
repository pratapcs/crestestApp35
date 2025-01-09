import React, { useEffect, useState, useRef } from 'react';

import { Provider as StoreProvider, connect, useDispatch } from "react-redux";
import { store } from './store/store';
import { isAuthenticated } from './store/selectors/AuthSelectors';

import { SafeAreaProvider } from "react-native-safe-area-context";

import NavigationController from "./controllers/NavigationController";

import NotificationController from "./controllers/NotificationController";

import SplashScreen from 'react-native-splash-screen';

import inAppMessaging from '@react-native-firebase/in-app-messaging';

import NetInfo from '@react-native-community/netinfo';

import NoData from './components/NoData';

import RBSheet from "react-native-raw-bottom-sheet";

import Toast from 'react-native-toast-message';
import Emitter from "./utils/Emitter";
import * as Events from './configs/Events';
import Loader from './components/Loader';
import { storeData, getData, clearAllData } from "./utils/Util";
import { checkAutoLogin } from './services/AuthService';

import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
// import VersionCheck from 'react-native-version-check';

// import ApkUpdateComponent from './components/ApkUpdateComponent'

import {
    View,
    StyleSheet,
    BackHandler,
    StatusBar,
    Alert,
    Linking
} from 'react-native';

let unsubscribe;
let appStateUnsubscribe;

const App = (props) => {

    const [isConnected, setIsConnected] = useState('')
    const [connectionType, setConnectionType] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState("")
    const [RBSheetContent, setRBSheetContent] = useState(null)
    const [RBSheetContentHeight, setRBSheetContentHeight] = useState(0)
    const [RBSheetContentClosingMethod, setRBSheetContentClosingMethod] = useState(null);
    const refRBSheet = useRef(null);

    const [isAlreadySignedIn, setIsAlreadySignedIn] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        checkAutoLogin(dispatch);

    }, [dispatch]);

    useEffect(() => {
        // SplashScreen.hide();
        setTimeout(() => {
            SplashScreen.hide()
        }, 1000)

        // inAppMessaging().setMessagesDisplaySuppressed(false);

        unsubscribe = NetInfo.addEventListener(state => {
            if (connectionType != state.type && isConnected != state.isConnected) {
                setConnectionType(state.type);
                setIsConnected(state.isConnected)
            }
        });
    },[]);

    /* useEffect(() => {
        const handleDeepLink = (event) => {
            const url = event.url;
            // Handle the URL appropriately
            // Alert.alert('Deep Link', url);
        };

        // Add event listener for deep links
        Linking.addEventListener('url', handleDeepLink);

        // Handle initial URL if app is opened from a link
        Linking.getInitialURL().then((url) => {
            if (url) {
                handleDeepLink({ url });
            }
        });

        // Clean up event listener
        return () => {
            Linking.removeEventListener('url', handleDeepLink);
        };
    }, []); */
    

    onPressExitHandler = () => {
        BackHandler.addEventListener(
            "hardwareBackPress",
            BackHandler.exitApp()
        );
    }

    useEffect(() => {
        Emitter.on(Events.SHOW_MESSAGE, (value) => onShowToastMessageHandler(value));
        Emitter.on(Events.SHOW_PRELOADER, (value) => onShowPreloaderHandler(value));
        Emitter.on(Events.HIDE_PRELOADER, (value) => onHidePreloaderHandler(value));
        Emitter.on(Events.SHOW_NOTIFICATION, (value) => onShowNotificationHandler(value));
        Emitter.on(Events.ACTION_NOTIFICATION, (value) => onActionNotificationHandler(value));
        Emitter.on(Events.WITHOUT_ACTION_NOTIFICATION, (value) => onWithOutActionNotificationHandler(value));
        Emitter.on(Events.SHOW_MENU_FROM_BOTTOM, (value) => onShowMenuFromBottomHandler(value));
        Emitter.on(Events.HIDE_MENU_FROM_BOTTOM, (value) => onHideMenuFromBottomHandler(value));

        async function getUserDetails() {
            let result = await getData("crestestUserDetails");
            result = JSON.parse(result);
            let userId = result['id'];
            let token = result['token'];

            if (token != '' && token != undefined) {
                setIsAlreadySignedIn(true)
            }
        };

        getUserDetails()

        return () => {
            Emitter.off(Events.SHOW_MESSAGE, (value) => onShowToastMessageHandler(value));
            Emitter.off(Events.SHOW_PRELOADER, (value) => onShowPreloaderHandler(value));
            Emitter.off(Events.HIDE_PRELOADER, (value) => onHidePreloaderHandler(value));
            Emitter.off(Events.SHOW_NOTIFICATION, (value) => onShowNotificationHandler(value));
            Emitter.off(Events.ACTION_NOTIFICATION, (value) => onActionNotificationHandler(value));
            Emitter.off(Events.WITHOUT_ACTION_NOTIFICATION, (value) => onWithOutActionNotificationHandler(value));
            Emitter.off(Events.SHOW_MENU_FROM_BOTTOM, (value) => onShowMenuFromBottomHandler(value));
            Emitter.off(Events.HIDE_MENU_FROM_BOTTOM, (value) => onHideMenuFromBottomHandler(null));
        };

    }, []);

    useEffect(() => {
        if (RBSheetContent != null && RBSheetContentHeight != null) {
            setTimeout(() => { refRBSheet.current.open() }, 1000)
            // refRBSheet.current.open();
        }
    }, [RBSheetContent, RBSheetContentHeight, RBSheetContentClosingMethod]);

    parseQueryString = async (url) => {
        
        let urlObject = parse(url, true);
        const token = urlObject.query["token"];
        const tokenId = urlObject.query["tokenId"];
        const flag = urlObject.query["flag"];
        
        // const isViewVideoUrl = urlObject.href.includes("view-video");
        const isViewVideoUrl = urlObject.href.includes("sign-up");

        let post_id, post_type, target_user_id;
        if (isLoginWithoutPasswordUrl) {
            GlobalConfigs.DEFAULT_ROUTE = ActionType.LOGIN_WITHOUT_PASSWORD;

        } else if (isViewVideoUrl) {
            post_id = urlObject.query["postId"] ? urlObject.query["postId"] : 0;//108;
            post_type = urlObject.query["postType"] ? urlObject.query["postType"] : 0;
            target_user_id = urlObject.query["targetUserId"] ? urlObject.query["targetUserId"] : 0;//519;

            objParams = {};
            objParams.post_id = post_id;
            objParams.post_type = post_type;
            objParams.target_user_id = target_user_id;
            this.setState({
                onLoadObjParams: objParams,
            }, () => {
                if (post_id == 0 || target_user_id == 0) {
                    //do nothing
                    GlobalConfigs.DEFAULT_ROUTE = null;
                } else {
                    GlobalConfigs.DEFAULT_ROUTE = ActionType.VIEW_VIDEO;
                }
            })
        } else if (isViewProfileUrl) {
            target_user_id = urlObject.query["targetUserId"] ? urlObject.query["targetUserId"] : 519;

            objParams = {};
            objParams.target_user_id = target_user_id;
            this.setState({
                onLoadObjParams: objParams,
            }, () => {
                GlobalConfigs.DEFAULT_ROUTE = ActionType.VIEW_PROFILE;
            })
        } else {
            //do nothing
            //TODO: Temp
        }

        log("TOKEN : ", token);
        log("TOKENID : ", tokenId);
        log("FLAG : ", flag);
        log("CONFIRM-EMAIL : ", isConfirmEmailUrl);
        log("RESET-PASSWORD : ", isResetPasswordUrl);
        log("VIEW-PROFILE : ", isViewProfileUrl);
        log("VIEW-VIDEO : ", isViewVideoUrl);

        if (token && tokenId) {
            Emitter.emit(Events.SHOW_PRELOADER, "Verifying...");
            //detect log in without password flow
            this.authorizeUser(token, tokenId, flag);

        } else {
            this.addAppListeners();
        }
    }

    const onShowPreloaderHandler = (value = "") => {
        let message;

        if (value == "") {
            message = "Loading...";
        } else {
            message = value;
        }
        setIsLoading(true)
        setLoadingMessage(message)
    }

    const onHidePreloaderHandler = (value = "") => {
        setIsLoading(false)
        setLoadingMessage("")
    }

    const onShowMenuFromBottomHandler = async (value) => {
        setRBSheetContent(value.component);
        setRBSheetContentHeight(value.componentHeight);
        setRBSheetContentClosingMethod(value.closingMethod);
    }

    const onHideMenuFromBottomHandler = () => {
        refRBSheet?.current?.close();
    }

    const onRBSheetCloseHandler = () => {
        if (RBSheetContentClosingMethod != null) {
            setRBSheetContentClosingMethod();
        }
    }

    const onShowToastMessageHandler = (value) => {
        Toast.show({
            type: value.type, //'success | error | info',
            position: 'top', //'top | bottom',
            text1: value.title,
            text2: value.message,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 65,
            bottomOffset: 40,
            onShow: () => { },
            onHide: () => { },
            onPress: () => { Toast.hide() },
        });
    }

    const onActionNotificationHandler = async (value) => {
        console.log("A222222222")

        /* let notify = value.notification;
        let param = JSON.parse(notify.userInfo);
        let otherId = JSON.parse(param.params);
        let action = notify.action == "Accept" ? "A3" : "A4";

        let result = await getData("userDetails");
        result = JSON.parse(result);
        let userId = result['user_id'];
        let token = result['token'];
        let formData = new FormData();
        formData.append('user_id', userId);
        formData.append('token', token);
        formData.append('other_user_id', otherId.target_user_id);
        formData.append('action', action);
        await postDataApi(Apis.POST_USER_CONNECTION_STATUS, formData)
            .then(async (response) => {
                //console.log(".................response..............", response);
                // navigationRef.current?.navigate('NonAuthMainScenes', {
                //     screen: 'NotificationTabScene',
                //     params: {},
                // })
            }).catch(errResponse => {
                //console.log(".................Error..............", errResponse);
            }); */
    }

    const onWithOutActionNotificationHandler = (value) => {
        console.log("onWithOutActionNotificationHandler------", value)

        // let notify = value.remoteMessage.data;
        let notify = { "name": "Pratap" };

        Emitter.emit(Events.SEND_REMOTE_NOTIFY, JSON.parse(notify.params));
    }

    const onShowNotificationHandler = async (value) => {

        let parent = this;

        let notify = value.notification.data;


        let result = await getData("crestestUserDetails");
        result = JSON.parse(result);
        let userId = result['user_id'];
        let token = result['token'];
        let profile_pic = result['profile_pic'];
        let comment_type = 1;


        if (navigationRef) {
            {
                (() => {
                    switch (notify.action) {
                        case "A3":
                            return (
                                navigationRef.current?.navigate('NonAuthSubScenes', {
                                    screen: 'PostVideoScene',
                                    params: { post_id: JSON.parse(notify.params).video_id },
                                })
                            );
                            break;

                        default:
                            return null;
                    }

                })()
            }
        }
    }


    return (
        <>

            <SafeAreaProvider style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                {/* <NotificationController /> */}
                <NavigationController singinCredential={props.isAuthenticated} />
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

                {isLoading ?
                    <Loader loadingMessage={loadingMessage} />
                    :
                    null
                }

                <RBSheet
                    ref={refRBSheet}
                    height={RBSheetContentHeight}
                    animationType={'slide'}
                    openDuration={250}
                    onClose={onRBSheetCloseHandler}
                    closeOnPressMask={false}
                    closeOnPressBack={false}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center",
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            paddingTop: 0,
                            // backgroundColor: 'rgba(255, 255, 255, 0)',
                            backgroundColor: 'rgba(231, 233, 228, 1)',
                        }
                    }}>

                    <>
                        {RBSheetContent}
                    </>

                </RBSheet>

                {/* <Toast style={{ top: -20 }} ref={(ref) => Toast.setRef(ref)} /> */}
                <Toast style={{ top: -20, zIndex: 99999999, elevation: 99999999, position: 'absolute' }} />

                {/* <ApkUpdateComponent />*/ }

            </SafeAreaProvider>
            {/* </StoreProvider > */}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};
export default connect(mapStateToProps)(App);
// export default App;

const styles = StyleSheet.create(
    {
        netConnectionView:
        {
            position: "absolute",
            width: '100%',
            height: '100%',
            flex: 1,
            // backgroundColor: 'rgba(0,0,0,0.6)',
            backgroundColor: '#023763',
            justifyContent: 'center',
            alignItems: 'center',
        },

        netConnectionInnerView:
        {
            backgroundColor: 'black',
            flex: 1,
            width: '100%',
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