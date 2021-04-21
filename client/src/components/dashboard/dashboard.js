import React from 'react';
import { getUser, removeUserSession } from '../../utils/user/userSession';

const BB2_AUTH_URL = 'https://sandbox.bluebutton.cms.gov/v1/o/authorize';
const APP_SPECIFIC_CLIENT_ID = '9d6CVFOXOHMFyXQXpjK56XiN1HXMOuwW92IVX2oe';
const APP_SPECIFIC_REDIRECT_URI = 'http://localhost:3001/api/bluebutton/callback/'; // note that http is only allowed in sandbox
const APP_SPECIFIC_SCOPE = 'patient/Patient.read%20patient/Coverage.read%20patient/ExplanationOfBenefit.read%20profile';

function createAuthorizeLink() {
    return BB2_AUTH_URL + '?client_id=' +
        APP_SPECIFIC_CLIENT_ID + '&redirect_uri=' +
        APP_SPECIFIC_REDIRECT_URI +
        '&response_type=code';
}
 
function Dashboard(props) {
  const user = getUser();
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
 
  return (
    <div>
      Welcome {user.name}!<br /><br />
      Authorize Sample App to access your medicare data<br /><br />
      <a href={createAuthorizeLink()}>
        Authorize
      </a><br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}
 
export default Dashboard;