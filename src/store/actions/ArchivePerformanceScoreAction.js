import {
    getPerformanceScoreList,
    getScholasticOverAllPerformance,
    getScholasticAveragePerformance,
    getscholasticaverageperformanceSetModuleMock,
    getscholasticComparativeStudyChapterWiseDetails,
    getCompetitiveOverAllPerformance,
    getCompetitiveSetWiseScore,
    getScholasticPerformanceMoudle,
    getScholasticPerformanceMock,
    getScholasticComparativeStudyModuleData,
    getScholasticComparativeStudyMockData,
    getCompareDiffarentSubjectScoreNtseData,
    getCompetitiveSetwizeScoreNtseData,
    /* As new API */
    getScholasticSetModuleMockSubjectWiseData,
    getCompetitiveSetwiseScoreData,
    getScholasticGetsubjectwiseChaptersData,
    getScholasticChapterwiseAnalysisData,
    getCompareScholasticCompetitiveData,
    getcompetitiveSubjectAvgscoreData,
    getCompetitiveSetwiseSatScoreData,
    getCompetitiveSetwiseMatScoreData,
    getCompetitiveSetwiseSatScoreSubjectData,
    getCompetitiveSetwiseMatScoreSubjecttData,
    getCompetitiveSubjectWiseComparisonData,
    getcompetitiveNonverbalcomparisonData,
    getelibrarySessionTimeData,
    elibraryMostVisitedSubjectsData,
    elibraryMostSearchQuestionsData,
    whereDoYouStandCompetitiveData,
    dashboardPerformancescoreData,
    scholasticGetsubjectwiseChaptersTableData,
    subjectWiseScholasticScoreData,
    getScholasticGetchapterwiseAnalysisCaseStudyData
} from '../../services/ArchivePerformanceScoreService';


import {
    PERFORMANCE_SCORE_LIST_SUCCESS,
    PERFORMANCE_SCORE_LIST_FAILURE,
    PERFORMANCE_SCORE_REQUEST,
    PERFORMANCE_OVERALL_AVERAGE,
    ARCHIVE_SCHOLIASTIC_OVER_ALL_PERFORMANCE_SUCCESS,
    SCHOLIASTIC_OVER_ALL_PERFORMANCE_FAILURE,
    SCHOLIASTIC_AVERAGE_PERFORMANCE_SUCCESS,
    SCHOLIASTIC_AVERAGE_PERFORMANCE_FAILURE,
    SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_SUCCESS,
    SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_FAILURE,
    SCHOLASTIC_CHAPTER_WISE_DETAILS_SUCCESS,
    SCHOLASTIC_CHAPTER_WISE_DETAILS_FAILURE,
    ARCHIVE_COMPETITIVE_OVER_ALL_PERFORMANCE_SUCCESS,
    ARCHIVE_COMPETITIVE_OVER_ALL_PERFORMANCE_FAILURE,
    COMPETITIVE_SET_WISE_SCORE_SUCCESS,
    COMPETITIVE_SET_WISE_SCORE_FAILURE,
    SCHOLIASTIC_PERFORMANCE_MODLE_SUCCESS,
    SCHOLIASTIC_PERFORMANCE_MODLE_FAILURE,
    SCHOLIASTIC_PERFORMANCE_MODLE_OVERALLAVG_SUCCESS,
    SCHOLIASTIC_PERFORMANCE_MOCK_SUCCESS,
    SCHOLIASTIC_PERFORMANCE_MOCK_FAILURE,
    SCHOLIASTIC_PERFORMANCE_MOCK_OVERALLAVG_SUCCESS,
    SCHOLIASTIC_PERFORMANCE_MODLE_OVERALLAVG_FAILURE,
    COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_SUCCESS,
    COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_FAILURE,
    COMPETITIVE_SETWISE_SCORE_NTSE_SUCCESS,
    COMPETITIVE_SETWISE_SCORE_NTSE_FAILURE,
    /* As per new UI */
    ARCHIVE_SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_SUCCESS,
    ARCHIVE_COMPETITIVE_SETWISE_SCORE_SUCCESS,
    ARCHIVE_SCHOLASTIC_GETSUBJECTWISE_CHAPTERS,
    ARCHIVE_SCHOLASTIC_CHAPTER_ANALYSIS_DATA,
    ARCHIVE_COMPARE_SCHOLASTIC_COMPETITIVE_DATA,
    ARCHIVE_GET_COMPETITIVE_SUBJECT_AVGSCORE,
    ARCHIVE_COMPETITIVE_SETWISE_MAT_SCORE,
    ARCHIVE_COMPETITIVE_SETWISE_SAT_SCORE,
    ARCHIVE_COMPETITIVE_SETWISE_SAT_SCORE_SUBJECT,
    ARCHIVE_COMPETITIVE_SETWISE_MAT_SCORE_SUBJECT,
    ARCHIVE_COMPETITIVE_SUBJECTWISECOMPARISON,
    ARCHIVE_COMPETITIVE_NONVERBALCOMPARISON,
    ARCHIVE_ELIBRARY_SESSION_TIME,
    ARCHIVE_ELIBRARY_MOST_VISITED_SUBJECTS,
    ARCHIVE_ELIBRARY_MOST_SEARCH_QUESTIONS,
    ARCHIVE_WHERE_DO_YOU_STAND_COMPETITIVE,
    DASHBOARD_PERFORMANCESCORE,
    ARCHIVE_SCHOLATIC_SET_TABLE_DATA,
    ARCHIVE_SCHOLASTIC_CHAPTER_ANALYSIS_CASE_STUDIY_DATA,
    CLEAR_COMPETITIVE_SETWISE_SAT_MAT_DATA
} from '../constants';

import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

import {
    logout,
} from './AuthActions';

// import * as utility from '../../utility/Utility';


export function getArchiiveScholasticAllData(subject_id, class_id, type, props) {
    return async function (dispatch) {
        try {
            Emitter.emit(Events.SHOW_PRELOADER);
            const overAllPerformanceData = await getScholasticOverAllPerformance(
                subject_id, 
                class_id
            );
            const setModuleMockData = await getScholasticSetModuleMockSubjectWiseData(
                subject_id, 
                class_id
            );
            const competitiveData = await getCompareScholasticCompetitiveData(
                type,
                subject_id,
                class_id
            );
            if (
                overAllPerformanceData?.data?.status == 200 &&
                setModuleMockData?.data?.status == 200 &&
                competitiveData?.data?.status == 200
            ) {
                if (overAllPerformanceData?.data?.data != '') {
                    dispatch(
                        scholasticOverAllPerformanceSuccessAction(
                            overAllPerformanceData.data?.data,
                        ),
                    );
                } else {
                    dispatch(
                        scholasticOverAllPerformanceFailureAction(
                            overAllPerformanceData.data?.data,
                        ),
                    );
                }

                if (setModuleMockData?.data?.data != '') {
                    dispatch(
                        ScholasticSetModuleMockSubjectWiseSuccessAction(
                            setModuleMockData.data.data,
                        ),
                    );
                } else {
                    dispatch(ScholasticSetModuleMockSubjectWiseSuccessAction([]));
                }

                if (competitiveData?.data?.data != '') {
                    dispatch(
                        getCompareScholasticCompetitiveDataAction(
                            competitiveData.data.data,
                        ),
                    );
                } else {
                    dispatch(getCompareScholasticCompetitiveDataAction([]));
                }

                setTimeout(() => {
                    Emitter.emit(Events.HIDE_PRELOADER);
                }, 1000);
            } else if (
                overAllPerformanceData?.data?.status == 400 ||
                setModuleMockData?.data?.status == 400 ||
                competitiveData?.data?.status == 400
            ) {
                Emitter.emit(Events.HIDE_PRELOADER);
                dispatch(logout(props));
            } else {
                Emitter.emit(Events.HIDE_PRELOADER);
                props.navigation.goBack();
            }
        } catch (error) {
            Emitter.emit(Events.SHOW_MESSAGE, {
                type: 'error',
                title: 'Failed',
                message: 'Failed to get scholastic Details',
            });
            Emitter.emit(Events.HIDE_PRELOADER);
        }
    };
}

export function getAllSubjectWiseCompetitiveScore(
    set_no,
    exam_type,
    class_id,
    props,
  ) {
    return async (dispatch) => {
      try {
          Emitter.emit(Events.SHOW_PRELOADER);
          const setWiseSatScore = await getCompetitiveSetwiseSatScoreData(
            set_no,
            exam_type,
            class_id,
          );
          
          const setWiseSatSubjectData =
            await getCompetitiveSetwiseSatScoreSubjectData(set_no, exam_type, class_id);
          const setWiseMatScore = await getCompetitiveSetwiseMatScoreData(
            set_no,
            exam_type,
            class_id,
          );

          const setWiseMatSubjectData =
            await getCompetitiveSetwiseMatScoreSubjecttData(set_no, exam_type, class_id);
          if (
            setWiseSatScore.data.status == 200 &&
            setWiseSatSubjectData.data.status == 200 &&
            setWiseMatScore.data.status == 200 &&
            setWiseMatSubjectData.data.status == 200
          ) {
            if (
              setWiseSatScore.data.data != '' &&
              setWiseSatSubjectData.data.data != '' &&
              setWiseMatScore.data.data != '' &&
              setWiseMatSubjectData.data.data != ''
            ) {
              dispatch(
                getCompetitiveSetwiseSatScoreDataAction(setWiseSatScore.data.data),
              );
              dispatch(
                getCompetitiveSetwiseSatScoreSubjectDataAction(
                  setWiseSatSubjectData.data.data,
                ),
              );
              dispatch(
                getCompetitiveSetwiseMatScoreDataAction(setWiseMatScore.data.data),
              );
              dispatch(
                getCompetitiveSetwiseMatScoreSubjecttDataAction(
                  setWiseMatSubjectData.data.data,
                ),
              );
            } else {
              dispatch(getCompetitiveSetwiseSatScoreDataAction([]));
              dispatch(getCompetitiveSetwiseSatScoreSubjectDataAction([]));
              dispatch(getCompetitiveSetwiseMatScoreDataAction([]));
              dispatch(getCompetitiveSetwiseMatScoreSubjecttDataAction([]));
              props?.navigation?.goBack();
            }
          } else if (setWiseSatScore.data.status == 400) {
            dispatch(logout(props));
            return;
          } else {
            props?.navigation?.goBack();
            Emitter.emit(Events.SHOW_MESSAGE, {
              type: 'error',
              title: 'Failed',
              message: 'Failed to get score Data',
            });
          }
          Emitter.emit(Events.HIDE_PRELOADER);
        } catch (error) {
          Emitter.emit(Events.HIDE_PRELOADER);
          Emitter.emit(Events.SHOW_MESSAGE, {
            type: 'error',
            title: 'Failed',
            message: 'Failed to get score Data',
          });
        }
    }
  }

  export function getAllSubjectWiseCompetitiveScoreWithoutMat(
    set_no,
    exam_type,
    class_id,
    props,
  ) {
    return async (dispatch) => {
        try {
            Emitter.emit(Events.SHOW_PRELOADER);
            const setWiseSatScore = await getCompetitiveSetwiseSatScoreData(
              set_no,
              exam_type,
              class_id,
            );
            const setWiseSatSubjectData =
              await getCompetitiveSetwiseSatScoreSubjectData(set_no, exam_type, class_id);
            
            if (
              setWiseSatScore.data.status == 200 &&
              setWiseSatSubjectData.data.status == 200
            ) {
              if (
                setWiseSatScore.data.data != '' &&
                setWiseSatSubjectData.data.data != ''
              ) {
                dispatch(
                  getCompetitiveSetwiseSatScoreDataAction(setWiseSatScore.data.data),
                );
                dispatch(
                  getCompetitiveSetwiseSatScoreSubjectDataAction(
                    setWiseSatSubjectData.data.data,
                  ),
                );
                
              } else {
                dispatch(getCompetitiveSetwiseSatScoreDataAction([]));
                dispatch(getCompetitiveSetwiseSatScoreSubjectDataAction([]));
                
                props?.navigation?.goBack();
              }
            } else if (setWiseSatScore.data.status == 400) {
              dispatch(logout(props));
              return;
            } else {
                props?.navigation?.goBack();
              Emitter.emit(Events.SHOW_MESSAGE, {
                type: 'error',
                title: 'Failed',
                message: 'Failed to get score Data',
              });
            }
            Emitter.emit(Events.HIDE_PRELOADER);
          } catch (error) {
            Emitter.emit(Events.HIDE_PRELOADER);
            Emitter.emit(Events.SHOW_MESSAGE, {
              type: 'error',
              title: 'Failed',
              message: 'Failed to get score Data',
            });
          }
    }
  }


export function getPerformanceScoreListData(subject_id, props) {
    return async (dispatch) => {
        getPerformanceScoreList(subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(performanceScoreListSuccessAction(response.data.data));
                        dispatch(performanceScoreListOverallavgAction(response.data.overallavg));
                    } else {
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));

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

export function getScholasticOverAllPerformanceData(group_subject_id, class_no, props) {
    return async (dispatch) => {
        getScholasticOverAllPerformance(group_subject_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticOverAllPerformanceSuccessAction(response.data.data));
                    } else {
                        dispatch(scholasticOverAllPerformanceFailureAction(response.data.data));
                        // history.push('/online-performance-category');
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getScholasticAveragePerformanceData(exam_type, props) {
    return async (dispatch) => {
        getScholasticAveragePerformance(exam_type)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticAveragePerformanceSuccessAction(response.data.data));
                    } else {
                        // history.goBack();
                        dispatch(scholasticAveragePerformanceFailureAction(response.data.data));
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getScholasticAveragePerformanceSetModuleMockData(props) {
    return async (dispatch) => {
        getscholasticaverageperformanceSetModuleMock()
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticAveragePerformanceSetMoudleMockSuccessAction(response.data.data));
                    } else {
                        // history.goBack();
                        dispatch(scholasticAveragePerformanceSetMoudleMockFailureAction(response.data.data));
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getscholasticComparativeStudyChapterWiseDetailsData(subject_id, chapter_id, props) {
    return async (dispatch) => {
        getscholasticComparativeStudyChapterWiseDetails(subject_id, chapter_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticChapterWiseDetailsSuccessAction(response.data.data));
                    } else {
                        // history.goBack();
                        dispatch(scholasticChapterWiseDetailsFailureAction(response.data.data));
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getCompetitiveOverAllPerformanceData(exam_type, class_no, props) {
    return async (dispatch) => {
        getCompetitiveOverAllPerformance(exam_type, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(competitiveOverAllPerformanceSuccessAction(response.data.data));
                    } else {
                        dispatch(competitiveOverAllPerformanceFailureAction(response.data.data));
                        // history.goBack();
                        // history.push('/online-performance-category');
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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
export function getCompetitiveSetWiseScoreData(exam_type, props) {
    return async (dispatch) => {
        getCompetitiveSetWiseScore()
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(competitiveSetWiseScoreSuccessAction(response.data.data));
                    } else {
                        dispatch(competitiveSetWiseScoreFailureAction(response.data.data));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getScholasticPerformanceMoudleData(subject_id, props) {
    return async (dispatch) => {
        getScholasticPerformanceMoudle(subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticPerformanceMoudleSuccessAction(response.data.data));
                        dispatch(scholasticPerformanceMoudleOveralavgSuccessAction(response.data.overalavg));
                    } else {
                        dispatch(scholasticPerformanceMoudleFailureAction(response.data.data));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getScholasticPerformanceMockData(subject_id, props) {
    return async (dispatch) => {
        getScholasticPerformanceMock(subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticPerformanceMoudleSuccessAction(response.data.data));
                        dispatch(scholasticPerformanceMoudleOveralavgSuccessAction(response.data.overalavg));
                    } else {
                        dispatch(scholasticPerformanceMoudleFailureAction(response.data.data));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getScholasticComparativeStudyModuleDetailsData(subject_id, props) {
    return async (dispatch) => {
        getScholasticComparativeStudyModuleData(subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticChapterWiseDetailsSuccessAction(response.data.data));
                    } else {
                        dispatch(scholasticChapterWiseDetailsFailureAction(response.data.data));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getScholasticComparativeStudyMockDetailsData(subject_id, props) {
    return async (dispatch) => {
        getScholasticComparativeStudyMockData(subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticChapterWiseDetailsSuccessAction(response.data.data));
                    } else {
                        dispatch(scholasticChapterWiseDetailsFailureAction(response.data.data));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getCompareDiffarentSubjectScoreNtseDataDetails(props) {
    return async (dispatch) => {
        getCompareDiffarentSubjectScoreNtseData()
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(compareDiffarentSubjectScoreNtseSuccessAction(response.data.data));
                    } else {
                        dispatch(compareDiffarentSubjectScoreNtseFailureAction(response.data.data));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getCompetitiveSetwizeScoreNtseDataDetails(set_no, props) {
    return async (dispatch) => {
        getCompetitiveSetwizeScoreNtseData(set_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(competitiveSetwizeScoreNtseSuccessAction(response.data.data));
                    } else {
                        dispatch(competitiveSetwizeScoreNtseFailureAction(response.data.data));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

/* As per New UI */

export function getgetScholasticSetModuleMockSubjectWiseDataDetails(group_subject_id, class_no, props) {
    return async (dispatch) => {
        getScholasticSetModuleMockSubjectWiseData(group_subject_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(ScholasticSetModuleMockSubjectWiseSuccessAction(response.data.data));
                    } else {
                        dispatch(ScholasticSetModuleMockSubjectWiseSuccessAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function subjectWiseScholasticScoreDataDetails(group_subject_id, class_no, props) {
    return async (dispatch) => {
        subjectWiseScholasticScoreData(group_subject_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(ScholasticSetModuleMockSubjectWiseSuccessAction(response.data.data));
                    } else {
                        dispatch(ScholasticSetModuleMockSubjectWiseSuccessAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getCompetitiveSetwiseScoreDataDetails(exam_type, class_no, props) {
    return async (dispatch) => {
        getCompetitiveSetwiseScoreData(exam_type, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getCompetitiveSetwiseScoreSuccessAction(response.data.data));
                    } else {
                        dispatch(getCompetitiveSetwiseScoreSuccessAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getScholasticGetsubjectwiseChaptersDataDetails(exam_type, group_subject_id, class_no, props) {
    return async (dispatch) => {
        getScholasticGetsubjectwiseChaptersData(exam_type, group_subject_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        // dispatch(getscholasticGetsubjectwiseChaptersAction([]));
                        dispatch(getscholasticGetsubjectwiseChaptersAction(response.data.data));

                        if (Object.keys(response.data.data.piechart).length === 0) {
                            // history.goBack();
                            // utility.showError("Sorry! No Data Available");
                        }
                    } else {
                        dispatch(getscholasticGetsubjectwiseChaptersAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getScholasticChapterwiseAnalysisDataDetails(chapter_id, subject_id, moudleIndex, group_subject_id, class_no, props) {
    return async (dispatch) => {
        getScholasticChapterwiseAnalysisData(chapter_id, subject_id, moudleIndex, group_subject_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getScholasticChapterwiseAnalysisDataAction(response.data.data));
                    } else {
                        dispatch(getScholasticChapterwiseAnalysisDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getScholasticGetchapterwiseAnalysisCaseStudyDataDetails(chapter_id, subject_id, moudleIndex, group_subject_id, class_no, props) {
    return async (dispatch) => {
        getScholasticGetchapterwiseAnalysisCaseStudyData(chapter_id, subject_id, moudleIndex, group_subject_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getScholasticGetchapterwiseAnalysisCaseStudyAction(response.data.data));
                    } else {
                        dispatch(getScholasticGetchapterwiseAnalysisCaseStudyAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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


export function getCompareScholasticCompetitiveDataDataDetails(exam_type, group_subject_id, class_no, props) {
    return async (dispatch) => {
        getCompareScholasticCompetitiveData(exam_type, group_subject_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getCompareScholasticCompetitiveDataAction(response.data.data));
                    } else {
                        dispatch(getCompareScholasticCompetitiveDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getcompetitiveSubjectAvgscoreDataDetails(exam_type, group_subject_id, class_no, props) {
    return async (dispatch) => {
        getcompetitiveSubjectAvgscoreData(exam_type, group_subject_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getcompetitiveSubjectAvgscoreDataAction(response.data.data));
                    } else {
                        dispatch(getcompetitiveSubjectAvgscoreDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getCompetitiveSetwiseSatScoreDataDetails(set_no, exam_type, class_no, props) {
    return async (dispatch) => {
        getCompetitiveSetwiseSatScoreData(set_no, exam_type, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getCompetitiveSetwiseSatScoreDataAction(response.data.data));
                    } else {
                        dispatch(getCompetitiveSetwiseSatScoreDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getCompetitiveSetwiseMatScoreDataDetails(set_no, exam_type, class_no, props) {
    return async (dispatch) => {
        getCompetitiveSetwiseMatScoreData(set_no, exam_type, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getCompetitiveSetwiseMatScoreDataAction(response.data.data));
                    } else {
                        dispatch(getCompetitiveSetwiseMatScoreDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getCompetitiveSetwiseSatScoreSubjectDataDetails(set_no, exam_type, class_no, props) {
    return async (dispatch) => {
        getCompetitiveSetwiseSatScoreSubjectData(set_no, exam_type, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getCompetitiveSetwiseSatScoreSubjectDataAction(response.data.data));
                    } else {
                        dispatch(getCompetitiveSetwiseSatScoreSubjectDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getCompetitiveSetwiseMatScoreSubjecttDataDetails(set_no, exam_type, class_no, props) {
    return async (dispatch) => {
        getCompetitiveSetwiseMatScoreSubjecttData(set_no, exam_type, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getCompetitiveSetwiseMatScoreSubjecttDataAction(response.data.data));
                    } else {
                        dispatch(getCompetitiveSetwiseMatScoreSubjecttDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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


export function getCompetitiveSubjectWiseComparisonDataDetails(exam_type, setNumber, subType, class_no, props) {
    return async (dispatch) => {
        getCompetitiveSubjectWiseComparisonData(exam_type, setNumber, subType, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getCompetitiveSubjectWiseComparisonDataAction(response.data.data));
                    } else {
                        dispatch(getCompetitiveSubjectWiseComparisonDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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


export function getcompetitiveNonverbalcomparisonDataDetails(subject, exam_type, setNumber, subType, class_no, props) {
    return async (dispatch) => {
        getcompetitiveNonverbalcomparisonData(subject, exam_type, setNumber, subType, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getcompetitiveNonverbalcomparisonDataAction(response.data.data));
                    } else {
                        dispatch(getcompetitiveNonverbalcomparisonDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function getelibrarySessionTimeDataDetails(exam_category_id, exam_type_id, class_no, props) {
    return async (dispatch) => {
        getelibrarySessionTimeData(exam_category_id, exam_type_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getelibrarySessionTimeDataAction(response.data.data));
                    } else {
                        dispatch(getelibrarySessionTimeDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function elibraryMostVisitedSubjectsDataDetails(exam_category_id, exam_type_id, class_no, props) {
    return async (dispatch) => {
        elibraryMostVisitedSubjectsData(exam_category_id, exam_type_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(elibraryMostVisitedSubjectsDataAction(response.data.data));
                    } else {
                        dispatch(elibraryMostVisitedSubjectsDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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
export function elibraryMostSearchQuestionsDataDetails(exam_category_id, exam_type_id, class_no, props) {
    return async (dispatch) => {
        elibraryMostSearchQuestionsData(exam_category_id, exam_type_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(elibraryMostSearchQuestionsDataAction(response.data.data));
                    } else {
                        dispatch(elibraryMostSearchQuestionsDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

export function whereDoYouStandCompetitiveDataDetails(exam_type, subType, setNumber, class_no, props) {
    return async (dispatch) => {
        whereDoYouStandCompetitiveData(exam_type, subType, setNumber, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(whereDoYouStandCompetitiveDataAction(response.data.data));
                    } else {
                        dispatch(whereDoYouStandCompetitiveDataAction([]));
                        // history.goBack();
                        // utility.showError("Sorry! No Data Available");
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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

/* call performance details for dashboard */
export function dashboardPerformancescoreDetails(props) {
    return async (dispatch) => {
        dashboardPerformancescoreData()
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(dashboardPerformancescoreAction(response.data.performance_overall));
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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


export function scholasticGetsubjectwiseChaptersTableDataDetails(subjectName, exam_type, group_subject_id, class_no, props) {
    return async (dispatch) => {
        scholasticGetsubjectwiseChaptersTableData(subjectName, exam_type, group_subject_id, class_no)
            .then((response) => {
                if (response.data.status == 200) {
                    dispatch(scholasticGetsubjectwiseChaptersTableDataAction(response.data.data.tabledata));
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
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



/* ----As per New UI */


export function performanceRequestAction(data) {
    return {
        type: PERFORMANCE_SCORE_REQUEST,
        payload: data,
    };
}

export function performanceScoreListSuccessAction(data) {
    return {
        type: PERFORMANCE_SCORE_LIST_SUCCESS,
        payload: data,
    };
}

export function performanceScoreListFailureAction(data) {
    return {
        type: PERFORMANCE_SCORE_LIST_FAILURE,
        payload: data,
    };
}

export function performanceScoreListOverallavgAction(data) {
    return {
        type: PERFORMANCE_OVERALL_AVERAGE,
        payload: data,
    };
}

export function scholasticOverAllPerformanceSuccessAction(data) {
    return {
        type: ARCHIVE_SCHOLIASTIC_OVER_ALL_PERFORMANCE_SUCCESS,//SCHOLIASTIC_OVER_ALL_PERFORMANCE_SUCCESS
        payload: data,
    };
}

export function scholasticOverAllPerformanceFailureAction(data) {
    return {
        type: SCHOLIASTIC_OVER_ALL_PERFORMANCE_FAILURE,
        payload: data,
    };
}

export function scholasticAveragePerformanceSuccessAction(data) {
    return {
        type: SCHOLIASTIC_AVERAGE_PERFORMANCE_SUCCESS,
        payload: data,
    };
}

export function scholasticAveragePerformanceFailureAction(data) {
    return {
        type: SCHOLIASTIC_AVERAGE_PERFORMANCE_FAILURE,
        payload: data,
    };
}

export function scholasticAveragePerformanceSetMoudleMockSuccessAction(data) {
    return {
        type: SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_SUCCESS,
        payload: data,
    };
}

export function scholasticAveragePerformanceSetMoudleMockFailureAction(data) {
    return {
        type: SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_FAILURE,
        payload: data,
    };
}

export function scholasticChapterWiseDetailsSuccessAction(data) {
    return {
        type: SCHOLASTIC_CHAPTER_WISE_DETAILS_SUCCESS,
        payload: data,
    };
}

export function scholasticChapterWiseDetailsFailureAction(data) {
    return {
        type: SCHOLASTIC_CHAPTER_WISE_DETAILS_FAILURE,
        payload: data,
    };
}

export function competitiveOverAllPerformanceSuccessAction(data) {
    return {
        type: ARCHIVE_COMPETITIVE_OVER_ALL_PERFORMANCE_SUCCESS,//COMPETITIVE_OVER_ALL_PERFORMANCE_SUCCESS
        payload: data,
    };
}

export function competitiveOverAllPerformanceFailureAction(data) {
    return {
        type: ARCHIVE_COMPETITIVE_OVER_ALL_PERFORMANCE_FAILURE,//COMPETITIVE_OVER_ALL_PERFORMANCE_FAILURE
        payload: data,
    };
}

export function competitiveSetWiseScoreSuccessAction(data) {
    return {
        type: COMPETITIVE_SET_WISE_SCORE_SUCCESS,
        payload: data,
    };
}

export function competitiveSetWiseScoreFailureAction(data) {
    return {
        type: COMPETITIVE_SET_WISE_SCORE_FAILURE,
        payload: data,
    };
}

export function scholasticPerformanceMoudleSuccessAction(data) {
    return {
        type: SCHOLIASTIC_PERFORMANCE_MODLE_SUCCESS,
        payload: data,
    };
}

export function scholasticPerformanceMoudleFailureAction(data) {
    return {
        type: SCHOLIASTIC_PERFORMANCE_MODLE_FAILURE,
        payload: data,
    };
}

export function scholasticPerformanceMoudleOveralavgSuccessAction(data) {
    return {
        type: SCHOLIASTIC_PERFORMANCE_MODLE_OVERALLAVG_SUCCESS,
        payload: data,
    };
}

export function scholasticPerformanceMoudleOveralavgFailureAction(data) {
    return {
        type: SCHOLIASTIC_PERFORMANCE_MODLE_OVERALLAVG_FAILURE,
        payload: data,
    };
}

export function scholasticPerformanceMockSuccessAction(data) {
    return {
        type: SCHOLIASTIC_PERFORMANCE_MOCK_SUCCESS,
        payload: data,
    };
}

export function scholasticPerformanceMockFailureAction(data) {
    return {
        type: SCHOLIASTIC_PERFORMANCE_MOCK_FAILURE,
        payload: data,
    };
}

export function scholasticPerformanceMockOveralavgSuccessAction(data) {
    return {
        type: SCHOLIASTIC_PERFORMANCE_MOCK_OVERALLAVG_SUCCESS,
        payload: data,
    };
}

export function compareDiffarentSubjectScoreNtseSuccessAction(data) {
    return {
        type: COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_SUCCESS,
        payload: data,
    };
}

export function compareDiffarentSubjectScoreNtseFailureAction(data) {
    return {
        type: COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_FAILURE,
        payload: data,
    };
}

export function competitiveSetwizeScoreNtseSuccessAction(data) {
    return {
        type: COMPETITIVE_SETWISE_SCORE_NTSE_SUCCESS,
        payload: data,
    };
}

export function competitiveSetwizeScoreNtseFailureAction(data) {
    return {
        type: COMPETITIVE_SETWISE_SCORE_NTSE_FAILURE,
        payload: data,
    };
}
/* As per new UI- */

export function ScholasticSetModuleMockSubjectWiseSuccessAction(data) {
    return {
        type: ARCHIVE_SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_SUCCESS,//SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_SUCCESS,
        payload: data,
    };
}

export function getCompetitiveSetwiseScoreSuccessAction(data) {
    return {
        type: ARCHIVE_COMPETITIVE_SETWISE_SCORE_SUCCESS,//COMPETITIVE_SETWISE_SCORE_SUCCESS
        payload: data,
    };
}

export function getscholasticGetsubjectwiseChaptersAction(data) {
    return {
        type: ARCHIVE_SCHOLASTIC_GETSUBJECTWISE_CHAPTERS,//SCHOLASTIC_GETSUBJECTWISE_CHAPTERS
        payload: data,
    };
}

export function getScholasticChapterwiseAnalysisDataAction(data) {
    return {
        type: ARCHIVE_SCHOLASTIC_CHAPTER_ANALYSIS_DATA,//SCHOLASTIC_CHAPTER_ANALYSIS_DATA
        payload: data,
    };
}

export function getScholasticGetchapterwiseAnalysisCaseStudyAction(data) {
    return {
        type: ARCHIVE_SCHOLASTIC_CHAPTER_ANALYSIS_CASE_STUDIY_DATA,//SCHOLASTIC_CHAPTER_ANALYSIS_CASE_STUDIY_DATA
        payload: data,
    };
}

export function getCompareScholasticCompetitiveDataAction(data) {
    return {
        type: ARCHIVE_COMPARE_SCHOLASTIC_COMPETITIVE_DATA,//COMPARE_SCHOLASTIC_COMPETITIVE_DATA
        payload: data,
    };
}

export function getcompetitiveSubjectAvgscoreDataAction(data) {
    return {
        type: ARCHIVE_GET_COMPETITIVE_SUBJECT_AVGSCORE,//GETCOMPETITIVE_SUBJECT_AVGSCORE
        payload: data,
    };
}

export function getCompetitiveSetwiseMatScoreDataAction(data) {
    return {
        type: ARCHIVE_COMPETITIVE_SETWISE_MAT_SCORE,//GETCOMPETITIVE_SETWISE_MAT_SCORE,
        payload: data,
    };
}

export function getCompetitiveSetwiseSatScoreDataAction(data) {
    return {
        type: ARCHIVE_COMPETITIVE_SETWISE_SAT_SCORE,//GETCOMPETITIVE_SETWISE_SAT_SCORE,
        payload: data,
    };
}

export function getCompetitiveSetwiseSatScoreSubjectDataAction(data) {
    return {
        type: ARCHIVE_COMPETITIVE_SETWISE_SAT_SCORE_SUBJECT,//COMPETITIVE_SETWISE_SAT_SCORE_SUBJECT
        payload: data,
    };
}

export function getCompetitiveSetwiseMatScoreSubjecttDataAction(data) {
    return {
        type: ARCHIVE_COMPETITIVE_SETWISE_MAT_SCORE_SUBJECT,//COMPETITIVE_SETWISE_MAT_SCORE_SUBJECT,
        payload: data,
    };
}

export function getCompetitiveSubjectWiseComparisonDataAction(data) {
    return {
        type: ARCHIVE_COMPETITIVE_SUBJECTWISECOMPARISON,//GETCOMPETITIVE_SUBJECTWISECOMPARISON,
        payload: data,
    };
}
export function getcompetitiveNonverbalcomparisonDataAction(data) {
    return {
        type: ARCHIVE_COMPETITIVE_NONVERBALCOMPARISON,//GETCOMPETITIVE_NONVERBALCOMPARISON,
        payload: data,
    };
}
export function getelibrarySessionTimeDataAction(data) {
    return {
        type: ARCHIVE_ELIBRARY_SESSION_TIME,//ELIBRARY_SESSION_TIME,
        payload: data,
    };
}

export function elibraryMostVisitedSubjectsDataAction(data) {
    return {
        type: ARCHIVE_ELIBRARY_MOST_VISITED_SUBJECTS,//ELIBRARY_MOST_VISITED_SUBJECTS,
        payload: data,
    };
}
export function elibraryMostSearchQuestionsDataAction(data) {
    return {
        type: ARCHIVE_ELIBRARY_MOST_SEARCH_QUESTIONS,//ELIBRARY_MOST_SEARCH_QUESTIONS,
        payload: data,
    };
}
export function whereDoYouStandCompetitiveDataAction(data) {
    return {
        type: ARCHIVE_WHERE_DO_YOU_STAND_COMPETITIVE,//WHERE_DO_YOU_STAND_COMPETITIVE
        payload: data,
    };
}

/* store dashboard performance data into reducer */
export function dashboardPerformancescoreAction(data) {
    return {
        type: DASHBOARD_PERFORMANCESCORE,
        payload: data,
    };
}

export function scholasticGetsubjectwiseChaptersTableDataAction(data) {
    return {
        type: ARCHIVE_SCHOLATIC_SET_TABLE_DATA,//SCHOLATIC_SET_TABLE_DATA
        payload: data,
    };
}
/* As per new UI- */

export function clearCompetitiveSetWiseSatMatData() {
    return {
        type: CLEAR_COMPETITIVE_SETWISE_SAT_MAT_DATA
    };
}