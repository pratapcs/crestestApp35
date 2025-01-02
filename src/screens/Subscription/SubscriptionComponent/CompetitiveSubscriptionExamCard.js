import React, { useState, useEffect } from 'react';
import { Checkbox } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';

import Gstyles from '../../../styles/GlobalStyle';
import subjectIcon from '../../../assets/images/subjectIcon.png';
import { colors, fonts, } from '../../../styles/Crestest.config';
import AddButton from './AddButton';
import RadioButton from './RadioButton'
import CheckboxOption from './CheckboxOption'

import AlertCartSubscription from '../../../components/AlertCartSubscription'
import AddProfileDetailsModal from './AddProfileDetailsModal'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import { addToCartData, subscribeLoading, showRightNavAction, compititiveSubscriptionSourceAction } from '../../../store/actions/SubscribeAction';
import {
    updateStudentProfileOfSubscription,
} from "../../../store/actions/ProfileAction";


const CompetitiveSubscriptionExamCard = (props) => {

    const dispatch = useDispatch();

    const cartList = useSelector(state => state.subscribe.cartList);

    const [checkBoxStatus, setCheckBoxStatus] = useState(false)

    const [isLibrary, setIsLibrary] = useState(props.data.has_library == 0 ? false : true);
    const [totalAmount, setTotalAmount] = useState(props.amount);

    const competitiveSubscriptionSourceData = useSelector(state => state.subscribe.competitiveSubscriptionSourceData);
    const competitiveSubscriptionSourceDataColl = useSelector(state => state.subscribe.competitiveSubscriptionSourceDataColl);

    const courseValidity = useSelector(state => state.subscribe.courseValidity);
    const courseAvailable = useSelector(state => state.subscribe.courseAvailable);
    const academicSessionDetals = useSelector(state => state.academic.academicSessionDetals);

    /* Modal Option */
    const [modalVisible, setModalVisible] = useState(false);
    const [modalHeading, setModalHeading] = useState('');
    const [modalDetails, setModalDetails] = useState('');
    const [isDetails, setIsDetails] = useState(false);

    useEffect(() => {

        if (cartList != '') {
            cartList.find(function (e) {
                if (e.subscription_id == props.id && e.exam_type_id == props.data.exam_type_id && e.has_library == 1 && e.exam_type_id == props.type && e.only_elibrary == 0) {
                    setIsLibrary(true)
                    // setTotalAmount(totalAmount + props.library);
                } else {
                    setIsLibrary(false)
                    // 
                }
            })
        } else {
            setIsLibrary(false)
            setTotalAmount(props.amount);
        }
    }, [cartList]);



    const onLibraryHandler = (e) => {
        // console.log("click-- onLibraryHandler", e, props.id, props.type)
        // console.log("click-- e", e)
        setIsLibrary(e);
        if (e == true) {
            setTotalAmount(totalAmount + props.library);
            props.competitiv_e_library_select_handaler(e, props.id, props.type)
        } else {
            setTotalAmount(totalAmount - props.library);
            props.competitiv_e_library_unselect_handaler(e, props.id, props.type)
        }
    }

    const onProgress = () => {
        console.log("isLibrary----", isLibrary)
        // dispatch(subscribeLoading(true));
        dispatch(addToCartData(props.category_id, props.id, props.setCount, 0, 0, props.type, props.class_no ? props.class_no : 0, totalAmount, 0, 0, isLibrary ? 1 : 0, props));
        // dispatch(showRightNavAction(true))
        modalShowOff()
        if (!isLibrary) {
            dispatch(compititiveSubscriptionSourceAction([]))
        }
    }

    const finalSubscriptionSubmit = () => {
        // console.log("finalSubscriptionSubmit-----",)
        showModal()
    }

    const showModal = (h, d) => {
        setModalVisible(!modalVisible)
    }

    const modalShowOff = () => {
        setModalVisible(!modalVisible)
    }

    const onProfileHandler = (data) => {
        setIsDetails(false)

        dispatch(
            updateStudentProfileOfSubscription(
                data.pincode,
                data.schoolNameSelected,
                data.schoolAddress,
                updataedStudentProfileDetails,
                props.history
            ))
    }

    const updataedStudentProfileDetails = (data) => {
        if (data != '') {
            setIsDetails(false);
            props.isCompleteStatusUpdate();
            finalSubscriptionSubmit();
        }
    }

    const updatedProfileInfo = () => {
        setIsDetails(true);
        return;
    }

    return (
        <>
            <View style={[styles.parentContainer]}>
                {/* <View style={[styles.parentContainer, cartList.length == 0 ? (props.isPurchased == 1 ? styles.disableBackground : null) : (props.isPurchased == 1 || cartList.find(x => x.exam_type_id === props.data.exam_type_id && x.exam_category_id === props.data.exam_category_id && x.subscription_id != props.id && x.only_elibrary != 1) ? styles.disableBackground : null)]}> */}
                {props.sticker_text != '' ?
                    <View style={styles.popularContainer}>
                        <Text style={styles.popularText}>{props.sticker_text}</Text>
                    </View>
                    : null}
                <View style={styles.TopContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.infoText}>{props.setCount} Sets</Text>
                        <Text style={styles.infoText}>{props.questionPerset * props.setCount} Questions</Text>
                        <Text style={styles.infoSubinfo}>( {props.questionPerset} Questions per set )</Text>
                    </View>
                    {/* {console.log("**props.selectSubId*****---", props.selectSubId)}
                    {console.log("***props.type****---", props.selectSubId)}
                    {console.log("***props.id****---", props.id)}
                    {console.log("***competitiveSubscriptionSourceDataColl.exam_type****---", competitiveSubscriptionSourceDataColl.exam_type)}
                    {console.log("***props.type****---", props.type)} */}
                    {/* {console.log("***props.data.disabled_library****---", props.data.disabled_library)}  */}
                    <View style={styles.topInsideBottomContainer}>
                        <View style={[styles.checkboxContainer]}>
                            <View style={styles.checkBoxParentContainer}>
                                <Checkbox
                                    // status={checkBoxStatus ? 'checked' : 'unchecked'}
                                    status={cartList != '' ? (cartList.find(e => e.subscription_id == props.id && e.exam_type_id == props.data.exam_type_id && e.has_library == 1 && e.exam_type_id == props.type && e.exam_category_id == 2 && e.only_elibrary == 0) ? 'checked' : cartList.find(e => e.only_elibrary == 1 && e.exam_type_id == props.type && e.exam_category_id == 2) && isLibrary ? 'unchecked' : isLibrary ? 'checked' : 'unchecked') : isLibrary ? 'checked' : 'unchecked'}

                                    // onPress={() => setCheckBoxStatus(!checkBoxStatus)}
                                    onPress={() => onLibraryHandler(!isLibrary)}

                                    theme={{ colors: { primary: '#fff' } }}

                                    disabled={cartList != '' ? (cartList.find(e => e.subscription_id == props.id && e.exam_type_id == props.data.exam_type_id && e.exam_type_id == props.type && e.exam_category_id == 2) ? true : cartList.find(e => e.only_elibrary == 1 && e.exam_category_id == 2 && e.exam_type_id == props.type) ? true : props.selectSubId && props.selectSubId != props.id && competitiveSubscriptionSourceDataColl.exam_type == props.type ? true : props.data.disabled_library == 1 ? true : false) : props.selectSubId && props.selectSubId != props.id && competitiveSubscriptionSourceDataColl.exam_type == props.type ? true : props.data.disabled_library == 1 ? true : false}
                                />

                                <View style={styles.checkBoxLlabelContainer}>
                                    {/* <Text style={styles.checkBoxlabelText}>e-Library</Text> */}
                                    <Text style={cartList != '' ? (cartList.find(e => e.subscription_id == props.id && e.exam_type_id == props.data.exam_type_id && e.exam_type_id == props.type && e.exam_category_id == 2) ? styles.disableCheckBoxlabelText : cartList.find(e => e.only_elibrary == 1 && e.exam_category_id == 2 && e.exam_type_id == props.type) ? styles.disableCheckBoxlabelText : props.selectSubId && props.selectSubId != props.id && competitiveSubscriptionSourceDataColl.exam_type == props.type ? styles.disableCheckBoxlabelText : styles.checkBoxlabelText) : props.selectSubId && props.selectSubId != props.id && competitiveSubscriptionSourceDataColl.exam_type == props.type ? styles.disableCheckBoxlabelText : props.data.disabled_library == 1 ? styles.disableLabelText : styles.checkBoxlabelText}>e-Library
                                    </Text>
                                    {/* <Text>{props.selectSubId}{props.id}{competitiveSubscriptionSourceDataColl.exam_type}{props.type}</Text> */}
                                </View>
                                <View><Text style={props.data.disabled_library == 1 ? styles.disabledtext : styles.alreadyPurchased}>{props.data.disabled_library == 1 ? `(Already purchased)` : null}</Text></View>
                            </View>
                        </View>
                        <View style={styles.rightContainer}>
                            {isLibrary ?
                                <Text style={styles.announcedPrice}>Rs. {props.data.only_elibrary_price}/-</Text>
                                : null}
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContaoner}>
                    <View>
                        {cartList != '' ? (cartList.find(e => e.subscription_id == props.id && e.exam_type_id == props.data.exam_type_id && e.has_library == 1 && e.exam_type_id == props.type) ? <Text style={styles.priceText}>Rs.{cartList.find(e => e.subscription_id == props.id && e.exam_type_id == props.data.exam_type_id && e.has_library == 1 && e.exam_type_id == props.type).cart_amount}/- </Text> : <Text style={styles.priceText}>Rs.{totalAmount}/- </Text>) : <Text>Rs.{isLibrary ? totalAmount : props.amount}/- </Text>}
                        {/* <Text style={styles.priceText}>Rs.299/-</Text> */}
                        <Text style={styles.gstInfo}>(Including GST)</Text>
                    </View>
                    {/* <AddButton
                        buttonBackground={colors.competitiveSubscriptionAddButtonBackground}
                        addToCart={() => finalSubscriptionSubmit()}
                        addButtonTextColor='#fff'
                    /> */}

                    {courseAvailable == 1 ?
                        props.isPurchased == 1 ?
                            null :
                            <>
                                {!cartList.find(element => element.subscription_id === props.id && element.exam_category_id == 2 && element.exam_type_id == props.exam_type_id && element.only_elibrary != 1) ?
                                    <AddButton
                                        buttonBackground={colors.competitiveSubscriptionAddButtonBackground}
                                        // addToCart={() => finalSubscriptionSubmit()}
                                        addToCart={() => props.isComplete == 0 ? finalSubscriptionSubmit() : updatedProfileInfo()}
                                        addButtonTextColor='#fff'
                                    />
                                    : <AddButton
                                        buttonBackground={"#ff6a59"}
                                        addToCart={props.parentScreenaddToCartData}
                                        addToCartDisable={true}
                                    />
                                }
                            </>
                        : <AddButton
                            buttonBackground={"#ff6a59"}
                            addToCart={props.parentScreenaddToCartData}
                            addToCartDisable={true}
                        />}

                </View>
                <View style={styles.toolTipContainer}>
                    {courseAvailable !== 1 ?
                        <Text style={Gstyles.toolTipText}>You cannot add any items because the course validity is expiring soon.</Text>
                        : null
                    }
                </View>
            </View>

            {/* <View style={styles.disableContainer}> */}
            <View style={cartList.length == 0 ? (props.isPurchased == 1 ? styles.disableContainer : null) : (props.isPurchased == 1 || cartList.find(x => x.exam_type_id === props.data.exam_type_id && x.exam_category_id === props.data.exam_category_id && x.subscription_id != props.id && x.only_elibrary != 1) ? styles.disableContainer : null)}>

            </View>

            <AlertCartSubscription
                isVisable={modalVisible}
                modalHeading="Cart Items"
                cartDetails=
                {!!props.data && props.data != undefined ?
                    <Text>Details : Set {props.setCount} {!!isLibrary ? " + " : null} {!!isLibrary ? "e-Library" : null}</Text>
                    : null}
                submitHandeler={() => onProgress()}
                cancelHandeler={() => modalShowOff()}
            />
            <AddProfileDetailsModal
                isVisable={isDetails}
                onProfileSubmit={(data) => onProfileHandler(data)}
                profileData={props.checkProfile}
                isCancelRequire={true}
                cancelHandeler={() => setIsDetails(false)}
            />
        </>
    );
};

const styles = StyleSheet.create(
    {
        parentContainer: {
            width: '90%',
            height: 200,
            alignSelf: 'center',
            borderRadius: 8,
            elevation: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffset: {
                width: 0,
                height: 4
            },
            shadowRadius: 4,
            shadowOpacity: 1,
            margin: 10,
            backgroundColor: colors.competitiveSubscriptionBackground,
            overflow: 'hidden',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
        },

        bottomContaoner: {
            width: '100%',
            height: 50,
            overflow: 'hidden',
            // backgroundColor: colors.scholasticSubscriptionBottomBackground,
            justifyContent: 'center',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            borderTopWidth: 2,
            borderTopColor: '#fff',
            borderTopStyle: 'solid',
        },
        priceText: {
            color: '#245C75',
            fontFamily: fonts.rBold,
            fontSize: 18,
        },
        gstInfo: {
            color: '#245C75',
            fontFamily: fonts.rRold,
            fontSize: 10,
        },
        insideRightContaoner: {
            backgroundColor: '#fff',
            borderRadius: 100,
        },
        TopContainer: {
            width: '100%',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column',
        },
        textContainer: {
            flex: 2,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        infoText: {
            color: '#fff',
            fontFamily: fonts.rRegular,
            fontSize: 16,
        },
        infoSubinfo: {
            color: '#245C75',
            fontFamily: fonts.rLight,
            fontSize: 12,
        },
        topInsideBottomContainer: {
            flex: 1,
            width: '100%',
            // height:30,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 10,
            flexDirection: 'row',
        },
        checkboxContainer: {
            flexDirection: 'row',
            position: 'relative',
            // borderWidth:1,
        },
        disableLabelText: {
            color: '#819482',
            fontFamily: fonts.rRegular,
            fontSize: 14,
            top: 1,
            marginLeft: 5,
        },
        rightContainer: {
            width: 80,
            height: 25,
            backgroundColor: '#fff',
            borderRadius: 3,
            justifyContent: 'center',
            alignItems: 'center'
        },
        alreadyPurchased: {
            color: '#245C75',
            fontFamily: fonts.rRegular,
            fontSize: 10,
            top: 1,
            marginLeft: 5,
        },
        announcedPrice: {
            color: '#245C75',
            fontFamily: fonts.rRegular,
            fontSize: 14,
            textDecorationLine: 'line-through'
        },
        popularContainer: {
            position: 'absolute',
            width: '100%',
            paddingVertical: 5,
            backgroundColor: '#962424',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ rotate: '-25deg' }],
            left: -130,
            top: 5,
        },
        popularText: {
            color: '#fff',
            fontFamily: fonts.rRegular,
            fontSize: 14,
        },
        checkBoxParentContainer: {
            // flex: 1,
            alignSelf: 'flex-start',
            // justifyContent: 'center',
            alignItems: 'center',
            // borderRadius: 8,
            flexDirection: 'row',
            // marginRight: 5,
        },
        checkBoxLlabelContainer: {
            // width: '90%',
            flexDirection: 'row'
        },
        disabledtext: {
            color: '#819482',
            fontFamily: fonts.rRegular,
            fontSize: 10,
            top: 1,
            marginLeft: 5,
        },
        checkBoxlabelText: {
            color: '#245C75',
            fontFamily: fonts.rRegular,
            fontSize: 14,
        },
        disableCheckBoxlabelText: {
            // color: '#819482',
            color: '#79A1AD',
            fontFamily: fonts.rRegular,
            fontSize: 14,
        },
        disableBackground: {
            backgroundColor: '#819482',
        },
        disableContainer: {
            width: '90%',
            height: 200,
            alignSelf: 'center',
            borderRadius: 8,
            margin: 10,
            backgroundColor: '#818181',
            overflow: 'hidden',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 100,
            opacity: .6,
        },
        toolTipContainer: {
            borderTopWidth: 1,
        }
    });

export default CompetitiveSubscriptionExamCard;