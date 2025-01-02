import {
    GET_SC_SUBJECT_LIST,
    GET_CM_SUBJECT_LIST,
    SIDE_NAV_BAR,
    GET_CART_LIST,
    GET_ONLY_LIBRARY_CM_LIST,
    GET_ONLY_LIBRARY_SC_LIST,
    SUBSCRIBE_LOADING,
    REMOVE_ALL_SUBSCRIBE,
    REMOVE_SUBSCRIBE,
    POST_PROCEED_BUY,
    REMOVE_SUBJECT_LIST,
    LOGOUT,
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
    SUBCRIPTION_COURSE_VALIDITY,

} from '../constants';

const initialState = {
    scSubjectList: [],
    cmSubjectList: [],
    eLibraryCmList: [],
    eLibraryScList: [],
    cartList: [],
    gst: 0,
    currentSession: '',
    gstAmount: 0,
    subtotal: 0,
    total: 0,
    isNav: false,
    showLoading: false,
    scSubscriptionStatus: 0,
    rightSideNavShow: false,
    previousNTSEPurcahseValue: 0,
    previousNSTSEPurcahseValue: 0,
    scrollingText: '',
    scholasticCombinePrice: 0,
    scholasticCombinePriceId: null,
    examAssessmentList: [],
    transationDetails: [],
    getsubscribedList: [],
    getLastPaymentDetails: [],
    integratedSubscriptionList: [],
    assessmentActivePage: 1,
    eLibrarySelectSubjectsList: [],
    subscriptionCheckBoxStatus: false,
    scholasticSubscriptionSourceData: [],
    competitiveSubscriptionSourceData: false,
    competitiveSubscriptionSourceDataColl: [],
    storeAssessmentFilterDataStore: [],
    backFromAssessmentDetails:0,
    courseValidity: '',
    courseAvailable:'',
    checkProfile:{},

};
// let getData = localStorage.getItem('subscriptionPreviousValue');

// let token = JSON.parse(getData).token;
// console.log("JSON.parse(getData).alreadyPurchasedNTSE------", JSON.parse(getData).alreadyPurchasedNTSE)

// let alreadyPurchasedNTSE = JSON.parse(getData).alreadyPurchasedNTSE;
// let alreadyPurchasedNSTSE = JSON.parse(getData).alreadyPurchasedNSTSE;

export function SubscribeReducer(state = initialState, action) {

    /* if (action.type === PREVOUSE_VALUE_NTSE) {

        return {
            ...state,
            previousNTSEPurcahseValue: action.payload,
        };
    }

    if (action.type === PREVOUSE_VALUE_NSTSE) {

        return {
            ...state,
            previousNSTSEPurcahseValue: action.payload,
        };
    } */

    if (action.type === GET_SC_SUBJECT_LIST) {
        
        return {
            ...state,
            scSubjectList: action.payload,
            showLoading: false,
            scSubscriptionStatus: 0,
        };
    }
    if (action.type === GET_CM_SUBJECT_LIST) {

        let previousNTSEPurcahseValue;
        let previousNSTSEPurcahseValue;
        let previousNTSEPurcahseDetails;
        let previousNSTSEPurcahseDetails;

        /*  if (action.payload.filter(i => i.is_purchased == 1 && i.exam_type_id == 1).length > 0) {
             previousNTSEPurcahseDetails = action.payload.filter(i => i.is_purchased == 1)
             // console.log("++++++++++---previousNTSEPurcahseValue------", previousNTSEPurcahseDetails[previousNTSEPurcahseDetails.length - 1])
             previousNTSEPurcahseValue = previousNTSEPurcahseDetails[previousNTSEPurcahseDetails.length - 1].amount;
         } */

        if (action.payload.filter(i => i.is_purchased == 1 && i.exam_type_id == 1).length > 0) {
            previousNTSEPurcahseDetails = action.payload.filter(i => i.is_purchased == 1 && i.exam_type_id == 1)
            // console.log("++++++++++---previousNTSEPurcahseValue------", previousNTSEPurcahseDetails[previousNTSEPurcahseDetails.length - 1])
            previousNTSEPurcahseValue = previousNTSEPurcahseDetails[previousNTSEPurcahseDetails.length - 1].amount;
        } else if (action.payload.filter(i => i.is_purchased == 1 && i.exam_type_id == 2).length > 0) {
            previousNSTSEPurcahseDetails = action.payload.filter(i => i.is_purchased == 1 && i.exam_type_id == 2)
            // console.log("++++++++++---previousNTSEPurcahseValue------", previousNTSEPurcahseDetails[previousNTSEPurcahseDetails.length - 1])
            previousNSTSEPurcahseValue = previousNSTSEPurcahseDetails[previousNSTSEPurcahseDetails.length - 1].amount;
        }

        /* if (action.payload.filter(i => i.is_purchased == 1 && i.exam_type_id == 1).length > 0) {
            previousNTSEPurcahseValue = action.payload.filter(i => i.is_purchased == 1 && i.exam_type_id == 1).map(item => item.cart_amount).reduce((prev, next) => prev + next);

        } else if (action.payload.filter(i => i.is_purchased == 1 && i.exam_type_id == 2).length > 0) {
            previousNSTSEPurcahseValue = action.payload.filter(i => i.is_purchased == 1 && i.exam_type_id == 2).map(item => item.cart_amount).reduce((prev, next) => prev + next);
        } */

        return {
            ...state,
            cmSubjectList: action.payload,
            previousNTSEPurcahseValue: previousNTSEPurcahseValue == undefined ? 0 : previousNTSEPurcahseValue,
            previousNSTSEPurcahseValue: previousNSTSEPurcahseValue == undefined ? 0 : previousNSTSEPurcahseValue,
            showLoading: false,
            scSubscriptionStatus: 0,
        };
    }
    if (action.type === GET_ONLY_LIBRARY_CM_LIST) {
        return {
            ...state,
            eLibraryCmList: action.payload,
            showLoading: false,
        };
    }
    if (action.type === GET_ONLY_LIBRARY_SC_LIST) {
        return {
            ...state,
            eLibraryScList: action.payload,
            showLoading: false,
        };
    }

    if (action.type === GET_CART_LIST) {

        let data = action.payload.data ? action.payload.data : [];
        let amount = 0;

        for (let x = 0; data.length > x; x++) {
            amount = amount + parseFloat(data[x].cart_amount, 2);
        }

        // amount = amount - (Number(state.previousNTSEPurcahseValue !== 0 ? state.previousNTSEPurcahseValue : alreadyPurchasedNTSE) + (state.previousNSTSEPurcahseValue !== 0 ? state.previousNSTSEPurcahseValue : alreadyPurchasedNSTSE))
        amount = amount - (Number(state.previousNTSEPurcahseValue === 0 ? 0 : state.previousNTSEPurcahseValue) + (state.previousNSTSEPurcahseValue == 0 ? 0 : state.previousNSTSEPurcahseValue))

        return {
            ...state,
            cartList: action.payload.data ? action.payload.data : [],
            // gstAmount: amount * state.gst / 100,
            subtotal: amount,
            // total: amount + (amount * (state.gst/100)),
            total: amount,
            showLoading: false,
            //isNav: true
        };
    }

    if (action.type === POST_PROCEED_BUY) {
        return {
            ...state,
            cartList: [],
            gstAmount: 0,
            subtotal: 0,
            total: 0,
            showLoading: false,
            isNav: false,
            scSubscriptionStatus: 1
        };
    }
    if (action.type === REMOVE_ALL_SUBSCRIBE) {
        return {
            ...state,
            cartList: [],
            gstAmount: 0,
            subtotal: 0,
            total: 0,
        };
    }
    if (action.type === REMOVE_SUBSCRIBE) {
        const list = [...state.cartList];
        const total_amount = state.subtotal;
        let amount = total_amount - parseInt(action.payload.amount);
        const index = list.findIndex((item) => item.id === action.payload.id);
        list.splice(index, 1);
        return {
            ...state,
            cartList: list,
            gstAmount: amount * 0.18,
            subtotal: amount,
            // total: amount + (amount * 0.18),
            total: amount,
        };
    }
    if (action.type === REMOVE_SUBJECT_LIST) {
        return {
            ...state,
            scSubjectList: [],
            cmSubjectList: [],
        };
    }

    if (action.type === REMOVE_LIBRARY_LIST) {
        return {
            ...state,
            eLibraryCmList: [],
            eLibraryScList: [],
        };
    }

    if (action.type === SIDE_NAV_BAR) {
        return {
            ...state,
            isNav: action.payload,
        };
    }

    if (action.type === SUBSCRIBE_LOADING) {
        return {
            ...state,
            showLoading: action.payload,
        };
    }

    if (action.type === SHOW_RIGHT_SIDE_NAV) {
        return {
            ...state,
            rightSideNavShow: action.payload,
        };
    }

    if (action.type === SCROLLING_TEXT_SUCCESS) {
        return {
            ...state,
            scrollingText: action.payload.scrolling_text,
            gst: action.payload.gst_rate,
            currentSession: action.payload.current_session,
            showLoading: false,
        };
    }

    if (action.type === SCROLLING_TEXT_FAILURE) {
        return {
            ...state,
            scrollingText: [],
            currentSession:'',
            showLoading: false,
        };
    }

    if (action.type === SCHOLASTIC_COMBINE_PRICE) {
        return {
            ...state,
            scholasticCombinePrice: action.payload,
            showLoading: false,
        };
    }

    if (action.type === SCHOLASTIC_COMBINE_PRICE_ID) {
        return {
            ...state,
            scholasticCombinePriceId: action.payload,
            showLoading: false,
        };
    }

    if (action.type === GET_EXAM_ASSESSMENT_LIST) {
        return {
            ...state,
            examAssessmentList: action.payload,
            showLoading: false,
        };
    }


    if (action.type === GET_TRANSATION_DETAILS) {
        return {
            ...state,
            transationDetails: action.payload.transaction_details,
            showLoading: false,
        };
    }


    if (action.type === GET_SUBSCRIBED_LIST) {
        return {
            ...state,
            getsubscribedList: action.payload,
            showLoading: false,
        };
    }


    if (action.type === GET_LAST_PAYMENT_DETAILS) {
        return {
            ...state,
            getLastPaymentDetails: action.payload,
            showLoading: false,
        };
    }
    if (action.type === GET_INTEGRATED_SUBSCRIPTION) {
        return {
            ...state,
            integratedSubscriptionList: action.payload,
            showLoading: false,
        };
    }
    if (action.type === ASSESSMENT_ACTIVE_PAGE) {
        // console.log("ASSESSMENT_ACTIVE_PAGE----", action.payload)
        return {
            ...state,
            assessmentActivePage: action.payload,
            showLoading: false,
        };
    }
    if (action.type === E_LIBRARY_SELECT_SUBJECTS_LIST) {
        return {
            ...state,
            eLibrarySelectSubjectsList: action.payload,
            showLoading: false,
        };
    }
    if (action.type === CHECK_BOX_STATUS) {
        return {
            ...state,
            subscriptionCheckBoxStatus: action.payload,
            showLoading: false,
        };
    }
    if (action.type === SCHOLASTIC_SUBSCRIPTION_SOURCE) {
        return {
            ...state,
            scholasticSubscriptionSourceData: action.payload,
            showLoading: false,
        };
    }

    if (action.type === COMPETITVE_SUBSCRIPTION_SOURCE) {
        return {
            ...state,
            competitiveSubscriptionSourceData: action.payload.e,
            competitiveSubscriptionSourceDataColl: action.payload,
            showLoading: false,
        };
    }
    if (action.type === STORE_ASSESSMENT_FILTER_DATA_STORE) {
        return {
            ...state,
            storeAssessmentFilterDataStore: action.payload,
            showLoading: false,
        };
    }
    if (action.type === BACK_FROM_ASSESSMENT_DETAILS) {
        return {
            ...state,
            backFromAssessmentDetails: action.payload,
            showLoading: false,
        };
    }

    if (action.type === SUBCRIPTION_COURSE_VALIDITY) {
        return {
            ...state,
            courseValidity: action.payload?.course_validity,
            courseAvailable:action.payload?.course_available,
            checkProfile: action.payload?.checkProfile
        };
    }
    if (action.type === LOGOUT) {
        return {
            ...state,
            scSubjectList: [],
            cmSubjectList: [],
            eLibraryCmList: [],
            eLibraryScList: [],
            cartList: [],
            gst: 0,
            gstAmount: 0,
            subtotal: 0,
            total: 0,
            isNav: false,
            showLoading: false,
            scSubscriptionStatus: 0,
            rightSideNavShow: false,
            previousNTSEPurcahseValue: 0,
            previousNSTSEPurcahseValue: 0,
            scrollingText: '',
            scholasticCombinePrice: 0,
            scholasticCombinePriceId: null,
            examAssessmentList: [],
            getsubscribedList: []
        };
    }

    return state;
}


