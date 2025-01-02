import {
    GET_SC_SUBJECT_LIST,
    LOGOUT,
    PURCHASED_SUBJECTS_LIST_REQUEST,
    PURCHASED_SUBJECTS_LIST_SUCCESS,
    PURCHASED_SUBJECTS_LIST_FAILURE,
    GET_PURCHASED_E_LIBRARY_SUBJECTS_LIST,
    GET_ALL_SUBJECT_LIST,
    GET_COMPETITIVE_SUBJECT_LIST,
    GET_PURCHASED_GROUP_LIST,
    GET_PURCHASED_SUBJECTS_LIST_SCHOLASTIC
} from '../constants';

const initialState = {
    scSubjectList: [],
    purchasedSubjectList: [],
    purchaseLibrarySubjectList: [],
    allSubject: [],
    competitiveSubject: [],
    loading: false,
    getpurchasedGrouplist: [],
    getpurchasedSubjectListAsPerGroupId:[]
};

export function SubjectReducer(state = initialState, action) {

    if (action.type === GET_SC_SUBJECT_LIST) {
        return {
            ...state,
            scSubjectList: action.payload,
        };
    }
    if (action.type === PURCHASED_SUBJECTS_LIST_REQUEST) {
        return {
            ...state,
            loading: true,
        };
    }
    if (action.type === GET_ALL_SUBJECT_LIST) {
        return {
            ...state,
            allSubject: action.payload,
            loading: false,
        };
    }
    if (action.type === PURCHASED_SUBJECTS_LIST_SUCCESS) {
        return {
            ...state,
            purchasedSubjectList: action.payload,
            loading: false,
        };
    }
    if (action.type === PURCHASED_SUBJECTS_LIST_FAILURE) {
        return {
            ...state,
            purchasedSubjectList: [],
            loading: false,
        };
    }

    if (action.type === GET_PURCHASED_E_LIBRARY_SUBJECTS_LIST) {
        return {
            ...state,
            purchaseLibrarySubjectList: action.payload,
            loading: false,
        };
    }

    if (action.type === GET_COMPETITIVE_SUBJECT_LIST) {
        return {
            ...state,
            competitiveSubject: action.payload,
            loading: false,
        };
    }

    if (action.type === GET_PURCHASED_GROUP_LIST) {
        return {
            ...state,
            getpurchasedGrouplist: action.payload,
            loading: false,
        };
    }

    if (action.type === GET_PURCHASED_SUBJECTS_LIST_SCHOLASTIC) {
        return {
            ...state,
            getpurchasedSubjectListAsPerGroupId: action.payload,
            loading: false,
        };
    }

    if (action.type === LOGOUT) {
        return {
            ...state,
            scSubjectList: [],
            purchasedSubjectList: [],
            purchaseLibrarySubjectList: [],
            allSubject: [],
            competitiveSubject: [],
            loading: false,
        };
    }

    return state;
}


