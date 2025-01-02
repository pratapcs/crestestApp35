
import {
    getBoardList,
    getSchoolList
} from '../../services/BoardService';

import {
    logout,
} from '../actions/AuthActions';

import {
    GET_BOARD_LIST,
    BOARD_LOADING,
    SCHOOL_LIST_FAILURE,
    SCHOOL_LIST_SUCCESS,
    SELECT_SCHOOL_LIST,
    SCHOOL_NAME_SHOWING_LOADER
} from '../constants';

import * as utility from '../../utility/Utility';

export function getBoardData(props) {
    return (dispatch) => {
        getBoardList()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getBoardAction(response.data.data));
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    utility.showError(response.data.msg);
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
                utility.showError(error.response.data);
            });
    };
}

export function getSchoolListData(board, props) {
    return (dispatch) => {
        getSchoolList(board)
            .then((response) => {
                // console.log("getSchoolListData---11", response )
                if (response.data.status == 200) {
                    // if (response.data.data != '') {
                        dispatch(getSchoolListSuccessAction(response.data.data));
                    // } else {
                    //     dispatch(getSchoolListFailureAction(response.data.data));
                    // }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    utility.showError(response.data.msg);
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
                utility.showError(error.response.data);
            });
    };
}

export function getBoardAction(data) {
    return {
        type: GET_BOARD_LIST,
        payload: data,
    };
}

export function loadingBoardAction(status) {
    return {
        type: BOARD_LOADING,
        payload: status,
    };
}

export function getSchoolListSuccessAction(status) {
    return {
        type: SCHOOL_LIST_SUCCESS,
        payload: status,
    };
}

export function getSchoolListFailureAction(status) {
    return {
        type: SCHOOL_LIST_FAILURE,
        payload: status,
    };
}

export function selectSchoolNameListAction(status) {
    return {
        type: SELECT_SCHOOL_LIST,
        payload: status,
    };
}

export function schoolNameShowingLoaderAction(status) {
    return {
        type: SCHOOL_NAME_SHOWING_LOADER,
        payload: status,
    };
}


