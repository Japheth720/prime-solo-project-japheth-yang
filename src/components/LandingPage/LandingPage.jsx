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

          <h2>Who am I?</h2>
          <p>
            Hello there! My name is Japheth Yang, I studied at Prime Digital Academy 
            and learned how to code in JavaScript, JQuery, and ReactJS! In my spare time, 
            I like to create funny videos for people to watch on YouTube. My channel name is 
            ToroKe and I do various things from playing games, to voice acting and many more 
            fun skills! My goal is to one day entertain and create moments with people that 
            they'll never forget. I also dream to bring back 1$ McChickens at McDonalds... 
            SERIOUSLY!! THEY'RE LIKE 3$ PER SANDWICH NOW!!! THIS IS AN OUTRAGE!!!!
          </p>

          <p>
            
          </p>
          
        </div>
        
      </div>
    </div>
  );
}

export default LandingPage;
