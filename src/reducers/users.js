import { GET_USERS } from '../actions/users'
import { SAVE_ANSWER, NEW_QUESTION } from '../actions/questions'

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
            return {
                ...state,
                [action.authedUser]: {
                    ...user,
                    'answers': {
                        ...answers,
                        [action.qid]: action.answer,
                    }
                }
            }
        case NEW_QUESTION:
            const authedUser = state[action.question.author]
            return {
                ...state,
                [action.question.author]: {
                    ...authedUser,
                    'questions': authedUser.questions.concat(action.question.id)
                }
            }
        default:
            return state
    }
}