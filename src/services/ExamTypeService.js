import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getExamType(exam_category) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        exam_category
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_EXAM_TYPE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export function getPurchaseExamType() {

    let token;
    let student_id;

    let getData = localStorage.getItem('userDetails');

    if (getData != null && getData != undefined && getData != '') {
        token = JSON.parse(getData).token;
        student_id = JSON.parse(getData).id;
    }

    const postData = {
        student_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_PURCHASE_EXAM_TYPE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getNtseExamType(exam_category, exam_type_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    
    const postData = {
        exam_category,
        exam_type_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_NTSE_TYPE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export function getExamTypeLibrary(exam_category_id) {

    let token;
    let getData = localStorage.getItem('userDetails');

    if (getData != null && getData != undefined && getData != '') {
        token = JSON.parse(getData).token;
    }

    const postData = {
        exam_category_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_EXAM_TYPE_LIBRARY_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getArchiveExamType(exam_category, class_no) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        exam_category,
        class:class_no
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_ARCHIVE_EXAM_TYPE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getArchiveExamTypeLibrary(exam_category_id, class_no) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        exam_category_id,
        class:class_no,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_ARCHIVE_EXAM_TYPE_LIBRARY_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}