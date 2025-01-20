
import {
    registerNewStudent,
    otpSendForRegistration,
    checkStudentRecordExistInTheSystemOrNot,
    askQuestionData,
    registrationStatus,
} from '../../services/StudentService';

import {
    DEMO_STUDENT_REGISTER,
    DEMO_STUDENT_REGISTRATION_LOADER,
    VERIFICATION_OTP,
    SUBMIT_ANSWER,
    RECORD_EXISTS_SUCCESS,
    RECORD_EXISTS_FAILURE,
    GET_SEARCH_TEXT_DATA,
    GET_SEARCH_TEXT_FAILURE_DATA,
    CLICK_QUESTION_NO,
    VERIFICATION_MODAL
} from '../constants';

import {
    logout,
    loginAction
} from '../actions/AuthActions';

import {
    loginConfirmedAction, feedbackGivenAction
} from './AuthActions';

import {
    demoExamSubmitAction,
} from './ScholasticAction';

// import { saveTokenInLocalStorage} from '../../services/AuthService';

// import * as utility from '../../utility/Utility';
import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData, getData, clearAllData } from "../../utils/Util";

export function newStudentRegistration(fname, lname, dob, gender, address, pincode, mobile, email, password, standard, board, school_name, school_address, devicetoken, navigation) {
    // Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        await registerNewStudent(fname, lname, dob, gender, address, pincode, mobile, email, password, standard, board, school_name, school_address)
            .then(async (response) => {
                // console.log("registerNewStudent-----", )
                let getData = await AsyncStorage.getItem('crestestUserDetails');
                // console.log("===getData===", getData)
                if (response.data.status == 200) {
                    if (getData == null) {
                        dispatch(logout(props));
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                        return;
                        // history.push('./page-login')
                        // utility.showSuccess(response.data.msg);
                    } else {
                        dispatch(postDemoStudentRegistrationAction(response.data.studentid));
                        // dispatch(loginConfirmedAction(response.data.data[0]));
                        dispatch(recordExistsSuccess(2))
                        dispatch(demoExamSubmitAction(0))
                        dispatch(feedbackGivenAction(0));
                        // saveTokenInLocalStorage(response.data.data[0]);
                        storeData("crestestUserDetails", JSON.stringify(response.data.data[0]));
                        dispatch(loginConfirmedAction(response.data.data[0]));
                        Emitter.emit(Events.HIDE_PRELOADER);

                        navigation.replace('drawerScenes', {
                            screen: 'Dashboard',
                            params: { validationStatus: 1 },
                            merge: true,
                        })
                        /* navigation.navigate('nonAuthScenes', {
                            screen: 'ExamsDetails',
                            params: { validationStatus: 1 },
                            merge: true,
                        }); */
                    }
                } else {
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
            });
    };
}


export function newStudentRegistrationWithoutDemo(fname, lname, dob, gender, address, pincode, mobile, email, password, cpassword, std, board, schoolname, schooladd, userdob, history) {
    return async (dispatch) => {
        await registerNewStudent(fname, lname, dob, gender, address, pincode, mobile, email, password, cpassword, std, board, schoolname, schooladd, userdob, history)
            .then((response) => {
                // console.log("=======newStudentRegistrationWithoutDemo===", response)
                if (response.data.status == 200) {
                    let withoutDemo = 1
                    /*  if (getData == null) {
                         history.push('./page-login')
                         utility.showSuccess(response.data.msg);
                     } else { */
                    dispatch(postDemoStudentRegistrationAction(response.data.studentid));
                    dispatch(recordExistsSuccess(2))
                    dispatch(demoExamSubmitAction(1))
                    dispatch(showingLoaderStudentAction(false))
                    dispatch(loginAction(email, password, history));

                    /* ---- */
                    /* history.push({ pathname: './page-login' })
                    utility.showSuccess(response.data.msg); */
                    /* --------- */

                    // history.push('./page-login')
                    // history.push({pathname:'./page-login', state: { tab:"Login" } })
                    // history.push({pathname:'./page-login' })
                    // utility.showSuccess(response.data.msg);
                    // olduserDetailsData.id = response.data.studentid;
                    // localStorage.setItem('userDetails', JSON.stringify(olduserDetailsData));
                    // dispatch(loginConfirmedAction(olduserDetailsData));
                }
                /*} else {
                    utility.showError(response.data.msg);
                } */
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    return;
                }

            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function sendVerificationOtp(mobile, email, history) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        otpSendForRegistration(mobile, email)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(verificationCodeAction(response.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(history));
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function demoUserRecordExistsOrNot(mobile, email, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        checkStudentRecordExistInTheSystemOrNot(mobile, email)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(recordExistsSuccess(response.data.exist))
                    dispatch(verificationInputBoxAction(response.data.exist))
                    dispatch(sendVerificationOtp(mobile, '', props))
                    // dispatch(demoExamSubmitAction(0))
                    // utility.showSuccess(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg }); // message off
                    // Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 410) {
                    dispatch(recordExistsFailure(response.data.exist))
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                }

            })
            .catch((error) => {
                console.log(error);
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getAskQuestionData(search_text, subject_id, disableListLoader, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        askQuestionData(search_text, subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getSearTextSuccessAction(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    disableListLoader(false)
                } else {
                    dispatch(getSearTextFailureAction(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}


export function registrationStatusDetails(mobile, student_name, email, mobile_otp_status, email_otp_status, otp_timeout, standard, board, academic_year) {
    return (dispatch) => {
        registrationStatus(mobile, student_name, email, mobile_otp_status, email_otp_status, otp_timeout, standard, board, academic_year)
            .then((response) => {
                if (response.data.status == 200) {
                    // dispatch(getSearTextSuccessAction(response.data.data));
                }
            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
            });
    };
}



export function postDemoStudentRegistrationAction(data) {
    return {
        type: DEMO_STUDENT_REGISTER,
        payload: data,
    };
}

export function verificationInputBoxAction(data) {
    return {
        type: VERIFICATION_MODAL,
        payload: data,
    };
}

export function verificationCodeAction(data) {
    return {
        type: VERIFICATION_OTP,
        payload: data,
    };
}
export function showingLoaderStudentAction(status) {
    return {
        type: DEMO_STUDENT_REGISTRATION_LOADER,
        payload: status,
    };
}

export function recordExistsSuccess(success) {
    return {
        type: RECORD_EXISTS_SUCCESS,
        payload: success,
    };
}

export function recordExistsFailure(failure) {
    return {
        type: RECORD_EXISTS_FAILURE,
        payload: failure,
    };
}

export function getSearTextSuccessAction(data) {
    return {
        type: GET_SEARCH_TEXT_DATA,
        payload: data,
    };
}

export function getSearTextFailureAction(data) {
    return {
        type: GET_SEARCH_TEXT_FAILURE_DATA,
        payload: data,
    };
}

export function getClickQuestionNoAction(data) {
    return {
        type: CLICK_QUESTION_NO,
        payload: data,
    };
}





