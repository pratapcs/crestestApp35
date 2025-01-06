import axios from 'axios';
import GlobalConfigs from "../configs/GlobalConfigs";
import * as Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getPerformanceScoreList(subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_PERFORMANCE_SCORE_LIST_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getScholasticOverAllPerformance(group_subject_id) {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        group_subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOLASTIC_OVERALL_PERFORMANCE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getScholasticAveragePerformance(exam_type) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        exam_type
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOLASTIC_AVERAGE_PERFORMANCE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getscholasticaverageperformanceSetModuleMock() {
    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOLASTIC_AVERAGE_PERFORMANCE_SET_MODULE_MOCK_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getscholasticComparativeStudyChapterWiseDetails(subject_id, chapter_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        subject_id,
        chapter_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_COMPARATIVE_STUDY_CHAPTERWISE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCompetitiveOverAllPerformance(exam_type) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        exam_type,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_COMPARATIVE_OVERALL_PERFORMANCE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCompetitiveSetWiseScore() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_COMPARATIVE_SET_WISE_SCORE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getScholasticPerformanceMoudle(subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOLASTIC_PERFORMANCE_MODULE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getScholasticPerformanceMock(subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOLASTIC_PERFORMANCE_MOCK_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getScholasticComparativeStudyModuleData(subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_COMPARATIVE_STUDY_MODULERWISE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getScholasticComparativeStudyMockData(subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_COMPARATIVE_STUDY_MOCKRWISE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCompareDiffarentSubjectScoreNtseData() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_COMPARE_DIFFARENT_SUBJECT_SCORE_NTSE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCompetitiveSetwizeScoreNtseData(set_no) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        set_no
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_COMPETITIVE_SPECIFIC_SETWISE_SCORE_NTSE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

/* API As per new UI */
export async function getScholasticSetModuleMockSubjectWiseData(group_subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        group_subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOLASTIC_SET_MODULE_MOCK_SUBJECT_WISE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function subjectWiseScholasticScoreData(group_subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        group_subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SUBJECT_WISE_SCHOLASTIC_SCORE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCompetitiveSetwiseScoreData(exam_type) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        exam_type,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.GET_COMPETITIVE_SETWISE_SCORE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getScholasticGetsubjectwiseChaptersData(exam_type, group_subject_id, ) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        exam_type: exam_type,
        group_subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOLASTIC_GETSUBJECTWISE_CHAPTERS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getScholasticChapterwiseAnalysisData(chapter_id, subject_id, moudleIndex, group_subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: student_id,
        subject: subject_id,
        chapter: chapter_id,
        exam_type: moudleIndex,
        group_subject_id
        // exam_type: 1
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOLASTIC_GETCHAPTERWISE_ANALYSIS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCompareScholasticCompetitiveData(exam_type, group_subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        exam_type,
        group_subject_id
    };

    // console.log("postData--122---", postData)

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_COMPARE_SCHOLASTIC_COMPETITIVE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getcompetitiveSubjectAvgscoreData(exam_type, group_subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: student_id,
        exam_type: exam_type,
        group_subject_id: group_subject_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GETCOMPETITIVE_SUBJECT_AVGSCORE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCompetitiveSetwiseSatScoreData(set_no, exam_type) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: student_id,
        exam_subtype: exam_type == 'NTSE' ? 1 : 0,
        set_no: set_no,
        exam_type: exam_type,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GETCOMPETITIVE_SETWISE_SAT_MAT_SCORE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCompetitiveSetwiseMatScoreData(set_no, exam_type) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: student_id,
        exam_subtype: 2,
        set_no: set_no,
        exam_type: exam_type,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GETCOMPETITIVE_SETWISE_SAT_MAT_SCORE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCompetitiveSetwiseSatScoreSubjectData(set_no, exam_type) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: student_id,
        exam_subtype: exam_type == 'NTSE' ? 1 : 0,
        set_no: set_no,
        exam_type: exam_type
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_COMPETITIVE_SETWISE_SAT_MAT_SCORE_SUBJECT_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCompetitiveSetwiseMatScoreSubjecttData(set_no, exam_type) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: student_id,
        exam_subtype: 2,
        set_no: set_no,
        exam_type: exam_type
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_COMPETITIVE_SETWISE_SAT_MAT_SCORE_SUBJECT_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getCompetitiveSubjectWiseComparisonData( exam_type, setNumber, subType) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: student_id,
        exam_type: exam_type,
        set_no:setNumber,
        sub_type:subType,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GETCOMPETITIVE_SUBJECTWISECOMPARISON_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getcompetitiveNonverbalcomparisonData(subject, exam_type, setNumber, subType) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: student_id,
        exam_type: exam_type,
        subject: subject,
        set_no:  setNumber,
        sub_type: subType,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_GETCOMPETITIVE_NONVERBALCOMPARISON_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getelibrarySessionTimeData(exam_category_id, exam_type_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        exam_category_id,
        exam_type_id,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_ELIBRARY_SESSION_TIME_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function elibraryMostVisitedSubjectsData(exam_category_id, exam_type_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        exam_category_id,
        exam_type_id,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_ELIBRARY_MOST_VISITED_SUBJECTS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,

    });
}

export async function elibraryMostSearchQuestionsData(exam_category_id, exam_type_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        exam_category_id,
        exam_type_id
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_ELIBRARY_MOST_SEARCH_QUESTIONS_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },

        data: postData,

    });
}

export async function whereDoYouStandCompetitiveData(exam_type, exam_subtype, set_no) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    const postData = {
        exam_type,
        exam_subtype,
        set_no
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_WHERE_DO_YOU_STAND_COMPETITIVE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,

    });
}

export async function dashboardPerformancescoreData() {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_DASHBOARD_PERFORMANCESCORE_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },

    });
}

export async function scholasticGetsubjectwiseChaptersTableData(subject, exam_type, group_subject_id,) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id,
        subject, 
        exam_type, 
        group_subject_id,
    };

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOLASTIC_GETSUBJECTWISE_CHAPTERS_TABLE_DATA_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}

export async function getScholasticGetchapterwiseAnalysisCaseStudyData(chapter_id, subject_id, moudleIndex, group_subject_id) {

    let getData = await AsyncStorage.getItem('crestestUserDetails');
    let token = JSON.parse(getData).token;
    let student_id = JSON.parse(getData).id;

    const postData = {
        student_id: student_id,
        subject: subject_id,
        chapter: chapter_id,
        exam_type: moudleIndex,
        group_subject_id
    };

    console.log("CaseStudyData----postData,", postData)

    return axios({
        url: GlobalConfigs.API_URL + Apis.POST_SCHOLASTIC_GETCHAPTERWISE_ANALYSIS_CASE_STUDY_API,
        method: "POST",
        headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${token}`
        },
        data: postData,
    });
}