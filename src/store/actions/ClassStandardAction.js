
import {
    getClassStandardList,
    getClassStandardByToken,
    getArchiveStandardList
} from '../../services/ClassStandardService';

import {
    GET_CLASS_STANDARD_LIST,
    CLASS_STANDARD_LOADING,
    GET_CLASS_STANDARD_LIST_AFTER_LOGIN,
    GET_ARCHIVE_STANDARD_LIST,
} from '../constants';

import {
    logout,
} from '../actions/AuthActions';

// import * as utility from '../../utility/Utility';

export function getClassStandardData(history) {
    return (dispatch) => {
        getClassStandardList()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(getClassStandardAction(response.data.data));
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    // utility.showError(response.data.msg);
                    return;
                } else {

                }
                
            })
            .catch((error) => {
                //console.log(error);
                // utility.showError(error.response.data);
            });
    };
}

export function getClassStandardByTokenList(props) {
    return (dispatch) => {
      getClassStandardByToken()
        .then((response) => {
          if (response.data.status == 200) {
            dispatch(getClassStandardByTokenAction(response.data.data)); /* store class data into action */
          } else if (response.data.status == 400) {
            dispatch(logout(props));
            // utility.showError(response.data.msg);
            return;
          }
        })
        .catch((error) => {
          //console.log(error);
        //   utility.showError(error.response.data);
        });
    };
  }

  export function getArchiveStandardListDetails(props) {
    return (dispatch) => {
        getArchiveStandardList()
        .then((response) => {
          if (response.data.status == 200) {
            dispatch(getArchiveStandardListAction(response.data.data)); /* store class data into action */
          } else if (response.data.status == 400) {
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

export function getClassStandardAction(data) {
    return {
        type: GET_CLASS_STANDARD_LIST,
        payload: data,
    };
}

export function loadingClassStandardAction(status) {
    return {
        type: CLASS_STANDARD_LOADING,
        payload: status,
    };
}

export function getClassStandardByTokenAction(data) {
    return {
      type: GET_CLASS_STANDARD_LIST_AFTER_LOGIN,
      payload: data,
    };
  }

  export function getArchiveStandardListAction(data) {
    return {
      type: GET_ARCHIVE_STANDARD_LIST,
      payload: data,
    };
  }