import React, { Component } from 'react'
import { Link } from "react-router";
import auth from '../authorization/auth'
import { observer } from "mobx-react";

import { useStrict } from "..//stores/useStrict"

const App = observer(class App extends Component {
  render() {
    const logInStatus = auth.loggedIn ? "Logged in as: " + auth.userName : "";
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
          <a className="navbar-brand" href="#">Open Stats</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                {auth.isUser ? <Link className="nav-link" to="/stats">Your Stats</Link> : null}
              </li>
              <li className="nav-item">
                {auth.isAdmin ? <Link className="nav-link" to="/admin">Admin Dashboard</Link> : null}
              </li>
            </ul>
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <span className="navbar-text">{logInStatus}</span>
              </li>
              <li className="nav-item">
                {auth.loggedIn ?
                  (
                    <li className="nav-item">
                      <Link className="nav-link" to="/logout">Logout</Link>
                    </li>
                  ) :
                  (
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                  )}
              </li>
            </ul>
          </div>
        </nav>
        {this.props.children || <p>You are {!auth.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
})

export default App;