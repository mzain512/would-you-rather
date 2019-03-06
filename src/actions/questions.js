import { showLoading, hideLoading } from 'react-redux-loading'
import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
export const GET_QUESTIONS = 'GET_QUESTIONS'
export const SAVE_ANSWER = 'SAVE_ANSWER'
export const NEW_QUESTION = 'NEW_QUESTION'

export function fetchQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

function saveAnswer(authedUser, qid, answer) {
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer
    }
}

function saveNewQuestion(question) {
    return {
        type: NEW_QUESTION,
        question,
    }
}

export function handleSaveAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(showLoading())
        _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
            dispatch(saveAnswer(authedUser, qid, answer))
        }).catch((ex) => {
            alert('Please try again!');
        })
            .finally(() => dispatch(hideLoading()));
    }
}

export function handleSaveNewQuestion(author, optionOneText, optionTwoText) {
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestion({ author, optionOneText, optionTwoText })
        .then((question) => {
            dispatch(saveNewQuestion(question))
        }).catch((ex) => {
            alert('Please try again!');
        })
            .then(() => dispatch(hideLoading()));

    }
}