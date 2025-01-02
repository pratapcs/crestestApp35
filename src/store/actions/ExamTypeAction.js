import {
    getExamType,
    getPurchaseExamType,
    getNtseExamType,
    getExamTypeLibrary,
    getArchiveExamType,
    getArchiveExamTypeLibrary
} from '../../services/ExamTypeService';

import {
    logout,
} from '../actions/AuthActions';

import {
    GET_EXAM_TYPE_LIST,
    GET_PURCHASE_EXAM_TYPE_LIST,
    GET_NTSE_EXAM_TYPE,
    GET_EXAM_TYPE_LIBRARY
} from '../constants';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

// import * as utility from '../../utility/Utility';

export function getExamTypeData(category, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getExamType(category)
            .then((response) => {
                console.log("getExamTypeData-->>>>", response.data)
                if (response.data.status == 200) {
                    dispatch(getExamTypeAction(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: error.response.data }); 
                
            });
    };
}

export function getPurchaseExamTypeData(history) {
    return (dispatch) => {
        getPurchaseExamType()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getPurchaseExamTypeAction(response.data.data));
                }

                if (response.data.status == 400) {
                    dispatch(logout(history));
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

export function getNtseExamTypeData(exam_category, exam_type_id, history) {
    return (dispatch) => {
        getNtseExamType(exam_category, exam_type_id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getNtseExamTypeAction(response.data.data));
                }
                if (response.data.status == 400) {
                    dispatch(logout(history));
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

export function getExamTypeLibraryData(category, history) {
    return (dispatch) => {
        getExamTypeLibrary(category)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getExamTypeLibraryAction(response.data.data));
                }
                if (response.data.status == 400) {
                    dispatch(logout(history));
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

export function getArchiveExamTypeData(category, class_no, props) {
    return (dispatch) => {
        getArchiveExamType(category,class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getExamTypeAction(response.data.data));
                }
                if (response.data.status == 400) {
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

export function getArchiveExamTypeLibraryData(category, class_no, props) {
    return (dispatch) => {
        getArchiveExamTypeLibrary(category, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getExamTypeLibraryAction(response.data.data));
                }
                if (response.data.status == 400) {
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


export function getExamTypeAction(data) {
    return {
        type: GET_EXAM_TYPE_LIST,
        payload: data,
    };
}
export function getPurchaseExamTypeAction(data) {
    return {
        type: GET_PURCHASE_EXAM_TYPE_LIST,
        payload: data,
    };
}

export function getNtseExamTypeAction(data) {
    return {
        type: GET_NTSE_EXAM_TYPE,
        payload: data,
    };
}

export function getExamTypeLibraryAction(data) {
    return {
        type: GET_EXAM_TYPE_LIBRARY,
        payload: data,
    };
}