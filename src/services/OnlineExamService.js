import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getOnlineScholasticModuleQuestionList(chapter_id, subject_id, module, group_subject_id,) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let board = JSON.parse(getData).board_code;
    let standard = JSON.parse(getData).standard;

    const postData = {
        board,
        standard,
        subject_id,
        chapter_id,
        set_no:module,
        group_subject_id,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_MODULE_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getOnlineScholasticMockQuestionList(chapter_id, subject_id, mock, group_subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let board = JSON.parse(getData).board_code;
    let standard = JSON.parse(getData).standard;

    const postData = {
        board,
        standard,
        subject_id,
        chapter_id,
        set_no:mock,
        group_subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_MOCK_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getOnlineCompetitiveQuestionList(exam_type, subtype, set_no) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let standard = JSON.parse(getData).standard;
    let student_id = JSON.parse(getData).id;

    const postData = {
        exam_type: exam_type,
        standard: standard,
        student_id: student_id,
        subtype_id: subtype,
        set_no:set_no
    };

    // console.log("postData----", postData)

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_ONLINE_COMPETITIVE_EXAM_QUESTIONS_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getPurchasedCompetitiveDetails(subtype, exam_type) {

    /* let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id; */

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: student_id,
        exam_type: exam_type,
        subtype_id: subtype
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_PURCHASED_COMPETITITVE_DETAILS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

//Get Demo scholastic exam questions
export async function competitiveExamSubmit(exam_type, subscription_id, set_no, examdata, subtype, group_subject_id,) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let registerUserId = JSON.parse(getData).id;

    const postData = {
        student_id: registerUserId,
        subscription_id: subscription_id,
        exam_type: exam_type,
        set_no: set_no,
        examdata: examdata,
        exam_subtype: subtype,
        group_subject_id:group_subject_id
    };

    // console.log("competitiveExamSubmit----", competitiveExamSubmit)

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_STORE_ONLINE_EXAM_QUESTIONS_ANSWERS_COMPETITIVE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}



export async function getFeedback() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_FEEDBACK_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },

    });
}


export async function storeFeedback(feedback, exam_unique_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        feedback,
        exam_unique_id
    };
    
    // console.log("storeFeedback----", postData)
    // console.log("token----", token)
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_STORE_FEEDBACK_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}


export async function getscholasticexamsdetailsCasestudy(subject_id, group_subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');;
    let token = JSON.parse(getData).token;

    const postData = {
        subject_id,
        group_subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GETSCHOLASTICEXAMSDETAILS_CASESTUDY_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,

    });
}
