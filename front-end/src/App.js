import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from "./containers/Welcome"
import Home from "./containers/Home"


class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <Welcome />} />
          <Route exact path="/Account_Home" render={() => <Home />} />
        </div>
      </Router>
    )
  }
}

export default App;



//   super()
//   this.state = {
//     user: null
//   }
// }
/* <button onClick={this.handleLogout}>Log Out</button> */
/* <form className="loginForm" >
        <label id="loginLabel" >Email: </label>
        <input placeholder="Enter Email Here..." id="loginEmailInput" name="emailInput" /><br></br>
        <label id="passwordLabel" >Password: </label>
        <input placeholder="Enter Password Here..." id="loginPasswordInput" name="passwordInput" />
        <input type="submit" value="Log In" className="logInBtn" onClick={(event) => this.handleLogInBtn(event)} />
      </form> */


      // handleLogInBtn = (event) => {
      //   event.preventDefault()
      //   const userEmail = event.target.parentElement.querySelector("#loginEmailInput").value
      //   const userPassword = event.target.parentElement.querySelector("#loginPasswordInput").value
      //   const userData = {
      //     email: userEmail,
      //     password: userPassword
      //   }
      //   fetch('http://localhost:3000/login', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(userData),
      //   })
      //     .then(response => response.json())
      //     .then(data => {
      //       console.log(data)
      //       this.setState({
      //         user: data.user
      //       })
      //     })
      //   event.target.parentElement.reset()
      // }

      // handleLogout = () => {
      //   fetch("http://localhost:3000/logout")
      //     .then(resp => resp.json())
      //     .then(data => {
      //       console.log(data)
      //       this.setState({ user: null })
      //     })
      // }