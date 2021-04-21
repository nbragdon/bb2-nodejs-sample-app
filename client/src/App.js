import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
 
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Home from './components/home/home';
import PublicRoute from './utils/routing/public';
import PrivateRoute from './utils/routing/private';

import { getToken, removeUserSession, setUserSession } from './utils/user/userSession';

const BB2_AUTH_URL = 'https://sandbox.bluebutton.cms.gov/v1/o/authorize';
const APP_SPECIFIC_CLIENT_ID = '9d6CVFOXOHMFyXQXpjK56XiN1HXMOuwW92IVX2oe';
const APP_SPECIFIC_REDIRECT_URI = 'http://localhost:3001/api/bluebutton/callback/'; // note that http is only allowed in sandbox
const APP_SPECIFIC_SCOPE = 'patient/Patient.read%20patient/Coverage.read%20patient/ExplanationOfBenefit.read%20profile';
 
function App() {
  const [authLoading, setAuthLoading] = useState(true);
 
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`/api/users/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

/*
<div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <a href={createAuthorizeLink()}>
          Authorize
        </a>
      </header>
    </div>
*/

export default App;

