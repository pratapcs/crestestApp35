import axios from 'axios';

import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';

export function getClassStandardList() {

    // let getData = localStorage.getItem('userDetails');
    // let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_CLASS_STANDARD_LIST_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            // Authorization: `Bearer ${token}`
        },
    });
}

export function getBoardList() {
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_BOARD_LIST_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            // Authorization: `Bearer ${token}`
        },
    });
}

export function getSchoolList(board) {
    
    const postData = {
        board,
    };
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOOL_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            // Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}
