
import {
    getBranchScholasticList,
    demoScholasticExamQuestions,
    demoExamSubmit,
    demoAssessmentList,
    getBranchListAgainstSubjectid,
    scholasticExamQuestionsListForSubscriber,
    scholasticExamSubmitforSubscriber,
    demoCompetitiveExamQuestions,
    demoAssessmentCountList,
    onlineScholasticAssessmentDetails,
    onlineCompetitiveAssessmentDetails,
    scholasticIntermExamSubmitforSubscriber
} from '../../services/ScholasticService';

import {
    GET_BRANCH_SCHOLASTIC_LIST,
    BRANCH_SCHOLASTIC_LOADING,
    GET_SCHOLASTIC_QUESTION_LIST,
    SUBMIT_ANSWER,
    DEMO_EXAM_SUBMIT,
    PDF_GENERATE_SUCCESS,
    GET_ASSESSMENT_DETAILS_LIST_REQUEST,
    GET_ASSESSMENT_DETAILS_LIST_SUCCESS,
    GET_ASSESSMENT_DETAILS_LIST_FAILURE,
    BRANCH_LIST_AGAINST_SUBJECT_ID_REQUEST,
    BRANCH_LIST_AGAINST_SUBJECT_ID_SUCCESS,
    BRANCH_LIST_AGAINST_SUBJECT_ID_FAILURE,
    SCHOLASTIC_QUESTIONS_LIST_REQUEST,
    SCHOLASTIC_QUESTIONS_LIST_SUCCESS,
    SCHOLASTIC_QUESTIONS_LIST_FAILURE,
    SCHOLOASTIC_EXAM_SUBMIT_SUCCESS,
    GET_COMPETITIVE_QUESTION_LIST,
    DEMO_ASSESSMENT_LIST_SUCCESS,
    DEMO_ASSESSMENT_LIST_FAILURE,
    ONLINE_SCHOLASTIC_ASSESSMENT_LIST_SUCCESS,
    ONLINE_SCHOLASTIC_ASSESSMENT_LIST_FAILURE,
    ONLINE_SCHOLASTIC_ASSESSMENT_LIST_REQUEST,
    ONLINE_EXAM_ID,
    REMOVE_ONLINE_PREVIOUS_EXAM_ID,
    USERID_DEMO_TO_REGISTER,
    TOTAL_ATTEMPTS,
    QUESTION_UPLOAD_COMPLETED
} from '../constants';

import {
    logout,
} from '../actions/AuthActions';
import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData, getData, clearAllData } from "../../utils/Util";


// import * as utility from '../../utility/Utility';

export function getBranchScholasticData(id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getBranchScholasticList(id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getBranchScholasticListAction(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getScholasticExamQuestionsData(navigation) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        demoScholasticExamQuestions()
            .then((response) => {
                // console.log("getScholasticExamQuestionsData---->", response.data )
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getScholasticQuestionListAction(response.data.data));
                        Emitter.emit(Events.HIDE_PRELOADER);
                    } else {
                        navigation.replace('drawerScenes', {
                            screen: 'dashboard',
                            params: { data: 0 },
                        })
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: "Sorry! No Question Details Available" });
                        Emitter.emit(Events.HIDE_PRELOADER);
                        // utility.showError("Sorry! No Question Details Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));;
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function submitScholasticExam(data, id, exam_category_id, props) {

    // let getData = localStorage.getItem('userDetails');
    // let getData = localStorage.getItem('userDetails');
    // let registerUserId = JSON.parse(getData).id;
    // console.log("submitScholasticExam------", data, id, exam_category_id, )

    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        demoExamSubmit(data, id, exam_category_id)
            .then(async (response) => {
                let getData = await AsyncStorage.getItem('crestestUserDetails');
                let registerUserId = JSON.parse(getData).id;
                if (response.data.status == 200) {
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    dispatch(demoExamSubmitAction(1));
                    props.navigation.navigate('nonAuthScenes', {
                        screen: "DemoAssessment",
                        params: { exam_category_id, student_id: registerUserId == 0 ? id : registerUserId, student_status: registerUserId == 0 ? 0 : 1, page:44 }
                    })
                    // props.push({ pathname: './demo-assessment-details', state: { exam_category_id, student_id: registerUserId == 0 ? id : registerUserId, student_status: registerUserId == 0 ? 0 : 1 } });

                    let userDetails = await AsyncStorage.getItem('crestestUserDetails');
                    let olduserDetailsData = JSON.parse(userDetails);
                    // console.log("===olduserDetailsData===", olduserDetailsData)
                    olduserDetailsData.id = id;
                    storeData("crestestUserDetails", JSON.stringify(olduserDetailsData));

                    dispatch(userIdUpdatedFromDemoToReg(id))

                    // let olduserDetailsData = JSON.parse(localStorage.userDetails);
                    // olduserDetailsData.id = id;
                    // localStorage.setItem('userDetails', JSON.stringify(olduserDetailsData));
                    // dispatch(userIdUpdatedFromDemoToReg(id))
                    // 
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 300) {
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else {
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    // utility.showError(response.data.msg);
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function getDemoAssessmentList(exam_category_id, student_status, student_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        demoAssessmentList(exam_category_id, student_status, student_id)
            .then(async (response) => {
                // const collectData = JSON.stringify(response.data.data);
                // console.log("collectData====", response.request._response)
                // console.log("collectData====", collectData)

                if (response.data.status == 200) {
                    dispatch(demoAssessmentDetailsListSuccess(response.data.data));
                    // dispatch(demoAssessmentDetailsListSuccess(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else {
                    dispatch(demoAssessmentDetailsListFaliure(response.data.data));
                    props.navigation.navigate('drawerScenes', {
                        screen: "Dashboard",
                    })
                    // props.push('/dashboard');
                    Emitter.emit(Events.HIDE_PRELOADER);
                    // utility.showError(response.data.msg);
                }
                if (response.data.status == 400) {
                    dispatch(logout());
                    Emitter.emit(Events.HIDE_PRELOADER);
                    // utility.showError(response.data.msg);
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function branchListAgainstSubjectid(id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getBranchListAgainstSubjectid(id, props)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(branchListAgainstSubjectIdSuccessAction(response.data.data));
                    // utility.showSuccess(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else {
                    dispatch(branchListAgainstSubjectIdFailureAction(response.data.data));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function getScholasticExamQuestionsDataForSubscriber(branch, chapter, subject_id, set_no, chapter_no, group_subject_id, props) {
    
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        scholasticExamQuestionsListForSubscriber(branch, chapter, subject_id, set_no, chapter_no, group_subject_id)
            .then((response) => {
                // console.log(">>>>>>>>>>---response---", )
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholoasticQuestionListForSubscriberSuccessAction(response.data.data));
                        dispatch(totalAttemptsAction(response.data.data[0].total_attempts));
                        Emitter.emit(Events.HIDE_PRELOADER);
                    } else {
                        dispatch(scholoasticQuestionListForSubscriberFailureAction(response.data.data));
                        props.navigation.replace('drawerScenes', {
                            screen: 'Dashboard',
                            params: { data: 0 },
                        })
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: "Sorry! No Question Details Available" });
                        // utility.showError("Sorry! No Question Details Available");
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getScholasticExamAnswerSubmitForSubscriber(exam_type, branch, chapter, set_no, examdata, subject_id, chapter_no, group_subject_id, page, exam_category_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        scholasticExamSubmitforSubscriber(exam_type, branch, chapter, set_no, examdata, subject_id, chapter_no, group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    // console.log("getScholasticExamAnswerSubmitForSubscriber----", response.data)
                    dispatch(RemovePrevouseExamIdAction(0))
                    dispatch(onlineExamIdAction(response.data.exam_id))
                    /* const examDetails = {
                        examId: response.data.exam_id,
                        exam: 1,
                        fromExam: 1
                    }
                    // localStorage.setItem('refreshExamId', JSON.stringify(response.data.exam_id));
                    localStorage.setItem('refreshExamId', JSON.stringify(examDetails)); */
                    // props.push({ pathname: '/online-assessment-details', state: { exam: 1, fromExam: 1 } });
                    props.navigation.navigate('nonAuthScenes', {
                        screen: "DemoAssessment",
                        params: { page: page, category_id: exam_category_id, exam_unique_id: response.data.exam_id }
                    })
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    // utility.showSuccess(response.data.msg);
                    // dispatch(onlineExamIdAction(response.data.exam_id))
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);]
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getScholasticExamAnswerSubmitForSubscriberTimeupSubmit(exam_type, branch, chapter, set_no, examdata, subject_id, chapter_no, group_subject_id, page, exam_category_id, props) {
    // { console.log("Call-----getScholasticExamAnswerSubmitForSubscriberTimeupSubmit") }
    return async (dispatch) => {
        scholasticExamSubmitforSubscriber(exam_type, branch, chapter, set_no, examdata, subject_id, chapter_no, group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(RemovePrevouseExamIdAction(0))
                    dispatch(onlineExamIdAction(response.data.exam_id))
                    /* const examDetails = {
                        examId: response.data.exam_id,
                        exam: 1,
                        fromExam: 1
                    }
                    // localStorage.setItem('refreshExamId', JSON.stringify(response.data.exam_id));
                    localStorage.setItem('refreshExamId', JSON.stringify(examDetails)); */

                    // history.push({ pathname: '/online-assessment-details', state: { exam: 1, fromExam: 1 } });
                    // utility.showSuccess(response.data.msg);
                    // dispatch(onlineExamIdAction(response.data.exam_id))
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getscholasticIntermExamSubmitforSubscriber(exam_type, branch, chapter, set_no, examdata, subject_id, exam_category, time_used, questionNo, group_subject_id, props) {
    // console.log("=====123=====", exam_type, branch, chapter, set_no, subject_id, exam_category, time_used, questionNo, group_subject_id,)
    // Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        scholasticIntermExamSubmitforSubscriber(exam_type, branch, chapter, set_no, examdata, subject_id, exam_category, time_used, questionNo, group_subject_id, props)
            .then((response) => {
                // console.log("response-----1234", response.data )
                if (response.data.status == 200) {
                    // dispatch(RemovePrevouseExamIdAction(0))
                    // dispatch(onlineExamIdAction(response.data.exam_id))
                    // props.push({pathname:'/online-assessment-details', state:{exam:1, fromExam:1}});
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                // console.log("****", error);
                // utility.showError(error.response.data);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: error.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getCompetitiveExamQuestionsData(navigation) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        demoCompetitiveExamQuestions()
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getScholasticQuestionListAction(response.data.data));
                        Emitter.emit(Events.HIDE_PRELOADER);
                    } else {
                        navigation.replace('drawerScenes', {
                            screen: 'dashboard',
                            params: { data: 0 },
                        })
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: "Sorry! No Question Details Available" });
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {

                }

            })
            .catch((error) => {
                // console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getDemoAssessmentListsData(newStudentid, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        demoAssessmentCountList(newStudentid)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.demoquestionscount != "") {
                        dispatch(demoAssessmentListSuccessAction(response.data.demoquestionscount));
                        Emitter.emit(Events.HIDE_PRELOADER);
                    } else {
                        dispatch(demoAssessmentListFailureAction(response.data.demoquestionscount));
                        Emitter.emit(Events.HIDE_PRELOADER);
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                        // utility.showError(response.data.msg);
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {

                }
            })
            .catch((error) => {
                //console.log(error);
                utility.showError(error.response.data);
            });
    };
}

export function getOnlineScholasticAssessmentDetailsExamIDWise(examid, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        onlineScholasticAssessmentDetails(examid)
            .then((response) => {
                // console.log("getOnlineScholasticAssessmentDetailsExamIDWise----", examid)
                if (response.data.status == 200) {
                    dispatch(onlineScholasticAssessmentListSuccessAction(response.data.data));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    // utility.showSuccess(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else {
                    dispatch(demoAssessmentDetailsListFaliure(response.data.data));
                    props.navigation.replace('drawerScenes', {
                        screen: 'dashboard',
                        params: { data: 0 },
                    })
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                // console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getOnlineCompetitiveAssessmentDetailsExamIDWise(examid, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        onlineCompetitiveAssessmentDetails(examid)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(onlineScholasticAssessmentListSuccessAction(response.data.data));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    // utility.showSuccess(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else {
                    dispatch(demoAssessmentDetailsListFaliure(response.data.data));
                    props.push('/dashboard');
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getBranchScholasticListAction(data) {
    return {
        type: GET_BRANCH_SCHOLASTIC_LIST,
        payload: data,
    };
}

export function getScholasticQuestionListAction(data) {
    return {
        type: GET_SCHOLASTIC_QUESTION_LIST,
        payload: data,
    };
}

export function getQuestionUploadCompletetAction(data) {
    return {
        type: QUESTION_UPLOAD_COMPLETED,
        payload: data,
    };
}

export function submitDemoExamAction(data) {
    return {
        type: SUBMIT_ANSWER,
        payload: data,
    };
}

export function loadingBranchScholasticAction(status) {
    return {
        type: BRANCH_SCHOLASTIC_LOADING,
        payload: status,
    };
}

export function demoExamSubmitAction(status) {
    return {
        type: DEMO_EXAM_SUBMIT,
        payload: status,
    };
}

export function pdfGenerateSuccessAction(status) {
    return {
        type: PDF_GENERATE_SUCCESS,
        payload: status,
    };
}

export function demoAssessmentDetailsListRequest(status) {
    return {
        type: GET_ASSESSMENT_DETAILS_LIST_REQUEST,
        payload: status,
    };
}

export function demoAssessmentDetailsListSuccess(status) {
    return {
        type: GET_ASSESSMENT_DETAILS_LIST_SUCCESS,
        payload: status,
    };
}

export function demoAssessmentDetailsListFaliure(status) {
    return {
        type: GET_ASSESSMENT_DETAILS_LIST_FAILURE,
        payload: status,
    };
}

export function branchListAgainstSubjectIdRequestAction(status) {
    return {
        type: BRANCH_LIST_AGAINST_SUBJECT_ID_REQUEST,
        payload: status,
    };
}

export function branchListAgainstSubjectIdSuccessAction(status) {
    return {
        type: BRANCH_LIST_AGAINST_SUBJECT_ID_SUCCESS,
        payload: status,
    };
}

export function branchListAgainstSubjectIdFailureAction(status) {
    return {
        type: BRANCH_LIST_AGAINST_SUBJECT_ID_FAILURE,
        payload: status,
    };
}

export function scholoasticQuestionListForSubscriberRequestAction(status) {
    return {
        type: SCHOLASTIC_QUESTIONS_LIST_REQUEST,
        payload: status,
    };
}

export function scholoasticQuestionListForSubscriberSuccessAction(status) {
    return {
        type: SCHOLASTIC_QUESTIONS_LIST_SUCCESS,
        payload: status,
    };
}

export function scholoasticQuestionListForSubscriberFailureAction(status) {
    return {
        type: SCHOLASTIC_QUESTIONS_LIST_FAILURE,
        payload: status,
    };
}

export function scholoasticExamSubmitForSubscriberSuccessAction(status) {
    return {
        type: SCHOLOASTIC_EXAM_SUBMIT_SUCCESS,
        payload: status,
    };
}

export function getCompetitiveQuestionListAction(data) {
    return {
        type: GET_COMPETITIVE_QUESTION_LIST,
        payload: data,
    };
}

export function demoAssessmentListSuccessAction(data) {
    return {
        type: DEMO_ASSESSMENT_LIST_SUCCESS,
        payload: data,
    };
}

export function demoAssessmentListFailureAction(data) {
    return {
        type: DEMO_ASSESSMENT_LIST_FAILURE,
        payload: data,
    };
}

export function onlineScholasticAssessmentListSuccessAction(data) {
    return {
        type: ONLINE_SCHOLASTIC_ASSESSMENT_LIST_SUCCESS,
        payload: data,
    };
}

export function onlineScholasticAssessmentListFailureAction(data) {
    return {
        type: ONLINE_SCHOLASTIC_ASSESSMENT_LIST_FAILURE,
        payload: data,
    };
}

export function onlineAssessmentListRequestAction(data) {
    return {
        type: ONLINE_SCHOLASTIC_ASSESSMENT_LIST_REQUEST,
        payload: data,
    };
}

export function onlineExamIdAction(data) {
    return {
        type: ONLINE_EXAM_ID,
        payload: data,
    };
}
export function RemovePrevouseExamIdAction(data) {
    return {
        type: REMOVE_ONLINE_PREVIOUS_EXAM_ID,
        payload: data,
    };
}

export function userIdUpdatedFromDemoToReg(data) {
    return {
        type: USERID_DEMO_TO_REGISTER,
        payload: data,
    };
}
export function totalAttemptsAction(data) {
    return {
        type: TOTAL_ATTEMPTS,
        payload: data,
    };
}