import React from 'react'
import { connect } from 'react-redux'

class Leaderboard extends React.Component {
    render() {
        const { leaderBoard } = this.props
        return (
            <div>
                {leaderBoard.map((user) => (
                    <LeaderboardCard key={user.name} user={user} />
                ))}
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    const leaderBoard = Object.values(users).map(user => {
        var object = {}
        object.name = user.name
        object.answered = Object.values(user.answers).length
        object.questions = user.questions.length
        object.totalScore = object.answered + object.questions
        object.avatar = user.avatarURL
        return object
    })
    return {
        leaderBoard: leaderBoard.sort((a, b) => b.totalScore - a.totalScore)
    }
}
export default connect(mapStateToProps)(Leaderboard);


function LeaderboardCard(props) {
    return (
        <div className='leaderboardCard'>
            <div style={{
                flex: '0.4', textAlign: 'center', borderRightStyle: 'solid',
                borderRightColor: 'gray',
            }}>
                <img alt="User Pic"
                    src={props.user.avatar}
                    height='80px' style={{
                        borderRadius: '40px', marginTop: '30px',

                    }}></img></div>
            <div style={{
                flex: '0.5', textAlign: 'center', borderRightStyle: 'solid',
                borderRightColor: 'gray'
            }}>
                <h2>{props.user.name}</h2>
                <h5>{'Answered Questions   ' + props.user.answered}</h5>
                <h5>{'Created Questions   ' + props.user.questions}</h5>
            </div>
            <div style={{ flex: '0.3', textAlign: 'center' }}>
                <h2>Score</h2>
                <h1>{props.user.totalScore}</h1>
            </div>
        </div>
    )
}