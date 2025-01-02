import {
    DEMO_STUDENT_REGISTER,
    DEMO_STUDENT_REGISTRATION_LOADER,
    VERIFICATION_OTP,
    RECORD_EXISTS_FAILURE,
    RECORD_EXISTS_SUCCESS,
    LOGOUT,
    GET_SEARCH_TEXT_DATA,
    GET_SEARCH_TEXT_FAILURE_DATA,
    CLICK_QUESTION_NO,
    VERIFICATION_MODAL,
    GET_PROFILES_DETAILS
} from '../constants';

const initialState = {
    email_otp: '',
    mobile_otp: '',
    otpValidTime: '',
    registrationStatus: '',
    newStudentid: null,
    showLoading: false,
    status: null,
    error: '',
    searchText: [],
    searchTextCallOrNot: 0,
    clickQuestion: 0,
    showVerificationModal: 1,
    details:{},
};

export function StudentReducer(state = initialState, action) {

    if (action.type === DEMO_STUDENT_REGISTER) {
        return {
            ...state,
            newStudentid: action.payload,
            showLoading: false,
        };
    }

    if (action.type === VERIFICATION_OTP) {
        return {
            ...state,
            email_otp: action.payload.email_otp,
            mobile_otp: action.payload.mobile_otp,
            otpValidTime: action.payload.otp_valid_time,
            showLoading: false,
        };
    }

    if (action.type === VERIFICATION_MODAL) {
        return {
            ...state,
            showVerificationModal:action.payload,
        };
    }

    if (action.type === DEMO_STUDENT_REGISTRATION_LOADER) {
        return {
            ...state,
            showLoading: action.payload,
        };
    }
    if (action.type === RECORD_EXISTS_SUCCESS) {
        return {
            ...state,
            showLoading: false,
            status: action.payload,
        };
    }
    if (action.type === RECORD_EXISTS_FAILURE) {
        return {
            ...state,
            showLoading: false,
            status: action.payload,
        };
    }
    if (action.type === GET_SEARCH_TEXT_DATA) {
        return {
            ...state,
            searchText: action.payload,
            searchTextCallOrNot: 1,
            showLoading: false,
        };
    }
    if (action.type === GET_SEARCH_TEXT_FAILURE_DATA) {
        return {
            ...state,
            searchText: [],
            searchTextCallOrNot: 0,
            showLoading: false,
        };
    }
    if (action.type === CLICK_QUESTION_NO) {
        return {
            ...state,
            clickQuestion: action.payload,
            showLoading: false,
        };
    }

    if (action.type === GET_PROFILES_DETAILS) {
        return {
            ...state,
            details: action.payload,
            // userName: action.payload.fname,
            showLoading: false,
        };
    }
    
    if (action.type === LOGOUT) {
        return {
            ...state,
            email_otp: '',
            mobile_otp: '',
            otpValidTime: '',
            registrationStatus: '',
            newStudentid: null,
            showLoading: false,
            status: null,
            error: '',
            searchText: [],
            searchTextCallOrNot: 0,
            clickQuestion: 0,
        };
    }

    return state;
}


