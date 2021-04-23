import { useEffect, useState } from 'react';
import axios from 'axios';

import { getUser, removeUserSession } from '../../utils/user/userSession';
 
function Dashboard(props) {
  const [authorizeLink, setAuthorizeLink] = useState();
  const [patientData, setPatientData] = useState();
  //const user = getUser();
 
  /*
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  };
  */

  let authorizeDisplay = (<div className="content" >
    Generating authorization url...
  </div>);
  let patientDisplay = (<div>No patient data loaded</div>);

  useEffect(() => { 
    axios.get(`/api/authorize`).then(response => {
        setAuthorizeLink(response.data);
    }).catch(error => {
        setAuthorizeLink('unavailable');
    });

    axios.get('/api/patient').then(response => {
        setPatientData(response.data);
    });
    
  }, []);

  if (authorizeLink === 'unavailable') {
    authorizeDisplay = (<div className="content" >
        Failed to generate authorization link
    </div>);
  } else if (authorizeLink) {
    authorizeDisplay = (
        <a href={authorizeLink} >
            Authorize
        </a>
    );
  }

  if (patientData) {
      console.log('patientData', patientData);
    patientDisplay = (<div><pre>
        {JSON.stringify(patientData, null, 2) }
    </pre></div>)
  }
 
  return (
    <div>
      Welcome BB2 Developer!<br /><br />
      Authorize Sample App to access your medicare data<br /><br />
      {authorizeDisplay}<br /><br />
      {patientDisplay}<br /><br />
      <input type="button" value="Logout" />
    </div>
  );
}
 
export default Dashboard;