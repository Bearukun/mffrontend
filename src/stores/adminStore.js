
import { observable, action } from "mobx";
import fetchHelper from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

/* encapsulates Data related to Admins */
class AdminStore {
  @observable messageFromServer = "";
  @observable deleteMessageFromServer = "";
  @observable errorMessage = "";
  @observable users = [];
  @observable user = {
    _id: "",
    username: "",
    email: {},
    roles: {},
    info: {},
    games: [{sessionID: "", loginDateAndTime: "", logoutDateAndTime: ""}]
  }

  @action
  setErrorMessage(err) {
    this.errorMessage = err;
  }
  @action
  setMessageFromServer(msg) {
    this.messageFromServer = msg;
  }
  @action
  setDeleteMessageFromServer(msg) {
    this.deleteMessageFromServer = msg;
  }

  @action
  getAll = () => {
    this.errorMessage = "";
    this.messageFromServer = "";
    let errorCode = 200;
    const options = fetchHelper.makeOptions("GET", true);
    fetch(URL + "api/users", options)
      .then((res) => {
        if (res.status > 210 || !res.ok) {
          errorCode = res.status;
        }
        return res.json();
      })
      .then(action((res) => {  //Note the action wrapper to allow for useStrict
        if (errorCode !== 200) {
          throw new Error(`${res.error.message} (${res.error.code})`);
        }
        else {
          // this.messageFromServer = res.message;
          this.users.replace(res.users);
        }
      })).catch(err => {
        //This is the only way (I have found) to verify server is not running
        this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
      })
  }

  @action
  getUser = (wantedUser) => {

    this.errorMessage = "";
    this.messageFromServer = "";
    let errorCode = 200;
    const options = fetchHelper.makeOptions("GET", true);
    fetch(URL + "api/user/"+wantedUser, options)
      .then((res) => {
        if (res.status > 210 || !res.ok) {
          errorCode = res.status;
        }
        return res.json();
      })
      .then(action((res) => {  //Note the action wrapper to allow for useStrict
        if (errorCode !== 200) {
          throw new Error(`${res.error.message} (${res.error.code})`);
        }
        else {
          // this.messageFromServer = res.message;
          this.user = res.user;
        }
      })).catch(err => {
        //This is the only way (I have found) to verify server is not running
        this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
      })
  }

  @action
  deleteUser = (wantedUser) => {
    this.errorMessage = "";
    this.messageFromServer = "";
    let errorCode = 200;
    const options = fetchHelper.makeOptions("DELETE", true);
    fetch(URL + "api/delete/"+wantedUser, options)
      .then((res) => {
        if (res.status > 210 || !res.ok) {
          errorCode = res.status;
        }
        return res.json();
      })
      .then(action((res) => {  //Note the action wrapper to allow for useStrict
        if (errorCode !== 200) {
          throw new Error(`${res.error.message} (${res.error.code})`);
        }
        else {
          // this.messageFromServer = res.message;
          this.setDeleteMessageFromServer(res.msg)
        }
      })).catch(err => {
        //This is the only way (I have found) to verify server is not running
        this.setErrorMessage(fetchHelper.addJustErrorMessage(err));
      })
  }


}
let adminStore = new AdminStore(URL);

export default adminStore;