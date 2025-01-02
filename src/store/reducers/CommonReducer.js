import {
    GET_CLASS_STANDARD_LIST,
    GET_BOARD_LIST,
    SCHOOL_LIST_SUCCESS,
    IS_SCHOOL_LIST_SUCCESS,
    LOGOUT
} from '../constants';

const initialState = {
    classStandardList: [],
    boardList: [],
    schoolList: [],

};

export function CommonReducer(state = initialState, action) {

    if (action.type === GET_CLASS_STANDARD_LIST) {
        return {
            ...state,
            classStandardList: action.payload,
        };
    }

    if (action.type === GET_BOARD_LIST) {
        return {
            ...state,
            boardList: action.payload,
        };
    }

    if (action.type === SCHOOL_LIST_SUCCESS) {
        return {
            ...state,
            schoolList: action.payload,
        };
    }

    
    if (action.type === LOGOUT) {
        return {
            ...state,
            classStandardList: [],
            boardList: [],
            schoolList: [],
            isSchoolList: 0,

        }
    }

    return state;
}


