import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Gstyles from '../../styles/GlobalStyle';
import { fonts } from '../../styles/Crestest.config';

import { container } from '../../styles/Crestest.config';
import HeaderComponent from '../../components/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartListComponent from '../Subscription/SubscriptionComponent/CartListComponent';
import { getData } from "../../utils/Util";

import HyperSdkReact from 'hyper-sdk-react';
import ApiClient from './ApiClient';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    ImageBackground,
    ScrollView,
    NativeEventEmitter,
    NativeModules,
    ActivityIndicator,
    Alert,
} from 'react-native';

import { Popup } from 'react-native-popup-confirm-toast';

import {
    removeAllData,
    removeData,
    showRightNavAction,
    scholasticSubscriptionSourceAction,
    compititiveSubscriptionSourceAction,
    cartSuccessAction,
    getCartData,
} from '../../store/actions/SubscribeAction';

import GlobalConfigs from "../../configs/GlobalConfigs";
import * as Apis from '../../apis/Apis';
import { CART_API } from '../../apis/Apis';

const Cart = props => {
    const dispatch = useDispatch();

    const [cartListTotal, setCartListTotal] = useState(0);
    const [student_id, setStudent_id] = useState('');
    const [student_email, setStudent_email] = useState("")
    const [student_phone, setStudent_phone] = useState("")
    const [isLoaderActive, setIsLoaderActive] = useState(false);
    const cartList = useSelector(state => state.subscribe.cartList);

    useEffect(() => {
        if (cartList.length > 0) {
            let payAmount = cartList
                .map(item => parseInt(item.payment_amount))
                .reduce((prev, next) => prev + next);

            setCartListTotal(parseFloat(payAmount).toFixed(2));
        } else {
            setCartListTotal(parseFloat(0).toFixed(2));
            dispatch(scholasticSubscriptionSourceAction([]));
            dispatch(compititiveSubscriptionSourceAction([]));
        }

    }, [cartList]);

    React.useEffect(() => {
        const callUpdateUserDetails = props.navigation.addListener('focus', () => {
            async function getUserDetails() {
                let result = await getData("crestestUserDetails");
                result = JSON.parse(result);

                let loging_id = result['id'];
                let email = result['email'];
                let mobile = result['mobile'];
                setStudent_id(loging_id)
                setStudent_email(email)
                setStudent_phone(mobile)
            };
            getUserDetails();
            dispatch(getCartData(props));
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return callUpdateUserDetails;
    }, [props.navigation]);

    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(NativeModules.HyperSdkReact);
        const theHyperEventEmitter = eventEmitter.addListener(
            'HyperEvent',
            hyperResponse => {
                const data = JSON.parse(hyperResponse);
                console.log("JSON.parse(hyperResponse) ->>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", JSON.parse(hyperResponse))
                const orderId = data.orderId || data.order_id;
                const event = data.event || '';

                var payload = {
                    order_id: orderId,
                    status: "CHARGED",
                    signature_algorithm: "HMAC-SHA256",
                    status_id: 21,
                    signature: generateCustomString(46),
                };

                // console.log(hyperResponse, 'hyperResponse');
                switch (event) {
                    case 'initiate_result':
                        setIsLoaderActive(true);
                        console.log("initiated ->>>>>>>>>>>>>>>>>>>>>>>>>>>>> ")
                    case 'hide_loader':
                        setIsLoaderActive(false);
                        console.log("hidden ->>>>>>>>>>>>>>>>>>>>>>>>>>>>> ")
                        break;
                    case 'process_result':
                        const innerPayload = data.payload || {};
                        const status = innerPayload.status || '';
                        // console.log(data.orderId, 'Process_result');

                        if (data.orderId != '' && data.orderId != undefined) {
                            // dispatch(cartSuccessAction(data.orderId, props));
                            dispatch(cartSuccessAction(payload.order_id, payload.status, payload.signature_algorithm, payload.status_id,  payload.signature, props));
                        }

                        switch (status) {
                            case 'backpressed':
                                console.log("why")
                                Alert.alert('Payment Failed', 'You have canceled the payment');
                                break;
                            case 'user_aborted':
                                Alert.alert('Payment Failed', 'User Aborted');
                                break;
                            default:
                        }
                        break;
                    default:
                    // console.log(data);
                }
            },
        );
        return () => {
            theHyperEventEmitter.remove();
        };
    }, []);

    function generateCustomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%';
        let result = '';
    
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
    
        return result;
    }
    

    const onDeleteHandlerWithAlert = (id, cart_amount) => {
        Popup.show({
            type: 'confirm',
            title: 'Are you sure',
            textBody: 'You want to delete this item?',
            confirmText: 'Cancel',
            buttonText: 'Ok',
            buttonContentStyle: { alignItems: 'center' },
            okButtonStyle: { backgroundColor: '#7cd1f9', width: 100 },
            confirmButtonStyle: { backgroundColor: '#e8e8e8', width: 100 },
            callback: () => {
                Popup.hide();
                onDeleteHandler(id, cart_amount);
            },
            cancelCallback: () => {
                Popup.hide();
            },
        });
    };
    const onDeleteHandler = (id, amount) => {
        dispatch(showRightNavAction(false));
        dispatch(removeData(id, amount));
    };

    const onAllDeleteHandlerWithAlert = () => {
        Popup.show({
            type: 'confirm',
            title: 'Are you sure',
            textBody: 'You want to delete all this item?',
            confirmText: 'Cancel',
            buttonText: 'Ok',
            buttonContentStyle: { alignItems: 'center' },
            okButtonStyle: { backgroundColor: '#7cd1f9', width: 100 },
            confirmButtonStyle: { backgroundColor: '#e8e8e8', width: 100 },
            callback: () => {
                Popup.hide();
                onAllDeleteHandler();
            },
            cancelCallback: () => {
                Popup.hide();
            },
        });
    };

    const onAllDeleteHandler = () => {
        dispatch(showRightNavAction(false));
        dispatch(removeAllData());
    };

    const showOnProceedBuyHandler = () => {
        Popup.show({
            type: 'confirm',
            title: 'Are you sure',
            textBody: 'Are you sure you want to proceed?',
            confirmText: 'Cancel',
            buttonText: 'Ok',
            buttonContentStyle: { alignItems: 'center' },
            okButtonStyle: { backgroundColor: '#7cd1f9', width: 100 },
            confirmButtonStyle: { backgroundColor: '#e8e8e8', width: 100 },
            callback: () => {
                Popup.hide();
                onProceedBuyHandler();
            },
            cancelCallback: () => {
                Popup.hide();
            },
        });
    };

    const onProceedBuyHandler = () => {
        setIsLoaderActive(true);
        startPayment();
    };

    const startPayment = () => {
        const timestamp = Date.now();
        var payload = {
            order_id: `test-${timestamp}`,
            //   amount: 8,
            amount: cartListTotal,
            student_phone: student_phone,
            student_email: student_email,
            student_id: student_id,
        };
        // ApiClient.sendPostRequest(CART_API, payload, {
        ApiClient.sendPostRequest(GlobalConfigs.API_URL + Apis.CART_API, payload, {
            onResponseReceived: response => {
                console.log(JSON.parse(response).sdk_payload, 'Payment Intent');
                HyperSdkReact.openPaymentPage(
                    JSON.stringify(JSON.parse(response).sdk_payload),
                );
            },
            onFailure: error => {
                console.error('POST request failed:', error);
            },
        });
    };

    const leftIconHandeler = () => {
        props.navigation.goBack();
    };

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'none'}
                style={container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#245C75"
                    translucent
                    hidden={false}
                />
                <HeaderComponent
                    headerName="Cart"
                    leftIcon="chevron-back"
                    leftIconHandeler={leftIconHandeler}
                />
                <ImageBackground
                    source={require('../../assets/images/background_base.png')}
                    style={Gstyles.imageBackgroundContainer}>
                    <View style={styles.parentContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.topDetailsContainer}>
                                <View>
                                    <Text style={styles.itemDetails}>
                                        Subtotal ( {cartList.length} item
                                        {cartList.length > 1 ? 's' : null} )
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.itemDetails}>{cartListTotal}</Text>
                                </View>
                            </View>

                            <View style={styles.topTotalContainer}>
                                <View>
                                    <Text style={styles.itemDetails}>Total</Text>
                                </View>
                                <View>
                                    <Text style={styles.itemDetails}>{cartListTotal}</Text>
                                </View>
                            </View>

                            <View></View>
                        </View>

                        <View style={styles.middleContainer}>
                            <ScrollView
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={styles.scrollViewContainer}
                                showsVerticalScrollIndicator={false}>
                                {cartList.map((item, index) => {
                                    return (
                                        <CartListComponent
                                            key={item.id}
                                            category={item.category}
                                            type={item.type_name}
                                            class={item.class}
                                            subject={item.subject_name}
                                            mock={item.no_mock}
                                            module={item.no_module}
                                            set={JSON.parse(item.no_set)}
                                            price={item.cart_amount}
                                            categoryId={item.exam_category_id}
                                            casestudy={item.no_casestudy}
                                            library={item.has_library}
                                            onlyElibrary={item.only_elibrary}
                                            // deleteHandler={() => onDeleteHandler(item.id, item.cart_amount)}
                                            deleteHandler={() =>
                                                onDeleteHandlerWithAlert(item.id, item.cart_amount)
                                            }
                                            exam_type={item.exam_type}
                                        />
                                    );
                                })}
                            </ScrollView>
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity
                                disabled={cartList.length > 0 ? false : true}
                                onPress={() => onAllDeleteHandlerWithAlert()}
                                style={[
                                    styles.buttonContainer,
                                    styles.deleteBackground,
                                    { opacity: cartList.length > 0 ? 1 : 0.4 },
                                ]}>
                                <View>
                                    <Ionicons name="trash-outline" size={20} color={'#000'} />
                                </View>
                                <View>
                                    <Text style={[styles.textdetails, styles.deleteTextColor]}>
                                        Delete all item
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={cartList.length > 0 ? false : true}
                                onPress={() => showOnProceedBuyHandler()}
                                style={[
                                    styles.buttonContainer,
                                    styles.buyBackground,
                                    { opacity: cartList.length > 0 ? 1 : 0.4 },
                                ]}>
                                <View>
                                    <Ionicons name="cart-sharp" size={20} color={'#000'} />
                                </View>
                                <View>
                                    <Text style={[styles.textdetails, styles.buyTextColor]}>
                                        Proceed to buy
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {isLoaderActive && (
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: '#0000003f',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ActivityIndicator size={'large'} color={'red'} />
                        </View>
                    )}
                </ImageBackground>
            </KeyboardAvoidingView >
        </>
    );
};

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    topContainer: {
        flex: 0.3,
        backgroundColor: '#1D5068',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    middleContainer: {
        flex: 1,
        paddingVertical: 10,
    },
    bottomContainer: {
        flex: 0.1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    topDetailsContainer: {
        paddingHorizontal: 15,
        height: 70,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topTotalContainer: {
        paddingHorizontal: 15,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemDetails: {
        color: '#fff',
        fontFamily: fonts.rRold,
        fontSize: 14,
    },
    buttonContainer: {
        width: 150,
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    deleteBackground: {
        backgroundColor: '#F2AFAF',
    },
    buyBackground: {
        backgroundColor: '#E0B326',
    },
    textdetails: {
        marginLeft: 5,
        fontFamily: fonts.rRold,
        fontSize: 14,
    },
    deleteTextColor: {
        color: '#000',
    },
    buyTextColor: {
        color: '#fff',
    },
    scrollViewContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default Cart;