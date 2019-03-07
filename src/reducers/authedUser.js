import { SET_AUTHED_USER ,LOGOUT } from '../actions/authedUser'
import { SAVE_ANSWER , NEW_QUESTION} from '../actions/questions'


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
        case NEW_QUESTION:
            return {
                ...state,
                'questions': state.questions.concat(action.question.id)
            }
        case LOGOUT:
            return null
        default:
            return state
    }
}