
import {
    getChapterList,
    getExamCompletedChapterList,
    getBranchIdByChapterList
} from '../../services/ChaptersService';

import {
    onlineExamIdAction
} from '../actions/ScholasticAction';

import {
    GET_CHAPTER_LIST,
    CHAPTER_LOADING,
    EXAM_COMPLETED_LIST_SUCCESS,
    EXAM_COMPLETED_LIST_FAILURE,
    GET_BRANCH_ID_BY_CHAPTER_LIST
} from '../constants';

import {
    logout,
} from '../actions/AuthActions';

// import * as utility from '../../utility/Utility';
import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

export function getChapterData(subject_id, set_no, group_subject_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getChapterList(subject_id, set_no, group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getChapterAction([]));
                    dispatch(getChapterAction(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
                // dispatch(loadingChapterAction(false));
            })
            .catch((error) => {
                //console.log(error);
                dispatch(loadingChapterAction(false));
                Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
                // utility.showError(error.response.data);
            });
    };
}

export function getExamCompletedListData(set_no, subject_id, categoryId, exam_type, subtype, group_subject_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getExamCompletedChapterList(set_no, subject_id, categoryId, exam_type, subtype, group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.completedexams != "") {
                        dispatch(examCompletedListSuccessAction(response.data.completedexams));
                        dispatch(onlineExamIdAction(response.data.completedexams[0].exam_unique_id)) //------------- Check
                    }else{
                        dispatch(examCompletedListSuccessAction(response.data.completedexams));
                        dispatch(onlineExamIdAction('')) //------------- Check
                    }

                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else if (response.data.status == 410) {
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    props.navigation.goBack()
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getBranchIdByChapterData(branch_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getBranchIdByChapterList(branch_id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getBranchIdByChapterDataAction(response.data.data));
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
                dispatch(loadingChapterAction(false));
            })
            .catch((error) => {
                //console.log(error);
                // dispatch(loadingChapterAction(false));
                Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getChapterAction(data) {
    return {
        type: GET_CHAPTER_LIST,
        payload: data,
    };
}

export function examCompletedListSuccessAction(data) {
    return {
        type: EXAM_COMPLETED_LIST_SUCCESS,
        payload: data,
    };
}
export function getBranchIdByChapterDataAction(data) {
    return {
        type: GET_BRANCH_ID_BY_CHAPTER_LIST,
        payload: data,
    };
}
export function examCompletedListFailureAction(data) {
    return {
        type: EXAM_COMPLETED_LIST_FAILURE,
        payload: data,
    };
}

export function loadingChapterAction(status) {
    return {
        type: CHAPTER_LOADING,
        payload: status,
    };
}
