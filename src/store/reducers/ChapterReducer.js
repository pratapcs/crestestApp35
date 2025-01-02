import {
    GET_CHAPTER_LIST,
    CHAPTER_LOADING,
    LOGOUT,
    EXAM_COMPLETED_LIST_SUCCESS,
    GET_BRANCH_ID_BY_CHAPTER_LIST,
    EXAM_COMPLETED_LIST_FAILURE
} from '../constants';

const initialState = {
    chapterList: [],
    chapterListbyBranch: [],
    showLoadingChapter: false,
    examCompletedChapterList: []
};

export function ChapterReducer(state = initialState, action) {

    if (action.type === GET_CHAPTER_LIST) {
        return {
            ...state,
            chapterList: action.payload,
            showLoadingChapter: false,
        };
    }

    if (action.type === GET_BRANCH_ID_BY_CHAPTER_LIST) {
        return {
            ...state,
            chapterListbyBranch: action.payload,
            showLoadingChapter: false,
        };
    }

    if (action.type === CHAPTER_LOADING) {
        return {
            ...state,
            showLoadingChapter: action.payload,
        };
    }

    if (action.type === EXAM_COMPLETED_LIST_SUCCESS) {
        return {
            ...state,
            examCompletedChapterList: action.payload,
            showLoadingChapter: false,
        };
    }

    if (action.type === EXAM_COMPLETED_LIST_FAILURE) {
        return {
            ...state,
            examCompletedChapterList: [],
            showLoadingChapter: false,
        };
    }

    if (action.type === LOGOUT) {
        return {
            ...state,
            chapterList: [],
            chapterListbyBranch: [],
            showLoadingChapter: false,
            examCompletedChapterList: []
        };
    }

    return state;
}

