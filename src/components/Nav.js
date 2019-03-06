import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
class Nav extends React.Component {
    render() {
        const { authedUser } = this.props
        return (
            <div>
                <nav className='nav'>
                    <ul>
                        <li>
                            <NavLink className='navLinks' to='/' exact activeClassName='active'>
                                Home
              </NavLink>
                        </li>
                        <li>
                            <NavLink className='navLinks' to='/' activeClassName='active'>
                                New Question
              </NavLink>
                        </li>
                        <li>
                            <NavLink className='navLinks' to='/' activeClassName='active'>
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
                                <NavLink className='navLinks' to='/' activeClassName='active'>
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