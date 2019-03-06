import React from 'react'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
import { VIEW_POLL } from '../utils/urls'
class UnAnsweredQuestionCard extends React.Component {


    viewPollHandler = () => {
        this.props.history.push(`${VIEW_POLL}${this.props.question.id}`)
    }

    render() {
        const { question, author } = this.props
        return (
            <div className='questionCard'>
                <h3 style={{ margin: '10px', textAlign: 'left' }}>{author.name + ' says'}</h3>
                <div className='profileCard'>
                    <img alt="User Pic"
                        src={author.avatarURL}
                        height='80px' style={{ borderRadius: '40px', margin: '10px' }}></img>
                    <h1 style={{ margin: '10px' }}>Would you rather</h1>
                    <p>{question.optionOne.text}</p>
                    <h2 style={{ margin: '10px' }}>OR</h2>
                    <p>{question.optionTwo.text}</p>
                    <div>
                    <Link className='button-view-poll'
                     to={`${VIEW_POLL}${question.id}`}>View Poll</Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }, props) {

    return {
        ...props,
        author: users[props.question.author]
    }
}

export default connect(mapStateToProps)(UnAnsweredQuestionCard)