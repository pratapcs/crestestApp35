import {
    LOGIN_CONFIRMED,
    LOGOUT,
    OTP_FOR_MOBILE_AND_EMAILID,
    VERIFICATION_OTP,
    VERIFICATION_OTP_INPUT_OFF,
    TIME_USED,
    DEMO_LOGIN,
    FEEDBACK_GIVEN,
    PRIVACY_POLICY,
    ADVERTISEMENT_DETAILS,
    TERMS_CONDITION
} from '../constants';

import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    login,
    checkStudentRecordExist,
    forgetPassword,
    otpSendForRegistration,
    registerNewStudent,
    saveTokenInLocalStorage,
    demoLoginService,
    dashboardLogindataData,
    dashboardProfileImageUploadService,
    getprivacyPolicy,
    getAdvertisement,
    getTermsCondition
} from '../../services/AuthService';

import testJson from '../../screens/auth/test.json'

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

import { demoExamSubmitAction } from '../actions/ScholasticAction'
import { postDemoStudentRegistrationAction } from '../actions/StudentAction'

import { storeData, getData, clearAllData } from "../../utils/Util";

export function loginAction(email, password, devicetoken, navigation) {
    console.log("loginAction----------", email, password, devicetoken,)
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        login(email, password, devicetoken)
            .then(async (response) => {
                // response = testJson
                console.log("response.data.data[0]---", response.data)
                // response = testJson
                if (response.data.status === 200) {
                    storeData("crestestUserDetails", JSON.stringify(response.data.data[0]));
                    dispatch(loginConfirmedAction(response.data.data[0]))
                    dispatch(demoExamSubmitAction(response.data.demo_exam_submit));

                    // if (response.data.data[0].isFirstLoginAfterDemoExam == 0) {
                    if (response.data.data[0].isFirstLoginAfterDemoExam == 0) {
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                        navigation.replace('drawerScenes', {
                            screen: 'dashboard',
                            params: { data: 0 },
                        });
                    } else {
                        navigation.navigate('nonAuthScenes', {
                            screen: "DemoAssessment",
                            params: { exam_category_id: response.data.demoquestionscount[0].exam_category_id, student_status: response.data.demoquestionscount[0].student_status, student_id: response.data.demoquestionscount[0].student_id, assessmentName: response.data.demoquestionscount[0].headingmsg, assessmentName: response.data.demoquestionscount[0].headingmsg, subheading: response.data.demoquestionscount[0].subheading, exam_date: response.data.demoquestionscount[0].exam_date, page: 44 }
                        })
                    }

                    // }
                } else {
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
            })
            .catch((error) => {
                console.log('hello error 11', error.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function userDetailsExistsOrNot(email, mobile, calbackFunction, navigation) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        checkStudentRecordExist(email, mobile,)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(sendVerificationOtp(mobile, email, navigation))
                    calbackFunction()
                    // dispatch(recordExistsSuccess(response.data.exist))
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 410) {
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: response.data.msg });
                    // dispatch(recordExistsFailure(response.data.exist))
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function forgetPasswordEmail(email, navigation) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        forgetPassword(email)
            .then((response) => {
                if (response.data.status === 200) {
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    // props.navigation.navigate('authScenes', { screen: 'signin' });
                    navigation.push('authScenes', { screen: 'signin' });
                    Emitter.emit(Events.HIDE_PRELOADER);

                } else if (response.data.status === 410) {
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout());
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                console.log('catch(error1)', error.data);
                // const errorMessage = formatError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);

            });
    }
}

export function logout(props) {
    // console.log("logout(props)====", props)
    Emitter.emit(Events.SHOW_PRELOADER);
    if (props?.route?.params?.examDemo != 0 && props?.route?.name != "PdfViewer" ) {
        Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: "Logout successfully" });
    }
    clearAllData();
    // props.navigation.replace('authScenes', { screen: 'signin' });

    props.navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: 'authScenes' },
            ],
        })
    );

    Emitter.emit(Events.HIDE_PRELOADER);
    return {
        type: LOGOUT,
    };

}

export function logoutWithoutLoader(props) {
    // console.log("logout(props)====", props)
    clearAllData();

    props.navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [
                { name: 'authScenes' },
            ],
        })
    );

    return {
        type: LOGOUT,
    };

}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED,
        payload: data,
    };
}

export function sendVerificationOtp(mobile, email,) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        otpSendForRegistration(mobile, email)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(verificationCodeAction(response.data));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error", message: response.data.msg });
                    dispatch(logout());
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function otpForMobileAndEmailid(data) {
    return {
        type: OTP_FOR_MOBILE_AND_EMAILID,
        payload: data,
    };
}

export function verificationCodeAction(data) {
    return {
        type: VERIFICATION_OTP,
        payload: data,
    };
}

export function verificationCodeInputOffAction(data) {
    return {
        type: VERIFICATION_OTP_INPUT_OFF,
        payload: data,
    };
}

export function newStudentRegistrationWithoutDemo(firstName, lastName, mobileNumber, emailId, standardSave, boardSave, academicYearSave, devicetoken, pageFrom, navigation, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        await registerNewStudent(firstName, lastName, mobileNumber, emailId, standardSave, boardSave, academicYearSave)
            .then((response) => {
                if (response.data.status == 200) {
                    Emitter.emit(Events.HIDE_PRELOADER);
                    dispatch(verificationCodeInputOffAction(0));
                    dispatch(postDemoStudentRegistrationAction(response.data.studentid));
                    dispatch(demoExamSubmitAction(0))
                    // openVerificationModal();
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    // dispatch(loginAction(emailId, password, devicetoken, navigation));

                    if (pageFrom == 1) {
                        // dispatch(logout(props));
                        dispatch(logoutWithoutLoader(props));
                        props.navigation.navigate('authScenes', {
                            screen: "SuccessRegister",
                        })
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }
                }
                if (response.data.status == 400) {
                    dispatch(logout());
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function timeForOtpValidationAction(data) {
    return {
        type: TIME_USED,
        payload: data,
    };
}

export function demoLogin(devicetoken, navigation) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        demoLoginService(devicetoken)
            .then((response) => {
                // console.log("demoLogin----", response.data )
                if (response.data.status === 200) {
                    storeData("crestestUserDetails", JSON.stringify(response.data.data[0]));
                    dispatch(demoLoginConfirmedAction(response.data.data[0]));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    navigation.replace('drawerScenes', {
                        screen: 'dashboard',
                        params: { data: 0 },
                    });
                    Emitter.emit(Events.HIDE_PRELOADER);

                } else {
                    setTimeout(() => {
                        dispatch(loadingToggleAction(false));
                    }, 3000);
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
            })
            .catch((error) => {
                console.log('hello', error.data);
                // const errorMessage = formatError(error.response.data);
                // utility.showError(errorMessage);

            });
    }
}

export function checkTokenAction(tokenDetails) {
    return (dispatch) => {
        dispatch(loginConfirmedAction(tokenDetails))
        /* checkToken()
          .then((response) => {
            if (response.data.status === 200) {
              dispatch(loginConfirmedAction(tokenDetails));
              //history.replace('/dashboard');
            } else {
              dispatch(logout(history));
            }
          })
          .catch((error) => {
            dispatch(logout(history));
          }); */
    };
}

export function dashboardLogindataDataDetails() {
    return (dispatch) => {
        dashboardLogindataData()
            .then((response) => {
                if (response.data.status == 200) {
                    saveTokenInLocalStorage(response.data.data[0]);
                    dispatch(loginConfirmedAction(response.data.data[0]));
                    dispatch(demoExamSubmitAction(response.data.demo_exam_submit)); // option close due to auto submit registered exam
                }
            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
            });
    };
}

export function dashboardProfileImageUploadAction(profile_pic) {
    return (dispatch) => {
        dashboardProfileImageUploadService(profile_pic)
            .then(async (response) => {
                if (response.data.status == 200) {
                    let userDetails = await AsyncStorage.getItem('crestestUserDetails');
                    let olduserDetailsData = JSON.parse(userDetails);
                    olduserDetailsData.profile_pic = response.data.filepath;
                    storeData("crestestUserDetails", JSON.stringify(olduserDetailsData));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                }
            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
            });
    };
}

export function getPrivacyPolicyDetails(props) {
    return (dispatch) => {
        getprivacyPolicy()
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(privacyPolicyAction(response.data.data));
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    // utility.showError(response.data.msg);
                    return;
                }
            })
            .catch((error) => {
                console.log('catch(error2)', error.data);
                // const errorMessage = formatError(error.response.data);
                // utility.showError(errorMessage);

            });
    }
}

export function getAdvertisementDetails(props) {
    return (dispatch) => {
        getAdvertisement()
            .then((response) => {
                // console.log("getAdvertisementDetails----", response.data)
                if (response.data.status === 200) {
                    dispatch(adveetisementDetailsAction(response.data.data));
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    // utility.showError(response.data.msg);
                    return;
                }
            })
            .catch((error) => {
                console.log('catch(error2)', error.data);
                // const errorMessage = formatError(error.response.data);
                // utility.showError(errorMessage);

            });
    }
}
export function getTermsConditionDetails(history) {
    return (dispatch) => {
        getTermsCondition()
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(termsConditionAction(response.data.data));
                }
                if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                }
            })
            .catch((error) => {
                console.log('catch(error3)', error.data);
                // const errorMessage = formatError(error.response.data);
                // utility.showError(errorMessage);

            });
    }
}

export function demoLoginConfirmedAction(data) {
    return {
        type: DEMO_LOGIN,
        payload: data,
    };
}

export function feedbackGivenAction(data) {
    return {
        type: FEEDBACK_GIVEN,
        payload: data,
    };
}

export function privacyPolicyAction(data) {
    return {
        type: PRIVACY_POLICY,
        payload: data,
    };
}

export function adveetisementDetailsAction(data) {
    return {
        type: ADVERTISEMENT_DETAILS,
        payload: data,
    };
}

export function termsConditionAction(data) {
    return {
        type: TERMS_CONDITION,
        payload: data,
    };
}