import React, { Component } from 'react'
import { Link } from "react-router";
import auth from "../authorization/auth";
import { observer } from "mobx-react";
import { observe } from "mobx";

const Login = observer(class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateRoutesAfterLogin = this.updateRoutesAfterLogin.bind(this);
    observe(auth, "loggedIn", (data) => this.updateRoutesAfterLogin(data))
  }

  //Refactor this method into auth.js (reuires a way to get the router/location in this class)
  updateRoutesAfterLogin(val) {
    const { location } = this.props

    if (location.state && location.state.nextPathname) {
      this.props.router.replace(location.state.nextPathname)
    } else {
      this.props.router.replace('/')
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const email = this.refs.email.value
    const pass = this.refs.pass.value
    auth.login(email, pass, (loggedIn) => { })
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center container">
        <form className="form-signin" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading mt-3">Login to Open Stats</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="text" ref="email" className="form-control" placeholder="Email" required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" ref="pass" className="form-control mt-2" placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Login</button>
          <center>
            <br />
            {auth.failedLogin && (
              <div className="alert alert-danger" role="alert">
                {auth.errorMessage}
              </div>
            )}
            <p className="mt-5">No account? No problem!</p>
            <Link to={'/signup/'}>
              <button type="button" className="btn btn-success">Create Account</button>
            </Link>
            <br />
            <Link to={'/forgot/'}>
              <button type="button" className="btn btn-link">Reset password</button>
            </Link>
          </center>
        </form>
      </div>
    )
  }
})

export default Login;
