import { fetchUsers } from './users'
import { _getUsers, _getQuestions } from '../utils/_DATA'
import { fetchQuestions } from './questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export const handleGetAllData = () => {
    return (dispatch) => {
        dispatch(showLoading())
        Promise.all([_getUsers(), _getQuestions()]).then(([users, questions]) => {
            dispatch(fetchUsers(users))
            dispatch(fetchQuestions(questions))
            dispatch(hideLoading())
        })
    }
}