import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as Constants from '../utils/urls'

class Nav extends React.Component {
    render() {
        const { authedUser } = this.props
        return (
            <div>
                <nav className='nav'>
                    <ul>
                        <li>
                            <NavLink className='navLinks' to={Constants.HOME} exact activeClassName='active'>
                                Home
              </NavLink>
                        </li>
                        <li>
                            <NavLink className='navLinks' to={Constants.ADD_QUESTION} activeClassName='active'>
                                New Question
              </NavLink>
                        </li>
                        <li>
                            <NavLink className='navLinks' to={Constants.HOME} activeClassName='active'>
                                LeaderBoard
              </NavLink>
                        </li>
                        {authedUser && (
                            <li style={{fontSize:'18px' , fontWeight:'bolder'}}>

                                {'Hello ' + authedUser.name}

                            </li>
                        )}
                        {authedUser && (
                            <li>
                                <NavLink className='navLinks' to={Constants.HOME} activeClassName='active'>
                                    Logout
              </NavLink>

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
        authedUser
    }
}

export default connect(mapStateToProps)(Nav)