import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAcademicYearByBoardId(board_id) {
    const postData = {
        board_id
    };
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_ACADEMIC_YEAR_BY_BOARD_ID_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            // Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getAcademicSessionExistForExam(category,board_type) {
    
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;
    let board_id = JSON.parse(getData).board;
    let class_id = JSON.parse(getData).class_id;

    const postData = {
        category,
        board_type: board_id,
    };
    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_ACADEMIC_SESSION_EXIST_OR_EXPIRES_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}