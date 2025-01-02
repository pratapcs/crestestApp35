import {
    QUESTION_NUMBER_SELECT,
    QUESTION_PREVIOUS,
    QUESTION_NEXT,
    SUBMIT_ANSWER,
    DEMO_EXAM_SUBMIT,
    PDF_GENERATE_SUCCESS,
    GET_ASSESSMENT_DETAILS_LIST_REQUEST,
    GET_ASSESSMENT_DETAILS_LIST_SUCCESS,
    GET_ASSESSMENT_DETAILS_LIST_FAILURE,
    DEMO_ASSESSMENT_LIST_SUCCESS,
    DEMO_ASSESSMENT_LIST_FAILURE,
    LOGOUT,
    ALERT_SOUND,
    TIME_UP,
    TIME_USED,
    TOTAL_ATTEMPTS,
    GET_EXAM_DETAILS_BY_EXAM_NO
} from '../constants';


const initialState = {
    currentQestionNo: 0,
    demoExamDoneOrNot: null,
    demoExamPdf: null,
    demoExamAessmentDetailsList: null,
    loading: null,
    demoExamAessmentCountList: [],
    warningSound: 0,
    timeUpWarning: 0,
    time_used: '',
    total_attempts: 0,
    total_attempts_count: 0,
};

export function DemoExamReducer(state = initialState, action) {

    if (action.type === QUESTION_NUMBER_SELECT) {
        return {
            ...state,
            currentQestionNo: action.payload,
        };
    }

    if (action.type === QUESTION_PREVIOUS) {
        return {
            ...state,
            currentQestionNo: action.payload,
        };
    };

    if (action.type === QUESTION_NEXT) {
        return {
            ...state,
            currentQestionNo: action.payload,
            loading: false,
        };
    }

    if (action.type === SUBMIT_ANSWER) {
        return {
            ...state,
            currentQestionNo: action.payload,
            // currentQestionNo: state.currentQestionNo + 1,
        };
    }

    if (action.type === DEMO_EXAM_SUBMIT) {
        return {
            ...state,
            demoExamDoneOrNot: action.payload,
        };
    }

    if (action.type === PDF_GENERATE_SUCCESS) {
        return {
            ...state,
            demoExamPdf: action.payload,
        };
    }

    if (action.type === GET_ASSESSMENT_DETAILS_LIST_REQUEST) {
        return {
            ...state,
            loading: action.payload,
        };
    }

    if (action.type === GET_ASSESSMENT_DETAILS_LIST_SUCCESS) {
        return {
            ...state,
            demoExamAessmentDetailsList: action.payload,
            loading: false,
        };
    }

    if (action.type === GET_ASSESSMENT_DETAILS_LIST_FAILURE) {
        return {
            ...state,
            demoExamAessmentDetailsList: null,
            loading: false,
        };
    }

    if (action.type === DEMO_ASSESSMENT_LIST_SUCCESS) {
        return {
            ...state,
            demoExamAessmentCountList: action.payload,
            loading: false,
        };
    }

    if (action.type === DEMO_ASSESSMENT_LIST_FAILURE) {
        return {
            ...state,
            demoExamAessmentCountList: [],
            loading: false,
        };
    }
    if (action.type === ALERT_SOUND) {
        return {
            ...state,
            warningSound: action.payload,
            loading: false,
        };
    }
    if (action.type === TIME_UP) {
        // console.log("TIME_UP-----", action.payload)
        return {
            ...state,
            timeUpWarning: action.payload,
            loading: false,
        };
    }

    if (action.type === TIME_USED) {
        return {
            ...state,
            time_used: action.payload,
            loading: false,
        };
    }
    if (action.type === TOTAL_ATTEMPTS) {
        return {
            ...state,
            total_attempts: action.payload,
            loading: false,
        };
    }
    if (action.type === GET_EXAM_DETAILS_BY_EXAM_NO) {
        // console.log("GET_EXAM_DETAILS_BY_EXAM_NO--Reducer----", action.payload)
        return {
            ...state,
            total_attempts_count: action.payload,
            loading: false,
        };
    }
    if (action.type === LOGOUT) {
        return {
            ...state,
            currentQestionNo: 0,
            demoExamDoneOrNot: null,
            demoExamPdf: null,
            demoExamAessmentDetailsList: null,
            loading: null,
            demoExamAessmentCountList: [],
            warningSound: 0,
            timeUpWarning: 0,
            time_used: '',
            total_attempts: 0
        };
    }

    return state;
}

