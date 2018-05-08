import React, { Component } from 'react'
import { Link } from "react-router";
import { observer } from "mobx-react";
import adminStore from "../stores/adminStore";

const Users = observer(
  class Users extends Component {

    componentWillMount() {
      /*
      This will fetch data each time you navigate to this route
      Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
      */
      adminStore.getAll();
    }

    deleteUser(username){
      adminStore.deleteUser(username);
      adminStore.getAll();
      this.forceUpdate();
    }


    render() {

      var userList = adminStore.users.map((user, i) => {

        if (user.roles.isUser && !user.roles.isAdmin) {
          return (
            <tr key={i}>
              <td>{user.username}</td>
              <td>{user.email.address}</td>
              <td>
                <Link to={'/user/' + user.username}>
                  <button type="button" className="btn btn-primary">View</button>
                </Link>
                
                  <button type="button" onClick={() => this.deleteUser(user.username)} className="btn btn-danger">Delete</button>
                
              </td>
            </tr>
          )
        }
        return(null);
      })

      var adminList = adminStore.users.map((user, i) => {
        if (user.roles.isAdmin) {
          return (
            <tr key={i}>
              <td>{user.username}</td>
              <td>{user.email.address}</td>
              <td>
                <Link to={'/user/' + user.username}>
                  <button type="button" className="btn btn-primary">View</button>
                </Link>
      
              </td>
            </tr>
          )
        }
        return(null);
      })

      return (
        <div>

          <div className="msgFromServer">

            <h2>Users</h2>
            <p>List of registered users </p>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Mail</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {userList}
              </tbody>
            </table>

            <h2>Admins</h2>
            <p>List of administrators </p>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Mail</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {adminList}
              </tbody>
            </table>

          </div>
          <h4 style={{ color: "red" }}>{adminStore.errorMessage}</h4>
        </div>
      )
    }

  }
)
export default Users;