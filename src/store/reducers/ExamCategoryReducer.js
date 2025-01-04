import {
    GET_EXAM_CATEGORIES_LIST,
    EXAM_CATEGORIES_LIST_SUCCESS,
    EXAM_CATEGORIES_LIST_FAILURE,
    CHOOSE_EXAM_CATEGORY,
    SUBMIT_ANSWER,
    PDF_GENERATE_SUCCESS,
    LOGOUT,
    CHOOSE_EXAM_CATEGORY_REQUEST,
    GET_PURCHAGED_GROUP_LIST,
    GET_EXAM_CATEGORIES_LIBRARY
} from '../constants';


const initialState = {
    examcategoryList: [],
    examPurchasedGroupList: [],
    status: null,
    selectCategory: null,
    examCategoryloading: false,
    librarycategoryList: [],
};

export function ExamCategoryReducer(state = initialState, action) {

    if (action.type === GET_EXAM_CATEGORIES_LIST) {
        return {
            ...state,
            examcategoryList: action.payload,
        };
    }

    if(action.type === GET_PURCHAGED_GROUP_LIST){
        return {
            ...state,
            examPurchasedGroupList: action.payload,
        };
    }

    if (action.type === EXAM_CATEGORIES_LIST_SUCCESS) {
        return {
            ...state,
            status: action.payload,
        };
    };

    if (action.type === EXAM_CATEGORIES_LIST_FAILURE) {
        return {
            ...state,
            status: action.payload,
        };
    }
    if (action.type === SUBMIT_ANSWER) {
        return {
            ...state,
            currentQestionNo: action.payload,
        };
    }

    if (action.type === PDF_GENERATE_SUCCESS) {
        return {
            ...state,
            demoExamPdf: action.payload,
        };
    }

    if (action.type === CHOOSE_EXAM_CATEGORY) {
        return {
            ...state,
            selectCategory: action.payload,
        };
    }

    if (action.type === CHOOSE_EXAM_CATEGORY_REQUEST) {
        return {
            ...state,
            examCategoryloading: action.payload,
        };
    }
    if (action.type === GET_EXAM_CATEGORIES_LIBRARY) {
        return {
            ...state,
            librarycategoryList: action.payload,
        };
    }

    if (action.type === LOGOUT) {
        return {
            ...state,
            examcategoryList: [],
            status: null,
            selectCategory: null,
            examCategoryloading: false,
        };
    }

    return state;
}

