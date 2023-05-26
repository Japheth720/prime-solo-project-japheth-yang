import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// Importing AI Fountain Background Image
import aiFountain from '../../images/blurred_ai_fountain.png';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to Prime Novel Academy!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');

  };

  return (
    <div className="container">
      <h1>{heading}</h1>

      <div className="grid">

      <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4></h4>
            <button className="btn btn_asLink" onClick={onLogin}>
              LOGIN
            </button>
          </center>
        </div>

        <div className="grid-col grid-col_8">
          <h2>What is Prime Novel Academy?</h2>
          <p>
          Prime Novel Academy is a virtual experience where you get to interact 
          and talk with virtual characters in Prime Novel Academy! Share your name 
          and explore different interactions with various characters on the school 
          grounds. Talk with everyone and make new friends! 
          You can choose between two different options which could lead to different 
          dialogs and new interactions. Login now and start your journey at your new school, 
          Prime Novel Academy!
          </p>

          <p>
            Praesent consectetur orci dui, id elementum eros facilisis id. Sed
            id dolor in augue porttitor faucibus eget sit amet ante. Nunc
            consectetur placerat pharetra. Aenean gravida ex ut erat commodo, ut
            finibus metus facilisis. Nullam eget lectus non urna rhoncus
            accumsan quis id massa. Curabitur sit amet dolor nisl. Proin
            euismod, augue at condimentum rhoncus, massa lorem semper lacus, sed
            lobortis augue mi vel felis. Duis ultrices sapien at est convallis
            congue.
          </p>

          <p>
            Fusce porta diam ac tortor elementum, ut imperdiet metus volutpat.
            Suspendisse posuere dapibus maximus. Aliquam vitae felis libero. In
            vehicula sapien at semper ultrices. Vivamus sed feugiat libero. Sed
            sagittis neque id diam euismod, ut egestas felis ultricies. Nullam
            non fermentum mauris. Sed in enim ac turpis faucibus pretium in sit
            amet nisi.
          </p>
          
        </div>
        
      </div>
    </div>
  );
}

export default LandingPage;
