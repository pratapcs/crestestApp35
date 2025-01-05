import React, { useState, useEffect, useRef } from 'react';
import { Checkbox } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';

import Gstyles from '../../../styles/GlobalStyle';
import subjectIcon from '../../../assets/images/subjectIcon.png';
import { colors, fonts, } from '../../../styles/Crestest.config';
import AddButton from './AddButton';
// import RadioButton from './RadioButton'
import CheckboxOption from './CheckboxOption'

import AlertCartSubscription from '../../../components/AlertCartSubscription'
import AddProfileDetailsModal from './AddProfileDetailsModal'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';

import { getScSubjectAction, addToCartData, subscribeLoading, getScSubjectData, showRightNavAction, getSCholasticCombinePriceData, scholasticCombinationPriceIdAction, scholasticSubscriptionSourceAction, compititiveSubscriptionSourceAction } from '../../../store/actions/SubscribeAction';

import {
    updateStudentProfileOfSubscription,
} from "../../../store/actions/ProfileAction";

import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


const ScholasticSubscriptionExamCard = (props) => {

    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [sets, setSets] = useState(0);
    const [isModules, setIsModules] = useState(props.data.purchased_no_module == 0 ? false : true);
    const [isMock, setIsMock] = useState(props.data.purchased_no_mock == 0 ? false : true);
    const [isBundle, setIsBundle] = useState(props.data.purchased_case_study == 0 ? false : true);
    const [mock, setMock] = useState(0);
    const [module, setModule] = useState(0);
    const [bundle, setBundle] = useState(0);
    const [setAmount, setSetAmount] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [isLibrary, setIsLibrary] = useState(props.data.has_library == 0 ? false : true);
    const [library, setLibrary] = useState(0);

    const [isLibrarySelected, setLibrarySelected] = useState(0);

    const [selectMock, setSelectMock] = useState(props.data.purchased_no_mock != 0 ? false : true);
    const [case_studies, setCase_studies] = useState(0);
    const [optionChange, setOptionChange] = useState(false)
    const [totalCartPrice, setTotalCartPrice] = useState(props.combinePrice)
    const callOnUpdationRef = useRef(false);

    // const [chapterTest, setChapterTest] = useState(props.data.purchased_no_test != '' ? [1, 2] : [1])
    const [chapterTest, setChapterTest] = useState(props.data.purchased_no_test != '' ? props.data.remaning_set_no : [1])
    const [selectedChapterTest, setSelectedChapterTest] = useState([])
    const [checkBoxDisable, setCheckBoxDisable] = useState(props.data.purchased_no_test != '' ? props.data.purchased_no_test : [])

    const [testCartSelect, setTestCartSelect] = useState([])
    const [selectSubscriptionCard, setSelectSubscriptionCard] = useState()
    const [selectElibraryFromCard, setSelectElibraryFromCard] = useState([])
    const [isDetails, setIsDetails] = useState(false);

    // const [testSelect, setTestSelect] = useState(1)
    // const [enableBox, setEnableBox] = useState([4])

    const cartList = useSelector(state => state.subscribe.cartList);
    const scholasticCombinePrice = useSelector((state) => state.subscribe.scholasticCombinePrice);
    const board = useSelector((state) => state.auth.board,);

    /* Modal Option */
    const [modalVisible, setModalVisible] = useState(false);
    const [modalHeading, setModalHeading] = useState('');
    const [modalDetails, setModalDetails] = useState('');


    useEffect(() => {
        // console.log("chapterTest--11--", props.data.subject_name, chapterTest, "module==", module, "mock--", mock, "library--", library)
        setTestCartSelect(props.data.purchased_no_test == '' ? chapterTest : selectedChapterTest)

        if (callOnUpdationRef.current) {
            // dispatch(subscribeLoading(true));
            callCompbinePrice();
            dispatch(scholasticCombinationPriceIdAction(null));
            // setOptionChange(false)
        }
        const interval = setInterval(() => {
            showChangeValue()
        }, 1200);

        callOnUpdationRef.current = false


        return () => {
            clearInterval(interval)
        };


    }, [sets, module, mock, library, case_studies, bundle, callOnUpdationRef, optionChange, chapterTest]);

    const callCompbinePrice = () => {
        setOptionChange(true)
        // console.log("props.data.purchased_no_test----", props.id)
        // dispatch(getSCholasticCombinePriceData(props.id, sets, module, mock, library, case_studies, props.history))
        dispatch(getSCholasticCombinePriceData(props.id, props.data.purchased_no_test == '' ? chapterTest : selectedChapterTest, module, mock, library, case_studies, props))
    }

    const showChangeValue = () => {
        setOptionChange(false)
    }

    useEffect(() => {
        getSubscriptionCardStatus();
        /* for after remove cart update e-library value */
        let isSelected = getCheckedStatus();
        setLibrary(isSelected ? 1 : 0);
        callOnUpdationRef.current = true
        // console.log("useEffect========", isSelected)
        /* for after remove cart update e-library value */
    }, [cartList]);

    /* useEffect(() => {
        if (props.data.purchased_no_test.length == 1) {
            setTestCartSelect([2])
            setSelectedChapterTest([2])
        }
    }, [props.data]); */

    useEffect(() => {
        if (props.data.purchased_no_test != '') {
            let OnlySelectedArray = props.data.remaning_set_no.filter((el) => !props.data.purchased_no_test.includes(el));
            setTestCartSelect(OnlySelectedArray)
            setSelectedChapterTest(OnlySelectedArray)
        }
    }, [props.data]);

    const getSubscriptionCardStatus = () => {
        // console.log("cardList", props.cartList);
        // console.log("id", props.id);
        let selectedCard = cartList.find(element => {
            return (element.subscription_id == props.id);
        });
        // console.log("selectedCard", selectedCard);
        // console.log("=====================================================");
        if (!selectedCard) {
            //setSelectSubscriptionCard(selectedCard.subscription_id);
            setIsLibrary(0)
        }

    }

    const finalSubscriptionSubmit = () => {
        // console.log("finalSubscriptionSubmit-----",)
        showModal()
        // setModal(true);
        let totalValue = props.combinePrice;
        setFinalTotal(totalValue);
    }


    const onChapterTests = (num, selectId) => {
        let array = [];
        for (let x = 1; num >= x; x++) {
            array.push(
                <View style={styles.radioButtonContainer} key={x}>
                    <View style={styles.checkBoxTextParentContainer}>

                        <Checkbox
                            // status={props.checked ? 'checked' : 'unchecked'}
                            status={chapterTest.includes(x) ? 'checked' : 'unchecked'}
                            // onPress={() => { setChecked(!checked); }}
                            onPress={(e) => onSubjectHandler(e, x)}

                            // color={"#2367ca"}
                            theme={{ colors: { primary: '#245C75' } }}
                            disabled={checkBoxDisable.includes(x)}
                        />
                        <View style={styles.textCheckBoxLlabelContainer}>
                            <Text style={styles.checkBoxlabelText}>{`Test ${x}`}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }
        return array;
    }

    const onSubjectHandler = (e, item) => {
        console.log("e, item", item)
        let array = [...chapterTest];
        // if (e.target.checked) { 
        let differenceNew = array.filter(x => x == item);
        if (differenceNew.length <= 0) {
            array.push(item);
        } else {
            const index = array.findIndex((val) => val === item);
            array.splice(index, 1);
        }

        // setChapterTest(array);
        setChapterTest(array);
        // setSelectedChapterTest()
        // let filteredArray = array.filter(item => item != props.data.purchased_no_test)
        // setSelectedChapterTest(filteredArray)
        if (props.data.purchased_no_test != '') {
            let OnlySelectedArray = array.filter((el) => !props.data.purchased_no_test.includes(el));
            setSelectedChapterTest(OnlySelectedArray)
        }
        callOnUpdationRef.current = true
    }

    const onModulesHandler = (event) => {
        setIsModules(!isModules);
        setModule(isModules ? 0 : 1);
        setSelectMock(!isModules ? false : true)
        if (isModules == true) {
            setIsMock(false)
            setMock(0)
        }
        callOnUpdationRef.current = true
    };

    const onMockHandler = (event) => {
        setIsMock(!isMock);
        setMock(isMock ? 0 : 1)
        callOnUpdationRef.current = true
    };

    const onBundleHandler = () => {
        setIsBundle(!isBundle);
        setBundle(isBundle ? 0 : 1)
        setCase_studies(isBundle ? 0 : 1)
        callOnUpdationRef.current = true
    };

    const onChangeRadio = (event) => {
        setSets(event.target.value);
        callOnUpdationRef.current = true
    }

    const getCheckedStatus = () => {
        let status = false;
        //console.log("props.subject_cards", props.subject_cards);
        //check from redux value
        if (props.subject_cards.length > 0) {
            let combo_subject_ids;
            for (let i = 0; i < props.subject_cards.length; i++) {
                //console.log(props.subject_cards[i].subject_id," == ", props.id);
                if (props.subject_cards[i].subject_id == props.id) {
                    status = true;
                    break;
                }
            }
        }

        //check from cart value
        //console.log("cartList", cartList);
        if (cartList.length > 0) {
            for (let i = 0; i < cartList.length; i++) {
                //console.log(props.subjectName, "::", cartList[i].subscription_id," == ",props.id, cartList[i]);
                if (cartList[i].exam_category_id == props.category_id &&
                    cartList[i].subscription_id == props.id) {
                    if (cartList[i].only_elibrary == 1) {
                        //do nothing
                    } else {
                        status = cartList[i].has_library == 1 ? true : false;
                    }
                    break;
                }
            }
        }
        return status;
    }

    const getDisabledStatus = () => {
        let status = false;

        //check from redux value
        if (props.subject_cards.length > 0) {
            let combo_subject_ids;

            for (let i = 0; i < props.subject_cards.length; i++) {
                if (props.subject_cards[i].subject_id != props.id) {
                    combo_subject_ids = props.subject_cards[i].combo_subject_ids;
                    if (combo_subject_ids) {
                        for (let j = 0; j < combo_subject_ids.length; j++) {
                            for (let k = 0; k < props.combo_subject_ids.length; k++) {
                                //console.log(combo_subject_ids[j]," == ",props.combo_subject_ids[k]);
                                if (combo_subject_ids[j] == props.combo_subject_ids[k]) {
                                    status = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            //console.log("props.subject_cards", props.subject_cards);
            //console.log("props.combo_subject_ids", props.combo_subject_ids);
        }

        //check from cart value
        //console.log("cartList", cartList);
        if (cartList.length > 0) {
            let combo_subject_ids;
            for (let i = 0; i < cartList.length; i++) {
                combo_subject_ids = cartList[i].combo_subject_ids;
                if (combo_subject_ids) {
                    for (let j = 0; j < combo_subject_ids.length; j++) {
                        for (let k = 0; k < props.combo_subject_ids.length; k++) {
                            //console.log(combo_subject_ids[j]," == ",props.combo_subject_ids[k]);
                            if (cartList[i].exam_category_id == props.category_id &&
                                cartList[i].has_library == 1 &&
                                combo_subject_ids[j] == props.combo_subject_ids[k]) {
                                //console.log(props.subjectName, "::", cartList[i].only_elibrary);
                                /*if(cartList[i].only_elibrary == 1){
                                    //do nothing
                                } else {*/
                                if (cartList[i].subscription_id != props.id || cartList[i].only_elibrary == 1) {
                                    status = true;
                                }
                                //}
                                break;
                            }
                        }
                    }
                }
            }
        }

        // console.log("getDisabledStatus", status);
        //console.log("======================================");
        return status;
    }

    const onLibraryHandler = (e, id) => {
        // setSelectSubscriptionCard('') selectElibraryFromCard, setSelectElibraryFromCard
        // console.log("e-----------", e)
        // console.log("77777-----", cartList.find(element => element.subscription_id == props.id && element.has_library == 1 && element.combo_subject_ids.every(group => props.subject_id.find(o => o.subject_id == group))))
        // console.log("++++++++++", selectSubscriptionCard, "==", props.id )
        // console.log("+++isLibrary+++++++", isLibrary)

        setIsLibrary(!isLibrary);
        setLibrary(isLibrary ? 0 : 1);
        callOnUpdationRef.current = true
        // let match_subject_id = props.data.combo_subject_ids.filter(element => props.subject_id.includes(element))
        // console.log("match_subject_id-----------", match_subject_id)
        setSelectSubscriptionCard(!isLibrary ? id : '')
        // props.e_library_select_handaler(!isLibrary ? e : [])

        if (!isLibrary) {
            props.e_library_select_handaler(e, id)//, !isLibrary
        } else {
            props.e_library_unselect_handaler(e, id)//, !isLibrary
        }
    }

    const showModal = (h, d) => {
        setModalVisible(!modalVisible)
    }

    const modalShowOff = () => {
        setModalVisible(!modalVisible)
        setModalHeading('');
        setModalDetails('');
    }

    const onProgress = () => {

        let temp_data = props.subject_cards.filter(obj => obj.subject_id != props.id);

        let isSelected = getCheckedStatus();

        dispatch(scholasticSubscriptionSourceAction(temp_data));

        dispatch(addToCartData(props.category_id, props.id, props.data.purchased_no_test == '' ? chapterTest : selectedChapterTest, isModules ? module : 0, isMock ? mock : 0, props.board, props.class_no ? props.class_no : 0, finalTotal, case_studies ? 1 : 0, 0, isSelected && props.data.disabled_library == 0 ? 1 : 0, props));

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
            <View style={[styles.parentContainer, { height: board == 2 ? 320 : 330 }]}>

                <View style={styles.topContaoner}>
                    <View style={styles.insideLeftContaoner}>
                        <Text style={styles.subjectName}>{props.subjectName}</Text>
                    </View>
                    <View style={styles.insideRightContaoner}>
                        {props.subject_image != '' && props.subject_image != undefined && props.subject_image != "undefined" ?
                            <Image source={{ uri: props.subject_image }} style={styles.imageStyle} />
                            :
                            <View style={styles.noImageContainer}><Text style={styles.noImageText}>No Image</Text></View>
                        }

                    </View>
                </View>
                {/* Chapter Test-------------------------/* board == 2 &&   */}

                <View style={styles.middleContaoner} >
                    <View style={[props.data.case_studies_exist == 0 ? styles.middleInsideContaonerForTest : styles.middleInsideContaonerForTestWithCaseStudies, { flexDirection: 'row', }, props.data.case_studies_exist != 0 ? null : styles.testBorderBottom]}>
                        <View style={styles.leftOptionLabelContainer}>
                            <Text style={styles.optionText}>Chapter test</Text>
                        </View>
                        {/* {onChapterTests(2)} */}
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 170, }}>
                            {onChapterTests(props.data.test_count)}
                        </View>
                        {/* {onChapterTests(props.data.test_count)} */}

                    </View>
                    {/* case studies----------- */}

                    {/* {board == 2 && props.data.case_studies_exist != 0 ? */}
                    {props.data.case_studies_exist != 0 ?
                        <View style={[styles.middleInsideContaonerForCaseStudy, styles.testBorderBottom]}>
                            <View style={styles.leftOptionLabelContainer}>
                                <Text style={styles.optionText}></Text>
                            </View>
                            <View style={styles.rightOptionContainer}>
                                <View style={styles.checkBoxParentContainer}>
                                    <Checkbox
                                        // status={isBundle ? 'checked' : 'unchecked'}
                                        status={cartList && cartList.find(element => element.subscription_id == props.id && element.no_casestudy == 1) ?
                                            'checked' : props.data.purchased_case_study == 1 ? 'checked' : isBundle ? 'checked' : 'unchecked'}

                                        onPress={() => onBundleHandler()}
                                        theme={{ colors: { primary: '#245C75' } }}
                                        disabled={props.data.purchased_case_study == 1 ? true : false}
                                    />
                                    <View style={styles.checkBoxLlabelContainer}>

                                        <Text style={cartList.find(element => element.subscription_id == props.id && element.no_casestudy == 1) ? styles.disabledtext : props.data.purchased_case_study == 1 ? styles.disabledtext : styles.checkBoxlabelText}>Case study</Text>


                                    </View>
                                </View>
                            </View>
                        </View>
                        : null
                    }

                    {/* case studies----------- */}

                    {/* Module Tests----------------------- */}
                    <View style={[styles.middleInsideContaoner, styles.middleInsideContaonerTopBorder]}>
                        <View style={styles.leftOptionLabelContainer}>
                            <Text style={styles.optionText}>Module tests</Text>
                        </View>
                        <View style={styles.rightOptionContainer}>
                            <View style={styles.checkBoxParentContainer}>
                                <Checkbox
                                    // status={isModules ? 'checked' : 'unchecked'}
                                    status={cartList.find(element => element.subscription_id == props.id && element.no_module == 1) ?
                                        'checked' : props.data.purchased_no_module == 1 ? 'checked' : isModules ? 'checked' : 'unchecked'}
                                    // onPress={() => { setIsModules(!isModules); }}

                                    onPress={() => onModulesHandler()}

                                    theme={{ colors: { primary: '#245C75' } }}
                                    disabled={cartList.find(element => element.subscription_id == props.id && element.no_module == 1) ? true : props.data.purchased_no_module == 1 ? true : false}
                                />
                                <View style={styles.checkBoxLlabelContainer}>
                                    {/* <Text style={props.data.purchased_no_module == 1 ? styles.disabledtext : styles.checkBoxlabelText}>3 Modules
                                    </Text> */}
                                    <Text style={cartList.find(element => element.subscription_id == props.id && element.no_module == 1) ? styles.disabledtext : props.data.purchased_no_module == 1 ? styles.disabledtext : styles.checkBoxlabelText}>3 Modules tests
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Mock Tests-------------------------------- */}
                    <View style={styles.middleInsideContaoner}>
                        <View style={styles.leftOptionLabelContainer}>
                            <Text style={styles.optionText}>Mock tests</Text>
                        </View>
                        <View style={styles.rightOptionContainer}>
                            <View style={styles.checkBoxParentContainer}>
                                <Checkbox
                                    // status={isMock ? 'checked' : 'unchecked'}
                                    status={cartList.find(element => element.subscription_id == props.id && element.no_mock == 1) ?
                                        'checked' : isMock ? 'checked' : 'unchecked'}
                                    onPress={() => onMockHandler()}
                                    theme={{ colors: { primary: '#245C75' } }}
                                    disabled={cartList.find(element => element.subscription_id == props.id && element.no_mock == 1) ?
                                        true : props.data.purchased_no_mock == 1 ? true : props.data.purchased_no_module == 1 ? false : selectMock}
                                />
                                <View style={styles.checkBoxLlabelContainer}>
                                    {/* <Text style={!selectMock ? styles.checkBoxlabelText : styles.disabledtext}>2 Mocks
                                    </Text> */}
                                    <Text style={cartList.find(element => element.subscription_id == props.id && element.no_mock == 1) ?
                                        styles.disabledtext : props.data.purchased_no_mock == 1 ? styles.disabledtext : props.data.purchased_no_module == 1 ? styles.checkBoxlabelText : styles.checkBoxlabelText}>2 Mocks tests
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* E-Library------------------------------- */}
                    <View style={styles.middleInsideContaoner}>
                        <View style={styles.leftOptionLabelContainer}>
                            <Text style={styles.optionText}>e-Library</Text>
                        </View>
                        <View style={styles.rightOptionContainer}>
                            <View style={styles.checkBoxParentContainer}>
                                <Checkbox
                                    // status={isLibrary ? 'checked' : 'unchecked'}
                                    status={getCheckedStatus() ? 'checked' : 'unchecked'}
                                    onPress={() => onLibraryHandler(props.data.combo_subject_ids, props.id)}
                                    theme={{ colors: { primary: '#245C75' } }}
                                    disabled={props.data.disabled_library == 1 ? true : getDisabledStatus()}
                                />
                                <View style={styles.checkBoxLlabelContainer}>
                                    {/* <Text style={getDisabledStatus() ? styles.disabledtext : styles.checkBoxlabelText}>E-Library */}
                                    <Text style={props.data.disabled_library == 1 ? styles.disabledtext : styles.checkBoxlabelText}>e-Library
                                        <View>
                                            {props.data.disabled_library == 1 || props.data.has_library == 1 ? <Text style={styles.alreadyPurchasedText}>(Already purchased)</Text> : null}
                                        </View>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* <View><Text>{props.data.purchased_no_test} {chapterTest} {selectedChapterTest}{props.combinePrice}</Text></View> */}

                    {/* E-Library------------------------------- */}

                    {/* {board == 2 ?
                        <View style={styles.middleInsideContaoner}>
                            <View style={styles.leftOptionLabelContainer}>
                                <Text style={styles.optionText}>Case studies</Text>
                            </View>
                            <View style={styles.rightOptionContainer}>
                                <View style={styles.checkBoxParentContainer}>
                                    <Checkbox
                                        status={isBundle ? 'checked' : 'unchecked'}
                                        onPress={() => onBundleHandler()}
                                        theme={{ colors: { primary: '#245C75' } }}
                                        disabled
                                    />
                                    <View style={styles.checkBoxLlabelContainer}>
                                        <Text style={styles.disabledtext}>Bundle
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        : null
                    } */}

                    <View style={styles.toolTipContainer}>
                        {props.courseAvailable !== 1 ?
                            <Text style={Gstyles.toolTipText}>You cannot add any items because the course validity is expiring soon.</Text>
                            : null
                        }
                    </View>
                </View>
                <View style={styles.bottomContaoner}>
                    <View>
                        {/* <Text style={styles.priceText}>Rs.{props.combinePrice}/-</Text> */}
                        {/* {console.log("----11", props.combinePrice)} */}
                        {!optionChange ?
                            // <h4>Rs.{props.combinePrice}/-</h4> //cart_amount

                            cartList.length > 0 ?
                                <Text style={styles.priceText}>Rs.{cartList.find(element => element.subscription_id == props.id && element.only_elibrary == 0) ? cartList[cartList.indexOf(cartList.find(element => element.subscription_id == props.id))].cart_amount : props.combinePrice}/-</Text> : props.isPurchased == 1 ? <Text style={styles.purchasedText}>{`Purchased`}</Text> : <Text style={styles.priceText}>Rs.{props.combinePrice}/-</Text>

                            :
                            <ActivityIndicator size="small" color="#ff0000" />
                        }
                    </View>
                    <View>
                        {props.courseAvailable == 1 ?
                            props.isPurchased == 1 ?
                                null :
                                <>
                                    {!cartList.has_library == 0
                                        ?
                                        (!cartList.find(element => element.subscription_id == props.id && element.exam_category_id == 1 && element.combo_subject_ids.every(group => props.subject_id.find(o => o.subject_id == group))))
                                        :
                                        (!cartList.find(element => element.subscription_id == props.id && element.exam_category_id == 1 && element.only_elibrary == 0))
                                            ?
                                            props.combinePrice != 0 && chapterTest != ''
                                                ?
                                                <AddButton
                                                    buttonBackground={colors.scholasticSubscriptionAddButtonBackground}
                                                    // addToCart={() => finalSubscriptionSubmit()}
                                                    addToCart={() => props.isComplete == 0 ? finalSubscriptionSubmit() : updatedProfileInfo()}
                                                />
                                                :
                                                props.combinePrice == 0 && chapterTest != ''
                                                    ?
                                                    <Text style={styles.textWhite}>Select atleast 1 option</Text>
                                                    :
                                                    <Text style={[styles.textWhite, styles.messageArea]}>Select the Chapter You would like to test</Text>
                                            :
                                            <AddButton
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
                        {/* </View> */}

                    </View>


                    {/* <AddButton
                        buttonBackground={colors.scholasticSubscriptionAddButtonBackground}onClick={() => finalSubscriptionSubmit()}
                        addToCart={props.parentScreenaddToCartData}
                    /> */}
                </View>
            </View >

            <View style={props.isPurchased == 1 ? [styles.disableContainer, { height: board == 2 ? 320 : 330 }] : (cartList.find(element => element.subscription_id == props.id && element.exam_category_id == 1 && element.only_elibrary == 0)) ? [styles.disableContainer, { height: board == 2 ? 320 : 330 }] : null}>
            </View>

            <AlertCartSubscription
                isVisable={modalVisible}
                modalHeading="Cart Items"
                cartDetails=
                {!!testCartSelect && testCartSelect != undefined ?
                    <>
                        <Text>Details : Subject : {props.data.subject_name} {!!testCartSelect.length ? <>Test : [{testCartSelect.join(",")}] </> : null} {!!testCartSelect.length && case_studies == 1 ? '+' : null} {case_studies == 1 ? `Case studies` : null} {!!module && !!testCartSelect.length ? ' + ' : ''}{!!module ? `Module : 3` : null}{!!mock && !!module || !!mock && !!testCartSelect.length ? ' + ' : ''}{!!mock ? `Mock : 2` : null}{!!mock && !!library || !!module && !!library || !!testCartSelect.length && !!library ? ' + ' : ''}{!!library ? `e-Library` : null}</Text>
                    </>
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
            backgroundColor: colors.scholasticSubscriptionBackground,
            overflow: 'hidden',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
        },
        insideRightContaoner: {
            width: 40,
            height: 40,
            backgroundColor: '#fff',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center'
        },
        topContaoner: {
            width: '100%',
            height: 50,
            overflow: 'hidden',
            backgroundColor: colors.scholasticSubscriptionTopBackground,
            justifyContent: 'center',
            paddingHorizontal: 20,
            elevation: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowOffset: {
                width: 0,
                height: 4
            },
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
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
        imageStyle: {
            flex: .6,
            width: '70%',
            height: '70%',
            resizeMode: 'contain',
        },
        subjectName: {
            color: '#245C75',
            fontFamily: fonts.rRegular,
            fontSize: 16,
        },
        priceText: {
            color: '#57C761',
            fontFamily: fonts.rRegular,
            fontSize: 18,
        },
        middleContaoner: {
            width: '90%',
            marginBottom: 10,
        },
        middleInsideContaonerTopBorder: {
            borderTopmWidth: 1,
            borderTopColor: '#7FBE85',
            borderTopStyle: 'solid',
            marginVertical: 5,
        },
        middleInsideContaoner: {
            width: '100%',
            // justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#7FBE85',
            borderBottomStyle: 'solid',
            marginVertical: 5,

            borderBottomWidth: 1,
            borderBottomColor: '#7FBE85',
            borderBottomStyle: 'solid',
            paddingBottom: 9,
        },

        middleInsideContaonerForTest: {
            // width: '100%',
            // justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',

            marginVertical: 5,
            paddingBottom: 9,
            // flexWrap: 'wrap'
        },
        middleInsideContaonerForTestWithCaseStudies: {
            // width: '100%',
            // justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',

            marginVertical: 5,
            // flexWrap: 'wrap'
        },
        middleInsideContaonerForCaseStudy: {
            // width: '100%',
            // justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',

            // marginVertical: 5,
            paddingBottom: 9,
            flexWrap: 'wrap'
        },
        testBorderBottom: {
            borderBottomWidth: 1,
            borderBottomColor: '#7FBE85',
            borderBottomStyle: 'solid',
        },
        optionText: {
            color: '#245C75',
            fontFamily: fonts.rLight,
            fontSize: 14,
        },
        rightOptionContainer: {
            flex: 1,
        },

        leftOptionLabelContainer: {
            // flex: .9,
            width: 120,
        },
        noImageText: {
            color: '#245C75',
            fontFamily: fonts.rLight,
            fontSize: 10,
            textAlign: 'center'
        },
        radioButtonContainer: {
            // flex: .47,
            width: 75,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            // borderWidth: 1,
        },
        checkBoxTextParentContainer: {
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            left: -10,
        },
        textCheckBoxLlabelContainer: {
            // width: '90%',
            flexDirection: 'row'
        },
        checkBoxParentContainer: {
            flex: 1,
            alignSelf: 'flex-start',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            flexDirection: 'row',
            marginRight: 5,
        },
        checkBoxLlabelContainer: {
            width: '90%',
            flexDirection: 'row'
        },
        checkBoxlabelText: {
            color: '#245C75',
            fontFamily: fonts.rRegular,
            fontSize: 14,
        },
        alreadyPurchasedText: {
            paddingLeft: 3,
            color: '#819482',
            fontFamily: fonts.rLight,
            fontSize: 8,
            textAlign: 'center'
        },
        disabledtext: {
            color: '#819482',
        },
        disableContainer: {
            width: '90%',
            // height: 200,
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
        purchasedText: {
            color: '#e3e3e3',
            fontFamily: fonts.rRegular,
            fontSize: 18,

        },
        textWhite: {
            color: '#fff',
        },
        messageArea: {
            // borderWidth:1,
            width: '60%',
            alignSelf: 'flex-end'
        },
        toolTipContainer: {
            // borderTopWidth: 1,
        }

    });

export default ScholasticSubscriptionExamCard;