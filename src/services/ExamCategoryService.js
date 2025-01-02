import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getExamCategories() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_EXAM_CATEGORIES_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getExamCategorySubjectsList(){
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_PURCHASED_GROUP_LIST,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getLibraryCategories() {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_EXAM_CATEGORIES_LIBRARY_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getArchiveCategory(class_no) {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
  
    let postData = {
      class: class_no,
    };
  
    return axios({
      url: GlobalConfigs.API_URL + Apis.GET_ARCHIVE_EXAM_CATEGORIES_API,
      method: "POST",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: postData,
    });
  }

  export async function getArchiveLibraryCategory(class_no) {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    let postData = {
      class: class_no,
    };
  
    return axios({
      url: GlobalConfigs.API_URL + Apis.GET_ARCHIVE_EXAM_CATEGORIES_LIBRARY_API,
      method: "POST",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: postData,
    });
  }