import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getElibraryContent(exam_category_id, branch_id, chapter_id, exam_type_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let board_id = JSON.parse(getData).board;
    let class_id = JSON.parse(getData).class_id;

    const postData = {
        exam_category_id,
        branch_id,
        class_id,
        chapter_id,
        exam_type_id,
        board_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_ELIBRARY_CONTENT_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getDemoElibraryContent(category_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let userid = JSON.parse(getData).id;

    const postData = {
        userid,
        category_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_DEMO_ELIBRARY_CONTENT_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getOnlineConceptMap(category_id, exam_type_id, chapter_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        category_id,
        exam_type_id,
        chapter_id
    };
    //console.log('postData', postData);
    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_PURCHASED_ELIBRARY_CONCEPT_MAP_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function elibraryGetsubjectList(exam_category, exam_type_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        exam_category,
        exam_type_id
    };
    //console.log('postData', postData);
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_ELIBRARY_GETSUBJECT_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function postStoreElibraryTimeSpend(subject_id, time_spent, chapter_shortcode) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        subject_id,
        time_spent,
        chapter_shortcode
    };
    // console.log('postData', postData);
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_STORE_ELIBRARY_TIME_SPEND_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getStoreElibraryVisit(subject_id, chapter_shortcode) {
    
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        subject_id, 
        chapter_shortcode
    };
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_STORE_ELIBRARY_VISIT_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getAwsCredentialsDetails() {
    
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_AWS_CREDENTIALS_DETAILS_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}