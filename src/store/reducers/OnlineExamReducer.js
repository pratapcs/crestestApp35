import {
    ONLINE_SCHOLASTIC_ASSESSMENT_LIST_SUCCESS,
    ONLINE_SCHOLASTIC_ASSESSMENT_LIST_FAILURE,
    ONLINE_SCHOLASTIC_ASSESSMENT_LIST_REQUEST,
    ONLINE_EXAM_ID,
    LOGOUT,
    ONLINE_QUESTIONS_LIST_REQUEST,
    MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS,
    MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE,
    MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS,
    MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE,
    ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_SUCCESS,
    ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_FAILURE,
    COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS,
    COMPETITIVE_SUBSCRIPTION_DETAILS_FAILURE,
    REMOVE_ONLINE_PREVIOUS_EXAM_ID,
    PREVIOUS_EXAM_TYPE,
    COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS_MAT,
    GET_FEEDBACK,
    STORE_FEEDBACK,
    GETSCHOLASTICEXAMSDETAILS_CASESTUDY,
    MODULE_EXAM_QUESTIONS_UPLOAD_COMPLETE,
    COMPETITIVE_EXAM_QUESTIONS_UPLOAD_COMPLETE
} from '../constants';


const initialState = {
    loading: false,
    onlineScholasticExamAessmentCountList: [],
    onlineScholasticExamAessmentDetailsList: [],
    examId: 0,
    onlineModuleMockQuestionList: [],
    onlineCompetitiveQuestionList: [],
    competitiveSubscriptionDetails: [],
    competitiveSubscriptionDetailsMat: [],
    previousExamType: null,
    feedbackDetails: [],
    casestudyList: [],
    moduleMockQuestionUploaded: 0,
    competitiveQuestionUploaded: 0,
};

export function OnlineExamReducer(state = initialState, action) {

    if (action.type === ONLINE_SCHOLASTIC_ASSESSMENT_LIST_SUCCESS) {
        return {
            ...state,
            onlineScholasticExamAessmentDetailsList: action.payload,
            loading: false,
        };
    }

    if (action.type === ONLINE_SCHOLASTIC_ASSESSMENT_LIST_FAILURE) {
        return {
            ...state,
            onlineScholasticExamAessmentDetailsList: [],
            loading: false,
        };
    }

    if (action.type === ONLINE_SCHOLASTIC_ASSESSMENT_LIST_REQUEST) {
        return {
            ...state,
            loading: true,
        };
    }

    if (action.type === ONLINE_QUESTIONS_LIST_REQUEST) {
        return {
            ...state,
            loading: true,
        };
    }

    if (action.type === ONLINE_EXAM_ID) {
        return {
            ...state,
            examId: action.payload,
            loading: false,
        };
    }

    if (action.type === REMOVE_ONLINE_PREVIOUS_EXAM_ID) {
        return {
            ...state,
            examId: 0,
            loading: false,
        };
    }

    if (action.type === MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS) {
        return {
            ...state,
            onlineModuleMockQuestionList: action.payload,
            moduleMockQuestionUploaded: 1,
            loading: false,
        };
    }

    if (action.type === MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE) {
        return {
            ...state,
            onlineModuleMockQuestionList: [],
            loading: false,
        };
    }

    if (action.type === MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_SUCCESS) {
        return {
            ...state,
            onlineModuleMockQuestionList: action.payload,
            moduleMockQuestionUploaded: 1,
            loading: false,
        };
    }

    if (action.type === MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_FAILURE) {
        return {
            ...state,
            onlineModuleMockQuestionList: [],
            loading: false,
        };
    }

    if (action.type === ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_SUCCESS) {
        return {
            ...state,
            onlineCompetitiveQuestionList: action.payload,
            competitiveQuestionUploaded: 1,
            loading: false,
        };
    }

    if (action.type === ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_FAILURE) {
        return {
            ...state,
            onlineCompetitiveQuestionList: [],
            loading: false,
        };
    }

    if (action.type === COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS) {
        return {
            ...state,
            competitiveSubscriptionDetails: [],
            competitiveSubscriptionDetails: action.payload,
            loading: false,
        };
    }

    if (action.type === COMPETITIVE_SUBSCRIPTION_DETAILS_FAILURE) {
        return {
            ...state,
            competitiveSubscriptionDetails: [],
            loading: false,
        };
    }

    if (action.type === PREVIOUS_EXAM_TYPE) {
        return {
            ...state,
            previousExamType: action.payload,
            loading: false,
        };
    }

    if (action.type === COMPETITIVE_SUBSCRIPTION_DETAILS_SUCCESS_MAT) {
        return {
            ...state,
            competitiveSubscriptionDetailsMat: action.payload,
            loading: false,
        };
    }

    if (action.type === GET_FEEDBACK) {
        return {
            ...state,
            feedbackDetails: action.payload,
            loading: false,
        };
    }

    if (action.type === GETSCHOLASTICEXAMSDETAILS_CASESTUDY) {
        return {
            ...state,
            casestudyList: action.payload,
            loading: false,
        };
    }

    if (action.type === MODULE_EXAM_QUESTIONS_UPLOAD_COMPLETE) {
        return {
            ...state,
            moduleMockQuestionUploaded: 0,
            loading: false,
        };
    }

    if (action.type === COMPETITIVE_EXAM_QUESTIONS_UPLOAD_COMPLETE) {
        return {
            ...state,
            competitiveQuestionUploaded: 0,
            loading: false,
        };
    }


    if (action.type === LOGOUT) {
        return {
            ...state,
            loading: false,
            onlineScholasticExamAessmentCountList: [],
            onlineScholasticExamAessmentDetailsList: [],
            examId: 0,
            onlineModuleMockQuestionList: [],
            onlineCompetitiveQuestionList: [],
            competitiveSubscriptionDetails: [],
            previousExamType: null,

        };
    }

    return state;
}

