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
} from '../../services/PerformanceScoreService';
import Emitter from '../../utils/Emitter';
import * as Events from '../../configs/Events';

import {
    PERFORMANCE_SCORE_LIST_SUCCESS,
    PERFORMANCE_SCORE_LIST_FAILURE,
    PERFORMANCE_SCORE_REQUEST,
    PERFORMANCE_OVERALL_AVERAGE,
    SCHOLIASTIC_OVER_ALL_PERFORMANCE_SUCCESS,
    SCHOLIASTIC_OVER_ALL_PERFORMANCE_FAILURE,
    SCHOLIASTIC_AVERAGE_PERFORMANCE_SUCCESS,
    SCHOLIASTIC_AVERAGE_PERFORMANCE_FAILURE,
    SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_SUCCESS,
    SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_FAILURE,
    SCHOLASTIC_CHAPTER_WISE_DETAILS_SUCCESS,
    SCHOLASTIC_CHAPTER_WISE_DETAILS_FAILURE,
    COMPETITIVE_OVER_ALL_PERFORMANCE_SUCCESS,
    COMPETITIVE_OVER_ALL_PERFORMANCE_FAILURE,
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
    SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_SUCCESS,
    COMPETITIVE_SETWISE_SCORE_SUCCESS,
    SCHOLASTIC_GETSUBJECTWISE_CHAPTERS,
    SCHOLASTIC_CHAPTER_ANALYSIS_DATA,
    COMPARE_SCHOLASTIC_COMPETITIVE_DATA,
    GETCOMPETITIVE_SUBJECT_AVGSCORE,
    GETCOMPETITIVE_SETWISE_MAT_SCORE,
    GETCOMPETITIVE_SETWISE_SAT_SCORE,
    COMPETITIVE_SETWISE_SAT_SCORE_SUBJECT,
    COMPETITIVE_SETWISE_MAT_SCORE_SUBJECT,
    GETCOMPETITIVE_SUBJECTWISECOMPARISON,
    GETCOMPETITIVE_NONVERBALCOMPARISON,
    ELIBRARY_SESSION_TIME,
    ELIBRARY_MOST_VISITED_SUBJECTS,
    ELIBRARY_MOST_SEARCH_QUESTIONS,
    WHERE_DO_YOU_STAND_COMPETITIVE,
    DASHBOARD_PERFORMANCESCORE,
    SCHOLATIC_SET_TABLE_DATA,
    CLEAR_PERFORMANCE_DATA,
    CLEAR_COMPETITIVE_SETWISE_SAT_MAT_DATA,
    COMPETITIVE_NON_VERVAL_LOADING,
    SCHOLASTIC_CHAPTER_ANALYSIS_CASE_STUDIY_DATA
} from '../constants';

import {
    logout,
} from './AuthActions';

export function getPerformanceScoreListData(subject_id, history) {
    return async (dispatch) => {
        getPerformanceScoreList(subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(performanceScoreListSuccessAction(response.data.data));
                        dispatch(performanceScoreListOverallavgAction(response.data.overallavg));
                    } else {
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));

                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getScholasticAllData(subject_id, type, props) {
  return async function (dispatch) {
    try {
      Emitter.emit(Events.SHOW_PRELOADER);
      const overAllPerformanceData = await getScholasticOverAllPerformance(
        subject_id,
      );
      
      const setModuleMockData = await getScholasticSetModuleMockSubjectWiseData(
        subject_id,
      );
      
      const competitiveData = await getCompareScholasticCompetitiveData(
        type,
        subject_id,
      );
    //   console.log(JSON.stringify(setModuleMockData.data?.data), 'setModuleMockData')
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
        dispatch(logout(history));
      } else {
        Emitter.emit(Events.HIDE_PRELOADER);
        history.navigation.goBack();
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


export function getScholasticOverAllPerformanceData(group_subject_id, history) {
    return (dispatch) => {
        Emitter.emit(Events.SHOW_PRELOADER);
        getScholasticOverAllPerformance(group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticOverAllPerformanceSuccessAction(response.data.data));
                        Emitter.emit(Events.HIDE_PRELOADER);
                    } else {
                        dispatch(scholasticOverAllPerformanceFailureAction(response.data.data));
                        Emitter.emit(Events.HIDE_PRELOADER);
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    Emitter.emit(Events.HIDE_PRELOADER);
                    dispatch(logout(history));
                    return;
                } else {
                    Emitter.emit(Events.HIDE_PRELOADER);
                    history.goBack();
                }

            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getScholasticAveragePerformanceData(exam_type, history) {
    return async (dispatch) => {
        getScholasticAveragePerformance(exam_type)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticAveragePerformanceSuccessAction(response.data.data));
                    } else {
                        history.goBack();
                        dispatch(scholasticAveragePerformanceFailureAction(response.data.data));
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getScholasticAveragePerformanceSetModuleMockData(history) {
    return async (dispatch) => {
        getscholasticaverageperformanceSetModuleMock()
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticAveragePerformanceSetMoudleMockSuccessAction(response.data.data));
                    } else {
                        history.goBack();
                        dispatch(scholasticAveragePerformanceSetMoudleMockFailureAction(response.data.data));
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getscholasticComparativeStudyChapterWiseDetailsData(subject_id, chapter_id, history) {
    return async (dispatch) => {
        getscholasticComparativeStudyChapterWiseDetails(subject_id, chapter_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticChapterWiseDetailsSuccessAction(response.data.data));
                    } else {
                        history.goBack();
                        dispatch(scholasticChapterWiseDetailsFailureAction(response.data.data));
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getCompetitiveOverAllPerformanceData(exam_type, history) {
    return async (dispatch) => {
        getCompetitiveOverAllPerformance(exam_type)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(competitiveOverAllPerformanceSuccessAction(response.data.data));
                    } else {
                        dispatch(competitiveOverAllPerformanceFailureAction(response.data.data));
                        history.goBack();
                        // history.push('/online-performance-category');
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}
export function getCompetitiveSetWiseScoreData(exam_type, history) {
    return async (dispatch) => {
        getCompetitiveSetWiseScore()
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(competitiveSetWiseScoreSuccessAction(response.data.data));
                    } else {
                        dispatch(competitiveSetWiseScoreFailureAction(response.data.data));
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getScholasticPerformanceMoudleData(subject_id, history) {
    return async (dispatch) => {
        getScholasticPerformanceMoudle(subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticPerformanceMoudleSuccessAction(response.data.data));
                        dispatch(scholasticPerformanceMoudleOveralavgSuccessAction(response.data.overalavg));
                    } else {
                        dispatch(scholasticPerformanceMoudleFailureAction(response.data.data));
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getScholasticPerformanceMockData(subject_id, history) {
    return async (dispatch) => {
        getScholasticPerformanceMock(subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticPerformanceMoudleSuccessAction(response.data.data));
                        dispatch(scholasticPerformanceMoudleOveralavgSuccessAction(response.data.overalavg));
                    } else {
                        dispatch(scholasticPerformanceMoudleFailureAction(response.data.data));
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getScholasticComparativeStudyModuleDetailsData(subject_id, history) {
    return async (dispatch) => {
        getScholasticComparativeStudyModuleData(subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticChapterWiseDetailsSuccessAction(response.data.data));
                    } else {
                        dispatch(scholasticChapterWiseDetailsFailureAction(response.data.data));
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getScholasticComparativeStudyMockDetailsData(subject_id, history) {
    return async (dispatch) => {
        getScholasticComparativeStudyMockData(subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(scholasticChapterWiseDetailsSuccessAction(response.data.data));
                    } else {
                        dispatch(scholasticChapterWiseDetailsFailureAction(response.data.data));
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getCompareDiffarentSubjectScoreNtseDataDetails(history) {
    return async (dispatch) => {
        getCompareDiffarentSubjectScoreNtseData()
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(compareDiffarentSubjectScoreNtseSuccessAction(response.data.data));
                    } else {
                        dispatch(compareDiffarentSubjectScoreNtseFailureAction(response.data.data));
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getCompetitiveSetwizeScoreNtseDataDetails(set_no, history) {
    return async (dispatch) => {
        getCompetitiveSetwizeScoreNtseData(set_no)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(competitiveSetwizeScoreNtseSuccessAction(response.data.data));
                    } else {
                        dispatch(competitiveSetwizeScoreNtseFailureAction(response.data.data));
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

/* As per New UI */

export function getgetScholasticSetModuleMockSubjectWiseDataDetails(group_subject_id, history) {
    return async (dispatch) => {
        Emitter.emit(Events.SHOW_PRELOADER);
        getScholasticSetModuleMockSubjectWiseData(group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(ScholasticSetModuleMockSubjectWiseSuccessAction(response.data.data));
                        Emitter.emit(Events.HIDE_PRELOADER);
                    } else {
                        dispatch(ScholasticSetModuleMockSubjectWiseSuccessAction([]));
                        history.goBack();
                        Emitter.emit(Events.HIDE_PRELOADER);
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    Emitter.emit(Events.HIDE_PRELOADER);
                    return;
                } else {
                    Emitter.emit(Events.HIDE_PRELOADER);
                }

            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function subjectWiseScholasticScoreDataDetails(group_subject_id, history) {
    return async (dispatch) => {
        Emitter.emit(Events.SHOW_PRELOADER);
        subjectWiseScholasticScoreData(group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        Emitter.emit(Events.HIDE_PRELOADER);
                        dispatch(ScholasticSetModuleMockSubjectWiseSuccessAction(response.data.data));
                    } else {
                        Emitter.emit(Events.HIDE_PRELOADER);
                        dispatch(ScholasticSetModuleMockSubjectWiseSuccessAction([]));
                        history.navigation.goBack();
                    }
                } else if (response.data.status == 400) {
                    Emitter.emit(Events.HIDE_PRELOADER);
                    dispatch(logout(history));
                    return;
                } else {
                    Emitter.emit(Events.HIDE_PRELOADER);
                    history.navigation.goBack();
                }

            })
            .catch((error) => {
                //console.log(error);
                history.navigation.goBack();
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getCompetitiveSetwiseScoreDataDetails(exam_type, history) {
    return async (dispatch) => {
        getCompetitiveSetwiseScoreData(exam_type)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getCompetitiveSetwiseScoreSuccessAction(response.data.data));
                    } else {
                        dispatch(getCompetitiveSetwiseScoreSuccessAction([]));
                        history?.navigation.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getScholasticGetsubjectwiseChaptersDataDetails(exam_type, group_subject_id, props) {
    return async (dispatch) => {
        Emitter.emit(Events.SHOW_PRELOADER);
        getScholasticGetsubjectwiseChaptersData(exam_type, group_subject_id,)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        // dispatch(getscholasticGetsubjectwiseChaptersAction([]));
                        dispatch(getscholasticGetsubjectwiseChaptersAction(response.data.data));

                        if (Object.keys(response.data.data.piechart).length === 0) {
                            props.navigation.goBack();
                        }
                    } else {
                        dispatch(getscholasticGetsubjectwiseChaptersAction([]));
                        props.navigation.goBack();
                    }
                    
                } else if (response.data.status == 400) {
                    dispatch(logout(props));
                    return;
                } else {
                    dispatch(getscholasticGetsubjectwiseChaptersAction([]));
                    props.navigation.goBack();
                }
                Emitter.emit(Events.HIDE_PRELOADER);
            })
            .catch((error) => {
                dispatch(getscholasticGetsubjectwiseChaptersAction([]));
                props.navigation.goBack();
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getScholasticChapterwiseAnalysisDataDetails(chapter_id, subject_id, moudleIndex, group_subject_id, history) {
    return async (dispatch) => {
        Emitter.emit(Events.SHOW_PRELOADER);
        getScholasticChapterwiseAnalysisData(chapter_id, subject_id, moudleIndex, group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getScholasticChapterwiseAnalysisDataAction(response.data.data));
                    } else {
                        dispatch(getScholasticChapterwiseAnalysisDataAction([]));
                        history.navigation.goBack();
                    }
                    Emitter.emit(Events.HIDE_PRELOADER);
                } else if (response.data.status == 400) {
                    Emitter.emit(Events.HIDE_PRELOADER);
                    dispatch(logout(history));
                    return;
                } else {
                    Emitter.emit(Events.HIDE_PRELOADER);
                    c
                }

            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getScholasticGetchapterwiseAnalysisCaseStudyDataDetails(chapter_id, subject_id, moudleIndex, group_subject_id, props) {
    return async (dispatch) => {
        Emitter.emit(Events.SHOW_PRELOADER);
        getScholasticGetchapterwiseAnalysisCaseStudyData(chapter_id, subject_id, moudleIndex, group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getScholasticGetchapterwiseAnalysisCaseStudyAction(response.data.data));
                        Emitter.emit(Events.HIDE_PRELOADER);
                    } else {
                        dispatch(getScholasticGetchapterwiseAnalysisCaseStudyAction([]));
                        Emitter.emit(Events.HIDE_PRELOADER);
                        // utility.showError("Sorry! No Data Available");
                        Emitter.emit(Events.HIDE_PRELOADER);
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

export function getCompareScholasticCompetitiveDataDataDetails(exam_type, group_subject_id, history) {
    return async (dispatch) => {
        Emitter.emit(Events.SHOW_PRELOADER);
        getCompareScholasticCompetitiveData(exam_type, group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        Emitter.emit(Events.HIDE_PRELOADER);
                        dispatch(getCompareScholasticCompetitiveDataAction(response.data.data));
                    } else {
                        dispatch(getCompareScholasticCompetitiveDataAction([]));
                        Emitter.emit(Events.HIDE_PRELOADER);
                        history?.navigation?.goBack();
                    }
                } else if (response.data.status == 400) {
                    Emitter.emit(Events.HIDE_PRELOADER);
                    dispatch(logout(history));

                    return;
                } else {
                    Emitter.emit(Events.HIDE_PRELOADER);
                }

            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getcompetitiveSubjectAvgscoreDataDetails(exam_type, group_subject_id, history) {
    return async (dispatch) => {
        getcompetitiveSubjectAvgscoreData(exam_type, group_subject_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getcompetitiveSubjectAvgscoreDataAction(response.data.data));
                    } else {
                        dispatch(getcompetitiveSubjectAvgscoreDataAction([]));
                        navigation?.history?.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }
            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function getAllSubjectWiseCompetitiveScore(
  set_no,
  exam_type,
  history,
) {
  return async (dispatch) => {
    try {
        Emitter.emit(Events.SHOW_PRELOADER);
        const setWiseSatScore = await getCompetitiveSetwiseSatScoreData(
          set_no,
          exam_type,
        );
        const setWiseSatSubjectData =
          await getCompetitiveSetwiseSatScoreSubjectData(set_no, exam_type);
        const setWiseMatScore = await getCompetitiveSetwiseMatScoreData(
          set_no,
          exam_type,
        );
        const setWiseMatSubjectData =
          await getCompetitiveSetwiseMatScoreSubjecttData(set_no, exam_type);
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
            history?.navigation?.goBack();
          }
        } else if (setWiseSatScore.data.status == 400) {
          dispatch(logout(history));
          return;
        } else {
          history?.navigation?.goBack();
          Emitter.emit(Events.SHOW_MESSAGE, {
            type: 'danger',
            title: 'Failed',
            message: 'Failed to get score Data',
          });
        }
        Emitter.emit(Events.HIDE_PRELOADER);
      } catch (error) {
        Emitter.emit(Events.HIDE_PRELOADER);
        Emitter.emit(Events.SHOW_MESSAGE, {
          type: 'danger',
          title: 'Failed',
          message: 'Failed to get score Data',
        });
      }
  }
}
export function getAllSubjectWiseCompetitiveScoreWithoutMat(
    set_no,
    exam_type,
    history,
  ) {
    return async (dispatch) => {
        try {
            Emitter.emit(Events.SHOW_PRELOADER);
            const setWiseSatScore = await getCompetitiveSetwiseSatScoreData(
              set_no,
              exam_type,
            );
            const setWiseSatSubjectData =
              await getCompetitiveSetwiseSatScoreSubjectData(set_no, exam_type);
            
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
                
                history?.navigation?.goBack();
              }
            } else if (setWiseSatScore.data.status == 400) {
              dispatch(logout(history));
              return;
            } else {
              history?.navigation?.goBack();
              Emitter.emit(Events.SHOW_MESSAGE, {
                type: 'danger',
                title: 'Failed',
                message: 'Failed to get score Data',
              });
            }
            Emitter.emit(Events.HIDE_PRELOADER);
          } catch (error) {
            Emitter.emit(Events.HIDE_PRELOADER);
            Emitter.emit(Events.SHOW_MESSAGE, {
              type: 'danger',
              title: 'Failed',
              message: 'Failed to get score Data',
            });
          }
    }
  }
export function getCompetitiveSetwiseSatScoreDataDetails(set_no, exam_type, history) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getCompetitiveSetwiseSatScoreData(set_no, exam_type)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getCompetitiveSetwiseSatScoreDataAction(response.data.data));
                    } else {
                        dispatch(getCompetitiveSetwiseSatScoreDataAction([]));
                        history?.navigation?.goBack();
                    }

                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }
                Emitter.emit(Events.HIDE_PRELOADER);
            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.HIDE_PRELOADER);
                Emitter.emit(Events.SHOW_MESSAGE, {
                    type: 'danger',
                    title: 'Failed',
                    message: 'Failed to get score Data',
                  });
            });
    };
}

export function getCompetitiveSetwiseMatScoreDataDetails(set_no, exam_type, history) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getCompetitiveSetwiseMatScoreData(set_no, exam_type)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getCompetitiveSetwiseMatScoreDataAction(response.data.data));
                    } else {
                        dispatch(getCompetitiveSetwiseMatScoreDataAction([]));
                        history?.navigation?.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }
                Emitter.emit(Events.HIDE_PRELOADER);
            })
            .catch((error) => {
                Emitter.emit(Events.SHOW_MESSAGE, {
                    type: 'danger',
                    title: 'Failed',
                    message: 'Failed to get score Data',
                  });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getCompetitiveSetwiseSatScoreSubjectDataDetails(set_no, exam_type, history) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        getCompetitiveSetwiseSatScoreSubjectData(set_no, exam_type)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getCompetitiveSetwiseSatScoreSubjectDataAction(response.data.data));
                    } else {
                        dispatch(getCompetitiveSetwiseSatScoreSubjectDataAction([]));
                        history?.navigation?.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }
                Emitter.emit(Events.HIDE_PRELOADER);
            })
            .catch((error) => {
                Emitter.emit(Events.SHOW_MESSAGE, {
                    type: 'danger',
                    title: 'Failed',
                    message: 'Failed to get score Data',
                  });
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function getCompetitiveSetwiseMatScoreSubjecttDataDetails(
  set_no,
  exam_type,
  history,
) {
  Emitter.emit(Events.SHOW_PRELOADER);
  return async dispatch => {
    getCompetitiveSetwiseMatScoreSubjecttData(set_no, exam_type)
      .then(response => {
        if (response.data.status == 200) {
          if (response.data.data != '') {
            dispatch(
              getCompetitiveSetwiseMatScoreSubjecttDataAction(
                response.data.data,
              ),
            );
          } else {
            dispatch(getCompetitiveSetwiseMatScoreSubjecttDataAction([]));
            history?.navigation?.goBack();
          }
        } else if (response.data.status == 400) {
          dispatch(logout(history));
          return;
        } else {
        }
        Emitter.emit(Events.HIDE_PRELOADER);
      })
      .catch(error => {
        Emitter.emit(Events.SHOW_MESSAGE, {
          type: 'danger',
          title: 'Failed',
          message: 'Failed to get score Data',
        });
        Emitter.emit(Events.HIDE_PRELOADER);
      });
  };
}


export function getCompetitiveSubjectWiseComparisonDataDetails(
  exam_type,
  setNumber,
  subType,
  history,
) {
  Emitter.emit(Events.SHOW_PRELOADER);
  return async dispatch => {
    getCompetitiveSubjectWiseComparisonData(exam_type, setNumber, subType)
      .then(response => {
        if (response.data.status == 200) {
          if (response.data.data != '') {
            dispatch(
              getCompetitiveSubjectWiseComparisonDataAction(response.data.data),
            );
          } else {
            dispatch(getCompetitiveSubjectWiseComparisonDataAction([]));
            history.navigation.goBack();
          }
        } else if (response.data.status == 400) {
          dispatch(logout(history));
          return;
        } else {
        }
        Emitter.emit(Events.HIDE_PRELOADER);
      })
      .catch(error => {
        Emitter.emit(Events.HIDE_PRELOADER);
        Emitter.emit(Events.SHOW_MESSAGE, {
          type: 'danger',
          title: 'Failed',
          message: 'Failed to get table data',
        });
      });
  };
}


export function getcompetitiveNonverbalcomparisonDataDetails(subject, exam_type, setNumber, subType, history) {
    // Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        dispatch(changeCompetitiveNonVervalLoadingStatus(true))
        getcompetitiveNonverbalcomparisonData(subject, exam_type, setNumber, subType)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getcompetitiveNonverbalcomparisonDataAction(response.data.data));
                    } else {
                        dispatch(getcompetitiveNonverbalcomparisonDataAction([]));
                        history.navigation.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {
                    
                    Emitter.emit(Events.SHOW_MESSAGE, {
                        type: 'danger',
                        title: 'Failed',
                        message: 'Please try again',
                      });
                }
                // Emitter.emit(Events.HIDE_PRELOADER);
                dispatch(changeCompetitiveNonVervalLoadingStatus(false))
            })
            .catch((error) => {
                // Emitter.emit(Events.HIDE_PRELOADER);
                dispatch(changeCompetitiveNonVervalLoadingStatus(false))
                Emitter.emit(Events.SHOW_MESSAGE, {
                    type: 'danger',
                    title: 'Failed',
                    message: 'Please try again',
                  });
            });
    };
}

export function getelibrarySessionTimeDataDetails(exam_category_id, exam_type_id, history) {
    return async (dispatch) => {
        getelibrarySessionTimeData(exam_category_id, exam_type_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(getelibrarySessionTimeDataAction(response.data.data));
                    } else {
                        dispatch(getelibrarySessionTimeDataAction([]));
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function elibraryMostVisitedSubjectsDataDetails(exam_category_id, exam_type_id, history) {
    return async (dispatch) => {
        elibraryMostVisitedSubjectsData(exam_category_id, exam_type_id)
            .then((response) => {
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(elibraryMostVisitedSubjectsDataAction(response.data.data));
                    } else {
                        dispatch(elibraryMostVisitedSubjectsDataAction([]));
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}
export function elibraryMostSearchQuestionsDataDetails(exam_category_id, exam_type_id, history) {
    return async (dispatch) => {
        elibraryMostSearchQuestionsData(exam_category_id, exam_type_id)
            .then((response) => {
                if (response.data.status == 200) {

                    if (response.data.data != "") {
                        dispatch(elibraryMostSearchQuestionsDataAction(response.data.data));
                    } else {
                        dispatch(elibraryMostSearchQuestionsDataAction([]));
                        history.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }

            })
            .catch((error) => {
                //console.log(error);
            });
    };
}

export function whereDoYouStandCompetitiveDataDetails(exam_type, subType, setNumber, history) {
    Emitter.emit(Events.SHOW_PRELOADER);
    return async (dispatch) => {
        whereDoYouStandCompetitiveData(exam_type, subType, setNumber)
            .then((response) => {
                // console.log("response-----", response)
                if (response.data.status == 200) {
                    if (response.data.data != "") {
                        dispatch(whereDoYouStandCompetitiveDataAction(response.data.data));
                    } else {
                        dispatch(whereDoYouStandCompetitiveDataAction([]));
                        history.navigation.goBack();
                    }
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {
                    Emitter.emit(Events.SHOW_MESSAGE, {
                        type: 'danger',
                        title: 'Failed',
                        message: 'Failed to get score Data',
                      });
                }
                Emitter.emit(Events.HIDE_PRELOADER);
            })
            .catch((error) => {
                //console.log(error);
                Emitter.emit(Events.HIDE_PRELOADER);
            });
    };
}

export function dashboardPerformancescoreDetails(history) {
    return async (dispatch) => {
        dashboardPerformancescoreData()
            .then((response) => {
                // console.log("response-----", response)
                if (response.data.status == 200) {
                    dispatch(dashboardPerformancescoreAction(response.data.performance_overall));
                } else if (response.data.status == 400) {
                    dispatch(logout(history));
                    return;
                } else {

                }
            })
            .catch((error) => {
                //console.log(error);
            });
    };
}


export function scholasticGetsubjectwiseChaptersTableDataDetails(
  subjectName,
  exam_type,
  group_subject_id,
  history,
) {
  return async dispatch => {
    scholasticGetsubjectwiseChaptersTableData(
      subjectName,
      exam_type,
      group_subject_id,
    )
      .then(response => {
        if (response.data.status == 200) {
          
          dispatch(
            scholasticGetsubjectwiseChaptersTableDataAction(
              response.data.data.tabledata,
            ),
          );
        } else if (response.data.status == 400) {
          dispatch(logout(history));
          return;
        } else {
          Emitter.emit(Events.SHOW_MESSAGE, {
            type: 'danger',
            title: 'Failed',
            message: 'Failed to get table data',
          });
        }
      })
      .catch(error => {
        Emitter.emit(Events.SHOW_MESSAGE, {
          type: 'danger',
          title: 'Failed',
          message: 'Failed to get table data',
        });
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
        type: SCHOLIASTIC_OVER_ALL_PERFORMANCE_SUCCESS,
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
        type: COMPETITIVE_OVER_ALL_PERFORMANCE_SUCCESS,
        payload: data,
    };
}

export function competitiveOverAllPerformanceFailureAction(data) {
    return {
        type: COMPETITIVE_OVER_ALL_PERFORMANCE_FAILURE,
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
        type: SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_SUCCESS,
        payload: data,
    };
}

export function getCompetitiveSetwiseScoreSuccessAction(data) {
    return {
        type: COMPETITIVE_SETWISE_SCORE_SUCCESS,
        payload: data,
    };
}

export function getscholasticGetsubjectwiseChaptersAction(data) {
    return {
        type: SCHOLASTIC_GETSUBJECTWISE_CHAPTERS,
        payload: data,
    };
}

export function getScholasticChapterwiseAnalysisDataAction(data) {
    return {
        type: SCHOLASTIC_CHAPTER_ANALYSIS_DATA,
        payload: data,
    };
}

export function getCompareScholasticCompetitiveDataAction(data) {
    return {
        type: COMPARE_SCHOLASTIC_COMPETITIVE_DATA,
        payload: data,
    };
}
export function getcompetitiveSubjectAvgscoreDataAction(data) {
    return {
        type: GETCOMPETITIVE_SUBJECT_AVGSCORE,
        payload: data,
    };
}

export function getCompetitiveSetwiseMatScoreDataAction(data) {
    return {
        type: GETCOMPETITIVE_SETWISE_MAT_SCORE,
        payload: data,
    };
}

export function getCompetitiveSetwiseSatScoreDataAction(data) {
    return {
        type: GETCOMPETITIVE_SETWISE_SAT_SCORE,
        payload: data,
    };
}

export function getCompetitiveSetwiseSatScoreSubjectDataAction(data) {
    return {
        type: COMPETITIVE_SETWISE_SAT_SCORE_SUBJECT,
        payload: data,
    };
}

export function getCompetitiveSetwiseMatScoreSubjecttDataAction(data) {
    return {
        type: COMPETITIVE_SETWISE_MAT_SCORE_SUBJECT,
        payload: data,
    };
}


export function clearCompetitiveSetWiseSatMatData() {
    return {
        type: CLEAR_COMPETITIVE_SETWISE_SAT_MAT_DATA
    };
}

export function getCompetitiveSubjectWiseComparisonDataAction(data) {
    return {
        type: GETCOMPETITIVE_SUBJECTWISECOMPARISON,
        payload: data,
    };
}
export function getcompetitiveNonverbalcomparisonDataAction(data) {
    return {
        type: GETCOMPETITIVE_NONVERBALCOMPARISON,
        payload: data,
    };
}
export function changeCompetitiveNonVervalLoadingStatus(data){
    return {
        type: COMPETITIVE_NON_VERVAL_LOADING,
        payload: data
    }
}
export function getelibrarySessionTimeDataAction(data) {
    return {
        type: ELIBRARY_SESSION_TIME,
        payload: data,
    };
}

export function elibraryMostVisitedSubjectsDataAction(data) {
    return {
        type: ELIBRARY_MOST_VISITED_SUBJECTS,
        payload: data,
    };
}
export function elibraryMostSearchQuestionsDataAction(data) {
    return {
        type: ELIBRARY_MOST_SEARCH_QUESTIONS,
        payload: data,
    };
}
export function whereDoYouStandCompetitiveDataAction(data) {
    return {
        type: WHERE_DO_YOU_STAND_COMPETITIVE,
        payload: data,
    };
}
export function dashboardPerformancescoreAction(data) {
    return {
        type: DASHBOARD_PERFORMANCESCORE,
        payload: data,
    };
}

export function scholasticGetsubjectwiseChaptersTableDataAction(data) {
    return {
        type: SCHOLATIC_SET_TABLE_DATA,
        payload: data,
    };
}

export function clearScholasticData() {
  return {
    type: CLEAR_PERFORMANCE_DATA,
  };
}

export function getScholasticGetchapterwiseAnalysisCaseStudyAction(data) {
    return {
        type: SCHOLASTIC_CHAPTER_ANALYSIS_CASE_STUDIY_DATA,
        payload: data,
    };
}
/* As per new UI- */