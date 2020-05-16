import React from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import Welcome from "./containers/Welcome"
import Home from "./containers/Home"
import Friends from "./containers/Friends"
import { connect } from "react-redux"
import history from './history';

class App extends React.Component {

  render() {
    console.log("App:", this.props.user)
    if (this.props.user === undefined) {
      history.push('/')
    }
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" render={() => <Welcome />} />
          <Route exact path="/Account_Home" render={() => <Home />} />
          <Route exact path="/My_Friends" render={() => <Friends />} />
        </div>
      </Router>
    )
  }

}

const mapStateToProps = state => {
  return { user: state.users[0] }
}

export default connect(mapStateToProps)(App);


