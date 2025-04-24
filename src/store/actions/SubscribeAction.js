import {
    getScSubject,
    getCmSubject,
    getOnlyLibraryCm,
    getOnlyLibrarySc,
    addtocart,
    getcartlist,
    proceedbuy,
    removeAllSubscribe,
    removeSubscribe,
    getScrollingText,
    getScholasticPrice,
    afterPurchasedGetPurchased,
    getExamAssessmentList,
    getPurchased,
    getInvoicePDF,
    getsubscribedList,
    getLastPaymentDetailsData,
    getIntegratedSubject,
    cartSuccess
} from '../../services/SubjectService';

import { checkAutoLogin } from '../../services/AuthService';

import {
    registerdUserIsSubscribe,
    registerdUserElibraryIsSubscribe
} from './AuthActions';

import {
    GET_SC_SUBJECT_LIST,
    GET_CM_SUBJECT_LIST,
    SIDE_NAV_BAR,
    ADD_TO_CART,
    GET_CART_LIST,
    POST_PROCEED_BUY,
    SUBSCRIBE_LOADING,
    GET_ONLY_LIBRARY_CM_LIST,
    GET_ONLY_LIBRARY_SC_LIST,
    REMOVE_ALL_SUBSCRIBE,
    REMOVE_SUBSCRIBE,
    REMOVE_SUBJECT_LIST,
    SHOW_RIGHT_SIDE_NAV,
    SCROLLING_TEXT_SUCCESS,
    SCROLLING_TEXT_FAILURE,
    SCHOLASTIC_COMBINE_PRICE,
    SCHOLASTIC_COMBINE_PRICE_ID,
    GET_EXAM_ASSESSMENT_LIST,
    GET_TRANSATION_DETAILS,

    GET_SUBSCRIBED_LIST,
    GET_LAST_PAYMENT_DETAILS,
    REMOVE_LIBRARY_LIST,
    PREVOUSE_VALUE_NTSE,
    PREVOUSE_VALUE_NSTSE,
    GETSUBSCRIBED_LIST,
    GET_INTEGRATED_SUBSCRIPTION,
    ASSESSMENT_ACTIVE_PAGE,
    E_LIBRARY_SELECT_SUBJECTS_LIST,
    CHECK_BOX_STATUS,
    SCHOLASTIC_SUBSCRIPTION_SOURCE,
    COMPETITVE_SUBSCRIPTION_SOURCE,
    STORE_ASSESSMENT_FILTER_DATA_STORE,
    BACK_FROM_ASSESSMENT_DETAILS,
    SUBCRIPTION_COURSE_VALIDITY

} from '../constants';

// import * as utility from '../../utility/Utility';
import ReactNativeBlobUtil from 'react-native-blob-util'
import { Linking } from 'react-native';

import {
    logout,
} from '../actions/AuthActions';

// import jsPDF from 'jspdf';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';


export function getScSubjectData(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getScSubject() //board_id, cname,
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getScSubjectAction(response.data.data));
                    dispatch(subcriptionCourseValidiryAction({ course_validity: response.data?.course_validity, course_available: response.data?.course_available, checkProfile: response.data?.checkProfile }));
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
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getCmSubjectData(type, isVisableData, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getCmSubject(type)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getCmSubjectAction(response.data.data));
                    dispatch(subcriptionCourseValidiryAction({ course_validity: response.data?.course_validity, course_available: response.data?.course_available, checkProfile: response.data?.checkProfile }));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    console.log("@123--")
                    isVisableData();
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
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
                return;
            });
    };
}


export function getOnlyLibraryCmData(type, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getOnlyLibraryCm(type)
            .then((response) => {

                if (response.data.status == 200) {
                    dispatch(getOnlyLibraryCmAction(response.data.data));
                    dispatch(subcriptionCourseValidiryAction({ course_validity: response.data?.course_validity, course_available: response.data?.course_available, checkProfile: response.data?.checkProfile }));
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getOnlyLibraryScData(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getOnlyLibrarySc()
            .then((response) => {
                // console.log("getOnlyLibraryScData----", response.data)
                if (response.data.status == 200) {
                    dispatch(getOnlyLibraryScAction(response.data.data));
                    dispatch(subcriptionCourseValidiryAction({ course_validity: response.data?.course_validity, course_available: response.data?.course_available, checkProfile: response.data?.checkProfile }));
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function addToCartData(c_id, sub_id, sets, module, mock, type_id, class_no, amount, case_study, only_elibrary, isLibrary, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        addtocart(c_id, sub_id, sets, module, mock, type_id, class_no, amount, case_study, only_elibrary, isLibrary)
            .then((response) => {
                // console.log("response----", response.data)
                if (response.data.status == 200) {
                    dispatch(getCartData(props));
                    //dispatch(addToCartAction(response.data.data));
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
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getCartData(props) {
    // console.log("@1")
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getcartlist()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getCartAction(response.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    dispatch(logout(props));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {
                    //
                }
            })
            .catch((error) => {
                // console.log("error-----getCartData-----")
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function proceedbuyData(list, amount, trans_id, regUserSubOrNot, is_subscribe_e_library, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        proceedbuy(amount, trans_id)
            .then((response) => {
                if (response.data.status == 200) {
                    props.push({ pathname: '/online-PaymentGateWay', state: { access_code: response.data.data.access_code, encrypted_data: response.data.data.encrypted_data } });
                }
                if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                console.log("error----33-", error)
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
        // 
    }

}
export function afterPurchasedGetPurchasedData() {

    let olduserDetailsData = JSON.parse(localStorage.userDetails);

    return (dispatch) => {
        Emitter.emit(Events.SHOW_PRELOADER);
        afterPurchasedGetPurchased()
            .then((response) => {
                if (response.data.status == 200) {
                    olduserDetailsData.exam_unique_id = response.data.exam_unique_id;

                    dispatch(registerdUserIsSubscribe(response.data.is_subscribe));
                    dispatch(registerdUserElibraryIsSubscribe(response.data.is_subscribe_e_library))
                    dispatch(removeAllAction());
                    // localStorage.setItem('userDetails', JSON.stringify(olduserDetailsData));

                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });

                } else if (response.data.status == 400) {
                    dispatch(logout("./page-login"));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                console.log("error---11--", error)
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
        // 
    }
}

export function getPurchasedList(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getPurchased()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getTransationAction(response.data));
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
                console.log("error")
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
            });
    };
}

export function getInvoicePDFData(transaction_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getInvoicePDF(transaction_id)
            .then((response) => {
                // console.log('response....', response.data.pdf_file_path);
                Linking.openURL(response.data.pdf_file_path)
                Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                /* // const source = "https://www.africau.edu/images/default/sample.pdf";
                const source = "https://www.africau.edu/images/default/sample.pdf";
                let dirs = ReactNativeBlobUtil.fs.dirs;
                ReactNativeBlobUtil.config({
                    fileCache: true,
                    appendExt: 'pdf',
                    path: `${dirs.DocumentDir}/${fileName}`,
                    addAndroidDownloads: {
                        useDownloadManager: true,
                        notification: true,
                        title: fileName,
                        description: 'File downloaded by download manager.',
                        mime: 'application/pdf',
                    },
                })
                    .fetch('GET', fileUrl)
                    .then((res) => {
                        
                        // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
                        // whereas in android, the download manager is handling the download for us.
                        if (Platform.OS === 'ios') {
                            const filePath = res.path();
                            let options = {
                                type: 'application/pdf',
                                url: filePath,
                                saveToFiles: true,
                            };
                            Share.open(options)
                                .then((resp) => console.log(resp))
                                .catch((err) => console.log(err));
                        }
                    })
                    .catch((err) => console.log('BLOB ERROR -> ', err)); */
                /* const doc = new jsPDF({
                    format: 'a4',
                    unit: 'px',
                });

                doc.html(response.data.pdffile.content, {
                    callback(doc) {
                        doc.save('purchased_pdf');
                    },
                }); */
                Emitter.emit(Events.HIDE_PRELOADER);

            })
            .catch((error) => {
                console.log("error-----33")
                Emitter.emit(Events.HIDE_PRELOADER);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
            });
    };
}

export function getIntegratedScSubjectData(board_id, class_id, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getIntegratedSubject(board_id, class_id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getIntegratedScSubjectAction(response.data.data));

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
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function removeAllData() {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        removeAllSubscribe()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(removeAllAction());
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER)
                } else if (response.data.status == 400) {
                    dispatch(logout("./page-login"));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {
                    //
                }

            })
            .catch((error) => {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function removeData(id, amount) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        removeSubscribe(id)
            .then((response) => {
                // console.log("removeData----", response)
                if (response.data.status == 200) {
                    dispatch(removeAction({ 'id': id, 'amount': amount }));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    dispatch(logout("./page-login"));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {
                    //
                }

            })
            .catch((error) => {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getSubscriptionTextData(props) {

    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getScrollingText()
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scrollingTextSuccessAction(response.data.data));
                    } else {
                        dispatch(scrollingTextFaillureAction(response.data.data));
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
            });
    };
}

export function getSCholasticCombinePriceData(recid, set_no, module, mock, elibrary, case_studies, props) {
    // Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getScholasticPrice(recid, set_no, module, mock, elibrary, case_studies)
            .then((response) => {
                // console.log("$$$$$$$$$1111----", response.data.data)
                if (response.data.status == 200) {
                    dispatch(scholasticCombinationPriceSuccessAction(response.data.data));
                    dispatch(scholasticCombinationPriceIdAction(recid));
                    // Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    // Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }

            })
            .catch((error) => {
                console.log(error);
                Emitter.emit(Events.HIDE_PRELOADER);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
            });
    };
}

export function getExamAssessmentListDetails(category, groupSubject, subject, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getExamAssessmentList(category, groupSubject, subject)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getExamAssessmentListAction(response.data.data));
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                Emitter.emit(Events.HIDE_PRELOADER);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
            });
    };
}

export function getsubscribedListDetails(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getsubscribedList()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getsubscribedListAction(response.data.data));
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
            });
    };
}

export function getLastPaymentDetailsDataDetails(orderId, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getLastPaymentDetailsData(orderId)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getLastPaymentDetailsDataAction(response.data.data));
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
            });
    };
}

export function cartSuccessAction(order_id, status, signature_algorithm, status_id, signature, props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        cartSuccess(order_id, status, signature_algorithm, status_id, signature)
            .then((response) => {
                console.log("cartSuccessAction----", response.data)
                // Emitter.emit(Events.HIDE_PRELOADER);
                if (response.data.status_id == 21) {
                    dispatch(getLastPaymentDetailsDataAction(response.data));
                    // Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    props.navigation.navigate('nonAuthScenes', {
                        screen: "PaymentSuccessful",
                        params: { statusId: 21 },
                    })
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status_id == 26) {
                    props.navigation.navigate('nonAuthScenes', {
                        screen: "PaymentSuccessful",
                        params: { statusId: 26 },
                    })
                }

                /* else if (response.data.status == 400) {
                    dispatch(logout("./page-login"));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {
                    //
                } */

            })
            .catch((error) => {
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: "Error!", message: response.data.msg });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}




export function getScSubjectAction(data) {
    return {
        type: GET_SC_SUBJECT_LIST,
        payload: data,
    };
}
export function getCmSubjectAction(data) {
    return {
        type: GET_CM_SUBJECT_LIST,
        payload: data,
    };
}
export function getOnlyLibraryCmAction(data) {
    return {
        type: GET_ONLY_LIBRARY_CM_LIST,
        payload: data,
    };
}
export function getOnlyLibraryScAction(data) {
    return {
        type: GET_ONLY_LIBRARY_SC_LIST,
        payload: data,
    };
}
export function addToCartAction(data) {
    return {
        type: ADD_TO_CART,
        payload: data,
    };
}
export function getCartAction(data) {
    return {
        type: GET_CART_LIST,
        payload: data,
    };
}
export function getTransationAction(data) {
    return {
        type: GET_TRANSATION_DETAILS,
        payload: data,
    };
}
export function proceedbuyAction(data) {
    return {
        type: POST_PROCEED_BUY,
        payload: data,
    };
}
export function removeAllAction(data) {
    return {
        type: REMOVE_ALL_SUBSCRIBE,
        payload: data,
    };
}
export function removeAction(id) {
    return {
        type: REMOVE_SUBSCRIBE,
        payload: id,
    };
}
export function removeSubjectListAction(status) {
    return {
        type: REMOVE_SUBJECT_LIST,
        payload: status,
    };
}

export function removeLibraryListAction(status) {
    return {
        type: REMOVE_LIBRARY_LIST,
        payload: status,
    };
}

export function sideNavAction(status) {
    return {
        type: SIDE_NAV_BAR,
        payload: status,
    };
}
export function subscribeLoading(status) {
    return {
        type: SUBSCRIBE_LOADING,
        payload: status,
    };
}

export function showRightNavAction(status) {
    return {
        type: SHOW_RIGHT_SIDE_NAV,
        payload: status,
    };
}

export function scrollingTextSuccessAction(status) {
    return {
        type: SCROLLING_TEXT_SUCCESS,
        payload: status,
    };
}
export function scrollingTextFaillureAction(status) {
    return {
        type: SCROLLING_TEXT_FAILURE,
        payload: status,
    };
}

export function scholasticCombinationPriceSuccessAction(status) {

    return {
        type: SCHOLASTIC_COMBINE_PRICE,
        payload: status,
    };
}

export function scholasticCombinationPriceIdAction(status) {
    return {
        type: SCHOLASTIC_COMBINE_PRICE_ID,
        payload: status,
    };
}

export function getExamAssessmentListAction(status) {

    return {
        type: GET_EXAM_ASSESSMENT_LIST,
        payload: status,
    };
}

export function getsubscribedListAction(status) {

    return {
        type: GET_SUBSCRIBED_LIST,
        payload: status,
    };
}

export function getLastPaymentDetailsDataAction(status) {
    return {
        type: GET_LAST_PAYMENT_DETAILS,
        payload: status,
    };
}

export function subscriptionPreviousValueNTSEAction(status) {
    return {
        type: PREVOUSE_VALUE_NTSE,
        payload: status,
    };
}

export function subscriptionPreviousValueNSTSEAction(status) {
    return {
        type: PREVOUSE_VALUE_NSTSE,
        payload: status,
    };
}


export function getIntegratedScSubjectAction(status) {
    return {
        type: GET_INTEGRATED_SUBSCRIPTION,
        payload: status,
    };
}

export function assessmentActivePageAction(status) {
    // console.log("assessmentActivePageAction---", status)
    return {
        type: ASSESSMENT_ACTIVE_PAGE,
        payload: status,
    };
}

export function eLibrarySelectSubjectsListAction(status) {
    // console.log("eLibrarySelectSubjectsListAction---", status)
    return {
        type: E_LIBRARY_SELECT_SUBJECTS_LIST,
        payload: status,
    };
}
export function checkBoxStatusAction(status) {
    return {
        type: CHECK_BOX_STATUS,
        payload: status,
    };
}

export function scholasticSubscriptionSourceAction(status) {
    return {
        type: SCHOLASTIC_SUBSCRIPTION_SOURCE,
        payload: status,
    };
}

export function compititiveSubscriptionSourceAction(status) {
    return {
        type: COMPETITVE_SUBSCRIPTION_SOURCE,
        payload: status,
    };
}
export function storeAssessmentFilterDataStoreAction(status) {
    return {
        type: STORE_ASSESSMENT_FILTER_DATA_STORE,
        payload: status,
    };
}

export function backFromAssessmentDetailsAction(status) {
    // console.log("backFromAssessmentDetailsAction---", status)
    return {
        type: BACK_FROM_ASSESSMENT_DETAILS,
        payload: status,
    };
}

export function subcriptionCourseValidiryAction(data) {
    return {
        type: SUBCRIPTION_COURSE_VALIDITY,
        payload: data,
    };
}