import { useEffect, useState } from 'react';
import axios from 'axios';

import { getUser, removeUserSession } from '../../utils/user/userSession';
 
function Dashboard(props) {
  const [authorizeLink, setAuthorizeLink] = useState();
  const user = getUser();
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  };

  let authorizeDisplay = (<div className="content" >
    Generating authorization url...
  </div>);

  useEffect(() => { 
    axios.get(`/api/authorize`).then(response => {
        setAuthorizeLink(response.data);
    }).catch(error => {
        setAuthorizeLink('unavailable');
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
 
  return (
    <div>
      Welcome {user.name}!<br /><br />
      Authorize Sample App to access your medicare data<br /><br />
      {authorizeDisplay}<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}
 
export default Dashboard;