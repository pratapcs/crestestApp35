
import {
    getEventHistoryList,
    likeEventHistory,
    submitFeedback
} from '../../services/DashboardService';

import {
    logout,
} from '../actions/AuthActions';

import {
    DASHBOARD_HISTORY_LIST_SUCCESS,
    DASHBOARD_HISTORY_LIST_FAILURE,
    DASHBOARD_HISTORY_LIST_REQUEST,
    DASHBOARD_EVENT_HISTORY_LIKE,
    DRAWER_MENU_ACTIVE_ID_UPDATE
} from '../constants';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

// import * as utility from '../../utility/Utility';

export function getEventHistoryData(props) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        getEventHistoryList()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getEventHistoryLikeAction(response.data.already_liked));
                    dispatch(getEventHistorySuccessAction(response.data));
                    // Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);

                } else if (response.data.status == 410) {
                    dispatch(getEventHistoryFailureAction(response.data.data));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: response.data.msg  });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else if (response.data.status == 400) {
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: response.data.msg  });
                    Emitter.emit(Events.HIDE_PRELOADER);
                    dispatch(logout(props));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: response.data.msg  });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function likeEventHistoryData(event_id, history) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        likeEventHistory(event_id)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getEventHistoryLikeAction(response.data.is_liked));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(history));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: response.data.msg  });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function submitFeedbackData(content, history) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return (dispatch) => {
        submitFeedback(content)
            .then((response) => {
                // console.log("@123-----", response)
                if (response.data.status == 200) {
                    // dispatch(getEventHistoryLikeAction(response.data.is_liked));
                    Emitter.emit(Events.SHOW_MESSAGE, { type: "success", title: "Success", message: response.data.msg });
                    Emitter.emit(Events.HIDE_PRELOADER);
                }
                if (response.data.status == 400) {
                    dispatch(logout(history));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                }
            })
            .catch((error) => {
                //console.log(error);
                // Emitter.emit(Events.SHOW_MESSAGE, { type: "error", title: 'Error!', message: response.data.msg  });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getEventHistorySuccessAction(data) {
    return {
        type: DASHBOARD_HISTORY_LIST_SUCCESS,
        payload: data,
    };
}
export function getEventHistoryFailureAction(data) {
    return {
        type: DASHBOARD_HISTORY_LIST_FAILURE,
        payload: data,
    };
}
export function getEventHistoryLikeAction(data) {
    return {
        type: DASHBOARD_EVENT_HISTORY_LIKE,
        payload: data,
    };
}
export function getEventHistoryRequestAction(status) {
    return {
        type: DASHBOARD_HISTORY_LIST_REQUEST,
        payload: status,
    };
}

export function drawerMenuActiveIdUpdateAction(status) {
    return {
        type: DRAWER_MENU_ACTIVE_ID_UPDATE,
        payload: status,
    };
}
