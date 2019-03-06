import { GET_QUESTIONS, SAVE_ANSWER, NEW_QUESTION } from '../actions/questions'

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
        case NEW_QUESTION:
            const questionAdded = action.question
            return {
                ...state,
                [action.question.id]: questionAdded
            }
        default:
            return state
    }
}