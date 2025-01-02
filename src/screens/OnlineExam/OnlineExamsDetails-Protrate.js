import React, { useEffect, useState, useRef } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Text, TouchableOpacity, ScrollView, StyleSheet, Image, ActivityIndicator, BackHandler, } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
// import { OrientationLocker, PORTRAIT, LANDSCAPE } from "react-native-orientation-locker";
import Orientation, {
    useOrientationChange,
    useDeviceOrientationChange,
    useLockListener,
} from 'react-native-orientation-locker';

import HeaderComponent from '../../components/HeaderComponent';
import { colors, scrollViewContainer, } from '../../styles/Crestest.config';

import { container } from '../../styles/Crestest.config';
import Gstyles from '../../styles/GlobalStyle';
import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import QuestionDetails from '../home/exam/examComponent/QuestionDetails'
import InstructionsOnTakingExams from '../home/exam/examComponent/InstructionsOnTakingExams'
import UserDetails from '../home/exam/examComponent/UserDetails'
import ExamStartInstructions from '../home/exam/examComponent/ExamStartInstructions'

import { getScholasticExamQuestionsDataForSubscriber, getQuestionUploadCompletetAction, getScholasticExamAnswerSubmitForSubscriber, totalAttemptsAction, getscholasticIntermExamSubmitforSubscriber, getScholasticExamAnswerSubmitForSubscriberTimeupSubmit } from '../../store/actions/ScholasticAction';

import { selectDemoQuestionNumber, selectPrevousDemoQuestion, selectNextDemoQuestion, timeUpAction } from '../../store/actions/demoExamAction';

import { getOnlineScholasticModuleQuestionListData, getOnlineScholasticMockQuestionListData, getscholasticexamsdetailsCasestudytData, getOnlineCompetitiveQuestionListData, ModuleMockQuestionUploadAction, competitiveQuestionUploadAction, competitiveExamAnswerSubmitForSubscriber, competitiveExamAnswerSubmitForSubscriberTimeup } from '../../store/actions/OnlineExamAction';


import ExamCounterClockComponent from '../home/exam/examComponent/ExamCounterClockComponent'

import CounterClockSoundComponent from "./onlineComponent/CounterClockSoundComponent-New"


import MathJax from 'react-native-mathjax'

import { decryptAES, getData } from "../../utils/Util";

import { Popup } from 'react-native-popup-confirm-toast'
import { useNavigation } from '@react-navigation/native';

let _visitTime = 0;
let _interval;

const OnlineExamsDetails = (props,) => {

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

    const currentQuestionLengthRef = useRef();
    currentQuestionLengthRef.current = currentQuestion
    // currentQuestionLengthRef.current = scholasticQuestionListForSubscriber

    const currentTimeRef = useRef();
    currentTimeRef.current = pendingTime;

    const totalAttemptsRef = useRef();
    totalAttemptsRef.current = total_attempts;

    useEffect(() => {
        // console.log("examStartInstructionHandeler---")
        examStartInstructionHandeler();

    }, []);

    useEffect(() => {
        checkLocked();
      });

    /* useEffect(() => {
        
        return () => {
            Orientation.lockToPortrait();
            checkLocked();
        }
    }, []); */

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

    useEffect(() => {
        setPendingTime(time_used)
        // console.log(">>>time_used>>", time_used)
        // dispatch(selectDemoQuestionNumber(currentQestionNo))
        // ScholasticExamintermSubmit(currentQestionNo)

    }, [time_used, calllCurrentQuestionNo,]); //

    useEffect(() => {
        if (scholasticQuestionUploaded == 1 || moduleMockQuestionUploaded == 1 || competitiveQuestionUploaded == 1) {
            let updatedVisitData = props.route.params.examFrom == 1 ? scholasticQuestionListForSubscriber : props.route.params.examFrom == 2 ? onlineModuleMockQuestionList : props.route.params.examFrom == 3 ? onlineCompetitiveQuestionList : null;
            // updatedVisitData[currentQuestionNumber].is_visited = 1
            setCurrentQuestion(updatedVisitData)
            // setCurrentQuestion(scholasticQuestionList)
            dispatch(getQuestionUploadCompletetAction(0));
            dispatch(ModuleMockQuestionUploadAction(0));
            dispatch(competitiveQuestionUploadAction(0));
            if (props.route.params.examFrom == 1) {
                // console.log("props.route.params.examFrom == 1")
                setExamTime(scholasticQuestionListForSubscriber[0].exam_duration)
            } else if (props.route.params.examFrom == 2) {
                // console.log("props.route.params.examFrom == 2")
                setExamTime(onlineModuleMockQuestionList[0].exam_duration)
            } else if (props.route.params.examFrom == 3) {
                // console.log("props.route.params.examFrom == 3")
                setExamTime(onlineCompetitiveQuestionList[0].exam_duration)
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
                // console.log("total_attempts == 1 && scholasticQuestionUploaded == 1")
                currentQuestion[currentQuestionNumber].is_visited = 1; // reload exam intermData // && 
                if (scholasticQuestionUploaded == 1) {
                    ScholasticExamintermSubmit(currentQestionNo)
                }
            }

            visited_count();

            if (total_attempts > 1) { // reload exam intermData
                // console.log("total_attempts > 1-----", currentQuestion[0].last_visited_ques_no )
                dispatch(selectDemoQuestionNumber(currentQuestion[0].last_visited_ques_no))// intermData reload exam -- current question number
                storeAnswerValue()
            }

            if (total_attempts > 3) { // reload exam intermData
                // exitFullscreen();
                // ScholasticExamSubmit()
                examSubmit()
            }
        }

    }, [total_attempts, currentQuestion]); //

    useEffect(() => {
        setCurrentQuestionNumber(currentQestionNo);
    }, [currentQestionNo]);

    useEffect(() => {
        _interval = setInterval(() => {
            _visitTime++;
            // console.log("setInterval----123---", currentQestionNo)
            ScholasticExamintermSubmitInterval(currentQestionNo)
        }, 20000);
        // }, 20000);



        if (timeUpWarning == 1) {
            // console.log( ">>>timePratap>>>@@>", timeUpWarning )
            clearInterval(_interval);
        }

        return () => {
            clearInterval(_interval);
        }
    }, [timeUpWarning, currentQestionNo])

    /* intermData */
    useEffect(() => {
        // storeAnswerValue(); // reload exam 
        answer_count(); // reload exam 
        visited_count(); // reload exam 
        return () => {
            dispatch(totalAttemptsAction(0));
            // dispatch(timeUsedForExamAction(''))
        };
    }, []);
    /* intermData */

    /* TimeupModal Close */
    useEffect(() => {
        // setTimeUpModal(false)
        return () => {
            dispatch(timeUpAction(0))
            setTimeUpModal(false)
        };
    }, []);
    /* TimeupModal Close  */


    useEffect(() => {

        if (timeUpWarning == 1) {
            Popup.show({
                type: 'warning',
                title: 'Exam Timeup',
                textBody: 'Click on submit button to view your assessment',
                confirmText: 'Cancel',
                buttonText: 'Ok',
                buttonContentStyle: { alignItems: 'center', },
                okButtonStyle: { backgroundColor: '#ff0000', width: 100 },
                confirmButtonStyle: { backgroundColor: '#e3e3e3', width: 100 },
                callback: () => {
                    // alert('Okey Callback && hidden');
                    timeUpSubmit()
                    Popup.hide();

                },
                cancelCallback: () => {
                    // alert('Cancel Callback && hidden');
                    Popup.hide();
                },
            })
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

    const checkLocked = () => {
        const locked = Orientation.isLocked();
        if (locked !== isLocked) {
          setLocked(locked);
        }
      }

    const uploadQuestion = () => {
        if (props.route.params.examFrom == 1) {
            // console.log("props.route.params.examFrom == 1")
            dispatch(getScholasticExamQuestionsDataForSubscriber(previousValue.branchSortCode, previousValue.chapter, previousValue.subject_id, previousValue.set_no.toString(), previousValue.chapter_no, previousValue.group_subject_id,));
        } else if (props.route.params.examFrom == 2) {
            // console.log("props.route.params.examFrom == 2")
            if (previousValue.isModuleOrMock == 1) {
                // console.log("@@11--")
                dispatch(getOnlineScholasticModuleQuestionListData(previousValue.selectChapterId, previousValue.subject_id, previousValue.branchSortCode, previousValue.set_no, previousValue.group_subject_id, props));
            } else if (previousValue.isModuleOrMock == 2) {
                // console.log("@@22222---------",)
                dispatch(getOnlineScholasticMockQuestionListData(previousValue.selectChapterId, previousValue.subject_id, previousValue.branchSortCode, previousValue.set_no, previousValue.group_subject_id, props));
            } else if (previousValue.isModuleOrMock == 3) {
                dispatch(getscholasticexamsdetailsCasestudytData(previousValue.subject_id, previousValue.branchSortCode, previousValue.set_no, previousValue.group_subject_id, props));
            }
        } else if (props.route.params.examFrom == 3) {
            // console.log("@@3333333---------",)
            // console.log("props.route.params.examFrom == 3")
            dispatch(getOnlineCompetitiveQuestionListData(previousValue.exam_type, previousValue.subscription_id, previousValue.set_no, previousValue.subtype, props));
        }
        dispatch(selectDemoQuestionNumber(0))

    }

    const onDashboardHandeler = () => {
        Popup.show({
            type: 'confirm',
            title: 'Are you sure?',
            textBody: 'Go to dashboard',
            confirmText: 'Cancel',
            buttonText: 'Ok',
            buttonContentStyle: { alignItems: 'center', },
            okButtonStyle: { backgroundColor: '#ff0000', width: 100 },
            confirmButtonStyle: { backgroundColor: '#e3e3e3', width: 100 },
            callback: () => {
                // alert('Okey Callback && hidden');
                Popup.hide();
                props.navigation.navigate('drawerScenes', {
                    screen: "Dashboard",
                })
            },
            cancelCallback: () => {
                // alert('Cancel Callback && hidden');
                Popup.hide();
            },
        })
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
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                // 'component': <EditClubMenuScene navigation={this.props.navigation} parent={this} />, currentQuestionNumber: currentQuestionNumber 
                'component': <QuestionDetails navigation={navigation} callQuestionNumber={questionNumber} params={{ totalQuestionNumber: currentQuestion.length, currentQuestionNumber: currentQuestionNumber, is_answered_count: is_answered_count, is_visited_count: is_visited_count, questionList: currentQuestion }} />,
                'componentHeight': 350,
            });
    }

    const onInformationsHandeler = () => {
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
        Emitter.emit(Events.SHOW_PRELOADER);
        Emitter.emit(Events.SHOW_MENU_FROM_BOTTOM,
            {
                'component': <ExamStartInstructions navigation={navigation} quitExam={quitExam} startExam={startExam} params={{ mobile: 'mobileNumber', email: 'emailId', }} />,
                'componentHeight': 330,
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
        // console.log("submitDemoExamHandeler====")
        Popup.show({
            type: 'confirm',
            title: 'Are you sure?',
            textBody: 'Submit your exam',
            confirmText: 'Cancel',
            buttonText: 'Ok',
            buttonContentStyle: { alignItems: 'center', },
            okButtonStyle: { backgroundColor: '#ff0000', width: 100 },
            confirmButtonStyle: { backgroundColor: '#e3e3e3', width: 100 },
            callback: () => {
                // alert('Okey Callback && hidden');
                Popup.hide();
                submitFinalAnswer();
            },
            cancelCallback: () => {
                // alert('Cancel Callback && hidden');
                Popup.hide();
            },
        })
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

        if (examdata != "") {

            dispatch(getscholasticIntermExamSubmitforSubscriber(previousValue.exam_type, previousValue.branchSortCode, previousValue.chapter, previousValue.exam_type == 1 ? previousValue.setlectSet : previousValue.exam_type == 2 || previousValue.exam_type == 3 || previousValue.exam_type == "NTSE" ? [previousValue.set_no] : [previousValue.caseStudy_no], examdata, previousValue.subject_id, currentQuestion[0].exam_category, time_used, current_question_number, previousValue.group_subject_id, props)); //props.questionNo
        }
    }

    const ScholasticExamintermSubmitInterval = (current_question_number) => {
        // console.log("ScholasticExamintermSubmitInterval======564========", current_question_number, )
        // console.log("currentQuestionLengthRef.current======564========", currentTimeRef.current)
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

        if (examdata != "") {
            // if(props.route.params.examFrom != 3) {
            dispatch(getscholasticIntermExamSubmitforSubscriber(previousValue.exam_type, previousValue.branchSortCode, previousValue.chapter, previousValue.exam_type == 1 ? previousValue.setlectSet : previousValue.exam_type == 2 || previousValue.exam_type == 3 || previousValue.exam_type == "NTSE" ? [previousValue.set_no] : [previousValue.caseStudy_no], examdata, previousValue.subject_id, currentQuestionLengthRef.current[0].exam_category, currentTimeRef.current, current_question_number, previousValue.group_subject_id, props)); //props.questionNo
        }


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

        if (props.route.params.examFrom != 3) {
            dispatch(getScholasticExamAnswerSubmitForSubscriber(previousValue.exam_type, previousValue.branchSortCode, previousValue.chapter, previousValue.exam_type == 1 ? previousValue.setlectSet : previousValue.exam_type == 2 || previousValue.exam_type == 3 ? previousValue.set_no : previousValue.caseStudy_no, examdata, previousValue.subject_id.toString(), previousValue.chapter_no, previousValue.group_subject_id, page, previousValue.exam_category_id, props));
        } else {
            dispatch(competitiveExamAnswerSubmitForSubscriber(previousValue.exam_type, previousValue.subscription_id, previousValue.set_no, examdata, previousValue.subtype, previousValue.group_subject_id, page, previousValue.exam_category_id, props))
        }
    }

    const ScholasticExamSubmitTimeup = () => {
        // console.log("Submit Fnal Answer Submit Timeup",)

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
        if (examdata != "") {
            let page = 2;

            if (props.route.params.examFrom != 3) {
                dispatch(getScholasticExamAnswerSubmitForSubscriberTimeupSubmit(previousValue.exam_type, previousValue.branchSortCode, previousValue.chapter, previousValue.setlectSet, examdata, previousValue.subject_id.toString(), previousValue.chapter_no, previousValue.group_subject_id, page, previousValue.exam_category_id, props));
            } else {
                dispatch(competitiveExamAnswerSubmitForSubscriberTimeup(previousValue.exam_type, previousValue.subscription_id, previousValue.set_no, examdata, previousValue.subtype, previousValue.group_subject_id, props));
            }
        }
    }


    const submitFinalAnswer = () => {
        setIsPlaying(false)
        dispatch(timeUpAction(0))
        examSubmit()

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
        if (total_attempts < 4) {
            // Orientation.lockToLandscape();
            // checkLocked();
            uploadQuestion()
        }
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "none"}
                // style={container}
                style={Gstyles.examParentContainer}
            >
                {/* {console.log("currentQuestion--", "1-->", scholasticQuestionUploaded, "2-->", moduleMockQuestionUploaded, "3-->", competitiveQuestionUploaded)} */}

                {/* <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent hidden={false} /> */}
                <StatusBar barStyle="light-content" backgroundColor="#245C75" translucent hidden={false} />
                {/* {showExam ? */}
                {/* {scholasticQuestionUploaded == 1 || moduleMockQuestionUploaded == 1 || competitiveQuestionUploaded == 1 ? */}
                {!!currentQuestion.length && total_attempts < 4 ?
                    <View style={Gstyles.examParentContainer} >
                        <View style={Gstyles.examTopContainer}>
                            <View style={Gstyles.examInsideTopContainer}>
                                <View>
                                    {/* <Text style={Gstyles.examHeading}>{props.route.params.id == 1 ? "Scholastic" : "Competitive"} <Ionicons name="chevron-forward" size={16} color={colors.backgroundWhite} /> {isDemo == 0 ? `Guest` : `Registered`} Demo Exam</Text> */}
                                    {props.route.params.examFrom == 1 ?
                                        <Text style={Gstyles.examHeading}> Subject: {currentQuestion[0].subject_name} {currentQuestion[0].subject_name != currentQuestion[0].branch_name ? <> / {currentQuestion[0].branch_name} </> : null} / Test: {previousValue.set_no} / {currentQuestion[0].chapter_name}{`(${currentQuestion[0].chapter_title})`
                                        }</Text>
                                        : props.route.params.examFrom == 2 ?
                                            <Text style={Gstyles.examHeading}>Subject: {currentQuestion[0].subject_name} / {previousValue.exam_type == 2 ? "Module" : previousValue.exam_type == 3 ? "Mock" : previousValue.exam_type == 4 ? "Case Study" : null} {previousValue.exam_type == 2 || previousValue.exam_type == 3 ? previousValue.set_no : previousValue.caseStudy_no}</Text>
                                            : props.route.params.examFrom == 3 ?
                                                <Text style={Gstyles.examHeading}> {previousValue.exam_type} / {currentQuestion[0].exam_subtype ? <> {currentQuestion[0].exam_subtype} /</> : null}  Set: {previousValue.set_no} </Text>
                                                : null
                                    }


                                </View>
                                <View style={Gstyles.examOptionContainer}>
                                    <View style={Gstyles.examTopOptionContainer}>
                                        <TouchableOpacity style={[Gstyles.OptionItemContainer, Gstyles.dashboardIconBackground]} onPress={onDashboardHandeler}>
                                            <MaterialIcons name="dashboard" size={25} color={colors.backgroundWhite} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[Gstyles.OptionItemContainer, Gstyles.dashboardQuestionNumberIconBackground]} onPress={onQuestionDetailsHandeler}>
                                            <FontAwesome5 name="sliders-h" size={25} color={colors.backgroundWhite} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[Gstyles.OptionItemContainer, Gstyles.dashboardInfoIconBackground]} onPress={onInformationsHandeler} >
                                            <Ionicons name="information-circle-outline" size={30} color={colors.backgroundWhite} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[Gstyles.OptionItemContainer, Gstyles.dashboardUserIconBackground]} onPress={onUserDetailsHandeler}>
                                            <FontAwesome5 name="user" size={25} color={colors.backgroundWhite} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={Gstyles.examInfoContainer}>
                                <View style={Gstyles.examInfoInsideContainer}>
                                    <MaterialIcons name="monitor" size={25} color="#90B817" />
                                    <View style={Gstyles.examInfoTextContainer}><Text style={Gstyles.examInfoText} >{currentQuestionNumber + 1}/{currentQuestion.length}</Text></View>
                                </View>
                                <View>

                                    <View style={Gstyles.examInfoInsideContainer}>
                                        <View style={Gstyles.examInfoTextContainer}><Text style={Gstyles.examInfoText} >Attempts :</Text></View>
                                        <View style={Gstyles.examInfoTextContainer}><Text style={Gstyles.examInfoText} >{currentQuestion[0].total_attempts} / 3</Text></View>
                                    </View>

                                </View>
                                <View>
                                    <View style={Gstyles.examInfoInsideContainer}>

                                        {!!currentQuestion.length ?
                                            <>
                                                <MaterialCommunityIcons name="clock-minus-outline" size={25} color="#90B817" />
                                                {/* <ExamCounterClockComponent examTime={currentQuestion[0].exam_duration} isPlaying={isPlaying} /> */}
                                                <View style={{ overflow: 'hidden' }}>
                                                    <ExamCounterClockComponent examTime={examTime} isPlaying={isPlaying} />
                                                    {/* <ExamCounterClockComponent examTime={60} isPlaying={isPlaying} /> */}
                                                </View>
                                            </>
                                            :
                                            <>
                                                <MaterialCommunityIcons name="clock-minus-outline" size={25} color="#90B817" />
                                                <View style={Gstyles.examInfoTextContainer} ><Text style={Gstyles.examInfoText} >00:00:00</Text></View>
                                            </>
                                        }
                                    </View>
                                </View>
                            </View>



                            <View style={Gstyles.showQuestionContainer}>
                                {currentQuestionNumber > 0 ?
                                    <TouchableOpacity style={Gstyles.previousQuestionContainer} onPress={prevousQuestion}>
                                        <Ionicons name="chevron-back" size={20} color="#245C75" />
                                    </TouchableOpacity>
                                    :
                                    <View style={Gstyles.previousQuestionContainerDisable} >
                                        {/* <Ionicons name="chevron-back" size={20} color="#245C75" /> */}
                                    </View>
                                }

                                <View style={Gstyles.currentQuestionContainer}>
                                    <ScrollView
                                        keyboardShouldPersistTaps="handled"
                                        contentContainerStyle={scrollViewContainer}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>

                                        </View>
                                        <View>
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

                                    </ScrollView>
                                </View>
                                {(currentQuestionNumber + 1) < currentQuestion.length ?
                                    <TouchableOpacity style={Gstyles.nextQuestionContainer} onPress={nextQuestion}>
                                        <Ionicons name="chevron-forward" size={20} color="#245C75" />
                                    </TouchableOpacity>
                                    :
                                    <View style={Gstyles.nextQuestionContainerDisable} >
                                        {/* <Ionicons name="chevron-back" size={20} color="#245C75" /> */}
                                    </View>
                                }
                            </View>
                            <View style={Gstyles.showAnswerContainer} >
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
                                                                                    {/* <Text>{currentQuestion[currentQuestionNumber].options[0].A}</Text> */}
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
                                                        </>
                                                        :
                                                        <>
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
                                                        </>
                                                    }
                                                </React.Fragment>
                                            )
                                        })

                                        : null}
                                </ScrollView>
                            </View>

                        </View>
                        <TouchableOpacity style={Gstyles.examSubmitContainer} onPress={submitDemoExamHandeler}>
                            <Text style={Gstyles.examSubmitText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    : null}

            </KeyboardAvoidingView >
            <View>
                {warningSound == 1 ?
                    <>
                        {/* {console.log("warningSound------", warningSound)} */}
                        <CounterClockSoundComponent isPlaying={warningSound == 1 ? true : false} />
                    </>
                    : null}
            </View>
        </>

    );
};

const styles = StyleSheet.create(
    {
        container: {

        },
        separator: {

        },

    });

export default OnlineExamsDetails;
