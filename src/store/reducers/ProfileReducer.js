import {
    PROFILE_LOADING,
    UPDATE_PROFILES_DETAILS,
    SET_PROFILE_DATA,
    PROFILE_DATA_UPDATED,
    PROFILE_IMAGE,
    PROFILE_FILE,
    LOGOUT,
    // GET_PROFILES_DETAILS
} from '../constants';

const initialState = {
    profilePic: "",
    userName: "",
    showLoading: false,
    profileDataUpdated: null,
    profileImg: null,
    profileImageFile: [],
    details:{},
};
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData, getData, clearAllData } from "../../utils/Util";

export async function ProfileReducer(state = initialState, action) {

    /* if (action.type === GET_PROFILES_DETAILS) {
        return {
            ...state,
            details: action.payload,
            // userName: action.payload.fname,
            showLoading: false,
        };
    } */

    if (action.type === UPDATE_PROFILES_DETAILS) {
        // let getData = localStorage.getItem('userDetails');
        let getData = await AsyncStorage.getItem('crestestUserDetails');
        let data = JSON.parse(getData);
        data.profile_pic = action.payload.profile_pic;
        data.fname = action.payload.fname;
        data.lname = action.payload.lname;
        data.dob = action.payload.dob;
        data.gender = action.payload.gender;
        data.address = action.payload.address;
        data.pincode = action.payload.pincode;
        data.mobile = action.payload.mobile;
        data.board = action.payload.board;
        data.school_name = action.payload.school_name;
        data.school_address = action.payload.school_address;
        storeData("crestestUserDetails", JSON.stringify(data));
        return {
            ...state,
            profilePic: action.payload.profile_pic,
            userName: action.payload.fname,
            showLoading: false,
        };
    }

    if (action.type === SET_PROFILE_DATA) {
        return {
            ...state,
            profilePic: action.payload.profile_pic,
            userName: action.payload.fname,
            showLoading: false,
        };
    }

    if (action.type === PROFILE_LOADING) {
        return {
            ...state,
            showLoading: action.payload,
        };
    }
    if (action.type === PROFILE_DATA_UPDATED) {
        return {
            ...state,
            profileDataUpdated: action.payload,
        };
    }

    if (action.type === PROFILE_IMAGE) {
        return {
            ...state,
            profileImg: action.payload,
        };
    }
    if (action.type === PROFILE_FILE) {
        return {
            ...state,
            profileImageFile: action.payload,
        };
    }

    if (action.type === LOGOUT) {
        return {
            profilePic: "",
            userName: "",
            showLoading: false,
            profileDataUpdated: null,
            profileImg: null,
            profileImageFile: [],
        };
    }

    return state;
}


