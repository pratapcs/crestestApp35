import {
    GET_BRANCH_SCHOLASTIC_LIST,
    BRANCH_SCHOLASTIC_LOADING,
    GET_SCHOLASTIC_QUESTION_LIST,
    LOGOUT,
    BRANCH_LIST_AGAINST_SUBJECT_ID_REQUEST,
    BRANCH_LIST_AGAINST_SUBJECT_ID_SUCCESS,
    BRANCH_LIST_AGAINST_SUBJECT_ID_FAILURE,
    SCHOLASTIC_QUESTIONS_LIST_REQUEST,
    SCHOLASTIC_QUESTIONS_LIST_SUCCESS,
    SCHOLASTIC_QUESTIONS_LIST_FAILURE,
    QUESTION_UPLOAD_COMPLETED
} from '../constants';

const initialState = {
    branchScholasticList: [],
    scholasticQuestionList: [],
    showLoadingBranchScholastic: false,
    branchScholasticListAgainstSubjectId: [],
    scholasticQuestionListForSubscriber: [],
    branchCompetitiveList: [],
    scholasticQuestionUploaded:0,
};

export function BranchScholasticReducer(state = initialState, action) {
    if (action.type === GET_BRANCH_SCHOLASTIC_LIST) {
        return {
            ...state,
            branchScholasticList: action.payload,
            showLoadingBranchScholastic: false,
        };
    }
    if (action.type === GET_SCHOLASTIC_QUESTION_LIST) {
        return {
            ...state,
            scholasticQuestionList: action.payload,
            scholasticQuestionUploaded:1,
            showLoadingBranchScholastic: false,
        };
    }

    if (action.type === BRANCH_SCHOLASTIC_LOADING) {
        return {
            ...state,
            showLoadingBranchScholastic: action.payload,
        };
    }

    if (action.type === BRANCH_LIST_AGAINST_SUBJECT_ID_REQUEST) {
        return {
            ...state,
            showLoadingBranchScholastic: true,
        };
    }

    if (action.type === BRANCH_LIST_AGAINST_SUBJECT_ID_SUCCESS) {
        return {
            ...state,
            branchScholasticListAgainstSubjectId: action.payload,
            showLoadingBranchScholastic: false,
        };
    }

    if (action.type === BRANCH_LIST_AGAINST_SUBJECT_ID_FAILURE) {
        return {
            ...state,
            branchScholasticListAgainstSubjectId: [],
            showLoadingBranchScholastic: false,
        };
    }

    if (action.type === SCHOLASTIC_QUESTIONS_LIST_REQUEST) {
        return {
            ...state,
            showLoadingBranchScholastic: true,
        };
    }

    if (action.type === SCHOLASTIC_QUESTIONS_LIST_SUCCESS) {
        // console.log("SCHOLASTIC_QUESTIONS_LIST_SUCCESS=====", JSON.stringify(action.payload))
        return {
            ...state,
            scholasticQuestionListForSubscriber: action.payload,
            scholasticQuestionUploaded:1,
            showLoadingBranchScholastic: false,
        };
    }

    if (action.type === SCHOLASTIC_QUESTIONS_LIST_FAILURE) {
        console.log("SCHOLASTIC_QUESTIONS_LIST_FAILURE=====")
        return {
            ...state,
            scholasticQuestionListForSubscriber: [],
            showLoadingBranchScholastic: false,
        };
    }

    if (action.type === QUESTION_UPLOAD_COMPLETED) {
        return {
            ...state,
            scholasticQuestionUploaded:0,
            showLoadingBranchScholastic: false,
        };
    }

    if (action.type === LOGOUT) {
        return {
            ...state,
            branchScholasticList: [],
            scholasticQuestionList: [],
            showLoadingBranchScholastic: false,
            branchScholasticListAgainstSubjectId: [],
            scholasticQuestionListForSubscriber: [],
            branchCompetitiveList: [],
        };
    }

    return state;
}

