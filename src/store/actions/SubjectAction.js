import {
    getScSubject,
    getPurchasedSubject,
    getPurchasedLibrarySubject,
    getAllSubject,
    getCompetitiveSubject,
    getPurchasedGroupList,
    getPurchasedSubjectslistScholastic,
    cartDetails,
    getArchivePurchasedGroupList,
} from '../../services/SubjectService';
import {
    logout,
} from '../actions/AuthActions';

import {
    GET_SC_SUBJECT_LIST,
    PURCHASED_SUBJECTS_LIST_REQUEST,
    PURCHASED_SUBJECTS_LIST_SUCCESS,
    PURCHASED_SUBJECTS_LIST_FAILURE,
    GET_PURCHASED_E_LIBRARY_SUBJECTS_LIST,
    GET_ALL_SUBJECT_LIST,
    GET_COMPETITIVE_SUBJECT_LIST,
    GET_PURCHASED_GROUP_LIST,
    GET_PURCHASED_SUBJECTS_LIST_SCHOLASTIC
} from '../constants';

// import * as utility from '../../utility/Utility';
import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

export function getScSubjectData(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getScSubject()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getScSubjectAction(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getPurchasedSubjectData(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getPurchasedSubject()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(purchasedSubjectsListSuccessAction(response.data.data));
                } else {
                    dispatch(purchasedSubjectsListFailureAction(response.data.data));
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getPurchasedLibrarySubjectDetails(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getPurchasedLibrarySubject()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getPurchasedLibrarySubjectAction(response.data.data));
                } else {
                    utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getAllSubjectData(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getAllSubject()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getAllSubjectAction(response.data.data));
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // utility.showError(response.data.msg);
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getCompititveSubjectData(exam_type_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getCompetitiveSubject(exam_type_id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getCompetitiveSubjectAction(response.data.data));
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getPurchasedGroupListData(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getPurchasedGroupList()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getPurchasedGroupListAction(response.data.subjects_list));
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
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getPurchasedSubjectslistScholasticData(subject_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getPurchasedSubjectslistScholastic(subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getPurchasedSubjectslistScholasticAction(response.data.data));
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
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function cartDetailsData() {
    // Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        cartDetails()
            .then((response) => {
                console.log("response----", response)
                /* if (response.data.status == 200) {
                    dispatch(getPurchasedSubjectslistScholasticAction(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } */
            })
            .catch((error) => {
                console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                // utility.showError(error.response.data);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getArchivePurchasedGroupListData(class_no,props) {
    return (dispatch) => {
        getArchivePurchasedGroupList(class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getPurchasedGroupListAction(response.data.subjects_list ));
                }
            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function getScSubjectAction(data) {
    return {
        type: GET_SC_SUBJECT_LIST,
        payload: data,
    };
}

export function purchasedSubjectsListRequestAction(data) {
    return {
        type: PURCHASED_SUBJECTS_LIST_REQUEST,
        payload: data,
    };
}

export function purchasedSubjectsListSuccessAction(data) {
    return {
        type: PURCHASED_SUBJECTS_LIST_SUCCESS,
        payload: data,
    };
}

export function getPurchasedLibrarySubjectAction(data) {
    return {
        type: GET_PURCHASED_E_LIBRARY_SUBJECTS_LIST,
        payload: data,
    };
}

export function purchasedSubjectsListFailureAction(data) {
    return {
        type: PURCHASED_SUBJECTS_LIST_FAILURE,
        payload: data,
    };
}
export function getAllSubjectAction(data) {
    return {
        type: GET_ALL_SUBJECT_LIST,
        payload: data,
    };
}

export function getCompetitiveSubjectAction(data) {
    return {
        type: GET_COMPETITIVE_SUBJECT_LIST,
        payload: data,
    };
}

export function getPurchasedGroupListAction(data) {
    return {
        type: GET_PURCHASED_GROUP_LIST,
        payload: data,
    };
}

export function getPurchasedSubjectslistScholasticAction(data) {
    return {
        type: GET_PURCHASED_SUBJECTS_LIST_SCHOLASTIC,
        payload: data,
    };
}
