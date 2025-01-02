import {
    GET_CLASS_STANDARD_LIST,
    SCHOOL_LIST_SUCCESS,
    IS_SCHOOL_LIST_SUCCESS,
    GET_BOARD_LIST
} from '../constants';

import {
    logout
} from '../../store/actions/AuthActions';

import {
    getClassStandardList, getBoardList, getSchoolList,
} from '../../services/CommonService';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

import { storeData, getData } from "../../utils/Util";



export function getClassStandardData() {
    return (dispatch) => {
        getClassStandardList()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getClassStandardAction(response.data.data));
                } else if (response.data.status == 400) {
                    dispatch(logout());
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function getBoardData() {
    return (dispatch) => {
        getBoardList()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getBoardAction(response.data.data));
                } else if (response.data.status == 400) {
                    dispatch(logout());
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function getSchoolListData(board) {
    return (dispatch) => {
        getSchoolList(board)
            .then((response) => {
                // console.log("*****-getSchoolListData---", board, response.data.data)
                if (response.data.status == 200) {
                    dispatch(getSchoolListSuccessAction(response.data.data));
                } else if (response.data.status == 400) {
                    dispatch(logout());
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getClassStandardAction(data) {
    return {
        type: GET_CLASS_STANDARD_LIST,
        payload: data,
    };
}

export function getBoardAction(data) {
    return {
        type: GET_BOARD_LIST,
        payload: data,
    };
}

export function getSchoolListSuccessAction(status) {
    return {
        type: SCHOOL_LIST_SUCCESS,
        payload: status,
    };
}
