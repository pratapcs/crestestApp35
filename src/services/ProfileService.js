import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function updateProfile(profile_pic, fname, lname, dob, email, gender, address, pincode, mobile, standard, board, school_name, school_address, password) {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let student_id = JSON.parse(getData).id;
    let token = JSON.parse(getData).token;
    // console.log("getData----1111--", getData)
    // return

    const postData = {
        student_id,
        profile_pic,
        fname,
        lname,
        dob,
        email,
        gender,
        address,
        pincode,
        mobile,
        standard,
        board,
        school_name,
        school_address,
        password
    };
    const formData = new FormData();
    formData.append("student_id", student_id);
    formData.append("profile_pic", profile_pic);
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("dob", dob);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("address", address);
    formData.append("pincode", pincode);
    formData.append("mobile", mobile);
    formData.append("standard", standard);
    formData.append("board", board);
    formData.append("school_name", school_name);
    formData.append("school_address", school_address);
    formData.append("password", password);

    return axios({
        url: GlobalConfigs.API_URL + Apis.UPDATE_PROFILE_DETAILS_LIST_API,
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

export async function getStudentDetailsById() {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let student_id = JSON.parse(getData).id;
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_PROFILE_DETAILS_BY_ID_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getOTPByClassUpdate() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let student_id = JSON.parse(getData).id;
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.SEND_VERIFICATION_OTP_UPDATE_CLASS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function updateStudentProfileOfSubscriptionService(pincode, schoolname, schooladd) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let student_id = JSON.parse(getData).id;
    let token = JSON.parse(getData).token;

    const postData = {
        student_id,
        pincode, 
        school_name:schoolname, 
        school_address:schooladd,
    };
    
    console.log("updateStudentProfileOfSubscriptionService----", postData)
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_UPDATE_STUDENT_PROFILE_OF_SUBSCRIPTION_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}