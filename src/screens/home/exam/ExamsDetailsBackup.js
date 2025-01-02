import React, { useEffect, useState } from 'react';
import { View, StatusBar, KeyboardAvoidingView, Text, TouchableOpacity, ScrollView, StyleSheet, Image, ActivityIndicator, } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';

import Orientation from 'react-native-orientation-locker';

import HeaderComponent from '../../../components/HeaderComponent';
import { colors, scrollViewContainer, } from '../../../styles/Crestest.config';

import { container } from '../../../styles/Crestest.config';
import Gstyles from '../../../styles/GlobalStyle';
import Emitter from '../../../utils/Emitter';
import * as Events from '../../../configs/Events';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import QuestionDetails from './examComponent/QuestionDetails'
import InstructionsOnTakingExams from './examComponent/InstructionsOnTakingExams'
import UserDetails from './examComponent/UserDetails'
import ExamStartInstructions from './examComponent/ExamStartInstructions'


import { selectExamCategoryAction, getCategoryData, selectExamCategoryRequestAction } from '../../../store/actions/ExamCategoryAction';
import { getScholasticExamQuestionsData, getQuestionUploadCompletetAction, submitScholasticExam, getCompetitiveExamQuestionsData } from '../../../store/actions/ScholasticAction';
import { selectDemoQuestionNumber, selectPrevousDemoQuestion, selectNextDemoQuestion, timeUpAction } from '../../../store/actions/demoExamAction';

import ExamCounterClockComponent from './examComponent/ExamCounterClockComponent'

// import { WebView } from 'react-native-webview';
import MathJax from 'react-native-mathjax'
import compititiveQuestion from '../../../../compititiveQuestion.json'
import { decryptAES, getData } from "../../../utils/Util";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Popup } from 'react-native-popup-confirm-toast'
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

    const [sampleQuestion, setSampleQuestion] = useState('In the given figure, O is the centre of the circle whose diameter is AB. If ∠AOE = 150° and ∠DAO = 55° then find ∠CBE. <img src="https://admin.clvdev.in//question_images/q_image/1680259500535NTMCH24Q43F43.png" alt="crestest_img" style="width:90%;margin-top:10px;" ')

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
            Orientation.lockToPortrait();
            checkLocked();
        }
    }, []);

    useEffect(() => {
        setCurrentQuestionNumber(currentQestionNo);
        // currentQuestion[currentQuestionNumber].is_visited = 1;
        /* if (!!currentQuestion.length) {
            
            console.log("is_visited = 1", currentQuestionNumber)
        } */
    }, [currentQestionNo]);

    useEffect(() => {
        if (scholasticQuestionUploaded == 1) {
            let updatedVisitData = scholasticQuestionList;
            updatedVisitData[currentQuestionNumber].is_visited = 1
            setCurrentQuestion(updatedVisitData)
            // setCurrentQuestion(scholasticQuestionList)
            dispatch(getQuestionUploadCompletetAction(0));
            setExamTime(scholasticQuestionList[0].exam_duration)
        }
        return () => {
            // dispatch(getQuestionUploadCompletetAction(0));
        };

    }, [scholasticQuestionList]);

    useEffect(() => {
        // console.log("newStudentid--11--", newStudentid, "demoExamSubmit----", demoExamSubmit, currentQuestion.length)
        if (newStudentid != null && newStudentid != undefined && demoExamSubmit == 0 && !!currentQuestion.length) {
            submitDemoExam();
            console.log("submitDemoExam")
        }
    }, [newStudentid, demoExamSubmit]);

    useEffect(() => {
        // document.addEventListener('keydown', detectKeyDown, true)
        // console.log(">>>warningSound>>>>", warningSound)
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


    const onDashboardHandeler = () => {
        setOtherOptionModalVisible(false)
        setDashboardModalVisible(true)
        /* Popup.show({
            type: 'confirm',
            title: 'Are you sure',
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
        }) */
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
                'componentHeight': 350,
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
                'componentHeight': 350,
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
    }

    const submitDemoExamHandeler = () => {
        // console.log("submitDemoExamHandeler====")
        Popup.show({
            type: 'confirm',
            title: 'Are you sure',
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
        // if (examdata != "" && user_id == 0 && demoExamSubmit == 0 || demoExamSubmit == undefined) {
        if (user_id == 0 && demoExamSubmit == 0 || demoExamSubmit == undefined) {
            dispatch(submitScholasticExam(examdata, newStudentid, exam_category_id, props));
        } else {
            // console.log("@2")
            dispatch(submitScholasticExam(examdata, user_id, exam_category_id, props));
        }
    }

    const submitFinalAnswer = () => {
        setIsPlaying(false)
        dispatch(timeUpAction(0))
        if (user_id == 0) {
            setIsPlaying(false)
            // setRegistrationModal(true);
            props.navigation.navigate('nonAuthScenes', {
                screen: "DemoRegistration",
            })
        } else {
            // console.log( "demoExamSubmit=====", demoExamSubmit )
            if (demoExamSubmit == 1) {
                submitDemoExam();
            }
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
        setShowExam(true)
        Orientation.lockToLandscape();
        checkLocked();
        // console.log("@@@@@======", currentQuestion[0])
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

                                <View style={Gstyles.examInfoInsideContainer}>
                                    <MaterialIcons name="monitor" size={20} color="#fff" />
                                    <View style={Gstyles.examInfoTextContainer}><Text style={Gstyles.examRemainingTextWhite} >{currentQuestionNumber + 1}/{currentQuestion.length}</Text></View>
                                </View>

                                <View>
                                    <Text style={Gstyles.examHeading}>{props.route.params.id == 1 ? "Scholastic" : "Competitive"} <Ionicons name="chevron-forward" size={16} color={colors.backgroundWhite} /> {isDemo == 0 ? `Guest` : `Registered`} Demo Exam</Text>
                                </View>

                                <View>
                                    <View style={Gstyles.examInfoInsideContainer}>

                                        {!!currentQuestion.length ?
                                            <>
                                                <MaterialCommunityIcons name="clock-minus-outline" size={18} color="#fff" />
                                                <View style={{ overflow: 'hidden' }}>
                                                    <ExamCounterClockComponent examTime={examTime} isPlaying={isPlaying} />
                                                    {/* <ExamCounterClockComponent examTime={60} isPlaying={isPlaying} /> */}
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
                                {/* <View style={Gstyles.examOptionContainer}>
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
                                </View> */}
                            </View>
                            {/* <View style={Gstyles.examInfoContainer}> */}
                            {/* <View style={Gstyles.examInfoInsideContainer}>
                                    <MaterialIcons name="monitor" size={25} color="#90B817" />
                                    <View style={Gstyles.examInfoTextContainer}><Text style={Gstyles.examInfoText} >{currentQuestionNumber + 1}/{currentQuestion.length}</Text></View>
                                </View> */}
                            {/* <View>
                                {props.route.params.examDemo && props.route.params.examDemo == 1 ?
                                    <View style={Gstyles.examInfoInsideContainer}>
                                        <View style={Gstyles.examInfoTextContainer}><Text style={Gstyles.examInfoText} >Attempts :</Text></View>
                                        <View style={Gstyles.examInfoTextContainer}><Text style={Gstyles.examInfoText} >1/3</Text></View>
                                    </View>
                                    : null}
                            </View> */}
                            {/* <View>
                                    <View style={Gstyles.examInfoInsideContainer}>
                                        {!!currentQuestion.length ?
                                            <>
                                                <MaterialCommunityIcons name="clock-minus-outline" size={25} color="#90B817" />
                                                <ExamCounterClockComponent examTime={examTime} isPlaying={isPlaying} />
                                            </>
                                            :
                                            <>
                                                <MaterialCommunityIcons name="clock-minus-outline" size={25} color="#90B817" />
                                                <View style={Gstyles.examInfoTextContainer} ><Text style={Gstyles.examInfoText} >00:00:00</Text></View>
                                            </>
                                        }
                                    </View>
                                </View> */}
                            {/* </View> */}



                            <View style={Gstyles.showQuestionContainer}>


                                <View style={Gstyles.currentQuestionContainer}>
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
                                {/* {currentQuestionNumber > 0 ?
                                    <TouchableOpacity style={Gstyles.previousQuestionContainer} onPress={prevousQuestion}>
                                        <Ionicons name="chevron-back" size={20} color="#245C75" />
                                    </TouchableOpacity>
                                    :
                                    <View style={Gstyles.previousQuestionContainerDisable} >
                                    
                                    </View>
                                } */}
                                {/* {(currentQuestionNumber + 1) < currentQuestion.length ?
                                    <TouchableOpacity style={Gstyles.nextQuestionContainer} onPress={nextQuestion}>
                                        <Ionicons name="chevron-forward" size={20} color="#245C75" />
                                    </TouchableOpacity>
                                    :
                                    <View style={Gstyles.nextQuestionContainerDisable} >
                                        
                                    </View>
                                } */}
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

export default ExamsDetails;
