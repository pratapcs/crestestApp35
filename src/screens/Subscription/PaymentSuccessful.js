import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// import Loader from "../../components/Loader"
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { container } from '../../styles/Crestest.config';
import HeaderComponent from '../../components/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypoicons from 'react-native-vector-icons/Entypo';
import { colors, fonts } from '../../styles/Crestest.config';
import { TouchableOpacity } from "react-native-gesture-handler";

import { getCartData, getScSubjectData, getCmSubjectData, } from '../../store/actions/SubscribeAction';
import { storeData, getData, clearAllData } from "../../utils/Util";

const PaymentSuccessful = (props) => {

    const dispatch = useDispatch();
    const [classId, setclassId] = useState('')
    const [paymentDate, setPaymentDate] = useState('')


    const getLastPaymentDetails = useSelector(state => state.subscribe.getLastPaymentDetails);

    useEffect(() => {
        // console.log("props.route.params----", props.route.params.statusId)

        async function getUserDetails() {
            let result = await getData("crestestUserDetails");
            result = JSON.parse(result);
            // console.log("%%%%--3---", result )
            let class_id = result['class_id'];
            setclassId(class_id)
        };
        getUserDetails();
        // console.log("classId", classId )
        dispatch(getCartData(props));
        dispatch(getScSubjectData(props));
        dispatch(getCmSubjectData(1, 0, props));
        dispatch(getCmSubjectData(2, classId, props));
        // console.log("classId----11", classId )
    }, []);

    React.useEffect(() => {
        const callUpdateUserDetails = props.navigation.addListener('focus', () => {
            const dateConverter = () => {
                var date = new Date(getLastPaymentDetails.payment_gateway_response.created);
                // var date = new Date("2024-03-27T07:22:28Z");
        
                ////////////////////// fOR STAGING CALL THIS CODE ///////////////////
                var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
                var showDate = moment(isoDateTime.slice(0,-1)).format('DD/MM/YYYY hh:mm A z')
                setPaymentDate(showDate)
                // return isoDateTime
        
                
            }
            dateConverter()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return callUpdateUserDetails;
    }, [props.navigation, getLastPaymentDetails]);


    const leftIconHandeler = () => {
        // props.navigation.goBack();
        props.navigation.navigate('drawerScenes', {
            screen: "Dashboard",
        })
    };



    return (
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
                headerName="Payment Details"
                // leftIcon="chevron-back"
                leftIcon="grid-outline"
                leftIconHandeler={leftIconHandeler}
            />

            <View style={styles.parentContainer}>
                <View>
                    <View>
                        {props.route.params.statusId == 21 ?
                            <View style={styles.topContainer}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="checkmark-circle-sharp" size={120} color={'#008000'} />
                                </View>
                                <View style={styles.headingContainer}>
                                    <Text style={styles.headingText}>Success</Text>
                                </View>
                                <View>
                                    <Text>Transaction Process Successfully Done</Text>
                                </View>

                            </View>
                            : props.route.params.statusId == 26 ?
                                <View style={styles.topContainer}>
                                    <View style={styles.iconContainer}>
                                        <Ionicons name="circle-with-cross" size={120} color={'#ff0000'} />
                                    </View>
                                    <View style={styles.headingContainer}>
                                        <Text style={styles.headingFailureText}>Failure</Text>
                                    </View>
                                    <View>
                                        <Text>User did not complete authentication</Text>
                                    </View>

                                </View>
                                :
                                null
                        }
                        {/* <View className='mt-5'></View> */}
                        {props.route.params.statusId == 21 ?
                            getLastPaymentDetails != '' && getLastPaymentDetails != null && getLastPaymentDetails != undefined ?
                                <View style={styles.detailsContainer}>
                                    <View style={styles.individualContainer}>
                                        <View style={styles.leftContainer}><Text>Amount </Text></View>
                                        <View style={styles.middleContainer}><Text>:</Text></View>
                                        <View style={styles.rightContainer}><Text>{getLastPaymentDetails.amount}</Text></View>
                                    </View>
                                    <View style={styles.individualContainer}>
                                        <View style={styles.leftContainer}>
                                            <Text>Bank Ref No </Text>
                                        </View>
                                        <View style={styles.middleContainer}>
                                            <Text>:</Text>
                                        </View>
                                        <View style={styles.rightContainer}>
                                            <Text>{getLastPaymentDetails.txn_id}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.individualContainer}>
                                        <View style={styles.leftContainer}>
                                            <Text>Card Name </Text>
                                        </View>
                                        <View style={styles.middleContainer}>
                                            <Text>:</Text>
                                        </View>
                                        <View style={styles.rightContainer}>
                                            <Text>{getLastPaymentDetails.card.card_brand}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.individualContainer}>
                                        <View style={styles.leftContainer}>
                                            <Text>Order Id</Text></View>
                                        <View style={styles.middleContainer}><Text>:</Text>
                                        </View>
                                        <View style={styles.rightContainer}>
                                            <Text>{getLastPaymentDetails.order_id}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.individualContainer}>
                                        <View style={styles.leftContainer}>
                                            <Text>Payment Mode</Text>
                                        </View>
                                        <View style={styles.middleContainer}>
                                            <Text>:</Text>
                                        </View>
                                        <View style={styles.rightContainer}>
                                            <Text>{getLastPaymentDetails.payment_method_type}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.individualContainer}>
                                        <View style={styles.leftContainer}>
                                            <Text>Payment Transaction Id</Text>
                                        </View>
                                        <View style={styles.middleContainer}>
                                            <Text>:</Text>
                                        </View>
                                        <View style={styles.rightContainer}>
                                            <Text>{getLastPaymentDetails.payment_gateway_response.epg_txn_id}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.individualContainer}>
                                        <View style={styles.leftContainer}>
                                            <Text>Transaction Date</Text>
                                        </View>
                                        <View style={styles.middleContainer}>
                                            <Text>:</Text>
                                        </View>
                                        <View style={styles.rightContainer}>
                                            {/* <Text>{getLastPaymentDetails.payment_gateway_response.created}</Text> */}
                                            <Text>{paymentDate}</Text>
                                        </View>
                                    </View>
                                </View>
                                : null
                            : null
                        }



                    </View>
                </View>
                <TouchableOpacity style={styles.linkText} onPress={() => props.navigation.navigate('drawerScenes', {
                    screen: "Dashboard",
                })}>
                    <Text>Go to Dashboard</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        // marginBottom:20,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    iconContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headingContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    headingText: {
        color: '#008000',
        fontFamily: fonts.rRold,
        fontSize: 34,
    },
    headingFailureText: {
        color: '#ff0000',
        fontFamily: fonts.rRold,
        fontSize: 34,
    },

    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    detailsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        // borderWidth:1,
    },
    individualContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        paddingBottom: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#7BA3B5',
    },
    leftContainer: {
        width: 100,
        // borderWidth:1,
    },
    middleContainer: {
        width: 10,
        // borderWidth:1,
    },
    rightContainer: {
        width: 200,
        // borderWidth:1,
    },
    linkText: {
        padding:5,
        backgroundColor:'#7BA3B5',
        borderRadius:5,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default PaymentSuccessful;
