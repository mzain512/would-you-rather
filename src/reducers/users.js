import { GET_USERS } from '../actions/users'
import { SAVE_ANSWER } from '../actions/questions'

export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            }
        case SAVE_ANSWER:
            const user = state[action.authedUser]
            const answers = user['answers']
            const returnValue = {
                ...state,
                [action.authedUser]: {
                    ...user,
                    'answers': {
                        ...answers,
                        [action.qid]: action.answer,
                    }
                }
            }
            return returnValue
        default:
            return state
    }
}