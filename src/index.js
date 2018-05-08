import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { hashHistory, Router, Route, IndexRoute } from 'react-router'
import App from './pages/App';
import Home from './pages/Home';
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import About from "./pages/About";
import Stats from "./pages/Stats";
import AdminPage from './pages/AdminPage';
import Dashboard from './pages/Dashboard';
import User from './pages/User';
import Users from './pages/Users';
import auth from './authorization/auth';

function requireAuth(nextState, replace) {
  if (!auth.loggedIn) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="login" component={Login} />
      <Route path="forgot" component={Forgot} />
      <Route path="logout" component={Logout} />
      <Route path="signup" component={Signup} />
      <Route path="about" component={About} />
      <Route path="stats" component={Stats} />
      <Route path="admin" component={AdminPage} />
      <Route path="users" component={Users} />
      <Route path="user/:username" component={User} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('root'))