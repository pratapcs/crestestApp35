import {
    DASHBOARD_HISTORY_LIST_SUCCESS,
    DASHBOARD_HISTORY_LIST_FAILURE,
    DASHBOARD_HISTORY_LIST_REQUEST,
    DASHBOARD_EVENT_HISTORY_LIKE,
    LOGOUT,
    DRAWER_MENU_ACTIVE_ID_UPDATE
} from '../constants';

const initialState = {
    eventHistoryList: [],
    like: false,
    loader: false,
    drawerMenuActiveId: 1
};

export function DashboardReducer(state = initialState, action) {

    if (action.type === DASHBOARD_HISTORY_LIST_SUCCESS) {
        return {
            ...state,
            eventHistoryList: action.payload,
            loader: false,
        };
    }
    if (action.type === DASHBOARD_EVENT_HISTORY_LIKE) {
        return {
            ...state,
            like: action.payload == 0 ? false : true,
            loader: false,
        };
    }
    if (action.type === DASHBOARD_HISTORY_LIST_FAILURE) {
        return {
            ...state,
            eventHistoryList: [],
            loader: false,
        };
    }

    if (action.type === DASHBOARD_HISTORY_LIST_REQUEST) {
        return {
            ...state,
            loader: action.payload,
        };
    }
    if (action.type === DRAWER_MENU_ACTIVE_ID_UPDATE) {
        return {
            ...state,
            drawerMenuActiveId: action.payload,
        };
    }
    if (action.type === LOGOUT) {
        return {
            ...state,
            eventHistoryList: [],
            loader: false,
        };
    }

    return state;
}


