import React from 'react';
import './App.css';
import { Router, Route } from 'react-router-dom';
import Welcome from "./containers/Welcome"
import Home from "./containers/Home"
import Friends from "./containers/Friends"
import Game from "./containers/Game"
import { connect } from "react-redux"
import history from './history';
import Statistics from "./containers/Statistics"

class App extends React.Component {

  render() {
    if (this.props.user === undefined) {
      history.push('/')
    }
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" render={() => <Welcome />} />
          <Route exact path="/Account_Home" render={() => <Home />} />
          <Route exact path="/My_Friends" render={() => <Friends />} />
          <Route exact path="/DGAA_Game_Play" render={() => <Game />} />
          <Route exact path="/Statistics" render={() => <Statistics />} />
        </div>
      </Router>
    )
  }

}

const mapStateToProps = state => {
  return { user: state.users[0] }
}

export default connect(mapStateToProps)(App);


