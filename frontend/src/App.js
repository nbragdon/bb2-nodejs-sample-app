import logo from './logo.svg';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const BB2_AUTH_URL = 'https://sandbox.bluebutton.cms.gov/v1/o/authorize';
const APP_SPECIFIC_CLIENT_ID = '9d6CVFOXOHMFyXQXpjK56XiN1HXMOuwW92IVX2oe';
const APP_SPECIFIC_REDIRECT_URI = 'https://ee648b8d8f4a.ngrok.io'; // note that http is only allowed in sandbox
const APP_SPECIFIC_SCOPE = 'patient/Patient.read%20patient/Coverage.read%20patient/ExplanationOfBenefit.read%20profile'

/*
https://sandbox.bluebutton.cms.gov/v1/o/authorize/?client_id=9d6CVFOXOHMFyXQXpjK56XiN1HXMOuwW92IVX2oe
    &redirect_uri=https://ee648b8d8f4a.ngrok.io
    &state=23b925d4f5ba4100ba540b31dc147492
    &response_type=code
*/

/*
https://sandbox.bluebutton.cms.gov/v1/o/authorize/?client_id=swBu7LWsCnIRfu530qnfPw1y5vMmER3lAM2L6rq2
    &redirect_uri=http://localhost:8080/testclient/callback
    &response_type=code
    &state=8e896a59f0744a8e93bf2f1f13230be5
*/

/*
*/

function App() {
  const STATE = uuidv4().replace(/-/g, "");
  const GENERATED_AUTHORIZATION_URL = BB2_AUTH_URL + '?client_id=' +
    APP_SPECIFIC_CLIENT_ID + '&redirect_uri=' +
    APP_SPECIFIC_REDIRECT_URI + '&scope=' +
    APP_SPECIFIC_SCOPE +
    '&response_type=code';

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href={GENERATED_AUTHORIZATION_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Allow Access
        </a>
      </header>
    </div>
  );
}

export default App;
