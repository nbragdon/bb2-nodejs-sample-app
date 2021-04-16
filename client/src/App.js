import React from "react";
import "./App.css";

const BB2_AUTH_URL = 'https://sandbox.bluebutton.cms.gov/v1/o/authorize';
const APP_SPECIFIC_CLIENT_ID = '9d6CVFOXOHMFyXQXpjK56XiN1HXMOuwW92IVX2oe';
const APP_SPECIFIC_REDIRECT_URI = 'http://localhost:3001/api/bluebutton/callback/'; // note that http is only allowed in sandbox
const APP_SPECIFIC_SCOPE = 'patient/Patient.read%20patient/Coverage.read%20patient/ExplanationOfBenefit.read%20profile'

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(JSON.stringify(data.message)));
  }, []);

  function createAuthorizeLink() {
    return BB2_AUTH_URL + '?client_id=' +
        APP_SPECIFIC_CLIENT_ID + '&redirect_uri=' +
        APP_SPECIFIC_REDIRECT_URI +
        '&response_type=code';
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
        <a href={createAuthorizeLink()}>
          Authorize
        </a>
      </header>
    </div>
  );
}

export default App;
