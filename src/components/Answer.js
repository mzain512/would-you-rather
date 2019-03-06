import React from 'react'
import { connect } from 'react-redux'

class Answer extends React.Component {
    render() {
        const { question, author, authedUser } = this.props
        const totalVotes = question['optionOne'].votes.length + question['optionTwo'].votes.length
        const optionOnePercentage = ((question['optionOne'].votes.length / totalVotes) * 100).toFixed(0)
        const optionTwoPercentage = ((question['optionTwo'].votes.length / totalVotes) * 100).toFixed(0)
        let optionOneColor = 'rgb(255,255,255)'
        let optionTwoColor = 'rgb(255,255,255)'
        if (question['optionOne'].votes.includes(authedUser.id)) {
            optionOneColor = 'rgb(230,251,249)'
        } else {
            optionTwoColor = 'rgb(230,251,249)'
        }
        return (
            <div style={{ margin: '5px auto', border: 'solid', width: '550px', borderColor: 'cyan', borderRadius: '5px' }}>
                <div style={{ marginLeft: '10px', textAlign: 'center', borderBottom: 'solid', borderBottomColor: 'grey' }}>
                    <h4>{'Asked by ' + author.name}</h4>
                </div>
                <div style={{ textAlign: 'center', margin: '10px auto' }}>
                    <img alt="User Pic"
                        src={author.avatarURL}
                        height='80px' style={{ borderRadius: '40px', margin: 'auto', textAlign: 'center' }}></img>
                    <h2>Results</h2>
                </div>
                <div style={{ display: 'inline-flex' }}>

                    <AnswerBox optionColor={optionOneColor}
                        questionText={question['optionOne'].text}
                        percentage={optionOnePercentage} totalVotes={totalVotes}
                        currentVotes={question['optionOne'].votes.length} />

                    <AnswerBox optionColor={optionTwoColor}
                        questionText={question['optionTwo'].text}
                        percentage={optionTwoPercentage} totalVotes={totalVotes}
                        currentVotes={question['optionTwo'].votes.length} />

                </div>

            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Answer);


function AnswerBox(props) {
    return (
        <div style={{
            border: 'solid', borderRadius: '5px',
            borderColor: 'cyan',
            alignItems: 'center', margin: '5px', width: '50%', backgroundColor: props.optionColor
        }}><h5 style={{ margin: '20px' }}>{'Would you rather ' + props.questionText + '?'}</h5>
            <div className="meter">
                <p style={{ float: 'right', marginTop: 'auto', marginRight: '-40px' }}>{props.percentage + '%'}</p>
                <span style={{ width: `${props.percentage}%` }}></span>
            </div>
            <h5 style={{ margin: 'auto', textAlign: 'center' }}>{props.currentVotes + ' out of ' + props.totalVotes + ' votes'}</h5>
        </div>
    )
}