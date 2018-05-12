import React, { Component } from 'react'
import auth from "../authorization/auth";
import { observer } from "mobx-react";
import { observe } from "mobx";

const Forgot = observer(class Forgot extends Component {
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
    auth.reset(email, (loggedIn) => { })
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center container">
        <form className="form-signin w-100" onSubmit={this.handleSubmit}>
          <h2 className="form-signin-heading mt-3">Forgot password</h2> <br />
          <input type="text" ref="email" className="form-control" placeholder="Email" required autoFocus />
          <button className="btn btn-lg btn-primary btn-block mt-2" type="submit">Send reset mail</button>
          <center>
          {auth.mailMessage && (
            <div className="alert alert-success" role="alert">
              {auth.mailMessage}
            </div>
          )}
          </center>
        </form>
      </div>
    )
  }
})

export default Forgot;
