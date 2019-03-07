import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleGetAllData } from '../actions/shared'
import Signin from './SignIn'
import Nav from './Nav'
import { BrowserRouter as Router, Route, withRouter, Redirect } from 'react-router-dom'
import Home from './Home'
import { HOME, SIGN_IN, VIEW_POLL, ADD_QUESTION, LEADERBOARD } from '../utils/urls'
import LoadingBar from 'react-redux-loading';
import Question from './Question'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'

class App extends Component {

  state = {
    userLogoutCheck : false,
  }

  handleUserLogout = (logout) => {
    this.setState((lastState) => ({userLogoutCheck : true}))
  }

  componentDidMount() {
    this.props.dispatch(handleGetAllData())
  }

  render() {
    const { authedUser, loading, location } = this.props
    if (loading) {
      return <LoadingBar />
    }
    else if (authedUser === null && location.pathname !== SIGN_IN) {
      return <Redirect to={
        {
          pathname: SIGN_IN,
          state: { from: location }
        }
      } />
    } else if (authedUser !== null && location.pathname === SIGN_IN) {
      return <Redirect to={
        {
          pathname: this.state.userLogoutCheck ? HOME : location.state.from.pathname,
        }
      } />
    }
    return (
      <Router>
        <div >
          <Nav handleUserLogout={this.handleUserLogout}/>

          <Route path={SIGN_IN} exact component={Signin} />
          <Route path={HOME} exact component={Home} />
          <Route path={VIEW_POLL + ':id'} exact component={Question} />
          <Route path={ADD_QUESTION} exact component={NewQuestion} />
          <Route path={LEADERBOARD} exact component={Leaderboard} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loading: Object.values(users).length === 0,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(App));
