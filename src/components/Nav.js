import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Constants from '../utils/urls'
import {userLogout} from '../actions/authedUser'

class Nav extends React.Component {

    handleLogout = () => {
        this.props.dispatch(userLogout())
    }

    render() {
        const { authedUser , isAutherized} = this.props
        return (
            <div>
                <nav className='nav'>
                    <ul>
                        <li>
                            <NavLink className='navLinks' to={isAutherized ? Constants.HOME : '#'} exact activeClassName='active'>
                                Home
              </NavLink>
                        </li>
                        <li>
                            <NavLink className='navLinks' to={isAutherized ? Constants.ADD_QUESTION : '#'} activeClassName='active'>
                                New Question
              </NavLink>
                        </li>
                        <li>
                            <NavLink className='navLinks' to={isAutherized ? Constants.LEADERBOARD : '#'} activeClassName='active'>
                                LeaderBoard
              </NavLink>
                        </li>
                        {isAutherized && (
                            <li style={{fontSize:'18px' , fontWeight:'bolder'}}>

                                {'Hello ' + authedUser.name}

                            </li>
                        )}
                        {isAutherized && (
                            <li>
                                <button className='navLinks' onClick={this.handleLogout}>
                                    Logout
              </button>

                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
        isAutherized : authedUser !== null ? true : false ,
    }
}

export default connect(mapStateToProps)(Nav)