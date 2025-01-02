import { getAcademicYearByBoardId,getAcademicSessionExistForExam } from "../../services/AcademicService";
import { logout } from "../actions/AuthActions";
import {GET_ACADEMIC_YEAR_BY_BOARD_ID_LIST,ACADEMIC_LOADING,GET_ACADEMIC_SESSION_EXIT_FOR_EXAM} from "../constants";
// import * as utility from "../../utility/Utility";


export function getAcademicYearByBoardList(board_id) {
// export function getAcademicYearByBoardList(board) {

  return (dispatch) => {
    getAcademicYearByBoardId(board_id)
      .then((response) => {
        // console.log("@1----", response)
        if (response.data.status == 200) {
          
          dispatch(getAcademicYearByBoardIdAction(response.data.list));
        }else{
          dispatch(getAcademicYearByBoardIdAction([]));
        }
      })
      .catch((error) => {
        //console.log(error);
        // utility.showError(error.response.data);
      });
  };
}

export function getAcademicSessionExistForExamDetails(category, props) {
  return (dispatch) => {
    getAcademicSessionExistForExam(category)
      .then((response) => {
        if (response.data.status == 200) {
          dispatch(getAcademicSessionExistForExamAction(response.data));
        } else{
          // utility.showError(response.data.msg);
        }
      })
      .catch((error) => {
        //console.log(error);
        // utility.showError(error.response.data);
      });
  };
}

export function getAcademicYearByBoardIdAction(data) {
  return {
    type: GET_ACADEMIC_YEAR_BY_BOARD_ID_LIST,
    payload: data,
  };
}

export function getAcademicSessionExistForExamAction(data) {
  return {
    type: GET_ACADEMIC_SESSION_EXIT_FOR_EXAM,
    payload: data,
  };
}

export function academicYearLoading(status) {
    return {
      type: ACADEMIC_LOADING,
      payload: status,
    };
  }
