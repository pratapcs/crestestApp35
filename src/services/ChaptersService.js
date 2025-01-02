import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getChapterList(subject_id, set_no, group_subject_id) {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        subject_id,
        set_no,
        group_subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_CHAPTERS_LIST_FOR_SCHOLATIC_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getExamCompletedChapterList(set_no, subject_id, categoryId, exam_type, subtype, group_subject_id) {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: student_id,
        subject_id: subject_id,
        set_no: set_no,
        exam_category_id: categoryId,
        exam_type: exam_type,
        exam_subtype: subtype,
        group_subject_id:group_subject_id,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_EXAM_COMPLETED_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getBranchIdByChapterList(branch_id) {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        branch_id,
    };
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_BRANCH_ID_BY_CHAPTERS_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}