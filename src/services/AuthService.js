import axios from 'axios';

import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    logout,
    checkTokenAction,
} from "../store/actions/AuthActions";

export function saveTokenInLocalStorage(tokenDetails) {
    AsyncStorage.setItem('crestestUserDetails', JSON.stringify(tokenDetails));
}

export function login(email, password, devicetoken) {
    const postData = {
        email,
        password,
        devicetoken
    };
    console.log("login-----", postData, GlobalConfigs.API_URL + Apis.LOGIN_API, );
    return axios({
        url: GlobalConfigs.API_URL + Apis.LOGIN_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
        },
        data: postData,
    });
}

export function checkStudentRecordExist(email, mobile) {
    const postData = {
        mobile,
        email,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_CHECK_STUDENT_RECORD_EXIST_IN_THE_SYSTEM_OR_NOT_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            // Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export function forgetPassword(email) {

    const postData = {
        email
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_FORGET_PASSWORD_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
        },
        data: postData,
    });
}

export function otpSendForRegistration(mobile, email) {
    const postData = {
        mobile,
        email,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SEND_VERIFICATION_OTP_TO_MOBILE_AND_EMAIL_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            // Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export function registerNewStudent(firstName, lastName, mobileNumber, emailId, standardSave, boardSave, academicYearSave) {

    const postData = {
        email: emailId,
        fname: firstName,
        lname: lastName,
        mobile: mobileNumber.toString(),
        profile_pic: '',
        device_token: '',
        standard: standardSave.toString(),
        board: boardSave.toString(),
        academic_year: academicYearSave.toString(),
    };

    console.log("@1--registerNewStudent-------", postData)

    return axios({
        // url: GlobalConfigs.API_URL + Apis.POST_REGISTER_NEW_STUDENT_API,
        url: GlobalConfigs.API_URL + Apis.POST_NEW_SCREEN_REGISTER_NEW_STUDENT_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            // Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export function demoLoginService(devicetoken) {
    const postData = {
        devicetoken
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_DEMO_STUDENT_LOGIN_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
        },
        data: postData,
    });
}

export async function checkAutoLogin(dispatch) {
    let tokenDetailsString = await AsyncStorage.getItem('crestestUserDetails');
    const tokenDetails = JSON.parse(tokenDetailsString);
    // let token = JSON.parse(getData).token;

    // const tokenDetailsString = localStorage.getItem("crestestUserDetails");
    // const tokenDetails = JSON.parse(tokenDetailsString);

    if (tokenDetailsString) {
        dispatch(checkTokenAction(tokenDetails));
    } /* else {
        dispatch(logout(props));
        return;
    } */
}

export async function dashboardLogindataData() {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_DASHBOARD_LOGINDATA_API,

        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function dashboardProfileImageUploadService(profile_pic) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const formData = new FormData();
    formData.append("student_id", student_id);
    formData.append("profile_pic", profile_pic);

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_UPDATE_PROFILE_IMAGE_API,

        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            Authorization: `Bearer ${token}`
        },
        data: formData,
    });
}

export function getprivacyPolicy() {

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_PRIVACY_POLICY_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            // Authorization: `Bearer ${token}`
        },
    });
}

export async function getAdvertisement() {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_ADVERTISEMENT_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export function getTermsCondition() {

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_TERMS_CONDITION_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            // Authorization: `Bearer ${token}`
        },
    });
}



