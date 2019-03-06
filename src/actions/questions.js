import { showLoading, hideLoading } from 'react-redux-loading'
import {_saveQuestionAnswer} from '../utils/_DATA'
export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'

export function fetchQuestions(questions) {
    return {
        type : GET_QUESTIONS,
        questions
    }
}

function saveAnswer(authedUser, qid, answer) {
    return {
        type:SAVE_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function handleSaveAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(showLoading())
        _saveQuestionAnswer({authedUser, qid, answer}).then(() => {
            dispatch(saveAnswer(authedUser, qid, answer))
        }).catch((ex) => {
            alert('Please try again!');
        })
        .finally(() => dispatch(hideLoading()));
    }
}