import React from 'react'
import { connect } from 'react-redux'
// import UnAnsweredQuestionCard from './UnAnsweredQuestionCard';
import { Link } from 'react-router-dom'
import { VIEW_POLL } from '../utils/urls'

class AnsweredQuestionCard extends React.Component {
    render() {
        const { question, author, selectedOption } = this.props
        return (
            <div className='questionCard'>
                <h3 style={{ margin: '10px', textAlign: 'left' }}>{author.name + ' asks'}</h3>
                <div className='profileCard'>
                    <img alt="User Pic"
                        src={author.avatarURL}
                        height='80px' style={{ borderRadius: '40px', margin: '10px' }}></img>
                    <h1 style={{ margin: '10px' }}>Would you rather</h1>
                    <p>{question[selectedOption].text}</p>
                    <Link className='button-view-poll'
                        to={`${VIEW_POLL}${question.id}`}>View Poll</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }, props) {

    return {
        users,
        author: users[props.question.author],
        selectedOption: authedUser.answers[props.question.id]
    }
}

export default connect(mapStateToProps)(AnsweredQuestionCard);