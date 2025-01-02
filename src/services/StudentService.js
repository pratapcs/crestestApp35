import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function registerNewStudent(fname, lname, dob, gender, address, pincode, mobile, email, password, std, board, schoolname, schooladd) {
    
    const postData = {
        email: email,
        password: password,
        fname: fname,
        lname: lname,
        dob: dob,
        mobile: mobile,
        profile_pic: '',
        gender: gender,
        address: address,
        pincode: pincode,
        standard: std.toString(),
        board: board.toString(),
        school_name: schoolname,
        school_address: schooladd,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_REGISTER_NEW_STUDENT_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            // Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export function otpSendForRegistration(mobile, email, history) {
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

export function checkStudentRecordExistInTheSystemOrNot(mobile, email, history) {
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


export async function askQuestionData(search_text, subject_id) {
    let getData = await AsyncStorage.getItem('crestestUserDetails')
    let token = JSON.parse(getData).token;

    const postData = {
        search_text,
        subject_id
    };

    // console.log("postData---", postData)

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SEARCH_TEXT_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}


export function registrationStatus(mobile, student_name, email, mobile_otp_status, email_otp_status, otp_timeout, standard, board, academic_year) {
    let _board = parseInt(board[0]);
    const postData = {
        mobile:mobile.toString(), 
        student_name : student_name , 
        email : email, 
        mobile_otp_status, 
        email_otp_status, 
        otp_timeout, 
        standard:standard.toString(), 
        // board:board.toString(), 
        board:_board , 
        academic_year:academic_year.toString()
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_STORE_OTP_VERIFCATION_STATUS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            // Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}



