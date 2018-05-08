import { observable, computed, action } from "mobx";

const jwtDecode = require("jwt-decode");
const URL = require("../../package.json").serverURL;
import fetchHelper from "../stores/fetchHelpers"

class AuthenticationHandler {

  @observable token = null;  //Keps users logged in, even after a refresh of the page
  @observable failedLogin = false;
  @observable userName = "";
  @observable isAdmin = false;
  @observable errorMessage = "";
  @observable isUser = false;
  @observable email = "";
  @observable mailMessage = "";
  @observable signUpMessage = "";

  @computed
  get loggedIn() {
    return this.token !== null;
  }

  @action
  setToken = (value) => {
    localStorage.token = value;
    this.initDataFromToken();
  }

  @action
  initDataFromToken = () => {
    if (!localStorage.token) {
      return;
    }
    this.token = localStorage.token;
    var decoded = jwtDecode(this.token);
    this.userName = decoded.username;
    this.email = decoded.email;
    this.isAdmin = decoded.roles.isAdmin;
    this.isUser = decoded.roles.isUser;
  }

  @action
  setFailedLogin = (value, msg) => {
    this.failedLogin = value;
    this.errorMessage = msg;
  }

  @action
  logout = () => {
    console.log("Logout");
    delete localStorage.token;
    this.token = null;
    this.userName = "";
    this.email = "";
    this.isAdmin = false;
    this.isUser = false;
    this.errorMessage = "";
  }

  @action
  login = (email, password, cb) => {
    var self = this; //Required because of exception handling below, which looses this
    this.setFailedLogin(false, "");
    console.log("Login: " + self.token)
    cb = arguments[arguments.length - 1]
    if (this.token != null) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }

    var user = { email, password };

    var options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    fetch(URL + "api/signin", options).then(res => {
      if (res.status === 400) {
        throw new Error("No Response from Server");
      }
      if (res.status === 401 || res.status === 403) {
        throw new Error("Wrong email and/or password");
      }
      if (res.status > 200 || !res.ok) {
        throw new Error("Unknow error while trying to login").b;
      }
      res.json().then(data => {
        this.setToken(data.token);
      });
    }).catch(err => {
      console.log(err.message);
      //Self because we use this with exceptions
      self.setFailedLogin(true, fetchHelper.addJustErrorMessage(err));

    })
    return;
  }

  @action
  setMailMessage = (value) => {
    this.mailMessage = value;
  }

  @action
  reset = (email, cb) => {

    var user = {email: email};

    var options = {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    fetch(URL + "api/forgot", options).then(res => {
 
      res.json().then(data => {
        this.setMailMessage(data.msg);
      });
    }).catch(err => {
      console.log(err.message);
      //Self because we use this with exceptions
    })
    return;
  }

  @action
  setSignUpMessage = (value) => {
    this.signUpMessage = value;
  }

  @action
  signup = (newUser) => {

   

    var options = {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    fetch(URL + "api/signup", options).then(res => {
 
      res.json().then(data => {
        this.setSignUpMessage(data.msg);
      });
    }).catch(err => {
      console.log(err.message);
      //Self because we use this with exceptions
    })
    return;
  }

}

var auth = new AuthenticationHandler();

//Call init, if a new Instance was created due to a refresh (F5 or similar)
auth.initDataFromToken();

//Comment out for debugging
//window.auth = auth;

export default auth;


