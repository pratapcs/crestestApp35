import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function getBranchScholasticList(id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        exam_category_id: id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_BRANCH_SCHOLASTIC_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}


//Get Demo scholastic exam questions
export async function demoScholasticExamQuestions() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;
    let standard = JSON.parse(getData).standard;
    let board = JSON.parse(getData).board_code;


    /* let getData = localStorage.getItem('userDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;
    let standard = JSON.parse(getData).standard;
    let board = JSON.parse(getData).board_code; */

    const postData = {
        board: board == "" ? "" : board,
        standard: standard == "" ? "" : standard,
        student_id: student_id
    };
    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_DEMO_SCHOLASTIC_EXAM_QUESTIONS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

//Get Demo scholastic exam questions
export async function demoExamSubmit(data, id, exam_category_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let registerUserId = JSON.parse(getData).id;
    let standard = JSON.parse(getData).standard;
    let board = JSON.parse(getData).board_code;

    const postData = {
        student_id: registerUserId == 0 ? id : registerUserId,
        exam_category_id: exam_category_id,
        student_status: registerUserId == 0 ? 0 : 1,
        examdata: data,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_STORE_DEMO_EXAM_QUESTIONS_ANSWERS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}


export async function genrateAndDownloadPdf(id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');;
    let token = JSON.parse(getData).token;
    let registerUserId = JSON.parse(getData).id;

    const postData = {
        student_id: registerUserId == 0 ? id : registerUserId,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GENRATE_AND_DOWNLOAD_PDF_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

//Get Demo scholastic exam questions
export async function demoAssessmentList(exam_category_id, student_status, student_id,) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        student_id,
        exam_category_id,
        student_status,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_DEMO_ASSESSMENT_EXAM_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

//Get Branch List against subject ID
export async function getBranchListAgainstSubjectid(subject_id, history) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');;
    let token = JSON.parse(getData).token;

    const postData = {
        subject_id: subject_id,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_BRANCH_LIST_AGAINST_SUBJECT_ID_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

//Get Set Exam Questions list for scholastic
export async function scholasticExamQuestionsListForSubscriber(branch, chapter, subject_id, set_no, chapter_no, group_subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let board_code = JSON.parse(getData).board_code;
    let standard = JSON.parse(getData).standard;

    const postData = {
        board: board_code,
        standard: standard,
        branch: branch,
        chapter: chapter,
        subject_id: subject_id,
        set_no: set_no,
        chapter_no: chapter_no,
        group_subject_id: group_subject_id
    };

    // console.log("postData-- scholasticExamQuestionsListForSubscriber ---", postData)

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SET_EXAM_QUESTIONS_LIST_FOR_SCHOLASTIC_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

//Get Demo scholastic exam questions
export async function scholasticExamSubmitforSubscriber(exam_type, branch, chapter, set_no, examdata, subject_id, chapter_no, group_subject_id,) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let registerUserId = JSON.parse(getData).id;
    let exam_unique_id = JSON.parse(getData).exam_unique_id;

    const postData = {
        student_id: registerUserId,
        exam_unique_id: exam_unique_id,
        exam_type: exam_type,
        branch: branch,
        chapter: chapter,
        set_no: set_no,
        examdata: examdata,
        subject_id: subject_id,
        chapter_no: chapter_no,
        group_subject_id: group_subject_id
    };

    // console.log("postData----122-", postData,)
    // console.log("token----122-", token)

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_STORE_ONLINE_EXAM_QUESTIONS_ANSWERS_SCHOLASTIC_EXAM_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });

}

//Get Demo Competitive exam questions
export async function demoCompetitiveExamQuestions() {
    /* let getData = localStorage.getItem('userDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;
    let standard = JSON.parse(getData).standard; */

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;
    let standard = JSON.parse(getData).standard;
    let board = JSON.parse(getData).board_code;

    const postData = {
        standard: standard == "" || standard == undefined ? "" : standard,
        student_id: student_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_DEMO_COMPETITIVE_EXAM_QUESTIONS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

//Get Demo Assessment List
export async function demoAssessmentCountList(newStudentid) {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: newStudentid == 0 || newStudentid == null ? student_id : newStudentid
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_DEMO_ASSESSMENT_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

//scholastic Assessment List 
export async function onlineScholasticAssessmentDetails(examid) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let registerUserId = JSON.parse(getData).id;

    const postData = {
        student_id: registerUserId,
        exam_unique_id: examid
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_EXAM_ONLINE_ASSESSMENT_SCHOLASTIC_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

//Competitive Assessment List 
export async function onlineCompetitiveAssessmentDetails(examid) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let registerUserId = JSON.parse(getData).id;

    const postData = {
        student_id: registerUserId,
        exam_unique_id: examid
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_ONLINE_ASSESSMENT_EXAM_DETAILS_COMPETIVE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

//Get Demo scholastic exam questions
export async function scholasticIntermExamSubmitforSubscriber(exam_type, branch, chapter, set_no, examdata, subject_id, exam_category, time_used, questionNo, group_subject_id,) {
    // console.log("1 :" + exam_type, "2:" + branch, "3:" + chapter, "4:" + set_no, "5:" + examdata, "6:" + subject_id, "7:" + exam_category, "8:" + time_used, "9:" + questionNo)
    let token;
    let registerUserId;
    let exam_unique_id;

    let getData = await AsyncStorage.getItem('crestestUserDetails');

    if (getData != null && getData != undefined && getData != '') {
        token = JSON.parse(getData).token;
        registerUserId = JSON.parse(getData).id;
        exam_unique_id = JSON.parse(getData).exam_unique_id;
    }
    const postData = {
        student_id: registerUserId,
        exam_unique_id: exam_unique_id,
        exam_type: exam_type,
        branch: branch,
        chapter: chapter,
        set_no: set_no,
        examdata: examdata,
        subject_id: subject_id,
        exam_category_id: exam_category,
        exam_time: time_used,
        last_visited_ques_no: questionNo,
        group_subject_id:group_subject_id,
    };
    // console.log("postData----", postData)

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_INTERM_STORE_ONLINE_EXAM_ANSWERS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}