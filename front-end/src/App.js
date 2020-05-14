import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from "./containers/Welcome"
import Home from "./containers/Home"
import Friends from "./containers/Friends"

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <Welcome />} />
          <Route exact path="/Account_Home" render={() => <Home />} />
          <Route exact path="/My_Friends" render={() => <Friends />} />
        </div>
      </Router>
    )
  }
}

export default App;


