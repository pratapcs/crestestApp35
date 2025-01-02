import {
    GET_BOARD_LIST,
    BOARD_LOADING,
    LOGOUT,
    SCHOOL_LIST_SUCCESS,
    SCHOOL_LIST_FAILURE,
    SELECT_SCHOOL_LIST,
    SCHOOL_NAME_SHOWING_LOADER,
} from '../constants';

const initialState = {
    boardList: [],
    showLoading: false,
    schoolList: [],
    isShowSchoolList: 0,
    schoolNameShowingLoader:false,
};

export function BoardReducer(state = initialState, action) {

    if (action.type === GET_BOARD_LIST) {
        return {
            ...state,
            boardList: action.payload,
            showLoading: false,
        };
    }

    if (action.type === BOARD_LOADING) {
        return {
            ...state,
            showLoading: action.payload,
        };
    }

    if (action.type === SCHOOL_LIST_SUCCESS) {
        return {
            ...state,
            schoolList: action.payload,
            isShowSchoolList: 1,
            showLoading: false
        };
    }

    if (action.type === SCHOOL_LIST_FAILURE) {
        return {
            ...state,
            schoolList: [],
            // isShowSchoolList: 1,
            showLoading: false
        };
    }

    if (action.type === SELECT_SCHOOL_LIST) {
        return {
            ...state,
            isShowSchoolList: action.payload,
            showLoading: false
        };
    }
    if (action.type === SCHOOL_NAME_SHOWING_LOADER) {
        return {
            ...state,
            schoolNameShowingLoader: action.payload,
        };
    }

    if (action.type === LOGOUT) {
        return {
            ...state,
            boardList: [],
            showLoading: false,
            schoolList: [],
            isShowSchoolList: 0
        };
    }

    return state;
}


