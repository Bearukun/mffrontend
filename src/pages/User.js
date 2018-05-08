import React, { Component } from 'react'
import { observer } from "mobx-react";
import adminStore from "../stores/adminStore";

const User = observer(
  class User extends Component {

    componentWillMount() {
      /*
      This will fetch data each time you navigate to this route
      Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
      */
      adminStore.getUser(this.props.params.username);
    }


    render() {


      var games = adminStore.user.games.map((game) => {

        var statsForm = [];

        for (var key in game.stats) {
          if (game.stats.hasOwnProperty(key)) {
            statsForm.push(
              <h6>Stats in {key} </h6>
            );
            for (var keyChild in game.stats[key]) {

              //Check if the object is an array, then it need to handled specially
              if (game.stats[key][keyChild].constructor.name === "ObservableArray") {
                statsForm.push(
                  <h4>{keyChild}: </h4>
                );
                statsForm.push(game.stats[key][keyChild].map(session => {
                  var retObj = []
                  for (var key in session) {
                    retObj.push(
                      <div className="form-group row">
                        <label htmlFor="staticEmail" className="col-sm-4 col-form-label">{key}</label>
                        <div className="col-sm-8">
                          <input type="text" readOnly className="form-control-plaintext" id="statValue" value={session[key]} />
                        </div>
                      </div>
                    )
                  }
                  return retObj;
                }));
              } else {
                statsForm.push(
                  <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-4 col-form-label">{keyChild}</label>
                    <div className="col-sm-8">
                      <input type="text" readOnly className="form-control-plaintext" id="statValue" value={game.stats[key][keyChild]} />
                    </div>
                  </div>
                );
              }
            }
          }
        }

        return (
          <div>
            <h4>Stats for {game.name} </h4>
            {statsForm}
          </div>
        )
      })

      return (
        <div>
          <h2 className="mt-3 mb-3">Details for {adminStore.user.username}</h2>
          <div className="container">
            <form>

              <h4>ID: </h4>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">MongoDB ID</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control-plaintext" id="mongoId" value={adminStore.user._id} />
                </div>
              </div>

              <h4>Email: </h4>

              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={adminStore.user.email.address} />
                </div>
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Verification code</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={adminStore.user.email.verficationCode} />
                </div>
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Is verfied</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={adminStore.user.email.isVerified} />
                </div>
              </div>

              <h4>Info: </h4>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Creation date</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={adminStore.user.info.creationDate} />
                </div>
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Last login</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={adminStore.user.info.lastLogin} />
                </div>
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Nationality</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={adminStore.user.info.nationality} />
                </div>
              </div>

              <h4>Roles: </h4>
              <div className="form-group row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Is admin</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={adminStore.user.roles.isAdmin} />
                </div>
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Is user</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={adminStore.user.roles.isUser} />
                </div>
              </div>
              {games}
            </form>
          </div>
        </div>
      )
    }
  }
)
export default User;