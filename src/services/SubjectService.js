import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';

import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getScSubject() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;
    let board_id = JSON.parse(getData).board;
    let class_id = JSON.parse(getData).class_id;
    let standard = JSON.parse(getData).standard;

    const postData = {
        board_id,
        class_id:standard,
        student_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_EXAM_SCHOLASTIC_DETAILS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCmSubject(exam_type) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;
    let class_id = JSON.parse(getData).class_id;
    let standard = JSON.parse(getData).standard;

    const postData = {
        exam_type,
        class_id : exam_type == 1 ? 0 : standard,
        student_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_EXAM_COMPETITIVE_DETAILS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getOnlyLibraryCm(exam_type) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;
    // let class_id = JSON.parse(getData).class_id;
    let standard = JSON.parse(getData).standard;

    const postData = {
        exam_type,
        // class_id : exam_type != 2  || exam_type != 5 ? 0 : class_id,
        class_id : exam_type != 2  && exam_type != 5 ? 0 : standard,
        student_id
    };
    

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_ONLY_ELIBRARY_EXAM_COMPETITIVE_DETAILS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getOnlyLibrarySc() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;
    let board_id = JSON.parse(getData).board;
    let class_id = JSON.parse(getData).class_id;
    let standard = JSON.parse(getData).standard;

    const postData = {
        board_id,
        class_id:standard,
        student_id
    };
    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_ONLY_ELIBRARY_EXAM_SCHOLASTIC_DETAILS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function addtocart(c_id, sub_id, sets, module, mock, type_id, class_no, amount, casestudy, only_elibrary, has_library) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let id = JSON.parse(getData).id;

    const postData = {
        student_id: id,
        exam_category_id: c_id,
        subscription_id: sub_id,
        no_set: sets,
        no_module: module,
        no_mock: mock,
        exam_type_id: type_id,
        class: class_no,
        cart_amount: amount,
        no_casestudy: casestudy,
        only_elibrary,
        has_library
    };

    // console.log("postData----", postData)

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_ADD_TO_CART_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}
export async function getcartlist() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_CART_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getPurchased() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_PURCHASED_TRANSCTION_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getInvoicePDF(payment_trans_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        payment_trans_id
    }

    return axios({
        url: GlobalConfigs.API_URL + Apis.GENERATE_INVOICE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function proceedbuy(amount_paid, subscribtion_payment_trans_id) { //subscription_details,

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let student_id = JSON.parse(getData).id;
    let token = JSON.parse(getData).token;
    let name = JSON.parse(getData).fname + '' + JSON.parse(getData).lname;
    let email = JSON.parse(getData).email;
    let address = JSON.parse(getData).address;
    let pincode = JSON.parse(getData).pincode;
    let mobile = JSON.parse(getData).mobile;
    let order_id = subscribtion_payment_trans_id + Math.floor(Math.random() * 100)
    let domainName = process.env.REACT_APP_LMS_PAYMENT_GATEWAY_URL;

    const postData = {
        student_id: student_id,
        tid: subscribtion_payment_trans_id,
        merchant_id: 2350757,
        order_id: order_id,
        amount: amount_paid,
        currency: "INR",
        redirect_url: domainName + "payment_gateway/ccavResponseHandler.php",
        cancel_url: domainName + "payment_gateway/ccavResponseHandler.php",
        language: "EN",
        billing_name: name,
        billing_address: address == null || address == 'null' ? "" : address ,
        billing_city: "",
        billing_state: "",
        billing_zip: pincode,
        billing_country: "India",
        billing_tel: mobile,
        billing_email: email
    }
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_PAYMENTCALL_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });

    //// 
}

export async function removeAllSubscribe() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_REMOVE_ALL_SUBSCRIBE_CART_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function removeSubscribe(id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        id
    };
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_REMOVE_SUBSCRIBE_CART_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getPurchasedSubject() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let id = JSON.parse(getData).id;
    let exam_unique_id = JSON.parse(getData).exam_unique_id;

    const postData = {
        student_id: id,
        exam_unique_id: exam_unique_id,
    };
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_PURCHASED_SUBJECTS_LIST_AGAINST_EXAM_CODE_AND_STUDENT_ID_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getPurchasedLibrarySubject(props) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');;
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id
    };
    return axios({
        url: GlobalConfigs.API_URL + Apis.PURCHASED_E_LIBRARY_SUBJECTS_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getAllSubject() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');;
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_ALL_SUBJECT_LIST_API,
        method: "GET",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getCompetitiveSubject(exam_type_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');;
    let token = JSON.parse(getData).token;

    const postData = {
        exam_type_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_COMPETITIVE_SUBJECT_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getScrollingText() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SUBSCRIPTION_SCROLLING_TEXT_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },

    });
}


export async function getScholasticPrice(recid, set_no, module, mock, elibrary, case_studies) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');;
    let token = JSON.parse(getData).token;

    const postData = {
        recid,
        set_no,
        module,
        mock,
        elibrary,
        case_studies
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOLASTIC_COMBINATION_PRICE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function afterPurchasedGetPurchased() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');;
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_AFTER_PURCHASED_GET_PURCHASED_DETAILS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getExamAssessmentList(category_id, group_subject_id, subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');;
    let token = JSON.parse(getData).token;

    const postData = {
        category_id,
        group_subject_id,
        subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_EXAM_ASSESSMENT_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getsubscribedList() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GETSUBSCRIBED_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getLastPaymentDetailsData() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');;
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_LAST_PAYMENT_DETAILS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getIntegratedSubject(board_id, class_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');;
    token = JSON.parse(getData).token;
    student_id = JSON.parse(getData).id;


    const postData = {
        board_id,
        class_id,
        student_id
    };

    //console.log('postData',postData);

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_INTEGRATED_SUBSCRIPTION_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getPurchasedGroupList() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_PURCHASED_GROUP_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
    });
}

export async function getPurchasedSubjectslistScholastic(subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        subject_id
    };

    // console.log("postData----", postData)
    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GET_PURCHASED_SUBJECTS_LIST_SCHOLASTIC_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

//Get Demo scholastic exam questions
export async function cartDetails() {
   
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        orderId: "registerUserId",
        amount: 100,
        
    };
    console.log("postData--cartDetails--", postData )

    return axios({
        url: Apis.CART_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function cartSuccess(order_id, status, signature_algorithm, status_id, signature) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        order_id, 
        status, 
        signature_algorithm, 
        status_id, 
        signature,
    };
    
    return axios({
        url: GlobalConfigs.API_URL + Apis.CART_SUCCESS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getArchivePurchasedGroupList(class_no) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    let postData={
        class:class_no
    }

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_ARCHIVE_PURCHASED_GROUP_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data:postData,
    });
}