import React from "react";
import Dashboard from './components/dashboard/dashboard';
import Preferences from './components/preferences/preferences';
import Login from './components/login/login';
import useToken from './components/hooks/useToken';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css";

const BB2_AUTH_URL = 'https://sandbox.bluebutton.cms.gov/v1/o/authorize';
const APP_SPECIFIC_CLIENT_ID = '9d6CVFOXOHMFyXQXpjK56XiN1HXMOuwW92IVX2oe';
const APP_SPECIFIC_REDIRECT_URI = 'http://localhost:3001/api/bluebutton/callback/'; // note that http is only allowed in sandbox
const APP_SPECIFIC_SCOPE = 'patient/Patient.read%20patient/Coverage.read%20patient/ExplanationOfBenefit.read%20profile';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const { token, setToken } = useToken();
  const [data, setData] = React.useState();

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(JSON.stringify(data.message)));
  }, []);

  if(!token) {
    return <Login setToken={setToken} />
  }

  function createAuthorizeLink() {
    return BB2_AUTH_URL + '?client_id=' +
        APP_SPECIFIC_CLIENT_ID + '&redirect_uri=' +
        APP_SPECIFIC_REDIRECT_URI +
        '&response_type=code';
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Application</h1>
        <BrowserRouter>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/preferences">
              <Preferences />
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
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

