import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Gstyles from '../../styles/GlobalStyle';
import subjectIcon from '../../assets/images/subjectIcon.png';
import { colors, fonts, } from '../../styles/Crestest.config';

import { container } from '../../styles/Crestest.config';
import HeaderComponent from '../../components/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartListComponent from '../Subscription/SubscriptionComponent/CartListComponent'

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
} from 'react-native';

import { Popup } from 'react-native-popup-confirm-toast'

import { sideNavAction, removeAllData, removeData, proceedbuyData, getCartData, showRightNavAction, subscribeLoading, scholasticSubscriptionSourceAction, compititiveSubscriptionSourceAction } from '../../store/actions/SubscribeAction';

import { cartDetailsData } from '../../store/actions/SubjectAction';


const Cart = (props) => {

    const dispatch = useDispatch();

    const [cartListTotal, setCartListTotal] = useState(0);
    const [isLoaderActive, setIsLoaderActive] = useState(false);
    const cartList = useSelector(state => state.subscribe.cartList);

    useEffect(() => {

        if (cartList.length > 0) {
            let payAmount = cartList.map(item => parseInt(item.payment_amount)).reduce((prev, next) => prev + next)

            setCartListTotal(parseFloat(payAmount).toFixed(2))
        } else {
            // console.log("Process Panel")
            setCartListTotal(parseFloat(0).toFixed(2))
            dispatch(scholasticSubscriptionSourceAction([]))
            dispatch(compititiveSubscriptionSourceAction([]))
        }
    }, [cartList]);

    useEffect(() => {
        const eventEmitter = new NativeEventEmitter(NativeModules.HyperSdkReact);
        eventEmitter.addListener("HyperEvent", (resp) => {
            const data = JSON.parse(resp);
            const orderId = data.orderId;
            const event = data.event || "";
            console.log("@111")
            switch (event) {
                case "initiate_result":
                case "hide_loader":
                    //Handle initiate_result and hide_loader
                    // this.setState({ isLoaderActive: false });
                    setIsLoaderActive(false);
                    break;
                //block:start:handle-process-result

                case "process_result":
                    const innerPayload = data.payload || {};
                    const status = innerPayload.status || "";
                    switch (status) {
                        case "backpressed":
                        case "user_aborted":
                            //Handle Backpress or user aborted case
                            break;
                        default:
                            this.props.navigation.navigate("Response", {
                                orderId: orderId,
                            });
                    }
                    break;
                default:
                    console.log(data);
            }
        });
        // 

    }, []);

    const onDeleteHandlerWithAlert = (id, cart_amount) => {
        // console.log("submitDemoExamHandeler====")
        Popup.show({
            type: 'confirm',
            title: 'Are you sure',
            textBody: 'You want to delete this item?',
            confirmText: 'Cancel',
            buttonText: 'Ok',
            buttonContentStyle: { alignItems: 'center', },
            okButtonStyle: { backgroundColor: '#7cd1f9', width: 100 },
            confirmButtonStyle: { backgroundColor: '#e8e8e8', width: 100 },
            callback: () => {
                // alert('Okey Callback && hidden');
                Popup.hide();
                onDeleteHandler(id, cart_amount);
            },
            cancelCallback: () => {
                // alert('Cancel Callback && hidden');
                Popup.hide();
            },
        })
    }
    const onDeleteHandler = (id, amount) => {
        dispatch(showRightNavAction(false))
        dispatch(removeData(id, amount));
    }

    const onAllDeleteHandlerWithAlert = () => {
        Popup.show({
            type: 'confirm',
            title: 'Are you sure',
            textBody: 'You want to delete all this item?',
            confirmText: 'Cancel',
            buttonText: 'Ok',
            buttonContentStyle: { alignItems: 'center', },
            okButtonStyle: { backgroundColor: '#7cd1f9', width: 100 },
            confirmButtonStyle: { backgroundColor: '#e8e8e8', width: 100 },
            callback: () => {
                // alert('Okey Callback && hidden');
                Popup.hide();
                onAllDeleteHandler();
            },
            cancelCallback: () => {
                // alert('Cancel Callback && hidden');
                Popup.hide();
            },
        })
    }

    const onAllDeleteHandler = () => {
        dispatch(showRightNavAction(false))
        dispatch(removeAllData());
    }

    const showOnProceedBuyHandler = () => {
        Popup.show({
            type: 'confirm',
            title: 'Are you sure',
            textBody: 'Are you sure you want to proceed?',
            confirmText: 'Cancel',
            buttonText: 'Ok',
            buttonContentStyle: { alignItems: 'center', },
            okButtonStyle: { backgroundColor: '#7cd1f9', width: 100 },
            confirmButtonStyle: { backgroundColor: '#e8e8e8', width: 100 },
            callback: () => {
                // alert('Okey Callback && hidden');
                Popup.hide();
                onProceedBuyHandler();
            },
            cancelCallback: () => {
                // alert('Cancel Callback && hidden');
                Popup.hide();
            },
        })
    }

    const onProceedBuyHandler = () => {
        console.log("onProceedBuyHandler--------Pending--",)
        // const timestamp = Date.now();

        // dispatch(proceedbuyData(props.cartList, cartListTotal, timestamp, regUserSubOrNot, is_subscribe_e_library, props));
        startPayment()
        // dispatch(cartDetailsData(props));
    }

    const startPayment = () => {
        setIsLoaderActive(true);
        // block:start:updateOrderID
        const timestamp = Date.now();
        var payload = {
            // order_id: `test-${getRandomNumber()}`,
            order_id: `test-${timestamp}`,
            // amount: this.state.total,
            amount: cartListTotal,
        };
        // block:end:updateOrderID

        // https://lmsapi.clvdev.in/apiv2/lms/subscribe/paymentcall
        {console.log("payload---", payload)}
        ApiClient.sendPostRequest(
            
            // block:start:await-http-post-function
            // "http://10.0.2.2:5000/initiateJuspayPayment",
            // "http://192.168.0.139:4000/initiateJuspayPayment",
            "https://lmsapi.clvdev.in/apiv2/lms/subscribe/paymentcall",
            // block:end:await-http-post-function
            payload,
            {
                onResponseReceived: (response) => {
                    console.log("@1", response)
                    // block:start:openPaymentPage
                    HyperSdkReact.openPaymentPage(
                        JSON.stringify(JSON.parse(response).sdkPayload)
                    );
                    // block:end:openPaymentPage
                },
                onFailure: (error) => {
                    // console.log("@2")
                    console.error("POST request failed:", error);
                },
            }
        );
    }


    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                <HeaderComponent
                    headerName='Cart'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />
                <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >
                    <View style={styles.parentContainer}>
                        <View style={styles.topContainer}>
                            <View style={styles.topDetailsContainer}>
                                <View>
                                    <Text style={styles.itemDetails}>Subtotal ( {cartList.length} item{cartList.length > 1 ? 's' : null} )</Text>
                                </View>
                                <View>
                                    <Text style={styles.itemDetails}>{cartListTotal}</Text>
                                </View>
                            </View>

                            <View style={styles.topTotalContainer}>
                                <View>
                                    <Text style={styles.itemDetails}>TOTAL</Text>
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
                                showsVerticalScrollIndicator={false}
                            >
                                {
                                    cartList.map((item, index) => {
                                        return <CartListComponent
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
                                            deleteHandler={() => onDeleteHandlerWithAlert(item.id, item.cart_amount)}
                                            exam_type={item.exam_type}
                                        />
                                    })
                                }


                            </ScrollView>
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity disabled={cartList.length > 0 ? false : true} onPress={() => onAllDeleteHandlerWithAlert()} style={[styles.buttonContainer, styles.deleteBackground, { opacity: cartList.length > 0 ? 1 : .4 }]}>
                                <View>
                                    <Ionicons name='trash-outline' size={20} color={'#000'} />
                                </View>
                                <View>
                                    <Text style={[styles.textdetails, styles.deleteTextColor]}>Delete all item</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity disabled={cartList.length > 0 ? false : true} onPress={() => showOnProceedBuyHandler()} style={[styles.buttonContainer, styles.buyBackground, { opacity: cartList.length > 0 ? 1 : .4 }]}>
                                <View>
                                    <Ionicons name='cart-sharp' size={20} color={'#000'} />
                                </View>
                                <View>
                                    <Text style={[styles.textdetails, styles.buyTextColor,]}>Proceed to Buy</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ImageBackground>


            </KeyboardAvoidingView>
        </>

    );
};

const styles = StyleSheet.create(
    {
        parentContainer: {
            flex: 1,
            backgroundColor: '#fff',
            padding: 10,
        },
        topContainer: {
            flex: .3,
            backgroundColor: '#1D5068',
            borderRadius: 10,
            paddingHorizontal: 10,
        },
        middleContainer: {
            flex: 1,
            // backgroundColor: '#ff0000',
            paddingVertical: 10,
        },
        bottomContainer: {
            flex: .1,
            // backgroundColor: '#ff0000',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row'
        },
        topDetailsContainer: {
            paddingHorizontal: 15,
            height: 70,
            borderBottomWidth: 1,
            borderBottomColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // borderColor:'#ff0000',
            // borderWidth:1,
        },
        topTotalContainer: {
            paddingHorizontal: 15,
            height: 40,
            borderBottomWidth: 1,
            borderBottomColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
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
            flexDirection: 'row'
        },
        deleteBackground: {
            backgroundColor: '#D9D9D9'
        },
        buyBackground: {
            backgroundColor: '#E0B326'
        },
        textdetails: {
            marginLeft: 5,
            fontFamily: fonts.rRold,
            fontSize: 14,
        },
        deleteTextColor: {
            color: '#000'
        },
        buyTextColor: {
            color: '#fff'
        },
        scrollViewContainer: {
            // flex: 1,
            // flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // flexWrap: 'wrap',
        },



    });

export default Cart;