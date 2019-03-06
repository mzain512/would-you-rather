import React, { Component } from 'react';
import { connect } from 'react-redux'
import {handleGetAllData} from '../actions/shared'
import Signin from './SignIn'
import Nav from './Nav'
import { BrowserRouter as Router, Route , withRouter , Redirect} from 'react-router-dom'
import Home from './Home'
import {HOME , SIGN_IN , VIEW_POLL} from '../utils/urls'
import LoadingBar from 'react-redux-loading';
import Question from './Question'

class App extends Component {

  componentDidMount() {
      this.props.dispatch(handleGetAllData())
  }

  render() {
    const {authedUser , loading ,location} = this.props
    if (loading) {
      return <LoadingBar />
    }
    else if (authedUser === null && location.pathname !== SIGN_IN) {
      return <Redirect to={
        {
          pathname: SIGN_IN,
        }
      } />
    } else if (authedUser !== null && location.pathname === SIGN_IN) {
      return <Redirect to={
        {
          pathname: HOME,
        }
      } />
    }
    return (
      <Router>
      <div >
        <Nav/>
        
        <Route path={SIGN_IN} exact component={Signin} />
        <Route path={HOME} exact component={Home} />
        <Route path={VIEW_POLL + ':id'} exact component={Question} />
      </div>
      </Router>
    );
  }
}

function mapStateToProps({authedUser , users}) {
  return {
    loading: Object.values(users).length === 0,
    authedUser
  }
}

export default withRouter(connect(mapStateToProps)(App));
