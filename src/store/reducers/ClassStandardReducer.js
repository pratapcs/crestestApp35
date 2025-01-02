import {
    GET_CLASS_STANDARD_LIST,
    CLASS_STANDARD_LOADING,
    LOGOUT,
    GET_CLASS_STANDARD_LIST_AFTER_LOGIN,
    GET_ARCHIVE_STANDARD_LIST,
} from '../constants';

const initialState = {
    classStandardList: [],
    showLoadingclassStandard: false,
    profileStandardList:[],
    profileArchiveList:[],
};

export function ClassStandardReducer(state = initialState, action) {
    if (action.type === GET_CLASS_STANDARD_LIST) {
        return {
            ...state,
            classStandardList: action.payload,
            showLoadingclassStandard: false,
        };
    }
    if (action.type === GET_CLASS_STANDARD_LIST_AFTER_LOGIN) {
        return {
            ...state,
            profileStandardList: action.payload,
            showLoadingclassStandard: false,
        };
    }

    if (action.type === CLASS_STANDARD_LOADING) {
        return {
            ...state,
            showLoadingclassStandard: action.payload,
        };
    }

    if (action.type === GET_ARCHIVE_STANDARD_LIST) {
        return {
            ...state,
            profileArchiveList: action.payload,
            showLoadingclassStandard: false,
        };
    }

    if (action.type === LOGOUT) {
        return {
            ...state,
            classStandardList: [],
            showLoadingclassStandard: false,
        };
    }
    return state;
}

