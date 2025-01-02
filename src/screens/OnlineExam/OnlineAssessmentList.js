import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, KeyboardAvoidingView, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';

import HeaderComponent from '../../components/HeaderComponent';
import { colors, fonts, iconeSize } from '../../styles/Crestest.config';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import AssessmentListCard from './onlineComponent/AssessmentListCard';
import AssessmentListSearchDetails from './onlineComponent/AssessmentListSearchDetails';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

import { getExamAssessmentListDetails, getExamAssessmentListAction } from '../../store/actions/SubscribeAction';
import { demoAssessmentListSuccessAction, onlineExamIdAction, getDemoAssessmentListsData } from '../../store/actions/ScholasticAction';
import { previousExamTypeAction } from '../../store/actions/OnlineExamAction'
import { getAdvertisementDetails } from '../../store/actions/AuthActions';

import AdComponent from '../../components/AdComponent';
const adImageContent = "https://admin.clvdev.in/assets/advertisments/ad_project.png"



const OnlineAssessmentList = (props) => {

    const dispatch = useDispatch();

    const newStudentid = useSelector(state => state.student.newStudentid);
    const demoExamAessmentCountList = useSelector(state => state.questionNo.demoExamAessmentCountList);
    const examAssessmentList = useSelector(state => state.subscribe.examAssessmentList);
    const advertisementDetails = useSelector(state => state.auth.advertisementDetails);


    const [category, setCategory] = useState('');
    const [groupSubject, setGroupSubject] = useState('');
    const [subject, setSubject] = useState('');

    React.useEffect(() => {
        const callUpdateUserDetails = props.navigation.addListener('focus', () => {
            if (props.route.params.id == 4) {
                dispatch(getDemoAssessmentListsData(newStudentid, props))
            } else if (props.route.params.id == 5) {
                // console.log("##@5------")
                dispatch(getExamAssessmentListDetails(category, groupSubject, subject, props));
            }
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return callUpdateUserDetails

    }, [category, groupSubject, subject]);

    useEffect(() => {
        dispatch(getExamAssessmentListDetails(category, groupSubject, subject, props));
    }, [category, groupSubject, subject]);

    useEffect(() => {
        dispatch(getAdvertisementDetails(props));
    }, []);



    useEffect(() => {

        return () => {
            dispatch(demoAssessmentListSuccessAction([]));
            dispatch(getExamAssessmentListAction([]));
        };

    }, []);

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    const showAssessmentDestails = (item) => {
        if (props.route.params.id == 4) {
            props.navigation.navigate('nonAuthScenes', {
                screen: "DemoAssessment",
                params: { exam_category_id: item.exam_category_id, student_status: item.student_status, student_id: item.student_id, assessmentName: item.headingmsg, assessmentName: item.headingmsg, subheading: item.subheading, exam_date: item.exam_date, page: 4 }
            })
        } else if (props.route.params.id == 5) {
            dispatch(previousExamTypeAction(item.category_id))
            props.navigation.navigate('nonAuthScenes', {
                screen: "DemoAssessment",
                params: { category_id: item.category_id, exam_unique_id: item.exam_unique_id, category: category, groupSubject: groupSubject, subject: subject, page: 5 }
            })
            dispatch(onlineExamIdAction(item.exam_unique_id))
        }

    }

    const filterData = (categorySave, groupSave, subjectSave) => {
        setCategory(categorySave);
        setGroupSubject(groupSave);
        setSubject(subjectSave)
    }

    const assessmentListDetailsHandeler = () => {
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <AssessmentListSearchDetails assessmentFilterData={filterData} />,
                'componentHeight': 330,
            });
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
                    headerName={props.route.params.id == 4 ? 'Demo Assessment' : props.route.params.id == 5 ? 'Online Assessment List' : null}
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />
                <ImageBackground source={require('../../assets/images/background_base.png')} style={Gstyles.imageBackgroundContainer} >
                    {(props.route.params.id == 4 ? demoExamAessmentCountList != '' : examAssessmentList != '') ?
                        <FlatList
                            data={props.route.params.id == 4 ? demoExamAessmentCountList : examAssessmentList}
                            contentContainerStyle={[Gstyles.competitiveSubCategoryParentContainer]}
                            renderItem={({ item, index }) =>
                            (
                                <AssessmentListCard
                                    assessmentCategory={props.route.params.id}
                                    categoryId={props.route.params.id == 4 ? item.exam_category_id : props.route.params.id == 5 ? item.category_id : null}
                                    subject_name={item.subject_name}
                                    chapter_name={item.chapter_name}
                                    exam_type={item.exam_type}
                                    appeared_on={item.appeared_on}
                                    submitted_on={item.submitted_on}
                                    status={item.status}
                                    is_expired={item.is_expired}
                                    assessment_available={item.assessment_available}
                                    showAssessmentDestails={() => showAssessmentDestails(item)}
                                    subject_color_code={item.subject_color_code}
                                    exam_name={item.exam_name} // for competitive only
                                    headingmsg={item.headingmsg} // for demo
                                    subheading={item.subheading} // for demo
                                    exam_date={item.exam_date} // for demo
                                    expired_text={item.expired_text} // for demo
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        :
                        <View style={Gstyles.noDataContainer}>
                            <Text>No Data</Text>
                        </View>
                    }
                    {props.route.params.id == 5 && examAssessmentList != '' ?
                        <TouchableOpacity onPress={() => assessmentListDetailsHandeler()} style={Gstyles.assessmentNumberContainer}>
                            <Ionicons name="search" size={20} color="#245C75" />
                        </TouchableOpacity>
                        : null
                    }
                    {props.route.params.id == 4 ?
                        advertisementDetails?.[3] != '' ?
                            <AdComponent
                                adImage={advertisementDetails?.[3]}
                            />
                            : null

                        : null}

                </ImageBackground>


            </KeyboardAvoidingView >
        </>

    );
};

export default OnlineAssessmentList;