import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import Gstyles from '../../../styles/GlobalStyle';
import subjectIcon from '../../../assets/images/subjectIcon.png';
import { colors, fonts, } from '../../../styles/Crestest.config';
import AddButton from './AddButton';
import RadioButton from './RadioButton'
import CheckboxOption from './CheckboxOption'
import AlertCartSubscription from '../../../components/AlertCartSubscription'
import AddProfileDetailsModal from './AddProfileDetailsModal'

import { addToCartData, subscribeLoading, getScSubjectData, showRightNavAction, eLibrarySelectSubjectsListAction, scholasticSubscriptionSourceAction, compititiveSubscriptionSourceAction } from '../../../store/actions/SubscribeAction';


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

import {
    updateStudentProfileOfSubscription,
} from "../../../store/actions/ProfileAction";

const ScholasticElibraryCard = (props) => {

    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [isDetails, setIsDetails] = useState(false);

    const cartList = useSelector(state => state.subscribe.cartList);

    const checkDisabledStatus = () => {
        let status = false;
        //!props.cartList.find(element => element.subscription_id == props.id && element.exam_category_id == 1) && props.card_id.every(group => !props.subject_id.includes(group))
        //check from redux value
        //console.log("props.combo_subject_ids", props.combo_subject_ids);
        if (props.subject_cards.length > 0) {
            let combo_subject_ids;
            for (let i = 0; i < props.subject_cards.length; i++) {
                combo_subject_ids = props.subject_cards[i].combo_subject_ids;
                if (combo_subject_ids) {
                    for (let j = 0; j < combo_subject_ids.length; j++) {
                        for (let k = 0; k < props.combo_subject_ids.length; k++) {
                            //console.log(props.subjectName, "::", combo_subject_ids[j]," == ",props.combo_subject_ids[k]);
                            if (combo_subject_ids[j] == props.combo_subject_ids[k]) {
                                //console.log(combo_subject_ids[j]);
                                status = true;
                                break;
                            }
                        }
                    }
                }
            }
        }

        //check from cart value
        //console.log("props.cartList", props.cartList);
        //console.log("subjectName", props.subjectName);
        if (cartList.length > 0) {
            let combo_subject_ids;
            for (let i = 0; i < cartList.length; i++) {
                combo_subject_ids = cartList[i].combo_subject_ids;
                if (combo_subject_ids) {
                    for (let j = 0; j < combo_subject_ids.length; j++) {
                        for (let k = 0; k < props.combo_subject_ids.length; k++) {

                            // console.log(props.cartList[i].exam_category_id," == ",props.category_id);
                            // console.log("props.cartList[i].has_library", props.cartList[i].has_library);
                            // console.log(combo_subject_ids[j]," == ",props.combo_subject_ids[k]);
                            // console.log(props.cartList[i].subscription_id," =! ",props.id);

                            if (cartList[i].exam_category_id == props.category_id &&
                                cartList[i].has_library == 1 &&
                                combo_subject_ids[j] == props.combo_subject_ids[k]) {
                                // || props.only_elibrary == 1)
                                status = true;
                                break;
                            }
                        }
                    }
                }
            }
        } /* else {
			console.log("Cart-List Blank")
			dispatch(scholasticSubscriptionSourceAction([]))
			dispatch(compititiveSubscriptionSourceAction([]))
		} */

        //console.log("getDisabledStatus", status);
        //console.log("======================================");
        return status;
    }

    const finalSubscriptionSubmit = () => {
        showModal()
    }

    const showModal = () => {
        setModalVisible(!modalVisible)
    }

    const modalShowOff = () => {
        setModalVisible(!modalVisible)
    }

    const onProgress = () => {

        // dispatch(subscribeLoading(true));
        dispatch(addToCartData(props.category_id, props.id, [], 0, 0, props.board, props.class_no ? props.class_no : 0, props.library, 0, 1, 1, props));
        // dispatch(showRightNavAction(true))
        modalShowOff();
        // dispatch(eLibrarySelectSubjectsListAction(props.card_id))
    }

    const test = () => {
        console.log("@44111--test")
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
                <View style={styles.TopContainer}>
                    <View style={styles.imageContainer}>
                        {/* <Image source={require('../../../assets/images/profile.png')} style={styles.imageStyle} tintColor={"#137999"} /> */}
                        {props.subject_image != '' && props.subject_image != undefined && props.subject_image != "undefined"
                            ?
                            <Image source={{ uri: props.subject_image }} style={styles.imageStyle} />
                            :
                            <View style={styles.noImageContainer}><Text style={styles.noImageText}>No Image</Text></View>
                        }
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.subjectName}>{props.subjectName}</Text>
                        {/* <Text style={styles.cartPropertyName}>e-library</Text> */}
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
                    </View>
                    
                    {props.courseAvailable == 1   ?
                        props.isPurchased == 1 ?
                            null :
                            <>
                                {checkDisabledStatus() ?
                                <>
                                    <AddButton
                                        buttonBackground={"#ff6a59"}
                                        addToCart={props.parentScreenaddToCartData}
                                        addToCartDisable={true}
                                    />
                                    
                                    </>
                                    :
                                    <AddButton
                                        buttonBackground={colors.scholasticSubscriptionAddButtonBackground}
                                        // addToCart={() => finalSubscriptionSubmit()}
                                        addToCart={() => props.isComplete == 0 ? finalSubscriptionSubmit() : updatedProfileInfo()}
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
                </View>
            </View>

            <View style={props.isPurchased == 1 ? styles.disableContainer : null}>
            </View>

            <AlertCartSubscription
                isVisable={modalVisible}
                modalHeading="Cart Items"
                cartDetails=
                {!!props.subjectName && props.subjectName != undefined ?
                    <Text>Details : Subject : {props.subjectName} (e-Library)</Text>
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
            backgroundColor: colors.scholasticSubscriptionTopBackground,
            overflow: 'hidden',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center'
        },

        bottomContaoner: {
            width: '100%',
            height: 50,
            overflow: 'hidden',
            backgroundColor: colors.scholasticSubscriptionBottomBackground,
            justifyContent: 'center',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
        },
        priceText: {
            color: '#57C761',
            fontFamily: fonts.rRegular,
            fontSize: 18,
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
        imageContainer: {
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
        },
        imageStyle: {
            flex: .7,
            width: '70%',
            height: '70%',
            resizeMode: 'contain',
        },

        textContainer: {
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        subjectName: {
            color: '#245C75',
            fontFamily: fonts.rRegular,
            fontSize: 18,
        },
        cartPropertyName: {
            color: '#000',
            fontFamily: fonts.rRegular,
            fontSize: 20,
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

export default ScholasticElibraryCard;