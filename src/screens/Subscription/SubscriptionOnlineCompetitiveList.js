import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    View,
    Text,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    ImageBackground,
    FlatList
} from 'react-native';

import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';

import HeaderComponent from '../../components/HeaderComponent';
import { container } from '../../styles/Crestest.config';
import CompetitiveSubscriptionExamCard from '../Subscription/SubscriptionComponent/CompetitiveSubscriptionExamCard';
import Gstyles from '../../styles/GlobalStyle';

// import { getCmSubjectData } from '../../store/actions/SubscribeAction';
import { getScSubjectData, getCmSubjectData, subscribeLoading, removeSubjectListAction, subscriptionPreviousValueNTSEAction, subscriptionPreviousValueNSTSEAction, getIntegratedScSubjectData, eLibrarySelectSubjectsListAction, checkBoxStatusAction, scholasticSubscriptionSourceAction, compititiveSubscriptionSourceAction, getCmSubjectAction } from '../../store/actions/SubscribeAction';



const SubscriptionOnlineCompetitiveList = (props) => {

    const dispatch = useDispatch();

    const [categoty, setCategory] = useState('');
    const [type, setType] = useState('');
    const [classValue, setClassName] = useState('');
    // const [board, setBoard] = useState('');
    const [isClass, setIsClass] = useState(true);
    const [defalutSelectValue, setDefalutSelectValue] = useState('');
    const [selectSubId, setSelectSubId] = useState()

    const [isProfileUpdated, setIsProfileUpdated] = useState('')

    const [isVisable, setIsVisable] = useState(false)

    const cmSubjectList = useSelector(state => state.subscribe.cmSubjectList);
    const class_id = useSelector((state) => state.auth.class_id);
    const board = useSelector((state) => state.auth.board);

    const courseValidity = useSelector(state => state.subscribe.courseValidity);
    const courseAvailable = useSelector(state => state.subscribe.courseAvailable);
    const academicSessionDetals = useSelector(state => state.academic.academicSessionDetals);

    const checkProfile = useSelector(state => state.subscribe.checkProfile);


    useEffect(() => {
        // console.log("props.route.params----", props.route.params.item)
        setType(props.route.params.type)
        setCategory(props.route.params.item.exam_category_id)
        setIsClass(props.route.params.type == 1 ? false : true)
        dispatch(compititiveSubscriptionSourceAction([]))

        if (props.route.params.type != 2) {
            dispatch(getCmSubjectData(props.route.params.type, 0, isVisableData(), props));
        } else if (props.route.params.type == 2) {
            dispatch(getCmSubjectData(props.route.params.type, class_id, isVisableData(), props));
        }

    }, []);

    useEffect(() => {
        return () => {
            setIsVisable(false)
            // dispatch(getCmSubjectAction(response.data.data));
        }
    }, []);

    useEffect(() => {
        if (checkProfile?.isComplete == 1) {
            setIsProfileUpdated(1)
        } else {
            setIsProfileUpdated(0)
        }
    }, [checkProfile]);

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const competitiv_e_library_select_handaler = (e, id, exam_type) => {
        setSelectSubId(id)
        dispatch(compititiveSubscriptionSourceAction({ e, id, exam_type }))
    }

    const competitiv_e_library_unselect_handaler = (e, id, exam_type) => {
        setSelectSubId(0)
        dispatch(compititiveSubscriptionSourceAction([]))
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
        setIsProfileUpdated(0)
    }

    const isVisableData = () => {
        // console.log("isVisableData--------")
        setIsVisable(true)
    }

    return (

        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                {isVisable ?
                    <>
                        <HeaderComponent
                            headerName={`Subscription for ${props.route.params?.item.type_name}`}
                            leftIcon='chevron-back'
                            leftIconHandeler={leftIconHandeler}
                        />

                        <View style={Gstyles.courseValidityContainer}>
                            <Text style={Gstyles.academicYearTextWhite}>{`Academic Year: ${props?.route?.params?.item?.academic_year ? props?.route?.params?.item?.academic_year : 'NA'}`}</Text>
                            {props?.route.params?.currentSession ?
                                <Text style={Gstyles.courseValidityTextWhite}>{`Course Validity: ${getCourseValidityDateformat(courseValidity)}`}</Text>
                                : null}
                            {cmSubjectList != '' && cmSubjectList.length > 0 && courseValidity ?
                                courseAvailable === 1 ? null :
                                    <View style={Gstyles.courseValidityInfoContainer}>
                                        <Entypo name="info-with-circle" size={12} color={'#d7a300'} />

                                        <Text style={Gstyles.courseValidityText2}> {`After the course validity expires, you can't access any features (All online exam and e-Library)`}</Text>
                                    </View>
                                : null
                            }
                        </View>

                        {cmSubjectList != '' && cmSubjectList.length > 0 && courseValidity ?
                            <View style={Gstyles.purchasedInfoContainer}>
                                <Text>Total set purchased : {cmSubjectList[0].total_set_purchased} / {cmSubjectList[0].max_set_no}</Text>
                            </View>
                            : null}
                        <ImageBackground source={require('../../assets/images/background_base.png')} style={[Gstyles.imageBackgroundContainer, { paddingVertical: 10, }]} >

                            {(cmSubjectList != '' && courseValidity) ?
                                <FlatList
                                    data={cmSubjectList}
                                    contentContainerStyle={[Gstyles.subscriptionListParentContainer]}
                                    renderItem={({ item, index }) =>
                                    (
                                        <CompetitiveSubscriptionExamCard
                                            key={item.id}
                                            selectSubId={selectSubId}
                                            id={item.id}
                                            data={item}
                                            amount={item.amount}
                                            setCount={item.set_count}
                                            questionPerset={item.question_per_set}
                                            category_id={categoty}
                                            type={type}
                                            class_no={class_id}
                                            exam_type_id={item.exam_type_id}
                                            library={item.library_price}
                                            isPurchased={item.is_purchased}
                                            sticker_text={item.sticker_text}
                                            competitiv_e_library_select_handaler={competitiv_e_library_select_handaler}
                                            competitiv_e_library_unselect_handaler={competitiv_e_library_unselect_handaler}
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
                    </>
                    :
                    null}
            </KeyboardAvoidingView>
        </>

    );
};

export default SubscriptionOnlineCompetitiveList;