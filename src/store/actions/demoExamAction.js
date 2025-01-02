import {
    QUESTION_NUMBER_SELECT,
    QUESTION_PREVIOUS,
    QUESTION_NEXT,
    SUBMIT_ANSWER,
    ALERT_SOUND,
    TIME_UP,
    TIME_USED
} from '../constants';


export function selectDemoQuestionNumber(data) {
    return {
        type: QUESTION_NUMBER_SELECT,
        payload: data,
    };
}

export function selectPrevousDemoQuestion(data) {
    return {
        type: QUESTION_PREVIOUS,
        payload: data,
    };
}
export function selectNextDemoQuestion(data) {
    return {
        type: QUESTION_NEXT,
        payload: data,
    };
}
export function submitAnswer(data) {
    return {
        type: SUBMIT_ANSWER,
        payload: data,
    };
}

export function alertSoundAction(data) {
    return {
        type: ALERT_SOUND,
        payload: data,
    };
}
export function timeUpAction(data) {
    // console.log("*****-----", data)
    return {
        type: TIME_UP,
        payload: data,
    };
}
export function timeUsedForExamAction(data) {
    return {
        type: TIME_USED,
        payload: data,
    };
}
    