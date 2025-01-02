import {
    GET_SC_SUBJECT_LIST,
    LOGOUT,
    GET_EXAM_TYPE_LIST,
    GET_PURCHASE_EXAM_TYPE_LIST,
    GET_NTSE_EXAM_TYPE,
    GET_EXAM_TYPE_LIBRARY
} from '../constants';

const initialState = {
    examTypeList: [],
    purchaseList: [],
    ntseType: [],
    getexamtypeLibrary:[],
};

export function ExamTypeReducer(state = initialState, action) {

    if (action.type === GET_EXAM_TYPE_LIST) {
        return {
            ...state,
            examTypeList: action.payload,
        };
    }

    if (action.type === GET_PURCHASE_EXAM_TYPE_LIST) {
        return {
            ...state,
            purchaseList: action.payload,
        };
    }

    if (action.type === GET_NTSE_EXAM_TYPE) {
        return {
            ...state,
            ntseType: action.payload,
        };
    }

    if (action.type === GET_EXAM_TYPE_LIBRARY) {
        return {
            ...state,
            getexamtypeLibrary: action.payload,
        };
    }


    if (action.type === LOGOUT) {
        return {
            ...state,
            examTypeList: [],
            purchaseList: [],
            ntseType: []
        };
    }

    return state;
}

