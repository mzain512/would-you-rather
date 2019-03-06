import { GET_QUESTIONS, SAVE_ANSWER } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return action.questions
        case SAVE_ANSWER:
            const question = state[action.qid]
            const option = question[action.answer]
            return {
                ...state,
                [action.qid]: {
                    ...question,
                    [action.answer]: {
                        ...option,
                        'votes': option.votes.concat(action.authedUser)
                    }
                }
            }
        default:
            return state
    }
}