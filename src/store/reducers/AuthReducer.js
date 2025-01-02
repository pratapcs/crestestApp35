import {
    LOGIN_CONFIRMED,
    LOGOUT,
    VERIFICATION_OTP,
    VERIFICATION_OTP_INPUT_OFF,
    TIME_USED,
    DEMO_LOGIN,
    FEEDBACK_GIVEN,
    PRIVACY_POLICY,
    ADVERTISEMENT_DETAILS,
    TERMS_CONDITION
} from '../constants';

const initialState = {
    auth: {
        email: '',
        idToken: '',
        localId: '',
        expiresIn: '',
        refreshToken: '',
    },
    email: '',
    user_id: '',
    user_name: '',
    token: '',
    errorMessage: '',
    successMessage: '',
    showLoading: false,
    unLock: false,
    fname: '',
    lname: '',
    is_subscribe: 0,
    standard: '',
    board: '',
    board_name: '',
    forgetEmail: '',
    generatePasswordEmail: '',
    work_status: '',
    work_status_percentage: '',
    total_scholastic_master: '',
    total_competitive_master: '',
    scholatic_details_purchase: '',
    competive_details_purchase: '',
    total_scholastic_completed: '',
    total_competitive_completed: '',
    scholatic_overall: '',
    competitive_overall: '',
    is_subscribe_e_library: null,
    tabName: 'login',
    changeTabName: '',
    termsCondition: '',
    privacyPolicy: '',
    feedback_status: null,
    total_scholastic_completed_master: '',
    total_competitive_completed_master: '',
    performance_details_comp: [],
    performance_details_sch: [],
    performance_total_exam_count: 0,

    OtpBeforeLoginScreen: '',
    resetLinkExistOrNot:1,
    advertisementDetails:[]
    
};

export function AuthReducer(state = initialState, action) {

    if (action.type === LOGIN_CONFIRMED) {
        return {
            ...state,
            email: action.payload.email,
            user_id: action.payload.id,
            user_name: action.payload.name,
            token: action.payload.token,
            fname: action.payload.fname,
            lname: action.payload.lname,
            errorMessage: '',
            successMessage: 'Login Successfully Completed',
            showLoading: false,
            standard: action.payload.standard,
            is_subscribe: action.payload.is_subscribe,
            board: action.payload.board,
            board_name: action.payload.board_name,
            work_status: action.payload.work_status,
            work_status_percentage: action.payload.work_status_percentage,
            total_scholastic_master: action.payload.total_scholastic_master,
            total_competitive_master: action.payload.total_competitive_master,
            scholatic_details_purchase: action.payload.scholatic_details_purchase,
            competive_details_purchase: action.payload.competive_details_purchase,
            total_scholastic_completed: action.payload.total_scholastic_completed,
            total_competitive_completed: action.payload.total_competitive_completed,
            scholatic_overall: action.payload.scholatic_overall,
            competitive_overall: action.payload.competitive_overall,
            is_subscribe_e_library: action.payload.is_subscribe_e_library,
            feedback_status: action.payload.feedback_given,
            total_scholastic_completed_master: action.payload.total_scholastic_completed_master,
            total_competitive_completed_master: action.payload.total_competitive_completed_master,
            performance_details_comp: action.payload.performance_details_comp,
            performance_details_sch: action.payload.performance_details_sch,
            performance_total_exam_count: action.payload.performance_total_exam_count,
            address: action.payload.address,
            board_code: action.payload.board_code,
            class_id: action.payload.class_id,
            demo_exam_status: action.payload.demo_exam_status,
            dob: action.payload.dob,
            gender: action.payload.gender,
            mac_address: action.payload.mac_address,
            mobile_otp_verify: action.payload.mobile_otp_verify,
            pincode: action.payload.pincode,
            profile_pic: action.payload.profile_pic,
            school_address: action.payload.school_address,
            school_name: action.payload.school_name,
        };
    }
    if (action.type === LOGOUT) {
        return {
            ...state,
            address: '',
            board: '',
            board_code: '',
            board_name: '',
            class_id: '',
            competitive_overall: '',
            competive_details_purchase: '',
            demo_exam_status: '',
            dob: '',
            email: '',
            feedback_given: '',
            fname: '',
            gender: '',
            id: '',
            is_subscribe: '',
            is_subscribe_e_library: '',
            lname: '',
            mac_address: '',
            mobile: '',
            mobile_otp_verify: '',
            pincode: '',
            profile_pic: '',
            scholatic_details_purchase: '',
            scholatic_overall: '',
            school_address: '',
            school_name: '',
            standard: '',
            total_competitive_completed: '',
            total_competitive_completed_master: '',
            total_competitive_master: '',
            total_scholastic_completed: 0,
            total_scholastic_completed_master: 0,
            total_scholastic_master: 0,
            work_status: 0,
            work_status_percentage: 0,
            email_otp: '',
            mobile_otp: '',
            otpValidTime: '',
            token:'',
        }
    }
    if (action.type === VERIFICATION_OTP) {
        return {
            ...state,
            email_otp: action.payload.email_otp,
            mobile_otp: action.payload.mobile_otp,
            // otpValidTime: action.payload.otp_valid_time,
            otpValidTime: action.payload.otp_valid_time,
            isShowOtpBox: 1,
            time_used: action.payload.otp_valid_time
        };
    }

    if (action.type === VERIFICATION_OTP_INPUT_OFF) {
        return {
            ...state,
            isShowOtpBox: 0
        };
    }
    if (action.type === TIME_USED) {
        return {
            ...state,
            time_used: action.payload
        };
    }
    if (action.type === FEEDBACK_GIVEN) {
        return {
            ...state,
            feedback_status: action.payload,
            showLoading: false,
        };
    }
    if (action.type === PRIVACY_POLICY) {
        return {
            ...state,
            privacyPolicy: action.payload,
            showLoading: false,
        };
    }
    if (action.type === TERMS_CONDITION) {
        return {
            ...state,
            termsCondition: action.payload,
            showLoading: false,
        };
    }
    
    if (action.type === DEMO_LOGIN) {
        return {
            ...state,
            email: action.payload.email,
            user_id: action.payload.id,
            user_name: action.payload.name,
            token: action.payload.token,
            fname: action.payload.fname,
            lname: action.payload.lname,
            errorMessage: '',
            successMessage: 'Login Successfully Completed',
            showLoading: false,
            standard: action.payload.standard,
            is_subscribe: action.payload.is_subscribe,
            board: action.payload.board,
            board_name: action.payload.board_name,
            work_status: action.payload.work_status,
            work_status_percentage: action.payload.work_status_percentage,
            total_scholastic_master: action.payload.total_scholastic_master,
            total_competitive_master: action.payload.total_competitive_master,
            scholatic_details_purchase: action.payload.scholatic_details_purchase,
            competive_details_purchase: action.payload.competive_details_purchase,
            total_scholastic_completed: action.payload.total_scholastic_completed,
            total_competitive_completed: action.payload.total_competitive_completed,
            scholatic_overall: action.payload.scholatic_overall,
            competitive_overall: action.payload.competitive_overall,
            profile_pic: '',
        };
    }

    if (action.type === ADVERTISEMENT_DETAILS) {
        return {
            ...state,
            advertisementDetails: action.payload,
            showLoading: false,
        };
    }

    return state;
}


