import React, { useEffect, useState } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Text, TouchableOpacity, ScrollView, StyleSheet, Image, ActivityIndicator, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Orientation from 'react-native-orientation-locker';
// import SystemNavigationBar from 'react-native-system-navigation-bar';

import { colors, scrollViewContainer, } from '../../../styles/Crestest.config';

import Gstyles from '../../../styles/GlobalStyle';
import Emitter from '../../../utils/Emitter';
import * as Events from '../../../configs/Events';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import QuestionDetails from './examComponent/QuestionDetails'
import InstructionsOnTakingExams from './examComponent/InstructionsOnTakingExams'
import UserDetails from './examComponent/UserDetails'
import ExamStartInstructions from './examComponent/ExamStartInstructions'

import { getScholasticExamQuestionsData, getQuestionUploadCompletetAction, submitScholasticExam, getCompetitiveExamQuestionsData } from '../../../store/actions/ScholasticAction';
import { selectDemoQuestionNumber, selectPrevousDemoQuestion, selectNextDemoQuestion, timeUpAction } from '../../../store/actions/demoExamAction';

import {
    logout,
} from '../../../store/actions/AuthActions';

import ExamCounterClockComponent from './examComponent/ExamCounterClockComponent'

import MathJax from 'react-native-mathjax'
import { decryptAES, getData } from "../../../utils/Util";

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

import AlertOnlineExam from "../../OnlineExam/onlineComponent/AlertOnlineExam"
import OtherOptionModal from "../../OnlineExam/onlineComponent/OtherOptionModal"

import { drawerMenuActiveIdUpdateAction } from '../../../store/actions/DashboardAction';
import { useNavigation } from '@react-navigation/native';

const ExamsDetails = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const examcategoryList = useSelector(state => state.category.examcategoryList);
    const scholasticQuestionList = useSelector(state => state.branch.scholasticQuestionList);
    const scholasticQuestionUploaded = useSelector(state => state.branch.scholasticQuestionUploaded);
    const currentQestionNo = useSelector(state => state.questionNo.currentQestionNo);
    const demoExamSubmit = useSelector((state) => state.questionNo.demoExamDoneOrNot);
    const user_id = useSelector((state) => state.auth.user_id);
    const newStudentid = useSelector(state => state.student.newStudentid);
    const warningSound = useSelector((state) => state.questionNo.warningSound); //-----
    const timeUpWarning = useSelector((state) => state.questionNo.timeUpWarning); //-----

    // const [sampleQuestion, setSampleQuestion] = useState('In the given figure, O is the centre of the circle whose diameter is AB. If ∠AOE = 150° and ∠DAO = 55° then find ∠CBE. <img src="https://admin.clvdev.in//question_images/q_image/1680259500535NTMCH24Q43F43.png" alt="crestest_img" style="width:90%;margin-top:10px;" ')

    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(parseInt(currentQestionNo))
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [selected, setSelected] = useState([]);
    const [is_visited_count, setIs_visited_count] = useState(0)
    const [is_answered_count, setIs_answered_count] = useState(0)
    const [isDemo, setIsDemo] = useState('')
    const [isPlaying, setIsPlaying] = useState(true)
    const [timeUpModal, setTimeUpModal] = useState(false);
    const [examTime, setExamTime] = useState(0);
    const [showExam, setShowExam] = useState(false);

    const [isLocked, setLocked] = useState();
    const [orientation, setOrientation] = useState();
    const [deviceOrientation, setDeviceOrientation] = useState();
    const [lock, setLock] = useState();

    const [modalVisible, setModalVisible] = useState(false);
    const [dashboardModalVisible, setDashboardModalVisible] = useState(false);
    const [otherOptionModalVisible, setOtherOptionModalVisible] = useState(false);

    const [timeUpVisible, setTimeUpVisible] = useState(false);

    const [answerSheetExpan, setAnswerSheetExpan] = useState(false);
    const [gestureName, setGestureName] = useState();


    useEffect(() => {
        // console.log("user_id--", user_id)
        if (props.route.params.id == 1) {
            dispatch(getScholasticExamQuestionsData(navigation));
        } else if (props.route.params.id == 2) {
            dispatch(getCompetitiveExamQuestionsData(navigation));
        }
        dispatch(selectDemoQuestionNumber(0))
        examStartInstructionHandeler()
    }, []);

    useEffect(() => {

        // console.log("@===newStudentid----", newStudentid, "demoExamSubmit----", demoExamSubmit, currentQuestion.length)
        async function getUserDetails() {
            let result = await getData("crestestUserDetails");
            result = JSON.parse(result);
            let user_id = result['id'];
            setIsDemo(user_id)
        };
        getUserDetails();

    }, [newStudentid, demoExamSubmit]);

    useEffect(() => {

        return () => {
            // SystemNavigationBar.navigationShow();
            Orientation.lockToPortrait();
            checkLocked();
        }

    }, []);

    useEffect(() => {
        const backAction = (e) => {
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        setCurrentQuestionNumber(currentQestionNo);
    }, [currentQestionNo]);

    useEffect(() => {
        if (scholasticQuestionUploaded == 1) {
            let updatedVisitData = scholasticQuestionList;
            updatedVisitData[currentQuestionNumber].is_visited = 1
            setCurrentQuestion(updatedVisitData)
            // setCurrentQuestion(scholasticQuestionList)
            // dispatch(getQuestionUploadCompletetAction(0));
            setExamTime(scholasticQuestionList[0].exam_duration)
        }
        return () => {

        };

    }, [scholasticQuestionList]);

    useEffect(() => {
        if (currentQuestion !== null || currentQuestion !== undefined || currentQuestion.length > 0) {
            dispatch(getQuestionUploadCompletetAction(0));
        }
    }, [currentQuestion]);

    useEffect(() => {
        // console.log("newStudentid--11--", newStudentid, "demoExamSubmit----", demoExamSubmit, currentQuestion.length)
        if (newStudentid != null && newStudentid != undefined && demoExamSubmit == 0 && !!currentQuestion.length) {
            submitDemoExam();
            dispatch(logout(props));
            props.navigation.navigate('authScenes', {
                screen: "SuccessRegister",
            })

            console.log("submitDemoExam--Exam Details Page")
        }

    }, [newStudentid, demoExamSubmit]);

    useEffect(() => {
        if (timeUpWarning == 1) {
            setTimeUpVisible(true)
        }
    }, [warningSound, timeUpWarning]);

    const mmlOptions = {
        /* --------------- */
        styles: {
            '#formula': {
                // 'background-color': '#efefef',
                color: '#000000',
                //   padding: 8,
                minHeight: 40,
                flex: 1,
            },
        },

        /*  ------------------- */
        messageStyle: 'none',
        extensions: ['mml2jax.js', 'MathMenu.js', 'MathZoom.js', 'AssistiveMML.js', 'a11y/accessibility-menu.js',],
        jax: ['input/MathML', 'output/CommonHTML'],
        tex2jax: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
        },
        TeX: { extensions: ['AMSmath.js', 'AMSsymbols.js', 'noErrors.js', 'noUndefined.js'], },
    };

    const leftIconHandeler = () => {
        navigation.goBack()
    }


    const onDashboardHandeler = () => {
        setOtherOptionModalVisible(false)
        setDashboardModalVisible(true)
    }

    const questionNumber = (id) => {
        dispatch(selectDemoQuestionNumber(id))
        if (currentQuestion[id].is_visited == 1) {
            if (currentQuestion[id].is_answered == 1) {
                currentQuestion[id].is_visited = 0;
            } else {
                //do nothing
            }
        } else {
            if (currentQuestion[id].is_answered && currentQuestion[id].is_answered == 1) {
                currentQuestion[id].is_visited = 0;

            } else {
                currentQuestion[id].is_visited = 1;
            }
            answer_count();
            visited_count();
        }
    }

    const onQuestionDetailsHandeler = () => {
        setOtherOptionModalVisible(false)
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <QuestionDetails navigation={navigation} callQuestionNumber={questionNumber} params={{ totalQuestionNumber: currentQuestion.length, currentQuestionNumber: currentQuestionNumber, is_answered_count: is_answered_count, is_visited_count: is_visited_count, questionList: currentQuestion }} />,
                'componentHeight': 250,
            });
    }

    const onInformationsHandeler = () => {
        setOtherOptionModalVisible(false)
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <InstructionsOnTakingExams navigation={navigation} params={{ mobile: 'mobileNumber', }} />,
                'componentHeight': 290,
            });
    }

    const onUserDetailsHandeler = () => {
        setOtherOptionModalVisible(false)
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <UserDetails navigation={navigation} params={{ mobile: 'mobileNumber', email: 'emailId', }} />,
                'componentHeight': 250,
            });
    }

    const examStartInstructionHandeler = () => {
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <ExamStartInstructions navigation={navigation} quitExam={quitExam} startExam={startExam} params={{ mobile: 'mobileNumber', email: 'emailId', }} />,
                'componentHeight': 550,
            });
    }


    const answer_count = () => {
        var rez = 0;
        currentQuestion.forEach(function (item) {
            if (item.is_answered >= 0) {
                rez++;
            }
        });
        setIs_answered_count(rez);
    }

    const visited_count = () => {
        var rez = 0;
        currentQuestion.forEach(function (item) {
            if (item.is_visited >= 0) {
                rez++;
            }
        });
        setIs_visited_count(rez)
    }

    const prevousQuestion = () => {
        dispatch(selectPrevousDemoQuestion(currentQuestionNumber - 1));
        currentQuestion[currentQuestionNumber - 1].is_visited = 1;
        visited_count();
        if (currentQuestion[currentQuestionNumber - 1].is_answered == 1) {
            currentQuestion[currentQuestionNumber - 1].is_visited = 0;
        } else {
            //do nothing
        }
    }

    const nextQuestion = () => {
        dispatch(selectNextDemoQuestion(currentQuestionNumber + 1))
        currentQuestion[currentQuestionNumber + 1].is_visited = 1;
        visited_count();
        if (currentQuestion[currentQuestionNumber + 1].is_answered == 1) {
            currentQuestion[currentQuestionNumber + 1].is_visited = 0;
        } else {
            //do nothing
        }
    }

    const answerSetSelected = (data, index) => {
        let temp_data = [...selected]
        temp_data[currentQuestionNumber] = data

        setSelected(temp_data)
        currentQuestion[currentQuestionNumber].is_answered = 1;
        currentQuestion[currentQuestionNumber].is_answered_data = data;
        currentQuestion[currentQuestionNumber].is_visited = 0;
        answer_count();
        visited_count();
        if (decryptAES(currentQuestion[currentQuestionNumber].answer) == data) {
            currentQuestion[currentQuestionNumber].is_corrected = 1;
        } else {
            currentQuestion[currentQuestionNumber].is_corrected = 0;
        }
    }

    const submitDemoExamHandeler = () => {
        setModalVisible(true)
    }

    const submitDemoExam = () => {
        console.log("Submit Fnal Answer submitDemoExam", props.user_id)
        const exam_category_id = props.route.params.id == 1 ? 1 : 2;
        var examdata = [];
        var id_wise_value = null;

        for (var i = 0; i < currentQuestion.length; i++) {
            id_wise_value = {};
            id_wise_value['question_id'] = currentQuestion[i].id;
            id_wise_value['question_no'] = currentQuestion[i].question_no;
            id_wise_value['guest_post_ans'] = currentQuestion[i].is_answered_data;
            id_wise_value['guest_post_ans_status'] = currentQuestion[i].is_corrected;
            examdata.push(id_wise_value);
        }

        if (user_id == 0 && demoExamSubmit == 0 || demoExamSubmit == undefined) {
            dispatch(submitScholasticExam(examdata, newStudentid, exam_category_id, props));
        } else {
            dispatch(submitScholasticExam(examdata, user_id, exam_category_id, props));
        }
    }

    const submitFinalAnswer = () => {
        Orientation.lockToPortrait();
        checkLocked();
        setModalVisible(false)
        setIsPlaying(false)
        dispatch(timeUpAction(0))
        if (user_id == 0) {
            setIsPlaying(false)

            // dispatch(logout(props));

            // setRegistrationModal(true);

            // console.log("@Demo Submit")
            /* props.navigation.navigate('authScenes', {
                screen: "Registration",
            }) */
            props.navigation.navigate('nonAuthScenes', {
                screen: "DemoRegistration",
                params: {pageFrom:0}
            })
        } else {
            // if (demoExamSubmit == 1) {
            submitDemoExam();
            // }
        }
    }

    const timeUpSubmit = () => {
        // console.log("timeUpSubmit")
        dispatch(timeUpAction(0)) //-----
        setIsPlaying(false)
        submitFinalAnswer();
    }

    const quitExam = () => {
        props.navigation.goBack()
    }

    const startExam = () => {
        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
        // SystemNavigationBar.navigationHide();
        Orientation.lockToLandscape();
        checkLocked();

        setShowExam(true)
        // currentQuestion[currentQuestionNumber].is_visited = 1;
    }

    const checkLocked = () => {
        const locked = Orientation.isLocked();
        if (locked !== isLocked) {
            setLocked(locked);
        }
    }
    const openOtherOption = () => {
        setOtherOptionModalVisible(true)
    }

    const goToDashboard = () => {
        dispatch(drawerMenuActiveIdUpdateAction(1))
        setDashboardModalVisible(false)
        props.navigation.navigate('drawerScenes', {
            screen: "Dashboard",
        })
    }

    const timeupHandeler = () => {
        setTimeUpVisible(false);
        timeUpSubmit()
    }

    const answerExpan = (value) => {
        setAnswerSheetExpan(value)
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
                if ((currentQuestionNumber + 1) < currentQuestion.length) {
                    nextQuestion()
                }
                setGestureName(gestureName);
                // this.setState({ backgroundColor: 'blue' });
                break;
            case SWIPE_RIGHT:
                if (currentQuestionNumber > 0) {
                    prevousQuestion()
                }
                setGestureName(gestureName);
                // this.setState({ backgroundColor: 'yellow' });
                break;
        }
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                // style={container}
                style={Gstyles.examParentContainer}
            >

                {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                {showExam ?
                    <View style={Gstyles.examParentContainer} >
                        <View style={Gstyles.examTopContainer}>
                            <View style={[Gstyles.examInsideTopContainer, , Gstyles.fdr, Gstyles.jcsb]}>

                                <View>
                                    <View style={[Gstyles.examInfoInsideContainer, { height: 30, top: -3 }]}>

                                        {!!currentQuestion.length ?
                                            <>
                                                <MaterialCommunityIcons name="clock-minus-outline" size={18} color="#fff" />
                                                <View style={{ overflow: 'hidden', alignItems: 'flex-start', top: -1 }}>
                                                    <ExamCounterClockComponent examTime={examTime} isPlaying={isPlaying} />
                                                    {/* <ExamCounterClockComponent examTime={14440} isPlaying={isPlaying} /> */}
                                                </View>
                                            </>
                                            :
                                            <>
                                                <MaterialCommunityIcons name="clock-minus-outline" size={20} color="#fff" />
                                                <View style={Gstyles.examInfoTextContainer}><Text style={Gstyles.examInfoText} >00:00:00</Text></View>
                                            </>
                                        }
                                    </View>
                                </View>

                                <View>
                                    <Text style={[Gstyles.examHeading, { top: 2 }]}>{props.route.params.id == 1 ? "Scholastic" : "Competitive"} <Ionicons name="chevron-forward" size={16} color={colors.backgroundWhite} /> {isDemo == 0 ? `Guest` : `Registered`} Demo Exam</Text>
                                </View>
                                <View style={Gstyles.answerSubmitTopContainer}>
                                    <TouchableOpacity style={Gstyles.answerSubmitTopInsideContainer} onPress={submitDemoExamHandeler}>
                                        <Text style={Gstyles.examSubmitTopText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={!answerSheetExpan ? Gstyles.showQuestionContainer : Gstyles.showQuestionSmallContainer} >

                                <View style={Gstyles.currentQuestionContainer}>

                                    <View style={Gstyles.currentQuestionTopContainer}>
                                        <View style={Gstyles.examInfoInsideContainer}>
                                            <MaterialIcons name="monitor" size={20} color="#000" />
                                            <View style={Gstyles.examInfoTextContainer}><Text style={[Gstyles.examRemainingTextWhite, Gstyles.timeTextBlack]} >{currentQuestionNumber + 1}/{currentQuestion.length}</Text></View>
                                        </View>
                                        {answerSheetExpan ?
                                            <TouchableOpacity onPress={() => answerExpan(false)} >
                                                <Octicons name="link-external" size={20} color="#000" />
                                            </TouchableOpacity>
                                            : null}
                                    </View>

                                    <ScrollView
                                        keyboardShouldPersistTaps="handled"
                                        // contentContainerStyle={scrollViewContainer}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <GestureRecognizer
                                            onSwipe={(direction, state) => onSwipe(direction, state)}
                                        >
                                            <View style={{ height: 300 }} >
                                                {currentQuestion != '' ?
                                                    currentQuestion[currentQuestionNumber].question != '' ?
                                                        <MathJax
                                                            mathJaxOptions={mmlOptions}
                                                            html={currentQuestion[currentQuestionNumber].question}
                                                        // html={sampleQuestion} 
                                                        // style={{backgroundColor:'red',}}
                                                        />
                                                        : <ActivityIndicator />
                                                    : null}
                                            </View>
                                        </GestureRecognizer>
                                    </ScrollView>
                                </View>

                            </View>
                            <View style={!answerSheetExpan ? Gstyles.showAnswerContainer : Gstyles.showAnswerBigContainer} >
                                <View style={Gstyles.showAnswerInsideContainer}>
                                    <View style={Gstyles.answerContainer}>
                                        {!answerSheetExpan ?
                                            <View style={Gstyles.answerTopContainer}>
                                                <TouchableOpacity onPress={() => answerExpan(true)}>
                                                    <Octicons name="link-external" size={20} color="#000" />
                                                </TouchableOpacity>
                                            </View>
                                            : null}
                                        <ScrollView
                                            keyboardShouldPersistTaps="handled"
                                            contentContainerStyle={scrollViewContainer}
                                            showsVerticalScrollIndicator={false}
                                        >

                                            {currentQuestion != '' ?
                                                Object.keys(currentQuestion[currentQuestionNumber].options[0]).map(([key, value]) => {

                                                    return (
                                                        <React.Fragment key={key}>
                                                            {selected[currentQuestionNumber] == key ?
                                                                <>
                                                                    <GestureRecognizer
                                                                        onSwipe={(direction, state) => onSwipe(direction, state)} >
                                                                        <TouchableOpacity style={[Gstyles.showAnswerContainerIndividual, Gstyles.selectAnswerBorderColor,]} onPress={() => { answerSetSelected(key) }}>
                                                                            <View>
                                                                                <View style={Gstyles.answerOptionContainer}>
                                                                                    <View style={Gstyles.answerOptionInsideContainer}>
                                                                                        <Text style={Gstyles.answerOptionKey}>{key}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                            <View style={Gstyles.answerOption}>
                                                                                <>
                                                                                    {currentQuestion != '' ?
                                                                                        currentQuestion[currentQuestionNumber].options[0][key] == '' ? <ActivityIndicator /> :
                                                                                            <>
                                                                                                <MathJax
                                                                                                    mathJaxOptions={mmlOptions}
                                                                                                    html={currentQuestion[currentQuestionNumber].options[0][key]}
                                                                                                    // style={{ backgroundColor: 'red', }}
                                                                                                    // onHeightUpdated={height => console.log(height)}
                                                                                                    onHeightUpdated={{ minHeight: 38 }}
                                                                                                />
                                                                                            </>
                                                                                        : null}
                                                                                </>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    </GestureRecognizer>
                                                                </>
                                                                :
                                                                <>
                                                                    <GestureRecognizer
                                                                        onSwipe={(direction, state) => onSwipe(direction, state)} >
                                                                        <TouchableOpacity style={[Gstyles.showAnswerContainerIndividual, Gstyles.optionBorderColor,]} onPress={() => { answerSetSelected(key) }}>
                                                                            <View>
                                                                                <View style={Gstyles.answerOptionContainer}>
                                                                                    <View style={Gstyles.answerOptionInsideContainer}>
                                                                                        <Text style={Gstyles.answerOptionKey}>{key}</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </View>
                                                                            <View style={Gstyles.answerOption}>
                                                                                <>
                                                                                    {currentQuestion != '' ?
                                                                                        currentQuestion[currentQuestionNumber].options[0][key] == '' ? <ActivityIndicator /> :
                                                                                            <>
                                                                                                <MathJax
                                                                                                    mathJaxOptions={mmlOptions}
                                                                                                    html={currentQuestion[currentQuestionNumber].options[0][key]}
                                                                                                    // style={{ backgroundColor: 'red', }}
                                                                                                    // onHeightUpdated={height => console.log(height)}
                                                                                                    onHeightUpdated={{ minHeight: 38 }}
                                                                                                />
                                                                                            </>
                                                                                        : null}
                                                                                </>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    </GestureRecognizer>
                                                                </>
                                                            }
                                                        </React.Fragment>
                                                    )
                                                })

                                                : null}
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                            <View style={Gstyles.questionRightSideOption}>
                                <View style={Gstyles.questionRightSideOptionParentContainer}>
                                    {currentQuestionNumber > 0 ?
                                        <TouchableOpacity style={Gstyles.previousQuestionNewContainer} onPress={prevousQuestion}>
                                            <Ionicons name="chevron-back" size={20} color="#245C75" />
                                        </TouchableOpacity>
                                        :
                                        <View style={Gstyles.previousQuestionNewContainer} >

                                        </View>
                                    }
                                </View>
                                <View style={Gstyles.questionRightSideOptionParentContainer}>
                                    {(currentQuestionNumber + 1) < currentQuestion.length ?
                                        <TouchableOpacity style={Gstyles.previousQuestionNewContainer} onPress={nextQuestion}>
                                            <Ionicons name="chevron-forward" size={20} color="#245C75" />
                                        </TouchableOpacity>
                                        :
                                        <View style={Gstyles.previousQuestionNewContainer} >

                                        </View>
                                    }
                                </View>
                                <View style={Gstyles.questionRightSideOptionParentContainer}>
                                    <TouchableOpacity style={Gstyles.previousQuestionNewContainer} onPress={openOtherOption}>
                                        <Ionicons name="folder-open" size={15} color="#245C75" />
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>

                    </View>
                    : null}

            </KeyboardAvoidingView >

            {modalVisible ?
                <AlertOnlineExam
                    isVisable={(modalVisible)}
                    modalHeading="Do you want to submit?"
                    // cartDetails='Submit your exam'
                    isCancelRequire={true}
                    cancelHandeler={() => setModalVisible(false)}
                    submitHandeler={submitFinalAnswer}
                />
                : null
            }

            {dashboardModalVisible ?
                <AlertOnlineExam
                    isVisable={(dashboardModalVisible)}
                    modalHeading="Do you want to go back to dashboard?"
                    // cartDetails='Go to dashboard'
                    isCancelRequire={true}
                    cancelHandeler={() => setDashboardModalVisible(false)}
                    submitHandeler={goToDashboard}
                />
                : null}

            {timeUpVisible ?
                <AlertOnlineExam
                    isVisable={(timeUpVisible)}
                    modalHeading="Timeup"
                    cartDetails='Click on submit button to view your assessment'
                    isCancelRequire={false}
                    cancelHandeler={() => setTimeUpVisible(false)}
                    submitHandeler={timeupHandeler}
                />
                :
                null
            }

            {otherOptionModalVisible ?
                <OtherOptionModal
                    isDemo="yes"
                    intermNumber={currentQuestion[0].total_attempts}
                    cancelHandeler={() => setOtherOptionModalVisible(false)}
                    onDashboardHandeler={onDashboardHandeler}
                    onQuestionDetailsHandeler={onQuestionDetailsHandeler}
                    onInformationsHandeler={onInformationsHandeler}
                    onUserDetailsHandeler={onUserDetailsHandeler}
                />
                :
                null}
        </>

    );
};

const styles = StyleSheet.create(
    {
        container: {

        },

    });

export default ExamsDetails;
