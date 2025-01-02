import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Gstyles from '../../../styles/GlobalStyle';
import subjectIcon from '../../../assets/images/subjectIcon.png';
import { colors, fonts, } from '../../../styles/Crestest.config';
import AddButton from './AddButton';
import RadioButton from './RadioButton'
import CheckboxOption from './CheckboxOption'
import AlertCartSubscription from '../../../components/AlertCartSubscription'
import AddProfileDetailsModal from './AddProfileDetailsModal'

import { addToCartData, subscribeLoading, showRightNavAction, compititiveSubscriptionSourceAction } from '../../../store/actions/SubscribeAction';

import {
    updateStudentProfileOfSubscription,
} from "../../../store/actions/ProfileAction";


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';


const CompetitiveElibraryCard = (props) => {

    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [isDetails, setIsDetails] = useState(false);

    const cartList = useSelector(state => state.subscribe.cartList);

    const competitiveSubscriptionSourceDataColl = useSelector(state => state.subscribe.competitiveSubscriptionSourceDataColl);

    const onProgress = () => {
        dispatch(compititiveSubscriptionSourceAction([]))
        // dispatch(subscribeLoading(true));
        dispatch(addToCartData(props.category_id, props.id, 0, 0, 0, props.type, props.class_no ? props.class_no : 0, props.library, 0, 1, 1, props));
        // dispatch(showRightNavAction(true))

        modalShowOff();
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
            <View style={styles.parentContainer}>
                {/* {props.sticker_text != '' ?
                    <View >
                        <View>{props.sticker_text}</View>
                    </View>
                    : null} */}
                <View style={styles.TopContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.cartPropertyName}>e-Library</Text>
                        <Text style={styles.subjectName}>{props.typeName}</Text>

                    </View>
                    <View style={styles.toolTipContainer}>
                        {props.courseAvailable !== 1 ?
                            <Text style={Gstyles.toolTipText}>You cannot add any items because the course validity is expiring soon.</Text>
                            : null
                        }
                    </View>
                </View>
                <View style={styles.bottomContaoner}>
                    <View>
                        <Text style={styles.priceText}>Rs.{props.library}/-</Text>
                        <Text style={styles.gstInfo}>(Including GST)</Text>
                    </View>
                    {props.courseAvailable == 1 ?
                        props.isPurchased == 1 ?
                            null :
                            <>
                                {!cartList.find(element => element.subscription_id === props.id && element.exam_category_id == 2 && element.exam_type_id == props.exam_type_id && element.has_library == 1 && element.exam_type_id == props.type) && !cartList.find(element => element.subscription_id != props.id && element.exam_category_id == 2 && element.exam_type_id == props.exam_type_id && element.has_library == 1 && element.exam_type_id == props.type) && competitiveSubscriptionSourceDataColl.exam_type != props.type   /* && !props.cartList == '' && !props.is_select_elibrary_from_subscription */ ?
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
                        :
                        <AddButton
                            buttonBackground={"#ff6a59"}
                            addToCart={props.parentScreenaddToCartData}
                            addToCartDisable={true}
                        />
                    }
                    {/* <AddButton
                        buttonBackground={colors.competitiveSubscriptionAddButtonBackground}
                        addToCart={props.parentScreenaddToCartData}
                        addButtonTextColor='#fff'
                    /> */}
                </View>
            </View>

            <View style={props.isPurchased == 1 ? styles.disableContainer : null}>

            </View>

            <AlertCartSubscription
                isVisable={modalVisible}
                modalHeading="Cart Items"
                cartDetails=
                {!!props.typeName && props.typeName != undefined ?
                    <Text>Details : {props.typeName} (e-Library)</Text>
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
            alignItems: 'center'
        },

        bottomContaoner: {
            width: '100%',
            height: 60,
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
            fontSize: 12,
        },
        insideRightContaoner: {
            backgroundColor: '#fff',
            borderRadius: 100,
        },
        TopContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textContainer: {
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        subjectName: {
            color: '#fff',
            fontFamily: fonts.rBold,
            fontSize: 18,
            marginTop: 10,
        },
        cartPropertyName: {
            color: '#fff',
            fontFamily: fonts.rRegular,
            fontSize: 16,
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

export default CompetitiveElibraryCard;