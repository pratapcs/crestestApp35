import {
    getExamCategories, 
    getExamCategorySubjectsList, 
    getLibraryCategories, 
    getArchiveCategory,
    getArchiveLibraryCategory
} from '../../services/ExamCategoryService';

import {
    logout,
} from '../actions/AuthActions';

import {
    GET_EXAM_CATEGORIES_LIST,
    EXAM_CATEGORIES_LIST_SUCCESS,
    EXAM_CATEGORIES_LIST_FAILURE,
    CHOOSE_EXAM_CATEGORY,
    CHOOSE_EXAM_CATEGORY_REQUEST,
    GET_PURCHAGED_GROUP_LIST,
    GET_EXAM_CATEGORIES_LIBRARY,
    ARCHIVE_CLASS,
} from '../constants';
import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

export function getCategoryData(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getExamCategories()
            .then((response) => {
                // console.log("getCategoryData--->>>>>>>>>>>44>>>>.", response.data)
                if(response.data.status == 200){
                    dispatch(getExamCategoriesAction(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                }else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getPurchasedGroupList(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getExamCategorySubjectsList()
            .then((response) => {
                if(response.data.status == 200){
                    dispatch(getExamGroupPurchasedListAction(response.data.subjects_list));
                    Emitter.emit(Events.HIDE_PRELOADER);
                }else if (response.data.status == 400) {
                    dispatch(logout(props));
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getLibraryCategoryData(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getLibraryCategories()
            .then((response) => {
                if(response.data.status == 200){
                    dispatch(getLibraryCategoriesAction(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                }else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    // utility.showError(response.data.msg);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getArchiveLibraryCategoryData(class_no, archiveLibraryCategoryCallBack, props) {
    return (dispatch) => {
        getArchiveLibraryCategory(class_no)
            .then((response) => {
                if(response.data.status == 200){
                    archiveLibraryCategoryCallBack(response.data.data);
                }else if (response.data.status == 400) {
                    dispatch(logout(props));
                    // utility.showError(response.data.msg);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function getArchiveCategoryData(class_no, archiveCategoryCallBack, props) {
    return (dispatch) => {
        getArchiveCategory(class_no)
            .then((response) => {
                if(response.data.status == 200){
                    // dispatch(getArchiveClassAction(class_no))
                    archiveCategoryCallBack(response.data.data);
                }else if (response.data.status == 400) {
                    dispatch(logout(props));
                    // utility.showError(response.data.msg);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function getExamCategoriesAction(data) {
    return {
        type: GET_EXAM_CATEGORIES_LIST,
        payload: data,
    };
}

export function getExamGroupPurchasedListAction(data) {
    return {
        type: GET_PURCHAGED_GROUP_LIST,
        payload: data,
    };
}

export function examCategoriesListSuccessAction(data) {
    return {
        type: EXAM_CATEGORIES_LIST_SUCCESS,
        payload: data,
    };
}

export function examCategoriesListFailureAction(data) {
    return {
        type: EXAM_CATEGORIES_LIST_FAILURE,
        payload: data,
    };
}

export function selectExamCategoryAction(data) {
    return {
        type: CHOOSE_EXAM_CATEGORY,
        payload: data,
    };
}

export function selectExamCategoryRequestAction(data) {
    return {
        type: CHOOSE_EXAM_CATEGORY_REQUEST,
        payload: data,
    };
}
export function getLibraryCategoriesAction(data) {
    return {
        type: GET_EXAM_CATEGORIES_LIBRARY,
        payload: data,
    };
}

export function getArchiveClassAction(data) {
    return {
        type: ARCHIVE_CLASS,
        payload: data,
    };
}

