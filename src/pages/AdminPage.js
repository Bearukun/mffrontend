import React, { Component } from 'react'
import { Link } from "react-router";
import { observer } from "mobx-react";
import adminStore from "../stores/adminStore";

const AdminPage = observer(
  class AdminPage extends Component {

    componentWillMount() {
      /*
      This will fetch data each time you navigate to this route
      Move to constructor, if only required once, or add "logic" to determine when data should be "refetched"
      */
      adminStore.getAll();
    }

    render() {

      return (

        <div className="mt-3">

          <div className="card w-50">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text">See a list over all registered users in the system.</p>
              <Link to={'/users/'}>
                <button type="button" className="btn btn-primary">View all users</button>
              </Link>
            </div>
          </div>

        </div>
      )
    }

  }
)
export default AdminPage;