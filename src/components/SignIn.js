import React, { Component } from 'react'
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'

class Signin extends Component {
    state = {
        userName: '',
        signInBtn: true
    }

    handleChange = (event) => {
        event.preventDefault();
        const value = event.target.value
        this.setState({
            userName: value,
            signInBtn: false
        })
    }

    handleSignIn = (event) => {
        event.preventDefault();
        const { users } = this.props
        const userID = Object.values(users).filter((user) => user.name === this.state.userName)
        this.props.dispatch(setAuthedUser(userID[0]))
    }
    render() {
        const { users } = this.props
        return (
            <div className="SignIn">
                <div style={{ backgroundColor: 'rgb(0,255,255)', padding: '8px' }}>
                    <p className="SignInHeader1">Welcome to the Would You Rather App</p>
                    <p className="SignInHeader2">Please Sign in to continue</p>
                </div>
                <img alt="reactLogo" src={require('../logo.svg')} width="200" height="200" style={{ margin: -20 }} ></img>
                <p style={{ color: 'rgb(106,217,250)', fontWeight: 'bold', margin: 0, fontSize: '20px' }} >Sign in</p>
                <select className='dropDown' placeholder=' ' value={this.state.userName} onChange={this.handleChange}>
                    <option value='' disabled={true}>Select User</option>
                    {Object.values(users).map((user) => (
                        <option key={user.id}>{user.name}</option>
                    ))}
                </select>
                <br /><br />
                <button style={{
                    width: '250px', height: '40px',
                    backgroundColor: 'rgb(51,250,250)',
                    borderRadius: '5px', fontSize: '15px'
                }} disabled={this.state.signInBtn} onClick={this.handleSignIn}>Sign in</button>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Signin); 