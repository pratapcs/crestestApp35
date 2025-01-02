import React, { useEffect, useState } from 'react';
import { View, StatusBar, KeyboardAvoidingView, ScrollView, ImageBackground } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';

import CategoryCard from "../../components/CategoryCard"
import SessionTime from './elibrary/elibraryComponent/SessionTime';
import MostVisitedSubject from './elibrary/elibraryComponent/MostVisitedSubject';
import MostSearchQuestion from './elibrary/elibraryComponent/MostSearchQuestion';

import { selectExamCategoryAction, getCategoryData, selectExamCategoryRequestAction } from '../../store/actions/ExamCategoryAction';

import { performanceRequestAction, getelibrarySessionTimeDataDetails, elibraryMostVisitedSubjectsDataDetails, elibraryMostSearchQuestionsDataDetails, getelibrarySessionTimeDataAction, elibraryMostVisitedSubjectsDataAction, elibraryMostSearchQuestionsDataAction  } from '../../store/actions/ArchivePerformanceScoreAction';


const ArchiveELibraryCompetitivePerformanceScore = (props) => {

    const dispatch = useDispatch();

    const elibrarySessionTime = useSelector(state => state.archivePerformance.elibrarySessionTime);
    const elibraryMostVisitedSubjects = useSelector(state => state.archivePerformance.elibraryMostVisitedSubjects);
    const elibraryMostSearchQuestions = useSelector(state => state.archivePerformance.elibraryMostSearchQuestions);


    useEffect(() => {
        // console.log("route=====", props)
        // console.log("props.route.params.id-com--", props.route.params)
        // dispatch(getCategoryData(props));
        dispatch(getelibrarySessionTimeDataDetails(props.route.params.categoryId, props.route.params.item.id, props.route.params.class_id, props))
        dispatch(elibraryMostVisitedSubjectsDataDetails(props.route.params.categoryId, props.route.params.item.id, props.route.params.class_id, props))
        dispatch(elibraryMostSearchQuestionsDataDetails(props.route.params.categoryId, props.route.params.item.id, props.route.params.class_id, props))

    }, []);

    useEffect(() => {
        return () => {
            dispatch(getelibrarySessionTimeDataAction([]));
            dispatch(elibraryMostVisitedSubjectsDataAction([]));
            dispatch(elibraryMostSearchQuestionsDataAction([]));
        }
    }, []);

    const leftIconHandeler = () => {
        props.navigation.goBack()
    }

    // const examcategoryList = useSelector(state => state.category.examcategoryList);

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={container}
            >
                {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                <HeaderComponent
                    headerName='Archive e-Library Competitive Performance Score'
                    leftIcon='chevron-back'
                    leftIconHandeler={leftIconHandeler}
                />
                {/* {console.log("====11", elibrarySessionTime)} */}
                {/* {console.log("====12", elibraryMostVisitedSubjects)} */}
                {/* {console.log("====13", elibraryMostSearchQuestions)} */}
                <ImageBackground source={require('../../assets/images/elibrary_background.png')} style={Gstyles.imageBackgroundContainer} >
                    {/* <View style={Gstyles.insideOnlineExamParentContainer}> */}
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ paddingVertical: 20, }}
                        showsVerticalScrollIndicator={false}
                    >
                        {elibrarySessionTime != '' && elibrarySessionTime != undefined &&
                            <SessionTime
                                heading="Session Time"
                                series={elibrarySessionTime.series[0]}
                                categories={elibrarySessionTime.categories}
                            // onPressDetails={showDetails}
                            />
                        }
                        {elibraryMostVisitedSubjects != '' && elibraryMostVisitedSubjects != undefined &&
                            <MostVisitedSubject
                                heading="Most Visited Subject"
                                series={elibraryMostVisitedSubjects.series[0]}
                                categories={elibraryMostVisitedSubjects.categories}
                            />
                        }

                        {elibraryMostSearchQuestions != '' && elibraryMostSearchQuestions != undefined &&
                            <MostSearchQuestion
                                heading="Most Search Questions"
                                series={elibraryMostSearchQuestions.series[0]}
                                categories={elibraryMostSearchQuestions.categories}
                            />
                        }
                    </ScrollView>
                    {/* </View> */}
                </ImageBackground>
            </KeyboardAvoidingView>
        </>

    );
};

export default ArchiveELibraryCompetitivePerformanceScore;