import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, BackHandler, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Orientation from 'react-native-orientation-locker';

import { scrollViewContainer, } from '../../styles/Crestest.config';

import Gstyles from '../../styles/GlobalStyle';
import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import QuestionDetails from '../home/exam/examComponent/QuestionDetails'
import InstructionsOnTakingExams from '../home/exam/examComponent/InstructionsOnTakingExams'
import UserDetails from '../home/exam/examComponent/UserDetails'
import ExamStartInstructions from '../home/exam/examComponent/ExamStartInstructions'

import { getScholasticExamQuestionsDataForSubscriber, getQuestionUploadCompletetAction, getScholasticExamAnswerSubmitForSubscriber, totalAttemptsAction, getscholasticIntermExamSubmitforSubscriber, getScholasticExamAnswerSubmitForSubscriberTimeupSubmit, scholoasticQuestionListForSubscriberSuccessAction } from '../../store/actions/ScholasticAction';

import { selectDemoQuestionNumber, selectPrevousDemoQuestion, selectNextDemoQuestion, timeUpAction, alertSoundAction } from '../../store/actions/demoExamAction';

import { getOnlineScholasticModuleQuestionListData, getOnlineScholasticMockQuestionListData, getscholasticexamsdetailsCasestudytData, getOnlineCompetitiveQuestionListData, ModuleMockQuestionUploadAction, competitiveQuestionUploadAction, competitiveExamAnswerSubmitForSubscriber, competitiveExamAnswerSubmitForSubscriberTimeup, getOnlineScholasticModuleListSuccessAction, getOnlineScholasticMockListSuccessAction, getOnlineCompetitiveSuccessAction } from '../../store/actions/OnlineExamAction';

import ExamCounterClockComponent from '../home/exam/examComponent/ExamCounterClockComponent'

import CounterClockSoundComponent from "./onlineComponent/CounterClockSoundComponent"
import AlertOnlineExam from "./onlineComponent/AlertOnlineExam"
import OtherOptionModal from "./onlineComponent/OtherOptionModal"

import MathJax from 'react-native-mathjax'

import { decryptAES, } from "../../utils/Util";

import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { drawerMenuActiveIdUpdateAction } from '../../store/actions/DashboardAction';

import { useNavigation } from '@react-navigation/native';

let _visitTime = 0;
let _interval;

const OnlineExamsDetails = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const examcategoryList = useSelector(state => state.category.examcategoryList);
    // const scholasticQuestionList = useSelector(state => state.branch.scholasticQuestionList);
    const scholasticQuestionUploaded = useSelector(state => state.branch.scholasticQuestionUploaded);
    const moduleMockQuestionUploaded = useSelector(state => state.onlineexam.moduleMockQuestionUploaded);
    const competitiveQuestionUploaded = useSelector(state => state.onlineexam.competitiveQuestionUploaded);
    const currentQestionNo = useSelector(state => state.questionNo.currentQestionNo);
    const demoExamSubmit = useSelector((state) => state.questionNo.demoExamDoneOrNot);
    const user_id = useSelector((state) => state.auth.user_id);
    const newStudentid = useSelector(state => state.student.newStudentid);
    const warningSound = useSelector((state) => state.questionNo.warningSound); //-----
    const timeUpWarning = useSelector((state) => state.questionNo.timeUpWarning); //-----
    const total_attempts = useSelector((state) => state.questionNo.total_attempts);

    /* Scholastic Question Details */
    const scholasticQuestionListForSubscriber = useSelector(state => state.branch.scholasticQuestionListForSubscriber);
    const onlineModuleMockQuestionList = useSelector(state => state.onlineexam.onlineModuleMockQuestionList);
    const onlineCompetitiveQuestionList = useSelector(state => state.onlineexam.onlineCompetitiveQuestionList);
    const time_used = useSelector((state) => state.questionNo.time_used);

    const callFirstTimeRef = useRef(true);
    const callAfterThreeTimeRef = useRef(true);


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
    const [calllCurrentQuestionNo, setCalllCurrentQuestionNo] = useState(true) //intermData
    const [pendingTime, setPendingTime] = useState(0)

    const [previousValue, setPrevousValue] = useState(props.route.params)
    const [isUploadQuestion, setIsUploadQuestion] = useState(0)

    const [isLocked, setLocked] = useState();
    const [orientation, setOrientation] = useState();
    const [deviceOrientation, setDeviceOrientation] = useState();
    const [lock, setLock] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const [dashboardModalVisible, setDashboardModalVisible] = useState(false);

    const [otherOptionModalVisible, setOtherOptionModalVisible] = useState(false);

    const [timeUpVisible, setTimeUpVisible] = useState(false);

    const [examinterm, setExaminterm] = useState(0);

    const [answerSheetExpan, setAnswerSheetExpan] = useState(false);

    const [gestureName, setGestureName] = useState();

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const currentQuestionLengthRef = useRef();
    currentQuestionLengthRef.current = currentQuestion

    const currentTimeRef = useRef();
    currentTimeRef.current = time_used;
    // currentTimeRef.current = pendingTime;

    const totalAttemptsRef = useRef();
    totalAttemptsRef.current = total_attempts;

    useEffect(() => {
        // console.log("examStartInstructionHandeler---123")
        if (callFirstTimeRef.current) {
            // console.log("examStartInstructionHandeler---examStartInstructionHandeler")
            examStartInstructionHandeler();
        }
        callFirstTimeRef.current = false
    }, []);

    useEffect(() => {
        checkLocked();
    }, []);

    useEffect(() => {
        return () => {
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
        // document.addEventListener('keydown', detectKeyDown, true)

        if (timeUpWarning == 1) {
            setIsPlaying(false);
            setTimeUpModal(true);
            ScholasticExamSubmitTimeup()
        }
        if (timeUpWarning == 0) {
            setTimeUpModal(false)
        }

        /* return () => {

        } */
    }, [warningSound, timeUpWarning,]);

    /* useEffect(() => {
        // setPendingTime(time_used);
        if (pendingTime !== time_used) {
            setPendingTime(time_used);
        }
        // console.log(">>>time_used>>", time_used)

    }, [time_used, pendingTime, calllCurrentQuestionNo,]); */ //

    useEffect(() => {
        if (scholasticQuestionUploaded == 1 || moduleMockQuestionUploaded == 1 || competitiveQuestionUploaded == 1) {
            let updatedVisitData = props.route.params.examFrom == 1 ? scholasticQuestionListForSubscriber : props.route.params.examFrom == 2 ? onlineModuleMockQuestionList : props.route.params.examFrom == 3 ? onlineCompetitiveQuestionList : null;
            // updatedVisitData[currentQuestionNumber].is_visited = 1
            // console.log("updatedVisitData-----", updatedVisitData);
            setCurrentQuestion(updatedVisitData)
            // setCurrentQuestion(scholasticQuestionList);
            setTimeout(() => {
                dispatch(getQuestionUploadCompletetAction(0));
                dispatch(ModuleMockQuestionUploadAction(0));
                dispatch(competitiveQuestionUploadAction(0));
            }, 0);

            if (props.route.params.examFrom == 1) {
                // console.log("props.route.params.examFrom == 1")
                setExamTime(scholasticQuestionListForSubscriber[0]?.exam_duration)
            } else if (props.route.params.examFrom == 2) {
                // console.log("props.route.params.examFrom == 2")
                setExamTime(onlineModuleMockQuestionList[0]?.exam_duration)
            } else if (props.route.params.examFrom == 3) {
                // console.log("props.route.params.examFrom == 3")
                setExamTime(onlineCompetitiveQuestionList[0]?.exam_duration)
            }

        }
        return () => {
            // dispatch(getQuestionUploadCompletetAction(0));
        };

    }, [scholasticQuestionListForSubscriber, onlineModuleMockQuestionList, onlineCompetitiveQuestionList]);

    useEffect(() => {
        // console.log("currentQuestion--- total_attempts == 1", currentQuestion)
        if (!!currentQuestion.length) {

            if (total_attempts == 1) { // reload exam intermData
                currentQuestion[currentQuestionNumber].is_visited = 1; // reload exam intermData // && 
                if (scholasticQuestionUploaded == 1) {
                    ScholasticExamintermSubmit(currentQestionNo)
                }
            }

            visited_count();

            if (total_attempts > 1) { // reload exam intermData
                // console.log("total_attempts > 1-----", currentQuestion[0].last_visited_ques_no )
                dispatch(selectDemoQuestionNumber(currentQuestion[0].last_visited_ques_no))// intermData reload exam -- current question number
                storeAnswerValue();
            }

            if (total_attempts > 3 ) { // reload exam intermData
                // exitFullscreen();
                // ScholasticExamSubmit()
                console.log("total_attempts > 3 ---------------------------");
                //  examSubmit();
                //setIsPlaying(false);
                //setHasSubmitted(true);
                //callAfterThreeTimeRef.current = false;
            }
        }

    }, [total_attempts, currentQuestion]); //

    /* useEffect(() => {
        console.log("hasSubmitted > 3 -----11-", currentQuestion.length, total_attempts);
        if (!!currentQuestion.length && total_attempts > 3 && callAfterThreeTimeRef.current) { // reload exam intermData
            console.log("hasSubmitted > 3 -----22-", currentQuestion.length);
            setHasSubmitted(true);
            callAfterThreeTimeRef.current = false;
            // checkNoOfAttacm();
        }
    }, [total_attempts, currentQuestion]); */ //

    useEffect(() => {
        if (!!currentQuestion.length && hasSubmitted) {
            console.log("hasSubmitted > 3 ---------------------------");
            setIsPlaying(false);
            examSubmit();
            setHasSubmitted(false);
        }
    }, [hasSubmitted, currentQuestion]); //


    useEffect(() => {
        setCurrentQuestionNumber(currentQestionNo);
    }, [currentQestionNo]);

    useEffect(() => {
        if (examinterm == 1) {
            _interval = setInterval(() => {
                _visitTime++;
                ScholasticExamintermSubmitInterval(currentQestionNo)
            }, 20000);
            // }, 20000);
        }

        if (timeUpWarning == 1) {
            // console.log( ">>>timePratap>>>@@>", timeUpWarning )
            clearInterval(_interval);
        }

        return () => {
            clearInterval(_interval);
        }
    }, [timeUpWarning, currentQestionNo, examinterm])


    /* intermData */
    useEffect(() => {
        // storeAnswerValue(); // reload exam 
        answer_count(); // reload exam 
        visited_count(); // reload exam 
        return () => {
            dispatch(totalAttemptsAction(0));
            setExaminterm(0)
        };
    }, []);
    /* intermData */

    /* TimeupModal Close */
    useEffect(() => {
        // setTimeUpModal(false)
        return () => {
            dispatch(timeUpAction(0))
            setTimeUpModal(false)
            clearInterval(_interval);
        };
    }, []);
    /* TimeupModal Close  */


    useEffect(() => {

        if (timeUpWarning == 1) {
            setTimeUpVisible(true)
            clearInterval(_interval);
        }
    }, [warningSound, timeUpWarning]);

    useEffect(() => {
        return () => {
            console.log("remove Return==========================================")
            dispatch(scholoasticQuestionListForSubscriberSuccessAction([]));
            dispatch(getOnlineScholasticModuleListSuccessAction([]));
            dispatch(getOnlineScholasticMockListSuccessAction([]));
            dispatch(getOnlineCompetitiveSuccessAction([]));
            // setCurrentQuestion([]);
            // setVisableQuestion(false);
            // dispatch(getQuestionUploadCompletetAction(0));
            // dispatch(ModuleMockQuestionUploadAction(0));
            // dispatch(competitiveQuestionUploadAction(0));
        }
    }, [])

    const previousDataBlank = () => {
        console.log("previousDataBlank------")
        dispatch(scholoasticQuestionListForSubscriberSuccessAction([]));
        dispatch(getOnlineScholasticModuleListSuccessAction([]));
        dispatch(getOnlineScholasticMockListSuccessAction([]));
        dispatch(getOnlineCompetitiveSuccessAction([]));
        // setCurrentQuestion([]);
        // setVisableQuestion(false);
        dispatch(getQuestionUploadCompletetAction(0));
        dispatch(ModuleMockQuestionUploadAction(0));
        dispatch(competitiveQuestionUploadAction(0));
        clearInterval(_interval);
        setExaminterm(0);
        dispatch(totalAttemptsAction(0));
    }

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

    const checkLocked = () => {
        const locked = Orientation.isLocked();
        if (locked !== isLocked) {
            setLocked(locked);
        }
    }

    const checkNoOfAttempts = () => {
            console.log("@1========checkNoOfAttacm===",)
            setIsPlaying(false);
            setHasSubmitted(true)
    }

    const uploadQuestion = useCallback(() => {

        if (props.route.params.examFrom == 1) {
            // console.log("@@3331--")
            // console.log("props.route.params.examFrom == 1")
            dispatch(getScholasticExamQuestionsDataForSubscriber(previousValue.branchSortCode, previousValue.chapter, previousValue.subject_id, previousValue.set_no.toString(), previousValue.chapter_no, previousValue.group_subject_id, checkNoOfAttempts, props));
            
        } else if (props.route.params.examFrom == 2) {
            // console.log("props.route.params.examFrom == 2")
            if (previousValue.isModuleOrMock == 1) {
                // console.log("@@11--")
                dispatch(getOnlineScholasticModuleQuestionListData(previousValue.selectChapterId, previousValue.subject_id, previousValue.branchSortCode, previousValue.set_no, previousValue.group_subject_id, checkNoOfAttempts, props));
            } else if (previousValue.isModuleOrMock == 2) {
                // console.log("@@22222---------",)
                dispatch(getOnlineScholasticMockQuestionListData(previousValue.selectChapterId, previousValue.subject_id, previousValue.branchSortCode, previousValue.set_no, previousValue.group_subject_id, checkNoOfAttempts, props));
            } else if (previousValue.isModuleOrMock == 3) {
                dispatch(getscholasticexamsdetailsCasestudytData(previousValue.subject_id, previousValue.branchSortCode, previousValue.set_no, previousValue.group_subject_id, checkNoOfAttempts, props));
            }
        } else if (props.route.params.examFrom == 3) {
            console.log("getOnlineCompetitiveQuestionListData-----", props.route.params.examFrom)
            dispatch(getOnlineCompetitiveQuestionListData(previousValue.exam_type, previousValue.subscription_id, previousValue.set_no, previousValue.subtype, checkNoOfAttempts, props));
        }
        dispatch(selectDemoQuestionNumber(0))

    },[])

    const onDashboardHandeler = () => {
        setOtherOptionModalVisible(false)
        setDashboardModalVisible(true)
    }

    const questionNumber = (id) => {
        // console.log("questionNumber=====", id)
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
                // 'component': <EditClubMenuScene navigation={this.props.navigation} parent={this} />, currentQuestionNumber: currentQuestionNumber 
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
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <UserDetails navigation={navigation} params={{ mobile: 'mobileNumber', email: 'emailId', }} />,
                'componentHeight': 250,
            });
    }

    const examStartInstructionHandeler = () => {
        // console.log("****--33-examStartInstructionHandeler")
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <ExamStartInstructions navigation={navigation} quitExam={quitExam} startExam={startExam} params={{ mobile: 'mobileNumber', email: 'emailId', }} />,
                'componentHeight': 550,
            });
    }


    const answer_count = () => {
        var rez = 0;
        !!currentQuestion && currentQuestion.forEach(function (item) {
            if (item.is_answered >= 0) {
                rez++;
            }
        });
        setIs_answered_count(rez);
    }

    const visited_count = () => {
        var rez = 0;
        !!currentQuestion && currentQuestion.forEach(function (item) {
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
        setCalllCurrentQuestionNo(!calllCurrentQuestionNo) // intermData
        ScholasticExamintermSubmit(currentQuestionNumber - 1) //intermData
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
        setCalllCurrentQuestionNo(!calllCurrentQuestionNo) //intermData
        ScholasticExamintermSubmit(currentQuestionNumber + 1) //intermData
    }

    const answerSetSelected = (data, index) => {
        // console.log("+++11", data)
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
        setCalllCurrentQuestionNo(!calllCurrentQuestionNo) //intermData
        // ScholasticExamintermSubmit(props.questionNo) //intermDataF
        ScholasticExamintermSubmit(currentQuestionNumber) //intermDataF
    }

    // reload exam  intermData
    const storeAnswerValue = () => {
        var ansdata = [];
        var id_wise_value = null;

        for (var i = 0; i < currentQuestion.length; i++) {
            id_wise_value = {};
            id_wise_value = currentQuestion[i].is_answered_data //guest_post_ans;
            // id_wise_value['is_visit'] = props.scholasticQuestionList[i].is_visited;
            ansdata.push(id_wise_value);
        }

        setSelected(ansdata);

        visited_count();
        answer_count();
    }
    // reload exam  intermData

    const submitDemoExamHandeler = () => {
        setModalVisible(true)
    }



    const ScholasticExamintermSubmit = (current_question_number) => {
        // console.log("ScholasticExamintermSubmit=====538=========", current_question_number, time_used)
        var examdata = [];
        var id_wise_value = null;

        for (var i = 0; i < currentQuestion.length; i++) {
            id_wise_value = {};
            id_wise_value['question_id'] = currentQuestion[i].id;
            id_wise_value['question_no'] = currentQuestion[i].question_no;
            id_wise_value['guest_post_ans'] = currentQuestion[i].is_answered_data;
            id_wise_value['guest_post_ans_status'] = currentQuestion[i].is_corrected;
            id_wise_value['is_visit'] = currentQuestion[i].is_visited;
            id_wise_value['is_answered'] = currentQuestion[i].is_answered;
            id_wise_value['is_answered_data'] = currentQuestion[i].is_answered_data;
            id_wise_value['is_corrected'] = currentQuestion[i].is_corrected;
            id_wise_value['is_visited'] = currentQuestion[i].is_visited;
            examdata.push(id_wise_value);
        }

        // if (examdata != "") {
        // console.log("#####---@1", previousValue.exam_type, previousValue.branchSortCode,)
        dispatch(getscholasticIntermExamSubmitforSubscriber(previousValue.exam_type, previousValue.exam_type == "NSTSE" ? 0 : previousValue.branchSortCode, previousValue.chapter, previousValue.exam_type == 1 ? previousValue.setlectSet : previousValue.exam_type == 2 || previousValue.exam_type == 3 || (previousValue.exam_type == "NTSE" || previousValue.exam_type == "NSTSE") ? [previousValue.set_no] : [previousValue.caseStudy_no], examdata, previousValue.subject_id, currentQuestion[0].exam_category, time_used, current_question_number, previousValue.group_subject_id, props)); //props.questionNo
        // }
    }

    const ScholasticExamintermSubmitInterval = (current_question_number) => {
        // console.log("ScholasticExamintermSubmitInterval======564========", current_question_number,)
        var examdata = [];
        var id_wise_value = null;

        for (var i = 0; i < currentQuestionLengthRef.current.length; i++) {
            id_wise_value = {};
            id_wise_value['question_id'] = currentQuestionLengthRef.current[i].id;
            id_wise_value['question_no'] = currentQuestionLengthRef.current[i].question_no;
            id_wise_value['guest_post_ans'] = currentQuestionLengthRef.current[i].is_answered_data;
            id_wise_value['guest_post_ans_status'] = currentQuestionLengthRef.current[i].is_corrected;
            id_wise_value['is_visit'] = currentQuestionLengthRef.current[i].is_visited;
            id_wise_value['is_answered'] = currentQuestionLengthRef.current[i].is_answered;
            id_wise_value['is_answered_data'] = currentQuestionLengthRef.current[i].is_answered_data;
            id_wise_value['is_corrected'] = currentQuestionLengthRef.current[i].is_corrected;
            id_wise_value['is_visited'] = currentQuestionLengthRef.current[i].is_visited;
            examdata.push(id_wise_value);
        }

        // if (examdata != "") {
        // if(props.route.params.examFrom != 3) {
        dispatch(getscholasticIntermExamSubmitforSubscriber(previousValue.exam_type, previousValue.exam_type == "NSTSE" ? 0 : previousValue.branchSortCode, previousValue.chapter, previousValue.exam_type == 1 ? previousValue.setlectSet : previousValue.exam_type == 2 || previousValue.exam_type == 3 || (previousValue.exam_type == "NTSE" || previousValue.exam_type == "NSTSE") ? [previousValue.set_no] : [previousValue.caseStudy_no], examdata, previousValue.subject_id, currentQuestionLengthRef.current[0].exam_category, currentTimeRef.current, current_question_number, previousValue.group_subject_id, props)); //props.questionNo
        // }

    }

    const examSubmit = () => {
        // console.log("Submit Fnal Answer ", previousValue.group_subject_id);
        var examdata = [];
        var id_wise_value = null;

        for (var i = 0; i < currentQuestion.length; i++) {
            // console.log("currentQuestion[i].is_answered_data----", currentQuestion[i].is_answered_data)
            id_wise_value = {};
            id_wise_value['question_id'] = currentQuestion[i].id;
            id_wise_value['question_no'] = currentQuestion[i].question_no;
            id_wise_value['guest_post_ans'] = currentQuestion[i].is_answered_data;
            id_wise_value['guest_post_ans_status'] = currentQuestion[i].is_corrected;
            examdata.push(id_wise_value);
        }

        // if (examdata != "") {
        let page = 2; /* online Exam box icon id */
        previousDataBlank();
        // clearInterval(_interval);
        if (props.route.params.examFrom != 3) {
            dispatch(getScholasticExamAnswerSubmitForSubscriber(previousValue.exam_type, previousValue.branchSortCode, previousValue.chapter, previousValue.exam_type == 1 ? previousValue.setlectSet : previousValue.exam_type == 2 || previousValue.exam_type == 3 ? previousValue.set_no : previousValue.caseStudy_no, examdata, previousValue.subject_id.toString(), previousValue.chapter_no, previousValue.group_subject_id, page, previousValue.exam_category_id, props));
        } else {
            dispatch(competitiveExamAnswerSubmitForSubscriber(previousValue.exam_type, previousValue.subscription_id, previousValue.set_no, examdata, previousValue.subtype, previousValue.group_subject_id, page, previousValue.exam_category_id, props))
        }
    }

    const ScholasticExamSubmitTimeup = () => {
        console.log("Submit Fnal Answer Submit Timeup",)

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
        // if (examdata != "") {
        let page = 2;
        // console.log("props.route.params.examFrom---", props.route.params.examFrom)
        previousDataBlank();
        // clearInterval(_interval);
        if (props.route.params.examFrom != 3) {
            dispatch(getScholasticExamAnswerSubmitForSubscriberTimeupSubmit(previousValue.exam_type, previousValue.branchSortCode, previousValue.chapter, previousValue.exam_type == 1 ? previousValue.setlectSet : previousValue.exam_type == 2 || previousValue.exam_type == 3 ? previousValue.set_no : previousValue.caseStudy_no, examdata, previousValue.subject_id.toString(), previousValue.chapter_no, previousValue.group_subject_id, page, previousValue.exam_category_id, props));
        } else {
            dispatch(competitiveExamAnswerSubmitForSubscriberTimeup(previousValue.exam_type, previousValue.subscription_id, previousValue.set_no, examdata, previousValue.subtype, previousValue.group_subject_id, page, previousValue.exam_category_id, props))
        }
    }


    const submitFinalAnswer = () => {
        setModalVisible(false)
        setIsPlaying(false)
        dispatch(timeUpAction(0))
        examSubmit();
    }

    const timeUpSubmit = () => {
        clearInterval(_interval);
        // console.log("timeUpSubmit")
        dispatch(timeUpAction(0)) //-----
        setIsPlaying(false)
        submitFinalAnswer();
    }

    const quitExam = () => {
        // props.navigation.goBack()
        props.navigation.replace('drawerScenes', {
            screen: 'Dashboard',
            params: { data: 0 },
        });
    }

    const startExam = () => {

        Emitter.emit(Events.HIDE_MENU_FROM_BOTTOM);
        if (total_attempts < 4) {
            Orientation.lockToLandscape();
            checkLocked();
            setExaminterm(1)
            uploadQuestion();
        }
    }

    const openOtherOption = () => {
        setOtherOptionModalVisible(true)
    }

    const goToDashboard = () => {
        dispatch(alertSoundAction(0))
        dispatch(drawerMenuActiveIdUpdateAction(1))
        setDashboardModalVisible(false);
        setIsPlaying(false);
        previousDataBlank();
        props.navigation.navigate('drawerScenes', {
            screen: "Dashboard",
        })
    }

    const timeupHandeler = () => {
        clearInterval(_interval);
        setExaminterm(0)
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
                {/* {console.log("pendingTime----------", pendingTime, isPlaying)} */}
                {/* {console.log("currentQuestion----------", currentQuestion && currentQuestion)} */}
                {/* {console.log("total_attempts----------", total_attempts && total_attempts)} */}
                {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                {!!currentQuestion.length && total_attempts < 4 ?
                    <View style={Gstyles.examParentContainer} >
                        <View style={Gstyles.examTopContainer}>
                            <View style={[Gstyles.examInsideTopContainer, Gstyles.fdr, Gstyles.jcsb]}>

                                {/* <View style={Gstyles.examInfoInsideContainer}>
                                    <MaterialIcons name="monitor" size={20} color="#fff" />
                                    <View style={Gstyles.examInfoTextContainer}><Text style={Gstyles.examRemainingTextWhite} >{currentQuestionNumber + 1}/{currentQuestion.length}</Text></View>
                                </View> */}
                                <View>
                                    <View style={[Gstyles.examInfoInsideContainer, { height: 30, top: -3 }]}>

                                        {!!currentQuestion.length ?
                                            <>
                                                <MaterialCommunityIcons name="clock-minus-outline" size={18} color="#fff" />
                                                <View style={{ overflow: 'hidden', alignItems: 'flex-start', top: -1 }}>
                                                    <ExamCounterClockComponent examTime={examTime} isPlaying={isPlaying} />
                                                    {/* <ExamCounterClockComponent examTime={14400} isPlaying={isPlaying} /> */}
                                                </View>
                                            </>
                                            :
                                            <>
                                                <MaterialCommunityIcons name="clock-minus-outline" size={20} color="#fff" />
                                                <View style={Gstyles.examInfoTextContainer} ><Text style={Gstyles.examInfoText} >00:00:00</Text></View>
                                            </>
                                        }
                                    </View>
                                </View>

                                <View style={[Gstyles.aic, Gstyles.jcc, { top: 2, height: 30, flex: .8, }]}>
                                    <ScrollView horizontal={true}>
                                        {props.route.params.examFrom == 1 ?
                                            <Text style={Gstyles.examHeading}> Subject: {currentQuestion[0].subject_name} {currentQuestion[0].subject_name != currentQuestion[0].branch_name ? <> / {currentQuestion[0].branch_name} </> : null} / Test: {previousValue.set_no == 'cs1' ? "Case Study" : previousValue.set_no} / {currentQuestion[0].chapter_name} {`(${currentQuestion[0].chapter_title})`
                                            }</Text>
                                            : props.route.params.examFrom == 2 ?
                                                <Text style={Gstyles.examHeading}>Subject: {currentQuestion[0].subject_name} / {previousValue.exam_type == 2 ? "Module" : previousValue.exam_type == 3 ? "Mock" : previousValue.exam_type == 4 ? "Case Study" : null} {previousValue.exam_type == 2 || previousValue.exam_type == 3 ? previousValue.set_no : previousValue.caseStudy_no}</Text>
                                                : props.route.params.examFrom == 3 ?
                                                    <Text style={Gstyles.examHeading}> {previousValue.exam_type} / {currentQuestion[0].exam_subtype ? <> {currentQuestion[0].exam_subtype} /</> : null}  Set: {previousValue.set_no} </Text>
                                                    : null
                                        }
                                    </ScrollView>
                                </View>

                                <TouchableOpacity style={Gstyles.answerSubmitTopContainer} onPress={submitDemoExamHandeler} >
                                    <View style={Gstyles.answerSubmitTopInsideContainer} >
                                        <Text style={Gstyles.examSubmitTopText}>Submit</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>


                            <View style={!answerSheetExpan ? Gstyles.showQuestionContainer : Gstyles.showQuestionSmallContainer}>

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
                                        // contentContainerStyle={Gstyles.examScrollViewContainer}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <GestureRecognizer
                                            onSwipe={(direction, state) => onSwipe(direction, state)}
                                        >
                                            <View style={{ height: 300 }} >
                                            {/* {console.log("currentQuestion.length====", currentQuestion.length)} */}
                                            
                                                {currentQuestion.length > 0 && currentQuestion != '' ?
                                                    currentQuestion[currentQuestionNumber].question != '' || '' ?
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

                                            {currentQuestion.length > 0 && currentQuestion != '' ?
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
                                                                                                    onHeightUpdated={{ minHeight: 38, }}
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
                                        <TouchableOpacity style={[Gstyles.previousQuestionNewContainer]} onPress={prevousQuestion}>
                                            <Ionicons name="chevron-back" size={20} color="#245C75" />
                                        </TouchableOpacity>
                                        :
                                        <View style={[Gstyles.previousQuestionNewContainer]} >

                                        </View>
                                    }
                                </View>
                                <View style={Gstyles.questionRightSideOptionParentContainer}>
                                    {(currentQuestionNumber + 1) < currentQuestion.length ?
                                        <TouchableOpacity style={[Gstyles.previousQuestionNewContainer]} onPress={nextQuestion}>
                                            <Ionicons name="chevron-forward" size={20} color="#245C75" />
                                        </TouchableOpacity>
                                        :
                                        <View style={[Gstyles.previousQuestionNewContainer]} >

                                        </View>
                                    }
                                </View>
                                <View style={Gstyles.questionRightSideOptionParentContainer}>
                                    <TouchableOpacity style={[Gstyles.previousQuestionNewContainer]} onPress={openOtherOption}>
                                        <Ionicons name="folder-open" size={15} color="#245C75" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </View>
                    : null}

            </KeyboardAvoidingView >


            {
                modalVisible ?
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

            {
                dashboardModalVisible ?
                    <AlertOnlineExam
                        isVisable={(dashboardModalVisible)}
                        modalHeading="Do you want to go back to dashboard?"
                        // cartDetails='Go to dashboard'
                        isCancelRequire={true}
                        cancelHandeler={() => setDashboardModalVisible(false)}
                        submitHandeler={goToDashboard}
                    />
                    :
                    null
            }

            {
                timeUpVisible ?
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


            {
                otherOptionModalVisible ?
                    <OtherOptionModal
                        intermNumber={currentQuestion[0]?.total_attempts}
                        cancelHandeler={() => setOtherOptionModalVisible(false)}
                        onDashboardHandeler={() => onDashboardHandeler()}
                        onQuestionDetailsHandeler={onQuestionDetailsHandeler}
                        onInformationsHandeler={onInformationsHandeler}
                        onUserDetailsHandeler={onUserDetailsHandeler}
                    />
                    :
                    null
            }

            <View>
                {warningSound == 1 ?
                    <>
                        <CounterClockSoundComponent isPlaying={warningSound == 1 ? true : false} />
                    </>
                    : null}
            </View>
        </>

    );
};
export default OnlineExamsDetails;
