import {
    getElibraryContent,
    getDemoElibraryContent,
    getOnlineConceptMap,
    elibraryGetsubjectList,
    postStoreElibraryTimeSpend,
    getStoreElibraryVisit,
    getAwsCredentialsDetails
} from '../../services/ElibraryService';

import {
    ELIBRARY_CONTENT_SUCCESS,
    ELIBRARY_CONTENT_FAILURE,
    ELIBRARY_DEMO_CONTENT_SUCCESS,
    ELIBRARY_DEMO_CONTENT_FAILURE,
    ELIBRARY_CONTENT_REQUEST,
    ELIBRARY_LOADING,
    ELIBRARY_SHOW_CALL_ICON,
    ELIBRARY_CATEGORY,
    ELIBRARY_SCHOLASTIC_CATEGORY,
    ELIBRARY_GETSUBJECT_LIST,
    ELIBRARY_GET_LAST_SUBJECT_LIST,
    ELIBRARY_LIST_ACTIVE_PAGE,
    ELIBRARY_AWS_CREDENTIAL_DETAILS
} from '../constants';

import { decode as base64_decode, encode as base64_encode } from 'base-64';

import {
    logout,
} from '../actions/AuthActions';

// import * as utility from '../../utility/Utility';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

export function getPdfContentData(exam_category_id, branch_id, chapter_id, exam_type_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getElibraryContent(exam_category_id, branch_id, chapter_id, exam_type_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getElibraryContentSuccessAction(response.data.data));
                        let pdfEncodePath = base64_encode(response.data.data);
                        props.push({ pathname: `/demo-e-library-pdf/${pdfEncodePath}`, state: { elibraryPdfPath: response.data.data } });
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }
                } else if (response.data.status == 400) {
                    props.push('/dashboard');
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
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

export function getDemoPdfContentData(id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getDemoElibraryContent(id)
            .then((response) => {
                
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getDemoElibraryContentSuccessAction(response.data.data));
                        let pdfEncodePath = base64_encode(response.data.data);

                        props.navigation.navigate('nonAuthScenes', {
                            screen: "PdfViewer",
                            params:{elibraryPdfPath: response.data.data}
                        });

                        // props.push({ pathname: `/demo-e-library-pdf/${pdfEncodePath}`, state: { elibraryPdfPath: response.data.data } });
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }
                } else if (response.data.status == 400) {
                    props.navigation.navigate('drawerScenes', {
                        screen: 'dashboard',
                        params: { data: 0 },
                    })
                    // props.push('/dashboard');
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } 

            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: error.response.data });
            });
    };
}

export function getOnlineConceptMapDetails(category_id, type_id, chapter_id, item, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getOnlineConceptMap(category_id, type_id, chapter_id)
            .then((response) => {
                // console.log("getOnlineConceptMapDetails----", response.data)
                if (response.data.status == 200) {
                    if (response.data.data) {
                        // let pdfEncodePath = base64_encode(response.data.data);
                        // props.push({ pathname: `/demo-e-library-pdf/${pdfEncodePath}`, state: { elibraryPdfPath: response.data.data, item: item, } });
                        let pdfEncodePath = base64_encode(response.data.data);

                        props.navigation.navigate('nonAuthScenes', {
                            screen: "PdfViewer",
                            params:{elibraryPdfPath: response.data.data, item: item}
                        });
                        // Emitter.emit(Events.HIDE_PRELOADER);
                    }
                } else {
                    props.navigation.navigate('drawerScenes', {
                        screen: 'Dashboard',
                        params: { data: 0 },
                    })
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    // Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

                // dispatch(elibraryLoading(false));
            })
            .catch((error) => {
                // dispatch(elibraryLoading(false));
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: error.response.data });
            });
    };
}

export function elibraryGetsubjectListDetails(exam_category, exam_type_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        elibraryGetsubjectList(exam_category, exam_type_id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(elibraryGetsubjectListAction(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {
                    //
                }
            })
            .catch((error) => {
                Emitter.emit(Events.HIDE_PRELOADER);
                // dispatch(elibraryLoading(false));
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: error.response.data });
            });
    };
}

export function postStoreElibraryTimeSpendDetails(subject_id, time_spent, chapter_shortcode, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        postStoreElibraryTimeSpend(subject_id, time_spent, chapter_shortcode)
            .then((response) => {
                // console.log(".......****.........", response)
                /* if (response.data.status == 200) {
                    dispatch(elibraryGetsubjectListAction(response.data.data));
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    return;
                } else {
                    //
                } */
                Emitter.emit(Events.HIDE_PRELOADER);
            })
            .catch((error) => {
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: error.response.data });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getStoreElibraryVisitData(subject_id, chapter_shortcode, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getStoreElibraryVisit(subject_id, chapter_shortcode)
            .then((response) => {
                // console.log("*****------", response)
                /* if (response.data.status == 200) {
                    dispatch(getBranchIdByChapterDataAction(response.data.data));
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    return;
                }
                dispatch(elibraryLoading(false)); */
                // Emitter.emit(Events.HIDE_PRELOADER);
            })
            .catch((error) => {
                //console.log(error);
                // dispatch(elibraryLoading(false));
                Emitter.emit(Events.HIDE_PRELOADER);
                // utility.showError(error.response.data);
            });
    };
}

export function getAwsCredentialsData(props) {
    // Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getAwsCredentialsDetails()
            .then((response) => {
                // console.log("*****------", response.data)
                if (response.data.status == 200) {
                    dispatch(awsCredentialsDetailsAction(response.data));
                }
                // Emitter.emit(Events.HIDE_PRELOADER);
            })
            .catch((error) => {
                //console.log(error);
                // dispatch(elibraryLoading(false));
                Emitter.emit(Events.HIDE_PRELOADER);
                // utility.showError(error.response.data);
            });
    };
}



export function getElibraryContentSuccessAction(data) {
    return {
        type: ELIBRARY_CONTENT_SUCCESS,
        payload: data,
    };
}

export function getElibraryContentFailureAction(data) {
    return {
        type: ELIBRARY_CONTENT_FAILURE,
        payload: data,
    };
}

export function getDemoElibraryContentSuccessAction(data) {
    return {
        type: ELIBRARY_DEMO_CONTENT_SUCCESS,
        payload: data,
    };
}

export function getDemoElibraryContentFailureAction(data) {
    return {
        type: ELIBRARY_DEMO_CONTENT_FAILURE,
        payload: data,
    };
}

export function getElibraryContentRequest(data) {
    return {
        type: ELIBRARY_CONTENT_REQUEST,
        payload: data,
    };
}
export function elibraryLoading(status) {
    return {
        type: ELIBRARY_LOADING,
        payload: status,
    };
}

export function eliraryShowCallIcon(status) {
    return {
        type: ELIBRARY_SHOW_CALL_ICON,
        payload: status,
    };
}

export function eliraryCategoryAction(status) {
    return {
        type: ELIBRARY_CATEGORY,
        payload: status,
    };
}

export function eliraryScholasticCategoryAction(status) {
    return {
        type: ELIBRARY_SCHOLASTIC_CATEGORY,
        payload: status,
    };
}

export function elibraryGetsubjectListAction(status) {
    return {
        type: ELIBRARY_GETSUBJECT_LIST,
        payload: status,
    };
}

export function elibraryGetLastsubjectListAction(status) {
    return {
        type: ELIBRARY_GET_LAST_SUBJECT_LIST,
        payload: status,
    };
}

export function elibraryListActivePageAction(status) {
    return {
        type: ELIBRARY_LIST_ACTIVE_PAGE,
        payload: status,
    };
}

export function awsCredentialsDetailsAction(status) {
    return {
        type: ELIBRARY_AWS_CREDENTIAL_DETAILS,
        payload: status,
    };
}
