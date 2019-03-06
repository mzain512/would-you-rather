import { SET_AUTHED_USER } from '../actions/authedUser'
import { SAVE_ANSWER } from '../actions/questions'

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.id
        case SAVE_ANSWER:
            const answers = state['answers']
            return {
                ...state,
                'answers': {
                    ...answers,
                    [action.qid]: action.answer,
                }
            }
        default:
            return state
    }
}