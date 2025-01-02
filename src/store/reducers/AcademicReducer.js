import {
    ACADEMIC_LOADING,
    GET_ACADEMIC_YEAR_BY_BOARD_ID_LIST,
    GET_ACADEMIC_SESSION_EXIT_FOR_EXAM
} from '../constants';

const initialState = {
    academicMasterList: [],
    academicSessionDetals:{},
    showLoading: false,
};

export function AcademicReducer(state = initialState, action) {

    if (action.type === GET_ACADEMIC_YEAR_BY_BOARD_ID_LIST) {
        return {
            ...state,
            academicMasterList: action.payload,
            showLoading: false,
        };
    }

    if (action.type === GET_ACADEMIC_SESSION_EXIT_FOR_EXAM) {
        return {
            ...state,
            academicSessionDetals: action.payload,
        };
    }

    if (action.type === ACADEMIC_LOADING) {
        return {
            ...state,
            showLoading: action.payload,
        };
    }

    return state;
}


