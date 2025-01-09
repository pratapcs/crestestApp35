import React, { useEffect, useState, useRef } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, FlatList, Modal, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Orientation, {
    useOrientationChange,
    useDeviceOrientationChange,
    useLockListener,
} from 'react-native-orientation-locker';

import HeaderComponent from '../../../components/HeaderComponent';

import Gstyles from '../../../styles/GlobalStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IonMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AssessmentCard from './examComponent/AssessmentCard'
import AssessmentNumberDetails from './examComponent/AssessmentNumberDetails'
import FeedbackCard from './examComponent/FeedbackCard'

import moment from 'moment';


import { getDemoAssessmentList, getOnlineScholasticAssessmentDetailsExamIDWise, getOnlineCompetitiveAssessmentDetailsExamIDWise, onlineScholasticAssessmentListFailureAction, onlineScholasticAssessmentListSuccessAction } from '../../../store/actions/ScholasticAction'
import { getFeedbackDetails, storeFeedbackDetails } from '../../../store/actions/OnlineExamAction'

import {drawerMenuActiveIdUpdateAction,} from '../../../store/actions/DashboardAction'

import Emitter from '../../../utils/Emitter';
import * as Events from '../../../configs/Events';
import { fonts, } from '../../../styles/Crestest.config';


import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const trasparent = 'rgba(0,0,0,0.5)';


const DemoAssessment = (props) => {

    const dispatch = useDispatch();
    const [feedbackModal, setFeedbackModal] = useState(false)
    
    const [feedback, setFeedback] = useState([]);

    const demoExamAessmentDetailsList = useSelector((state) => state.questionNo.demoExamAessmentDetailsList);
    const onlineScholasticExamAessmentDetailsList = useSelector((state) => state.onlineexam.onlineScholasticExamAessmentDetailsList);
    const feedbackDetails = useSelector((state) => state.onlineexam.feedbackDetails);

    const examid = useSelector(state => state.onlineexam.examId);

    const [assessmentDetails, setAssessmentDetails] = useState([])
    const [previousPageValue, setPreviousPageValue] = useState(props.route.params)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentAssessmentNumber, setCurrentAssessmentNumber] = useState(0)
    const [headingArrowSize, setHeadingArrowSize] = useState(11)
    const [headingArrowColor, setHeadingArrowColor] = useState("#000")

    const [isLocked, setLocked] = useState();
    const [orientation, setOrientation] = useState();
    const [deviceOrientation, setDeviceOrientation] = useState();
    const [lock, setLock] = useState();
    /* 0 = Portrait, 1 = Landscape  */
    const [isPortraitLandscape, setIsPortraitLandscape] = useState(0);
    const [gestureName, setGestureName] = useState();
    const [isPressAllIcon, setIsPressAllIcon] = useState(false);

    const callFirstTimeRef = useRef(true);

    useEffect(() => {
        // console.log("props.route.params----1233--", props.route.params)
        if (props.route.params.page == 4) {
            // console.log("@1----@4--")
            dispatch(getDemoAssessmentList(props.route.params.exam_category_id, props.route.params.student_status, props.route.params.student_id, props))
        } else if (props.route.params.page == 5 || props.route.params.page == 2) {

            // console.log("@1----@5--")
            if (props.route.params.category_id == 1) {
                dispatch(getOnlineScholasticAssessmentDetailsExamIDWise(props.route.params.exam_unique_id, props))
            } else if (props.route.params.category_id == 2) {
                dispatch(getOnlineCompetitiveAssessmentDetailsExamIDWise(props.route.params.exam_unique_id, props))
            }
        } /* else if (props.route.params.page == 2) {
            console.log('props.route.params.page == 2-----')
            dispatch(getOnlineScholasticAssessmentDetailsExamIDWise(props.route.params.exam_unique_id, props))
        } */ else {
            // console.log("@1---@22---", props.route.params.exam_category_id, props.route.params.student_status, props.route.params.student_id,)
            dispatch(getDemoAssessmentList(props.route.params.exam_category_id, props.route.params.student_status, props.route.params.student_id, props))
        }
    }, []);

    useEffect(() => {
        Orientation.lockToPortrait();
        checkLocked();

        const backAction = (e) => {
            if (props.route.params.page == 4 || props.route.params.page == 5) {
                return false;
            } else {
                return true;
            }

        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        if (props.route.params.page == 4) {
            setAssessmentDetails(demoExamAessmentDetailsList)
        } else if (props.route.params.page == 5 || props.route.params.page == 2) {
            setAssessmentDetails(onlineScholasticExamAessmentDetailsList)
        } else {
            setAssessmentDetails(demoExamAessmentDetailsList)
        }

    }, [demoExamAessmentDetailsList, onlineScholasticExamAessmentDetailsList]);

    useEffect(() => {
        if (!!onlineScholasticExamAessmentDetailsList.length && onlineScholasticExamAessmentDetailsList[0].exam_feedback == 0 && callFirstTimeRef.current) {
            modalShowOffHandeler(true);
            callFirstTimeRef.current = false;
        }
    }, [onlineScholasticExamAessmentDetailsList]);

    useEffect(() => {

        return () => {
            Orientation.lockToPortrait();
            checkLocked();
        }
    }, []);

    useEffect(() => {
        feedback.map((item, index) => {
            if (feedback[0].rating_value != undefined && feedbackDetails.length === feedback.length) {
                setIsPressAllIcon(true)
            }
        })
    }, [feedback]);

    useEffect(() => {
        dispatch(getFeedbackDetails(props));
    }, []);

    useEffect(() => {
        return () => {
            console.log("return from Demo Assessment")
            dispatch(onlineScholasticAssessmentListFailureAction([]));
            setFeedbackModal(false);
        }
    }, []);

    const leftIconHandeler = () => {
        if (props.route.params.page == 4 || props.route.params.page == 5) {
            props.navigation.goBack()
        } else {
            console.log("Demo Assessment Dashboard icon click")
            dispatch(drawerMenuActiveIdUpdateAction(1));
            // dispatch(onlineScholasticAssessmentListSuccessAction([]));
            dispatch(onlineScholasticAssessmentListFailureAction([]));
            props.navigation.navigate('drawerScenes', {
                screen: "Dashboard",
            })
        }
    }

    const assessmentNumberDetailsHandeler = () => {
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <AssessmentNumberDetails props={props} setCurrentAssessmentNumber={setCurrentAssessmentNumberFromModal} params={{ correct: assessmentDetails.filter(i => i.guest_post_ans_status === 1).length, incorrect: assessmentDetails.filter(i => i.guest_post_ans_status === 0 && i.guest_post_ans !== "undefined").length, notAttempted: assessmentDetails.filter(i => i.guest_post_ans_status === 0 && i.guest_post_ans === "undefined").length, total: assessmentDetails.length, assessmentDetails: assessmentDetails, currentAssessmentNumber: currentAssessmentNumber, }} />,
                'componentHeight': 350,
            });
    }

    const previousAssessment = () => {
        setCurrentAssessmentNumber(currentAssessmentNumber - 1)
    }

    const nextAssessment = () => {
        setCurrentAssessmentNumber(currentAssessmentNumber + 1)
    }
    const setCurrentAssessmentNumberFromModal = (num) => {
        setCurrentAssessmentNumber(num)
    }

    const modalShowOffHandeler = (value) => {
        setFeedbackModal(value)
    }


    const updatedRating = (newValue, id) => {
        let tempFeedback = [...feedback];
        if (!!tempFeedback.length) {
            let objIndex = tempFeedback.findIndex((obj => obj.id == id));
            if (objIndex != -1) {
                tempFeedback[objIndex].rating_value = newValue
                setFeedback(tempFeedback)
            } else {
                var id_feedbackdata = null;
                id_feedbackdata = {}
                id_feedbackdata['id'] = id;
                id_feedbackdata['rating_value'] = newValue;
                tempFeedback.push(id_feedbackdata)
                setFeedback(tempFeedback)
            }
        } else {
            var id_feedbackdata = null;
            id_feedbackdata = {}
            id_feedbackdata['id'] = id;
            id_feedbackdata['rating_value'] = newValue;
            tempFeedback.push(id_feedbackdata)
            setFeedback(tempFeedback)
        }
    };

    const feedbackSubmitHandeler = () => {
        modalShowOffHandeler(false)
        dispatch(storeFeedbackDetails(feedback, examid, props));
    }

    const checkLocked = () => {
        const locked = Orientation.isLocked();
        if (locked !== isLocked) {
            setLocked(locked);
        }
    }

    const pageOrientationHandeler = () => {
        // console.log("pageOrientationHandeler------")
        if (isPortraitLandscape == 0) {
            Orientation.lockToLandscape()
            setIsPortraitLandscape(1)
        } else if (isPortraitLandscape == 1) {
            Orientation.lockToPortrait();
            setIsPortraitLandscape(0)
        }
    }

    const onSwipe = (gestureName, gestureState) => {
        // console.log("gestureName----", gestureName)
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        setGestureName(gestureName);
        switch (gestureName) {
            // case SWIPE_UP:
            // this.setState({ backgroundColor: 'red' });
            // break;
            // case SWIPE_DOWN:
            // this.setState({ backgroundColor: 'green' });
            // break;
            case SWIPE_LEFT:
                if ((currentAssessmentNumber + 1) < assessmentDetails.length) {
                    nextAssessment()
                }
                setGestureName(gestureName);
                // this.setState({ backgroundColor: 'blue' });
                break;
            case SWIPE_RIGHT:
                if (currentAssessmentNumber > 0) {
                    previousAssessment()
                }
                setGestureName(gestureName);
                // this.setState({ backgroundColor: 'yellow' });
                break;
        }
    }

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                style={Gstyles.examParentContainer}
            >
                
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                
                <HeaderComponent
                    headerName={props.route.params.page == 44 ? `Demo Assessment` : props.route.params.page == 4 ? `Demo Assessment` : props.route.params.page == 5 ? `Online ${props.route.params.category_id == 1 ? 'Scholastic' : props.route.params.category_id == 2 ? 'Competitive' : null} Assessment` : props.route.params.page == 2 ? `Online ${props.route.params.category_id == 1 ? 'Scholastic' : props.route.params.category_id == 2 ? 'Competitive' : null} Assessment` : null}

                    
                    leftIcon={props.route.params.page == 4 || props.route.params.page == 5 ? 'chevron-back' : 'grid-outline'}
                    leftIconHandeler={leftIconHandeler}
                />
                
                <View style={Gstyles.examParentContainer} >
                    {assessmentDetails != null && assessmentDetails != '' ?
                        <View style={[Gstyles.pageDetailsTopContainer, Gstyles.jcc, Gstyles.aic]}>
                            {props.route.params.page == 4 || props.route.params.page != 5 && props.route.params.page != 2 ?
                                <View style={[Gstyles.jcsb, Gstyles.fdr, Gstyles.w100, Gstyles.pv5, Gstyles.ph10,]}>
                                    <View><Text style={[Gstyles.fontSize12Normal]}>{previousPageValue && previousPageValue.exam_category_id == 1 ? "Scholastic exam demo" : previousPageValue.exam_category_id == 2 ? "Competitive exam demo" : previousPageValue && previousPageValue.assessmentName}</Text></View>
                                    <View><Text style={[Gstyles.fontSize12Normal]}>Exam date : {moment().format("D MMM YYYY")}</Text></View>
                                </View>
                                : props.route.params.page == 5 || props.route.params.page == 2 ?
                                    <>
                                        {props.route.params.category_id == 1 ?
                                            <>

                                                <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.pv5, ]}>
                                                    <Text style={[styles.testDetails, { lineHeight: 20, textAlign: 'center' }]}>{assessmentDetails[0].subject_group_name} <><IonMaterialIcons name="arrow-forward-ios" size={headingArrowSize} color={headingArrowColor}  /></> {assessmentDetails[0].subject_name} {assessmentDetails[0].subject_name == assessmentDetails[0].branch_name ? null : assessmentDetails[0].branch_name ? <><IonMaterialIcons name="arrow-forward-ios" size={headingArrowSize} color={headingArrowColor} />{"" + assessmentDetails[0].branch_name}</> : null}  {assessmentDetails[0].exam_type_name ? <><IonMaterialIcons name="arrow-forward-ios" size={headingArrowSize} color={headingArrowColor} />{isPortraitLandscape == 0 ? '\n' : ' '}{"" + assessmentDetails[0].exam_type_name /* + "-" + assessmentDetails[0].exam_set_counter */} </>
                                                        : null} {assessmentDetails[0].chapter_name ? <>{assessmentDetails[0].exam_type > 1 ? null : <IonMaterialIcons name="arrow-forward-ios" size={headingArrowSize} color={headingArrowColor} />} {assessmentDetails[0].exam_type > 1 ? null : " " + assessmentDetails[0].chapter_name}</> : null} </Text>
                                                </View>

                                            </>
                                            : null}
                                        <>
                                            {props.route.params.category_id == 2 ?
                                                <View style={[Gstyles.jcc, Gstyles.aic, Gstyles.w100, Gstyles.pv5, Gstyles.ph10,]}>
                                                    <Text style={{ lineHeight: 15, textAlign: 'center' }}>{assessmentDetails[0].exam_type ? assessmentDetails[0].exam_type : null} {assessmentDetails[0].exam_type ? <><IonMaterialIcons name="arrow-forward-ios" size={headingArrowSize} color={headingArrowColor} /> {" "}</> : null}{assessmentDetails[0].exam_subtype ? assessmentDetails[0].exam_subtype : null} {assessmentDetails[0].exam_subtype ? <><IonMaterialIcons name="arrow-forward-ios" size={headingArrowSize} color={headingArrowColor} /> {" "}</> : null}{"Set: " + assessmentDetails[0].exam_set_counter
                                                    } </Text>

                                                </View>
                                                : null}
                                        </>
                                    </>
                                    : null
                            }
                            <View style={[styles.marksContainer, { flexDirection: isPortraitLandscape == 0 ? 'column' : 'row' }]}>

                                <View style={[Gstyles.assessmentDetilsContainer, Gstyles.yellowButtonBackground]}>
                                    <Text style={styles.testDetails}>Correct: {assessmentDetails.filter(i => i.guest_post_ans_status === 1).length} | Incorrect: {assessmentDetails.filter(i => i.guest_post_ans_status === 0 && i.guest_post_ans !== "undefined").length} | Not attempted: {assessmentDetails.filter(i => i.guest_post_ans_status === 0 && i.guest_post_ans === "undefined").length} | {"\n"}Total questions: {assessmentDetails.length}</Text>
                                </View>

                                <View style={[Gstyles.assessmentDetilsContainer, isPortraitLandscape == 0 ? null : Gstyles.yellowButtonBackground]}>
                                    <Text style={styles.testDetails}>Marks obtained : {assessmentDetails && assessmentDetails[0].marks} / Total marks : {assessmentDetails && assessmentDetails[0].total_marks}</Text>
                                </View>

                            </View>
                        </View>
                        : <ActivityIndicator />}

                    {/* <View style={Gstyles.showQuestionContainer}> */}
                    <View style={Gstyles.showAssessmentContainer}>

                        {assessmentDetails != '' && assessmentDetails != null ?
                            <TouchableOpacity disabled={currentAssessmentNumber > 0 ? false : true} style={currentAssessmentNumber > 0 ? Gstyles.previousQuestionContainer : Gstyles.previousQuestionDisableContainer} onPress={previousAssessment} >
                                {currentAssessmentNumber > 0 ? <Ionicons name="chevron-back" size={20} color="#245C75" /> : null}
                            </TouchableOpacity>
                            : null
                        }

                        <View style={[Gstyles.currentQuestionContainer, Gstyles.pv7]}>
                            <View style={{ flex: 1, }}>
                                {assessmentDetails != '' && assessmentDetails != null && assessmentDetails[currentAssessmentNumber] != '' && assessmentDetails[currentAssessmentNumber] != null ?
                                    <>
                                        <View style={[Gstyles.assesmentIndividualContainer, assessmentDetails[currentAssessmentNumber].guest_post_ans_status === 1 ? Gstyles.correctAssessmentBorder : (assessmentDetails[currentAssessmentNumber].guest_post_ans_status === 0 && assessmentDetails[currentAssessmentNumber].guest_post_ans !== "undefined") ? Gstyles.inCorrectAssessmentBorder : (assessmentDetails[currentAssessmentNumber].guest_post_ans_status === 0 && assessmentDetails[currentAssessmentNumber].guest_post_ans === "undefined") ? Gstyles.notAttendedBorder : null]}>
                                            <View style={styles.numberContainer}>
                                                <View style={[Gstyles.questionNumber, assessmentDetails[currentAssessmentNumber].guest_post_ans_status === 1 ? Gstyles.correctAssessmentBackgroundColor : (assessmentDetails[currentAssessmentNumber].guest_post_ans_status === 0 && assessmentDetails[currentAssessmentNumber].guest_post_ans !== "undefined") ? Gstyles.inCorrectAssessmentBackgroundColor : (assessmentDetails[currentAssessmentNumber].guest_post_ans_status === 0 && assessmentDetails[currentAssessmentNumber].guest_post_ans === "undefined") ? Gstyles.notAttendedBackgroundColor : null]}>
                                                    {/* <Text style={[Gstyles.questionNumberText]}>{currentAssessmentNumber + 1}</Text> */}
                                                    <Text style={[Gstyles.questionNumberText]}>{assessmentDetails[currentAssessmentNumber].question_counter}</Text>
                                                </View>
                                            </View>

                                            <ScrollView
                                                keyboardShouldPersistTaps="handled"
                                                // contentContainerStyle={{ flex: 1, }}
                                                showsVerticalScrollIndicator={false}
                                            >

                                                <View style={{ flex: 1 }}>
                                                    {assessmentDetails != '' && assessmentDetails != null && assessmentDetails[currentAssessmentNumber] != '' && assessmentDetails[currentAssessmentNumber] != null ?
                                                        <GestureRecognizer
                                                            onSwipe={(direction, state) => onSwipe(direction, state)}
                                                        >
                                                            <AssessmentCard
                                                                // questionNo={currentAssessmentNumber + 1}
                                                                questionNo={assessmentDetails[currentAssessmentNumber].question_counter}
                                                                question={assessmentDetails[currentAssessmentNumber].question}
                                                                options={assessmentDetails[currentAssessmentNumber].options[0]}
                                                                // options={JSON.stringify(assessmentDetails[currentAssessmentNumber].options)}
                                                                studentAnswer={assessmentDetails[currentAssessmentNumber].guest_post_ans === "undefined" ? "" : assessmentDetails[currentAssessmentNumber].guest_post_ans}
                                                                correctAnswer={assessmentDetails[currentAssessmentNumber].answer}
                                                                reason={assessmentDetails[currentAssessmentNumber].reason}
                                                                statusColor={assessmentDetails[currentAssessmentNumber].guest_post_ans_status}
                                                                guest_post_ans={assessmentDetails[currentAssessmentNumber].guest_post_ans}
                                                            />
                                                        </GestureRecognizer>
                                                        :
                                                        <ActivityIndicator />
                                                    }
                                                </View>

                                            </ScrollView>
                                        </View>
                                    </>
                                    : null}

                            </View>

                        </View>

                        {assessmentDetails != '' && assessmentDetails != null ?
                            <TouchableOpacity disabled={(currentAssessmentNumber + 1) < assessmentDetails.length ? false : true} style={(currentAssessmentNumber + 1) < assessmentDetails.length ? Gstyles.nextQuestionContainer : Gstyles.nextQuestionDisableContainer} onPress={nextAssessment}>
                                {(currentAssessmentNumber + 1) < assessmentDetails.length ? <Ionicons name="chevron-forward" size={20} color="#245C75" /> : null}
                            </TouchableOpacity>
                            : null}

                    </View>

                    <TouchableOpacity onPress={() => assessmentNumberDetailsHandeler()} style={Gstyles.assessmentNumberContainer}>
                        <Ionicons name="grid" size={20} color="#245C75" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => pageOrientationHandeler()} style={Gstyles.pageOrientationContainer}>
                        {isPortraitLandscape == 0 ?
                            <Ionicons name="phone-portrait-outline" size={20} color="#245C75" />
                            : isPortraitLandscape == 1 ?
                                <Ionicons name="phone-landscape-outline" size={20} color="#245C75" />
                                : null}
                    </TouchableOpacity>

                </View>


            </KeyboardAvoidingView >
            <Modal
                animationType="slide"
                transparent={true}
                visible={feedbackModal}
            >

                <View style={styles.modalParentContainer}>
                    <View style={styles.modalWhiteArea}>
                        <View style={styles.modalTopContainer}>
                            <Text style={styles.modalHeading}>We would love to hear your feedback</Text>
                        </View>
                        <View style={styles.modalmiddleContainer}>
                            <FlatList
                                data={feedbackDetails}
                                // contentContainerStyle={[Gstyles.competitiveSubCategoryParentContainer]}
                                renderItem={({ item, index }) =>
                                (
                                    <FeedbackCard
                                        questions={item.questions}
                                        id={item.id}
                                        updatedRating={updatedRating}
                                    />
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={styles.modalBottomontainer}>
                            <TouchableOpacity onPress={() => modalShowOffHandeler(false)} style={[styles.button, styles.rejectBackground]}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            {isPressAllIcon ?
                                <TouchableOpacity onPress={feedbackSubmitHandeler} style={[styles.button, styles.successBackground]}>
                                    <Text>Proceed</Text>
                                </TouchableOpacity>
                                :
                                <View style={[styles.button, styles.disabledBackground]}>
                                    <Text>Proceed</Text>
                                </View>
                            }

                        </View>
                    </View>
                </View>
            </Modal>
        </>

    );
};

const styles = StyleSheet.create(
    {
        modalParentContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: trasparent,
        },
        modalWhiteArea: {
            backgroundColor: 'white',
            padding: 15, width: '85%',
            borderRadius: 10,
            height: 570,
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 20,
        },
        modalTopContainer: {
            flex: .1,
            justifyContent: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#e3e3e3'
        },
        modalmiddleContainer: {
            marginTop: 10,
            flex: 1.4,
            borderBottomWidth: 1,
            borderBottomColor: '#e3e3e3',
            marginBottom: 15,
        },
        modalBottomontainer: {
            flex: .1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        button: {
            width: 90,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,

        },
        rejectBackground: {
            backgroundColor: '#f85a5b',
        },
        successBackground: {
            backgroundColor: '#3da083',
        },
        disabledBackground: {
            backgroundColor: '#8A7E7E',
        },

        modalHeading: {
            fontFamily: fonts.rBold,
            color: "#000",
            fontSize: 14,
        },
        testDetails: {
            fontFamily: fonts.rRegular,
            color: "#000",
            fontSize: 12,
            textAlign: 'center'
        },
        numberContainer: {
            borderBottomColor: 1,
            padding: 4,
            backgroundColor: '#F3F3F3',
            // borderRadius:40,
            borderTopLeftRadius: 40,
            borderBottomLeftRadius: 40,
        },
        wrapper: {
            backgroundColor: '#ff0000'
        },
        marksContainer: {
            justifyContent: 'space-between',
            alignItems: 'center',
            // borderWidth:1,
            width: '90%'
        },

    });

export default DemoAssessment;
