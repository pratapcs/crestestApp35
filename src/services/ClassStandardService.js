import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export async function getClassStandardByToken() {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_CLASS_STANDARD_LIST_AFTER_LOGIN_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}
export async function getArchiveStandardList() {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_ARCHIVE_STANDARD_LIST_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}