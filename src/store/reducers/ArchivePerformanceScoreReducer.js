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
    LOGOUT,
    /* As per New UI */
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
    CLEAR_COMPETITIVE_SETWISE_SAT_MAT_DATA,
    ARCHIVE_CLASS
} from '../constants';


const initialState = {
    loading: false,
    performanceList: [],
    performanceOverallavg: '',
    scholasticOverAllPerformance: [],
    scholasticAveragePerformance: [],
    scholasticSetMoudleMockAveragePerformance: [],
    scholasticchapterWiseDetails: [],
    competitiveOverAllPerformance: [],
    competitiveSetWiseScore: [],
    scholasticPerformanceMoudle: [],
    scholasticPerformanceMoudleOverAllAverage: [],
    scholasticPerformanceMock: [],
    scholasticPerformanceMockOverAllAverage: [],
    compareDiffarentSubjectScoreNtse: [],
    comparativeSetwiseScoreNtse: [],
    /* As per New UI */
    scholasticLabel: [],
    SetData: [],
    ModuleData: [],
    MockData: [],
    compititiveSetwiseScore: [],
    // scholasticGetsubjectwiseChapters: [],
    scholasticGetsubjectwiseChaptersPiechart: [],
    scholasticGetsubjectwiseChaptersTabledata: [],
    // scholasticChaptersAnalysisData: [],
    scholasticChaptersAnalysisDataPiechart: [],
    scholasticChaptersAnalysisDataTabledata: [],
    compareScholasticCompetitiveDatasets: [],
    compareScholasticCompetitiveLabels: [],
    getcompetitiveSubjectAvgscore: [],
    getcompetitiveSetwiseSatScore: [],
    getcompetitiveSwiseMatScore: [],
    competitiveSetwiseSatScoreSubject: [],
    competitiveSetwiseMatScoreSubject: [],
    getcompetitiveSubjectwisecomparison: [],
    getcompetitiveNonverbalcomparison: [],
    elibrarySessionTime: [],
    elibraryMostVisitedSubjects: [],
    elibraryMostSearchQuestions: [],
    wheredoyoustandCompetitive: [],
    setLable: [],
    moduleLable: [],
    mockLable: [],
    dashboardPerformancescore: '',
    scholasticSetTableData: [],
    scholasticChaptersAnalysisCaseStudyDataPiechart: [],
    scholasticChaptersAnalysisCaseStudyDataTabledata: [],
    archiveClass:''
};

export function ArchivePerformanceScoreReducer(state = initialState, action) {

    if (action.type === PERFORMANCE_SCORE_LIST_SUCCESS) {
        return {
            ...state,
            performanceList: action.payload,
            loading: false,
        };
    }

    if (action.type === PERFORMANCE_OVERALL_AVERAGE) {

        return {
            ...state,
            performanceOverallavg: action.payload,
            loading: false,
        };
    }

    if (action.type === PERFORMANCE_SCORE_LIST_FAILURE) {
        return {
            ...state,
            performanceList: [],
            loading: false,
        };
    }

    if (action.type === ARCHIVE_SCHOLIASTIC_OVER_ALL_PERFORMANCE_SUCCESS) {
        return {
            ...state,
            scholasticOverAllPerformance: action.payload,
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_OVER_ALL_PERFORMANCE_FAILURE) {
        return {
            ...state,
            scholasticOverAllPerformance: [],
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_AVERAGE_PERFORMANCE_SUCCESS) {
        return {
            ...state,
            scholasticAveragePerformance: action.payload,
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_AVERAGE_PERFORMANCE_FAILURE) {
        return {
            ...state,
            scholasticAveragePerformance: [],
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_SUCCESS) {
        return {
            ...state,
            scholasticSetMoudleMockAveragePerformance: action.payload,
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_FAILURE) {
        return {
            ...state,
            scholasticSetMoudleMockAveragePerformance: [],
            loading: false,
        };
    }

    if (action.type === SCHOLASTIC_CHAPTER_WISE_DETAILS_SUCCESS) {
        return {
            ...state,
            scholasticchapterWiseDetails: action.payload,
            loading: false,
        };
    }

    if (action.type === SCHOLASTIC_CHAPTER_WISE_DETAILS_FAILURE) {
        return {
            ...state,
            scholasticchapterWiseDetails: [],
            loading: false,
        };
    }

    if (action.type === ARCHIVE_COMPETITIVE_OVER_ALL_PERFORMANCE_SUCCESS) {
        return {
            ...state,
            competitiveOverAllPerformance: action.payload,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_COMPETITIVE_OVER_ALL_PERFORMANCE_FAILURE) {
        return {
            ...state,
            competitiveOverAllPerformance: [],
            loading: false,
        };
    }

    if (action.type === COMPETITIVE_SET_WISE_SCORE_SUCCESS) {
        return {
            ...state,
            competitiveSetWiseScore: action.payload,
            loading: false,
        };
    }

    if (action.type === COMPETITIVE_SET_WISE_SCORE_FAILURE) {
        return {
            ...state,
            competitiveSetWiseScore: [],
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_PERFORMANCE_MODLE_SUCCESS) {
        return {
            ...state,
            scholasticPerformanceMoudle: action.payload,
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_PERFORMANCE_MODLE_FAILURE) {
        return {
            ...state,
            scholasticPerformanceMoudle: [],
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_PERFORMANCE_MODLE_OVERALLAVG_SUCCESS) {
        return {
            ...state,
            scholasticPerformanceMoudleOverAllAverage: action.payload,
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_PERFORMANCE_MODLE_OVERALLAVG_FAILURE) {
        return {
            ...state,
            scholasticPerformanceMoudleOverAllAverage: [],
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_PERFORMANCE_MOCK_SUCCESS) {
        return {
            ...state,
            scholasticPerformanceMock: action.payload,
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_PERFORMANCE_MOCK_FAILURE) {
        return {
            ...state,
            scholasticPerformanceMock: [],
            loading: false,
        };
    }

    if (action.type === SCHOLIASTIC_PERFORMANCE_MOCK_OVERALLAVG_SUCCESS) {
        return {
            ...state,
            scholasticPerformanceMockOverAllAverage: action.payload,
            loading: false,
        };
    }

    if (action.type === COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_SUCCESS) {
        return {
            ...state,
            compareDiffarentSubjectScoreNtse: action.payload,
            loading: false,
        };
    }

    if (action.type === COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_FAILURE) {
        return {
            ...state,
            compareDiffarentSubjectScoreNtse: [],
            loading: false,
        };
    }

    if (action.type === COMPETITIVE_SETWISE_SCORE_NTSE_SUCCESS) {
        return {
            ...state,
            comparativeSetwiseScoreNtse: action.payload,
            loading: false,
        };
    }

    if (action.type === COMPETITIVE_SETWISE_SCORE_NTSE_FAILURE) {
        return {
            ...state,
            comparativeSetwiseScoreNtse: [],
            loading: false,
        };
    }

    /* As per New UI */
    if (action.type === ARCHIVE_SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_SUCCESS) {
        return {
            ...state,
            scholasticLabel: action.payload.label,
            SetData: action.payload.series[0],
            ModuleData: action.payload.series[1],
            MockData: action.payload.series[2],
            setLable: action.payload.labels[0],
            moduleLable: action.payload.labels[1],
            mockLable: action.payload.labels[2],
            loading: false,
        };
    }

    if (action.type === ARCHIVE_COMPETITIVE_SETWISE_SCORE_SUCCESS) {
        return {
            ...state,
            compititiveSetwiseScore: action.payload,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_SCHOLASTIC_GETSUBJECTWISE_CHAPTERS) {
        return {
            ...state,
            scholasticGetsubjectwiseChaptersPiechart: action.payload.piechart,
            scholasticGetsubjectwiseChaptersTabledata: action.payload.tabledata,
        };
    }
    if (action.type === ARCHIVE_SCHOLASTIC_CHAPTER_ANALYSIS_DATA) {
        return {
            ...state,
            // scholasticChaptersAnalysisDataPiechart:[],
            scholasticChaptersAnalysisDataPiechart: action.payload.piechart,
            scholasticChaptersAnalysisDataTabledata: action.payload.tabledata,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_SCHOLASTIC_CHAPTER_ANALYSIS_CASE_STUDIY_DATA) {
        return {
            ...state,
            // scholasticChaptersAnalysisDataPiechart:[],
            scholasticChaptersAnalysisCaseStudyDataPiechart: action.payload.piechart,
            scholasticChaptersAnalysisCaseStudyDataTabledata: action.payload.tabledata,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_COMPARE_SCHOLASTIC_COMPETITIVE_DATA) {
        return {
            ...state,
            compareScholasticCompetitiveDatasets: action.payload.datasets,
            compareScholasticCompetitiveLabels: action.payload.labels,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_GET_COMPETITIVE_SUBJECT_AVGSCORE) {
        return {
            ...state,
            getcompetitiveSubjectAvgscore: action.payload,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_COMPETITIVE_SETWISE_MAT_SCORE) {
        return {
            ...state,
            getcompetitiveSwiseMatScore: action.payload,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_COMPETITIVE_SETWISE_SAT_SCORE) {
        return {
            ...state,
            getcompetitiveSetwiseSatScore: action.payload,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_COMPETITIVE_SETWISE_SAT_SCORE_SUBJECT) {
        return {
            ...state,
            competitiveSetwiseSatScoreSubject: action.payload,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_COMPETITIVE_SETWISE_MAT_SCORE_SUBJECT) {
        return {
            ...state,
            competitiveSetwiseMatScoreSubject: action.payload,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_COMPETITIVE_SUBJECTWISECOMPARISON) {
        return {
            ...state,
            getcompetitiveSubjectwisecomparison: action.payload,
            loading: false,
        };
    }
    if (action.type === ARCHIVE_COMPETITIVE_NONVERBALCOMPARISON) {
        return {
            ...state,
            getcompetitiveNonverbalcomparison: action.payload,
            loading: false,
        };
    }
    if (action.type === ARCHIVE_ELIBRARY_SESSION_TIME) {
        return {
            ...state,
            elibrarySessionTime: action.payload,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_ELIBRARY_MOST_VISITED_SUBJECTS) {
        return {
            ...state,
            elibraryMostVisitedSubjects: action.payload,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_ELIBRARY_MOST_SEARCH_QUESTIONS) {
        return {
            ...state,
            elibraryMostSearchQuestions: action.payload,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_WHERE_DO_YOU_STAND_COMPETITIVE) {
        return {
            ...state,
            wheredoyoustandCompetitive: action.payload,
            loading: false,
        };
    }
    /* As per New UI */


    if (action.type === PERFORMANCE_SCORE_REQUEST) {
        return {
            ...state,
            // loading: true,
            loading: action.payload,
        };
    }
    
    /* store dashboard performance data into reducer */
    if (action.type === DASHBOARD_PERFORMANCESCORE) {
        return {
            ...state,
            dashboardPerformancescore: action.payload,
            loading: true,
        };
    }
    if (action.type === ARCHIVE_SCHOLATIC_SET_TABLE_DATA) {
        return {
            ...state,
            scholasticSetTableData: action.payload,
            loading: false,
        };
    }

    if (action.type === ARCHIVE_CLASS) {
        return {
            ...state,
            archiveClass: action.payload,
            loading: false,
        };
    }

    if (action.type === LOGOUT) {
        return {
            loading: false,
            performanceList: [],
            performanceOverallavg: '',
            scholasticOverAllPerformance: [],
            scholasticAveragePerformance: [],
            scholasticSetMoudleMockAveragePerformance: [],
            scholasticchapterWiseDetails: [],
            competitiveOverAllPerformance: [],
            competitiveSetWiseScore: [],
            scholasticPerformanceMoudle: [],
            scholasticPerformanceMoudleOverAllAverage: [],
            scholasticPerformanceMock: [],
            scholasticPerformanceMockOverAllAverage: [],
            compareDiffarentSubjectScoreNtse: [],
            comparativeSetwiseScoreNtse: [],
            /* As per New UI */
            scholasticLabel: [],
            SetData: [],
            ModuleData: [],
            MockData: [],
            compititiveSetwiseScore: [],
            // scholasticGetsubjectwiseChapters: [],
            scholasticGetsubjectwiseChaptersPiechart: [],
            scholasticGetsubjectwiseChaptersTabledata: [],
            // scholasticChaptersAnalysisData: [],
            scholasticChaptersAnalysisDataPiechart: [],
            scholasticChaptersAnalysisDataTabledata: [],
            compareScholasticCompetitiveDatasets: [],
            compareScholasticCompetitiveLabels: [],
            getcompetitiveSubjectAvgscore: [],
            getcompetitiveSetwiseSatScore: [],
            getcompetitiveSwiseMatScore: [],
            competitiveSetwiseSatScoreSubject: [],
            competitiveSetwiseMatScoreSubject: [],
            getcompetitiveSubjectwisecomparison: [],
            getcompetitiveNonverbalcomparison: []
        };
    }

    return state;
}

