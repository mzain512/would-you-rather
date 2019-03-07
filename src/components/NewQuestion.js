import React from 'react'
import { connect } from 'react-redux'
import { handleSaveNewQuestion } from '../actions/questions'
import { HOME } from '../utils/urls'
import { withRouter } from 'react-router-dom'

class NewQuestion extends React.Component {

    state = {
        optionOne: '',
        optionTwo: '',
    }

    onChangeOptionOne = (event) => {
        event.preventDefault()
        const value = event.target.value
        this.setState({ optionOne: value })
    }

    onChangeOptionTwo = (event) => {
        event.preventDefault()
        const value = event.target.value
        this.setState({ optionTwo: value })
    }

    handleSubmit = () => {
        const { authedUser } = this.props
        this.props.dispatch(handleSaveNewQuestion(authedUser.id, this.state.optionOne, this.state.optionTwo))
            .then(() => {
                this.props.history.push(HOME)
            })
    }

    render() {
        return (
            <div className='newQuestionCard'>
                <h3 style={{ borderBottom: 'solid', borderColor: 'gray', textAlign: 'center' }}>Create New Question</h3>
                <h5 style={{ marginTop: '-5px', marginLeft: '5px' }}>Complete the questions:</h5>
                <h4 style={{ marginTop: '-10px', marginLeft: '5px' }}>Would you rather ...</h4>
                <InputForm
                    optionOne={this.state.optionOne}
                    optionTwo={this.state.optionTwo}
                    optionOneFunc={this.onChangeOptionOne}
                    optionTwoFunc={this.onChangeOptionTwo}
                    handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion));

function InputForm(props) {
    return (
        <div style={{ textAlign: 'center' }}>
            <input className='inputField' type="text" value={props.optionOne}
                placeholder='Enter Option One Text Here' name="name" onChange={props.optionOneFunc} />
            <br />
            <h4 style={{ margin: '2px' }} >OR</h4>
            <input className='inputField' value={props.optionTwo} type="text"
                placeholder='Enter Option Two Text Here' name="name" onChange={props.optionTwoFunc} />
            <br />
            <input className='formSubmit' type="submit" value="Submit"
                disabled={props.optionOne === '' || props.optionTwo === ''} onClick={props.handleSubmit} />
            <br />
        </div>
    )
}