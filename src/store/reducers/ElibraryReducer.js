import {
    ELIBRARY_CONTENT_SUCCESS,
    ELIBRARY_CONTENT_FAILURE,
    ELIBRARY_CONTENT_REQUEST,
    LOGOUT,
    ELIBRARY_DEMO_CONTENT_SUCCESS,
    ELIBRARY_DEMO_CONTENT_FAILURE,
    ELIBRARY_LOADING,
    ELIBRARY_SHOW_CALL_ICON,
    ELIBRARY_CATEGORY,
    ELIBRARY_SCHOLASTIC_CATEGORY,
    ELIBRARY_GETSUBJECT_LIST,
    ELIBRARY_GET_LAST_SUBJECT_LIST,
    ELIBRARY_LIST_ACTIVE_PAGE,
    ELIBRARY_AWS_CREDENTIAL_DETAILS
} from '../constants';


const initialState = {
    elibraryPdfPath: null,
    demoElibraryPdfPath: [],
    loading: false,
    isCallIcon: 0,
    ElibraryCategory: [],
    ElibraryScholasticCategory: [],
    elibraryGetsubjectList: [],
    isLastSubject: 0,
    eLitraryListActivePage: 1,
    awsCredentialsAccessKeyId: '',
    awsCredentialsSecretaccessKey: '',
};

export function ElibraryReducer(state = initialState, action) {

    if (action.type === ELIBRARY_CONTENT_REQUEST) {
        return {
            ...state,
            loader: action.payload,
        };
    }
    if (action.type === ELIBRARY_CONTENT_SUCCESS) {
        return {
            ...state,
            elibraryPdfPath: action.payload,
            loader: false,
        };
    }
    if (action.type === ELIBRARY_CONTENT_FAILURE) {
        return {
            ...state,
            elibraryPdfPath: null,
            loader: false,
        };
    }

    if (action.type === ELIBRARY_DEMO_CONTENT_SUCCESS) {
        return {
            ...state,
            demoElibraryPdfPath: action.payload,
            loader: false,
        };
    }

    if (action.type === ELIBRARY_DEMO_CONTENT_FAILURE) {
        return {
            ...state,
            demoElibraryPdfPath: [],
            loader: false,
        };
    }

    if (action.type === LOGOUT) {
        return {
            ...state,
            elibraryPdfPath: null,
            demoElibraryPdfPath: [],
            loading: false,
            isCallIcon: 0,
            ElibraryCategory: [],
            ElibraryScholasticCategory: [],
        };
    }
    if (action.type === ELIBRARY_LOADING) {
        return {
            ...state,
            loading: action.payload,
        };
    }
    if (action.type === ELIBRARY_SHOW_CALL_ICON) {
        return {
            ...state,
            isCallIcon: action.payload,
        };
    }
    if (action.type === ELIBRARY_CATEGORY) {
        return {
            ...state,
            ElibraryCategory: action.payload,
            loading: false,
        };
    }
    if (action.type === ELIBRARY_SCHOLASTIC_CATEGORY) {
        return {
            ...state,
            ElibraryScholasticCategory: action.payload,
            loading: false,
        };
    }
    if (action.type === ELIBRARY_GETSUBJECT_LIST) {
        return {
            ...state,
            elibraryGetsubjectList: action.payload,
            loading: false,
        };
    }
    if (action.type === ELIBRARY_LIST_ACTIVE_PAGE) {
        return {
            ...state,
            eLitraryListActivePage: action.payload,
            loading: false,
        };
    }
    if (action.type === ELIBRARY_GET_LAST_SUBJECT_LIST) {
        return {
            ...state,
            isLastSubject: action.payload,
            loading: false,
        };
    }
    if (action.type === ELIBRARY_AWS_CREDENTIAL_DETAILS) {
        return {
            ...state,
            awsCredentialsAccessKeyId: action.payload.ACCESSKEYID,
            awsCredentialsSecretaccessKey: action.payload.SECRETACCESSKEY,
            loading: false,
        };
    }

    return state;
}

