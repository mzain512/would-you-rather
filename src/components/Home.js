import React from 'react'
import { connect } from 'react-redux'
import UnAnsweredQuestionCard from './UnAnsweredQuestionCard'
import AnsweredQuestionCard from './AnsweredQuestionCard'

class Home extends React.Component {

    state = {
        btnColorOne: 'rgb(60,171,143,0.6)',
        btnColorTwo: 'white',
        showAnsweredQuestion: false,
        questionsArray: this.props.unAnsweredQuestions,
    }
    answeredQuestions = () => {
        this.setState((lastState) => ({
            questionsArray: this.props.answeredQuestions,
            showAnsweredQuestion: true,
            btnColorOne: 'white',
            btnColorTwo: 'rgb(60,171,143,0.6)',
        }))
    }

    unansweredQuestions = () => {
        this.setState((lastState) => ({
            questionsArray: this.props.unAnsweredQuestions,
            showAnsweredQuestion: false,
            btnColorOne: 'rgb(60,171,143,0.6)',
            btnColorTwo: 'white',
        }))
    }

    render() {
        let questionsList = []
        if (this.state.showAnsweredQuestion) {
            questionsList = this.state.questionsArray.map((question) => (
                <AnsweredQuestionCard key={question.id} question={question} />
            ))
        } else {
            questionsList = this.state.questionsArray.map((question) => (
                <UnAnsweredQuestionCard key={question.id} question={question} />
            ))
        }
        return (
            <div className='dashboard'>
                <DashboardButton text='Unanswered Questions'
                    onClickFunc={this.unansweredQuestions}
                    btnColor={this.state.btnColorOne} />
                <DashboardButton text='Answered Questions'
                    onClickFunc={this.answeredQuestions}
                    btnColor={this.state.btnColorTwo} />
                <div>{questionsList}</div>

            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }, props) {
    const answeredQuestions = Object.values(questions).filter((question) => (
        Object.keys(authedUser.answers).includes(question.id)
    ))
    const unAnsweredQuestions = Object.values(questions).filter((question) => (
        !Object.keys(authedUser.answers).includes(question.id)
    ))

    return {
        unAnsweredQuestions: unAnsweredQuestions.sort((a, b) => b.timestamp - a.timestamp),
        answeredQuestions: answeredQuestions.sort((a, b) => b.timestamp - a.timestamp),
        users,
        questions,
        authedUser
    }
}

export default connect(mapStateToProps)(Home)

function DashboardButton(props) {
    return (
        <button style={{
            flex: 1, height: '40px',
            color: 'black',
            backgroundColor: props.btnColor,
            borderRadius: '5px', fontSize: '17px', width: '50%', borderColor: 'white'
            , borderWidth: '3px'
        }} onClick={props.onClickFunc}>{props.text}</button>
    )
}

