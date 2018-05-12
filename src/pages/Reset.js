import React, { Component } from 'react'
import auth from "../authorization/auth";
import { observer } from "mobx-react";
import { observe } from "mobx";

const Reset = observer(class Reset extends Component {
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
    const pass = this.refs.pass.value
    const resetPasswordToken = this.props.params.resetPasswordToken;
    auth.resetPassword(pass, resetPasswordToken, (loggedIn) => { })
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center container">
        <form className="form-signin w-100" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading mt-3">Enter a new password</h2><br />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" ref="pass" className="form-control mt-2" placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Reset password</button> <br />
          <center>
          {auth.resetPassMessage && (
            <div className="alert alert-warning" role="alert">
              {auth.resetPassMessage}
            </div>
          )}
        </center>
        </form>
      </div>
    )
  }
})

export default Reset;