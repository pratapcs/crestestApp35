import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getEventHistoryList() {
    
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_EVENT_HISTORY_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });

}

export async function likeEventHistory(event_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        event_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.LIKE_EVENT_HISTORY_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function submitFeedback(content) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        content
    };
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SUBMIT_FEEDBACK_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

