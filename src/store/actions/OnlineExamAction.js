import {
    getOnlineScholasticModuleQuestionList,
    getOnlineScholasticMockQuestionList,
    getOnlineCompetitiveQuestionList,
    getPurchasedCompetitiveDetails,
    competitiveExamSubmit,
    getFeedback,
    storeFeedback,
    getscholasticexamsdetailsCasestudy
} from '../../services/OnlineExamService';

import { onlineExamIdAction, RemovePrevouseExamIdAction, totalAttemptsAction } from './ScholasticAction';

import {
    ONLINE_QUESTIONS_LIST_REQUEST,
    MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS,
    MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE,
    MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS,
    MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE,
    ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_SUCCESS,
    ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_FAILURE,
    COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS,
    COMPETITIVE_SUBSCRIPTION_DETAILS_FAILURE,
    PREVIOUS_EXAM_TYPE,
    COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS_MAT,
    GET_FEEDBACK,
    STORE_FEEDBACK,
    GETSCHOLASTICEXAMSDETAILS_CASESTUDY,
    TOTAL_ATTEMPTS,
    MODULE_EXAM_QUESTIONS_UPLOAD_COMPLETE,
    COMPETITIVE_EXAM_QUESTIONS_UPLOAD_COMPLETE
} from '../constants';

import {
    logout,
} from '../actions/AuthActions';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

export function getOnlineScholasticModuleQuestionListData(chapter_id, subject_id, branchSortCode, module, group_subject_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getOnlineScholasticModuleQuestionList(chapter_id, subject_id, module, group_subject_id)
            .then((response) => {
                // console.log("=======123=====", response)
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getOnlineScholasticModuleListSuccessAction(response.data.data));
                        console.log("ModuleMock-----@1");
                        dispatch(ModuleMockTotalAttemptsAction(response.data.data[0].total_attempts));
                        Emitter.emit(Events.HIDE_PRELOADER);
                    } else {
                        props.navigation.replace('drawerScenes', {
                            screen: 'dashboard',
                            params: { data: 0 },
                        })
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: "Sorry! No Question Details Available" });
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {

                }

            })
            .catch((error) => {
                console.log(error);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: error.response.data }); 
            });
    };
}

export function getOnlineScholasticMockQuestionListData(chapter_id, subject_id, branchSortCode, mock, group_subject_id, props) { //module
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getOnlineScholasticMockQuestionList(chapter_id, subject_id, mock, group_subject_id)
            .then((response) => {
                // console.log("getOnlineScholasticMockQuestionListData-----", response.data.data)
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getOnlineScholasticMockListSuccessAction(response.data.data));
                        console.log("ModuleMock-----@2")
                        dispatch(ModuleMockTotalAttemptsAction(response.data.data[0].total_attempts));
                        /* history.push({ pathname: '/page-scholastic-exam-moudle-mock', state: { exam_type: 3, branchSortCode: branchSortCode, chapter: 'CH0', set_no: mock, subject_id: subject_id } }); */
                    } else {
                        props.navigation.replace('drawerScenes', {
                            screen: 'dashboard',
                            params: { data: 0 },
                        })
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: "Sorry! No Question Details Available" });
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

//competitive Exam data
export function getOnlineCompetitiveQuestionListData(exam_type, subscription_id, set_no, subtype, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getOnlineCompetitiveQuestionList(exam_type, subtype, set_no)
            .then((response) => {
                // console.log("%%%%%%%%%---", response.data.questions)
                if (response.data.status == 200) {
                    if (response.data.questions != "") {
                        dispatch(getOnlineCompetitiveSuccessAction(response.data.questions));
                        
                        dispatch(ModuleMockTotalAttemptsAction(response.data.questions[0].total_attempts));
                        // history.push({ pathname: '/page-competitive-exam', state: { exam_type: exam_type, subscription_id: subscription_id, set_no: set_no, subtype: subtype } });
                        Emitter.emit(Events.HIDE_PRELOADER);
                    } else {
                        dispatch(getOnlineCompetitiveFailureAction(response.data.questions));
                        props.navigation.replace('drawerScenes', {
                            screen: 'dashboard',
                            params: { data: 0 },
                        })
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: "Sorry! No Question Details Available" });
                        // utility.showError("Sorry! No Question Details Available");
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
                //console.log(error);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getOnlineCompetitiveSubscriptionDetailsData(subtype, exam_type, props) { //subtype, exam_type, props
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getPurchasedCompetitiveDetails(subtype, exam_type)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.competive != "") {
                        dispatch(getCompetitiveSubscriptionDetailsSuccessAction([]));
                        dispatch(getCompetitiveSubscriptionDetailsFailureAction([]));
                        dispatch(getCompetitiveSubscriptionDetailsSuccessAction(response.data.competive));
                        Emitter.emit(Events.HIDE_PRELOADER);
                    } else {
                        // props.push("/oe-competitive-type-library")
                        props.push("/competitive-exams")
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: "Sorry! No Subscription details Added" });
                        // utility.showError("Sorry! No Subscription details Added");
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {
                    //
                }

            })
            .catch((error) => {
                //console.log(error);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getOnlineCompetitiveSubscriptionDetailsMatData(subtype, exam_type, history) { //subtype, exam_type, history
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getPurchasedCompetitiveDetails(subtype, exam_type)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.competive != "") {
                        dispatch(getCompetitiveSubscriptionDetailsMatSuccessAction([]));
                        dispatch(getCompetitiveSubscriptionDetailsMatSuccessAction(response.data.competive));
                        Emitter.emit(Events.HIDE_PRELOADER);
                    } else {
                        // history.push("/oe-competitive-type-library")
                        // history.push("/competitive-exams")
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: "Sorry! No Subscription details Added" });
                        // utility.showError("Sorry! No Subscription details Added");
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {
                    //
                }

            })
            .catch((error) => {
                //console.log(error);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function competitiveExamAnswerSubmitForSubscriber(exam_type, subscription_id, set_no, examdata, subtype, group_subject_id, page, exam_category_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        competitiveExamSubmit(exam_type, subscription_id, set_no, examdata, subtype, group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(RemovePrevouseExamIdAction(0))

                    // localStorage.setItem('refreshExamId', JSON.stringify(response.data.exam_id));
                    /* const examDetails = {
                        examId: response.data.exam_id,
                        exam: 2,
                        fromExam: 1
                    }
                    localStorage.setItem('refreshExamId', JSON.stringify(examDetails)); */

                    dispatch(onlineExamIdAction(response.data.exam_id))
                    
                    dispatch(totalAttemptsAction(0));
                    
                    dispatch(ModuleMockTotalAttemptsAction(0));
                    
                    // history.push({ pathname: '/online-assessment-details', state: { exam: 2, fromExam: 1 } });
                    props.navigation.navigate('nonAuthScenes', {
                        screen: "DemoAssessment",
                        params: { page: page, category_id: exam_category_id, exam_unique_id: response.data.exam_id }
                    });
                    
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    // utility.showSuccess(response.data.msg);
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
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function competitiveExamAnswerSubmitForSubscriberTimeup(exam_type, subscription_id, set_no, examdata, subtype, group_subject_id,) {
    // console.log("@111---", exam_type, subscription_id, set_no, examdata, subtype, group_subject_id,)
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        competitiveExamSubmit(exam_type, subscription_id, set_no, examdata, subtype, group_subject_id,)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(RemovePrevouseExamIdAction(0))

                    // localStorage.setItem('refreshExamId', JSON.stringify(response.data.exam_id));
                   /*  const examDetails = {
                        examId: response.data.exam_id,
                        exam: 2,
                        fromExam: 1
                    }
                    localStorage.setItem('refreshExamId', JSON.stringify(examDetails)); */

                    dispatch(onlineExamIdAction(response.data.exam_id))
                    // history.push({ pathname: '/online-assessment-details', state: { exam: 2, fromExam: 1 } });
                    // utility.showSuccess(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(history));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}


export function getFeedbackDetails(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getFeedback()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getFeedbackAction(response.data.data));
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
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function storeFeedbackDetails(feedback, exam_unique_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        storeFeedback(feedback, exam_unique_id)
            .then((response) => {
                if (response.data.status == 200) {
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    // dispatch(getFeedbackAction(response.data.data));
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
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getscholasticexamsdetailsCasestudytData(subject_id, branchSortCode, caseStudy_data, group_subject_id, history) {
    return async (dispatch) => {
        getscholasticexamsdetailsCasestudy(subject_id, group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {

                    if (response.data.data != "") {
                        //dispatch(getscholasticexamsdetailsCasestudyAction(response.data.data));
                        //history.push({ pathname: '/page-scholastic-exam-moudle-mock', state: { exam_type: 3, branchSortCode: branchSortCode, chapter: 'CH0', set_no: module, subject_id: subject_id } });
                        dispatch(getOnlineScholasticModuleListSuccessAction(response.data.data));
                        history.push({ pathname: '/page-scholastic-exam-moudle-mock', state: { exam_type: 4, branchSortCode: branchSortCode, chapter: 'CH0', caseStudy_no: caseStudy_data, subject_id: subject_id } });
                    } else {
                        history.push('/dashboard');
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: "Sorry! No Question Details Available" });
                        // utility.showError("Sorry! No Question Details Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
            });
    };
}

export function getOnlineScholasticModuleListSuccessAction(data) {
    return {
        type: MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS,
        payload: data,
    };
}

export function getOnlineScholasticModuleListFailureAction(data) {
    return {
        type: MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE,
        payload: data,
    };
}

export function getOnlineScholasticMockListSuccessAction(data) {
    return {
        type: MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS,
        payload: data,
    };
}

export function getOnlineScholasticMockListFailureAction(data) {
    return {
        type: MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE,
        payload: data,
    };
}

export function onlineRequestAction(data) {
    return {
        type: ONLINE_QUESTIONS_LIST_REQUEST,
        payload: data,
    };
}

export function getOnlineCompetitiveSuccessAction(data) {
    return {
        type: ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_SUCCESS,
        payload: data,
    };
}

export function getOnlineCompetitiveFailureAction(data) {
    return {
        type: ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_FAILURE,
        payload: data,
    };
}

export function getCompetitiveSubscriptionDetailsSuccessAction(data) {
    return {
        type: COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS,
        payload: data,
    };
}

export function getCompetitiveSubscriptionDetailsMatSuccessAction(data) {
    return {
        type: COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS_MAT,
        payload: data,
    };
}

export function getCompetitiveSubscriptionDetailsFailureAction(data) {
    return {
        type: COMPETITIVE_SUBSCRIPTION_DETAILS_FAILURE,
        payload: data,
    };
}

export function previousExamTypeAction(data) {
    return {
        type: PREVIOUS_EXAM_TYPE,
        payload: data,
    };
}

export function getFeedbackAction(data) {
    return {
        type: GET_FEEDBACK,
        payload: data,
    };
}

export function getscholasticexamsdetailsCasestudyAction(data) {
    return {
        type: GETSCHOLASTICEXAMSDETAILS_CASESTUDY,
        payload: data,
    };
}

export function ModuleMockTotalAttemptsAction(data) {
    return {
        type: TOTAL_ATTEMPTS,
        payload: data,
    };
}

export function ModuleMockQuestionUploadAction(data) {
    return {
        type: MODULE_EXAM_QUESTIONS_UPLOAD_COMPLETE,
        payload: data,
    };
}
export function competitiveQuestionUploadAction(data) {
    return {
        type: COMPETITIVE_EXAM_QUESTIONS_UPLOAD_COMPLETE,
        payload: data,
    };
}

