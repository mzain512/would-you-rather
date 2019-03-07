import React from 'react'
import { connect } from 'react-redux'
import { handleSaveAnswer } from '../actions/questions'
import Answer from './Answer'
class Question extends React.Component {

    handleRadioAction = (event) => {
        const a = event.target.value
        this.setState(() => ({
            selectedOption: a,
            selectedValue: a,
        }))
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.setState({ isAnswered: true })
        this.props.dispatch(handleSaveAnswer(this.props.authedUser.id, this.props.question.id, this.state.selectedValue))
    }

    state = {
        selectedOption: ' ',
        selectedValue: '',
        isAnswered: false
    }

    render() {
        const { question, author, authedUser } = this.props
        if (question === null) {
            return <h1>Question Not Found 404</h1>
        }
        if (Object.keys(authedUser['answers']).includes(question.id)) {
            return <Answer question={question} author={author} />
        }

        return (
            <div style={{ margin: '10px auto', border: 'solid', width: '500px', borderColor: 'rgb(43,194,83,1)', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>{author.name + ' says'}</div>
                <img alt="User Pic"
                    src={author.avatarURL}
                    height='80px' style={{ borderRadius: '40px', margin: 'auto', textAlign: 'center' }}></img>
                <h1 style={{ textAlign: 'center' }}>Would you rather</h1>
                <form onSubmit={this.onSubmit} style={{ textAlign: 'left' }}>
                    <input style={{ marginLeft: '25px' }} type="radio" name='options' value='optionOne' onChange={this.handleRadioAction}
                        checked={this.state.selectedOption === 'optionOne'} />{question.optionOne.text}
                    <br />
                    <input style={{ marginBottom: '10px', marginLeft: '25px' }} type="radio" name='options' value='optionTwo' onChange={this.handleRadioAction}
                        checked={this.state.selectedOption === 'optionTwo'} />{question.optionTwo.text}
                    <br />
                    <input className='submit-btn' type='submit' disabled={this.state.selectedValue === ''}></input>
                </form>

            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, props) {
    const id = props.match.params.id
    return questions[id] ? {
        question: questions[id],
        author: users[questions[id].author],
        authedUser,
    } : {
            question: null
        }
}

export default connect(mapStateToProps)(Question)
