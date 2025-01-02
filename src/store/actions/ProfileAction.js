
import {
    updateProfile,
    getStudentDetailsById,
    getOTPByClassUpdate,
    updateStudentProfileOfSubscriptionService
} from '../../services/ProfileService';

// import { loginConfirmedAction } from './AuthActions'

import {
    logout,
} from '../actions/AuthActions';

import {
    PROFILE_LOADING,
    SET_PROFILE_DATA,
    UPDATE_PROFILES_DETAILS,
    USER_UPDATE_PROFILE_CONFIRMED,
    PROFILE_DATA_UPDATED,
    PROFILE_IMAGE,
    PROFILE_FILE,
    RESIZE_MODAL_CLOSE,
    GET_PROFILES_DETAILS,
} from '../constants';

// import * as utility from '../../utility/Utility';
import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';
import { storeData, getData, clearAllData } from "../../utils/Util";

import AsyncStorage from '@react-native-async-storage/async-storage';

export function updateProfileDetails(proImg, fname, lname, dob, email, gender, address, pincode, mobile, standard, board, schoolName, schoolAddress, password, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        updateProfile(proImg, fname, lname, dob, email, gender, address, pincode, mobile, standard, board, schoolName, schoolAddress, password)
            .then(async (response) => {
                // console.log("response.data.data----", response.data.data)
                if (response.data.status == 200) {
                    if (response.data.password_change != 1) {

                        dispatch(updateProfileAction(response.data.data[0]));
                        let updatedProfileData = response.data.data[0]
                        /* ===== */
                        let getData = await AsyncStorage.getItem('crestestUserDetails');
                        let data = JSON.parse(getData);
                        data.profile_pic = updatedProfileData.profile_pic;
                        data.fname = updatedProfileData.fname;
                        data.lname = updatedProfileData.lname;
                        data.dob = updatedProfileData.dob;
                        data.gender = updatedProfileData.gender;
                        data.address = updatedProfileData.address;
                        data.pincode = updatedProfileData.pincode;
                        data.mobile = updatedProfileData.mobile;
                        data.board = updatedProfileData.board;
                        data.school_name = updatedProfileData.school_name;
                        data.school_address = updatedProfileData.school_address;
                        data.standard = updatedProfileData.standard;
                        storeData("crestestUserDetails", JSON.stringify(data));
                        /* ===== */

                        dispatch(profileDataUpdatedAction(1));
                        dispatch(userUpdateProfileConfirmedAction(response.data.data[0]));
                        // props.push('/dashboard');
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                        Emitter.emit(Events.HIDE_PRELOADER);

                        props.navigation.replace('drawerScenes', {
                            screen: 'dashboard',
                        })
                        // console.log("password_change----", response.data.password_change)
                    } else {
                        // utility.showSuccess(response.data.msg);
                        Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                        setTimeout(function () {
                            dispatch(logout(props));
                            return;
                        }, 5000);
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                Emitter.emit(Events.HIDE_PRELOADER);
                console.log("error----", error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });

                // utility.showError(error.response.data);
            });
    };
}

export function getProfileDetailsById(props) {
    return (dispatch) => {
        getStudentDetailsById()
            .then(async (response) => {
                if (response.data.status == 200) {
                    // storeData("crestestUserDetails", JSON.stringify(response.data.data));
                    dispatch(updateProfileAction(response.data.data));
                    dispatch(getStudentDetailsAction(response.data.data));
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getOTPByClassUpdateData(getClassVerificationDetail, props) {
    return (dispatch) => {
        getOTPByClassUpdate()
            .then((response) => {
                if (response.data.status == 200) {
                    console.log("getOTPByClassUpdateData----", response.data)
                    getClassVerificationDetail(response.data);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg }); // message off
                    // dispatch(verificationInputBoxAction(response.data.exist))
                    // dispatch(sendVerificationOtp(mobile, '', props))
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function updateStudentProfileOfSubscription(pincode, schoolname, schooladd, callBackFunction, history) {
    return (dispatch) => {
        updateStudentProfileOfSubscriptionService(pincode, schoolname, schooladd)
            .then(async (response) => {
                if (response.data.status == 200) {
                    /* ===== */
                    let getData = await AsyncStorage.getItem('crestestUserDetails');
                    let data = JSON.parse(getData);
                    data.pincode = pincode;
                    data.school_name = schoolname;
                    data.school_address = schooladd;
                    storeData("crestestUserDetails", JSON.stringify(data));
                    /* ===== */
                    callBackFunction(response.data.data[0])
                }
                if (response.data.status == 400) {
                    dispatch(logout(history));
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

export function updateProfileAction(data) {
    return {
        type: UPDATE_PROFILES_DETAILS,
        payload: data,
    };
}

export function setProfileDataAction(data) {
    return {
        type: SET_PROFILE_DATA,
        payload: data,
    };
}

export function loadingProfile(status) {
    return {
        type: PROFILE_LOADING,
        payload: status,
    };
}

export function userUpdateProfileConfirmedAction(data) {
    return {
        type: USER_UPDATE_PROFILE_CONFIRMED,
        payload: data,
    };
}

export function profileDataUpdatedAction(data) {
    return {
        type: PROFILE_DATA_UPDATED,
        payload: data,
    };
}

export function profileImageUpdatedAction(data) {
    return {
        type: PROFILE_IMAGE,
        payload: data,
    };
}
export function profileImageFileUpdatedAction(data) {
    return {
        type: PROFILE_FILE,
        payload: data,
    };
}

export function getStudentDetailsAction(data) {
    return {
        type: GET_PROFILES_DETAILS,
        payload: data,
    };
}