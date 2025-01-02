import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    View,
    Text,
    KeyboardAvoidingView,
    StatusBar,
    ImageBackground,
    FlatList
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

import HeaderComponent from '../../components/HeaderComponent';
import { container } from '../../styles/Crestest.config';

import ScholasticSubscriptionExamCard from '../Subscription/SubscriptionComponent/ScholasticSubscriptionExamCard';
import Gstyles from '../../styles/GlobalStyle';
import moment from 'moment';

// import { getScSubjectData } from '../../store/actions/SubscribeAction';

import { getScSubjectData, getCmSubjectData, subscribeLoading, removeSubjectListAction, subscriptionPreviousValueNTSEAction, subscriptionPreviousValueNSTSEAction, getIntegratedScSubjectData, eLibrarySelectSubjectsListAction, checkBoxStatusAction, scholasticSubscriptionSourceAction, compititiveSubscriptionSourceAction, getScSubjectAction, scholasticCombinationPriceIdAction, getOnlyLibraryScData } from '../../store/actions/SubscribeAction';

import { getAcademicSessionExistForExamDetails } from '../../store/actions/AcademicActions';

const SubscriptionOnlineScholasticList = (props) => {

    const dispatch = useDispatch();

    const [categoty, setCategory] = useState(props.route.params.category);
    // const [board, setBoard] = useState('');
    const [classValue, setClassName] = useState('');
    const [subjectSelectWithSource, setSubjectSelectWithSource] = useState([]);

    const [isProfileUpdated, setIsProfileUpdated] = useState('')

    const scsubjectlist = useSelector(state => state.subscribe.scSubjectList);
    const scholasticSubscriptionSourceData = useSelector(state => state.subscribe.scholasticSubscriptionSourceData);
    const cartList = useSelector(state => state.subscribe.cartList);

    const SubStatus = useSelector(state => state.subscribe.scSubscriptionStatus);
    const scholasticCombinePrice = useSelector((state) => state.subscribe.scholasticCombinePrice);
    const scholasticCombinePriceId = useSelector((state) => state.subscribe.scholasticCombinePriceId);
    const class_id = useSelector((state) => state.auth.class_id);
    const board = useSelector((state) => state.auth.board,);
    // const eLibrarySelectSubjectsList = useSelector(state => state.subscribe.eLibrarySelectSubjectsList);
    const courseValidity = useSelector(state => state.subscribe.courseValidity);
    const courseAvailable = useSelector(state => state.subscribe.courseAvailable);
    const academicSessionDetals = useSelector(state => state.academic.academicSessionDetals);

    const checkProfile = useSelector(state => state.subscribe.checkProfile);

    const [scStateList, setScStateList] = useState()

    useEffect(() => {
        dispatch(getScSubjectData(props));
        dispatch(getAcademicSessionExistForExamDetails(1, props));
    }, []);

    useEffect(() => {

        if (scholasticCombinePriceId != null) {
            // console.log("@123-----@1-1-", scholasticCombinePrice, scholasticCombinePriceId)
            scsubjectlist.map(u => u.cart_amount = u.id == scholasticCombinePriceId ? scholasticCombinePrice : u.cart_amount);

            dispatch(scholasticCombinationPriceIdAction(null));
            // dispatch(getScSubjectAction(newNewValue))
        }

    }, [SubStatus, scholasticCombinePrice, scholasticCombinePriceId,]);

    useEffect(() => {
        if (checkProfile?.isComplete == 1) {
            setIsProfileUpdated(1)
        } else {
            setIsProfileUpdated(0)
        }
    }, [checkProfile]);

    /* useEffect(() => {
        dispatch(getCategoryData(history));
        dispatch(getAllexamCategories(history));
        dispatch(getExamTypeData(2, history));
        dispatch(getClassStandardData(history));
        dispatch(getBoardData(history));
        //setCategory('')
        //setType('');
        //setBoard('')
        ///setClassName('')

        if (SubStatus === 1) {
            // dispatch(subscribeLoading(true));
            if (type != '') {
                dispatch(getCmSubjectData(type, type == '1' ? 0 : classValue, history));
            } else {
                dispatch(getScSubjectData(board, classValue, history));
                setType('');
            }
        }
        if (scholasticCombinePriceId != null) {
            props.scsubjectlist.map(u => u.cart_amount = u.id === scholasticCombinePriceId ? scholasticCombinePrice : u.cart_amount);
        }
        // previousPurchasedDetails();
    }, [SubStatus, scholasticCombinePrice, scholasticCombinePriceId]); */

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const addToCart = () => {
        console.log("addToCart----Subscribe----")
    }

    const hasItemWithKeyAndValue = (arr, key, value) => {
        return arr.some(item => item[key] === value);
    }

    const e_library_select_handaler = (comboIds, subjectId) => {//, d
        //console.log("select_handaler----11----", subjectId, comboIds)

        // setIsSelected(d)
        // dispatch(checkBoxStatusAction(d))
        /* new data set create ---------- */

        let subjectCard = {};
        subjectCard.category_id = categoty;
        subjectCard.subject_id = subjectId;
        subjectCard.combo_subject_ids = [];
        subjectCard.source = "online";


        let test_new_data = {};
        let test_new_data_array = [];
        for (let i = 0; i < comboIds.length; i++) {
            //test_new_data['subject_id'] = comboIds[i];
            test_new_data_array.push(comboIds[i]);
        }
        subjectCard.combo_subject_ids = test_new_data_array;


        // console.log("test_new_data_array---", test_new_data_array)
        /* if (subjectSelectWithSource == '') {
            setSubjectSelectWithSource(test_new_data_array)
            dispatch(scholasticSubscriptionSourceAction(test_new_data_array))
        } else { */
        let temp_data = scholasticSubscriptionSourceData.concat(subjectCard);
        setSubjectSelectWithSource(temp_data)
        dispatch(scholasticSubscriptionSourceAction(temp_data))
        // }
        /* new data set create--------------- */

        /* let new_data = {};
        for (let i = 0; i < 1; i++) {
            new_data = {};
            new_data = id;
        }
        if (selectElibrarySubjectId == '') {
            setSelectElibrarySubjectId(new_data)
            dispatch(eLibrarySelectSubjectsListAction(new_data))
        } else {
            let temp_data = selectElibrarySubjectId.concat(new_data);
            setSelectElibrarySubjectId(temp_data)
            // console.log("*****-----", temp_data)
            dispatch(eLibrarySelectSubjectsListAction(temp_data))
        } */
    }

    const e_library_unselect_handaler = (comboIds, subjectId) => {//, d
        //const e_library_unselect_handaler = (id, d) => {
        // console.log("unselect_handaler----22----", id, d)

        // setIsSelected(d)
        // dispatch(checkBoxStatusAction(d))
        /* let difference = selectElibrarySubjectId.filter(x => !id.includes(x));
        setSelectElibrarySubjectId(difference)
        dispatch(eLibrarySelectSubjectsListAction(difference)) */
        //console.log("unselect_handaler----difference----", difference)

        /* new Source data create------ */



        //console.log(">>>",comboIds, subjectId);
        let differenceNew = scholasticSubscriptionSourceData.filter(x => x.subject_id != subjectId);


        //console.log(">>>",differenceNew);
        //let differenceNew = scholasticSubscriptionSourceData.filter(x => !id.includes(x.subject_id));
        setSubjectSelectWithSource(differenceNew)
        dispatch(scholasticSubscriptionSourceAction(differenceNew))
        /* new Source data create------ */
    }
    const getCourseValidityDate = (startDate, endDate) => {
        let output = "NA";
        if (startDate && endDate) {
            let formattedStartDate = moment(startDate).format("DD/MM/YYYY");
            let formattedEndDate = moment(endDate).format("DD/MM/YYYY");
            output = `${formattedStartDate} - ${formattedEndDate}`;
        }
        return output;
    }

    const getCourseValidityDateformat = (date) => {
        let output = "NA";
        if (date) {
            let validityDate = date.split("-");
            let startDate = `${validityDate[0]}-${validityDate[1]}-${validityDate[2]}`;
            let endDate = `${validityDate[3]}-${validityDate[4]}-${validityDate[5]}`;
            let formattedStartDate = moment(startDate).format("DD/MM/YYYY");
            let formattedEndDate = moment(endDate).format("DD/MM/YYYY");
            output = `${formattedStartDate} - ${formattedEndDate}`;
        }
        return output;
    };

    const isCompleteStatusUpdate = () => {
        console.log("isCompleteStatusUpdate-----")
        setIsProfileUpdated(0)
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
                    headerName='Subscription for Scholastic Courses'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />

                <ImageBackground source={require('../../assets/images/background_base.png')} style={[Gstyles.imageBackgroundContainer, { paddingVertical: 20, }]} >

                    <View style={Gstyles.courseValidityContainer}>
                        <Text style={Gstyles.academicYearText}>{`Academic Year: ${props?.route.params?.currentSession ? props?.route.params?.currentSession : 'NA'}`}</Text>
                        {props?.route.params?.currentSession ?
                            <Text style={Gstyles.courseValidityText}>{`Course Validity: ${getCourseValidityDateformat(courseValidity)}`}</Text>
                            : null}

                        {courseAvailable === 1 ? null :
                            <View style={Gstyles.courseValidityInfoContainer}>
                                <Entypo name="info-with-circle" size={12} color={'#d7a300'} />

                                <Text style={Gstyles.courseValidityText2}> {`After the course validity expires, you can't access any features (All online exam and e-Library)`}</Text>
                            </View>
                        }
                    </View>

                    {(scsubjectlist != '' && courseValidity != '') ?
                        <FlatList
                            data={scsubjectlist}
                            contentContainerStyle={[Gstyles.subscriptionListParentContainer]}

                            renderItem={({ item, index }) =>
                            (
                                <ScholasticSubscriptionExamCard
                                    key={item.id}
                                    id={item.id}
                                    data={item}
                                    subjectName={item.subject_name}


                                    subject_cards={scholasticSubscriptionSourceData}

                                    selectSubscriptionCard={hasItemWithKeyAndValue(cartList, 'subscription_id', item.id) ? item.id : 0}
                                    setCount={item.set_count}
                                    category_id={categoty}
                                    board={board}
                                    class_no={class_id}

                                    isPurchased={item.is_purchased}
                                    // combinePrice={item.cart_amount}
                                    combinePrice={scholasticCombinePriceId != null && item.id === scholasticCombinePriceId ? scholasticCombinePrice : item.cart_amount}

                                    listNumber={index}

                                    sticker_text={item.sticker_text}
                                    subject_image={item.subject_image}
                                    test_count={item.test_count}
                                    combo_subject_names={item.combo_subject_names}
                                    combo_subject_ids={item.combo_subject_ids}
                                    e_library_select_handaler={e_library_select_handaler}
                                    e_library_unselect_handaler={e_library_unselect_handaler}
                                    // parentScreenaddToCartData={() => addToCart()}
                                    courseAvailable={courseAvailable}
                                    checkProfile={checkProfile}
                                    isComplete={isProfileUpdated}
                                    isCompleteStatusUpdate={isCompleteStatusUpdate}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        :
                        <View style={Gstyles.noDataContainer}><Text style={Gstyles.noSubText}>Course not available at the moment. Don't worry, new courses will be added soon!</Text></View>
                    }
                </ImageBackground>
            </KeyboardAvoidingView>
        </>

    );
};

export default SubscriptionOnlineScholasticList;