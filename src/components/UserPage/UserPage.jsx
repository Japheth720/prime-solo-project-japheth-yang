import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  
  const toCharacter = (event) => {
    history.push('/character');

  };

  return (
    <div className="container">
      <h2>Welcome {user.username} to Prime Novel Academy!</h2>
      <p>Press Start to Begin!</p>

      <button className="btn btn_asLink" onClick={toCharacter}>
              START
            </button>

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
