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
        if (this.state.showAnsweredQuestion) {
            this.questionsList = this.state.questionsArray.map((question) => (
                <AnsweredQuestionCard key={question.id} question={question} />
            ))
        } else {
            this.questionsList = this.state.questionsArray.map((question) => (
                <UnAnsweredQuestionCard key={question.id} question={question} />
            ))
        }
        return (
            <div className='dashboard'>
                <DashboardButton text='Unanswered Questions' onClickFunc={this.unansweredQuestions} btnColor={this.state.btnColorOne}/>
                <DashboardButton text='Answered Questions' onClickFunc={this.answeredQuestions} btnColor={this.state.btnColorTwo}/>
                {/* <button style={{
                    flex: 1, height: '40px',
                    color: 'black',
                    backgroundColor: this.state.btnColorOne,
                    borderRadius: '5px', fontSize: '17px', width: '50%', borderColor: 'white'
                    , borderWidth: '3px'
                }} onClick={this.unansweredQuestions}>Unanswered Questions</button>
                <button style={{
                    flex: 1, height: '40px',
                    color: 'black',
                    backgroundColor: this.state.btnColorTwo,
                    borderRadius: '5px', fontSize: '17px', marginBottom: '10px', width: '50%', borderColor: 'white'
                    , borderWidth: '3px'
                }} onClick={this.answeredQuestions}>Answered Questions</button> */}

                <div>{this.questionsList}</div>

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
        unAnsweredQuestions,
        answeredQuestions,
        users,
        questions,
        authedUser
    }
}

export default connect(mapStateToProps)(Home)

function DashboardButton(props) {
    return(
        <button style={{
            flex: 1, height: '40px',
            color: 'black',
            backgroundColor: props.btnColor,
            borderRadius: '5px', fontSize: '17px', width: '50%', borderColor: 'white'
            , borderWidth: '3px'
        }} onClick={props.onClickFunc}>{props.text}</button>
    )
}
