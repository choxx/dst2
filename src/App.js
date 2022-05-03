import React, {useState, useEffect} from 'react';
import './App.css';
import sakshamHaryanaLogo from './images/saksham-haryana-logo.png';
import GoH from './images/GoH-Transparent.png';
import haryanaLogo from './images/SDIT-Haryana.png';

export default function App() {
  const [trainee, setTrainee] = useState({});
  const [isEnrl, setEnrl] = useState(true);

  useEffect(() => {
    window.addEventListener('message', function (e) {
      const data = e.data;
      try {
        const decoded = JSON.parse(data);
        if (decoded.channel === 'traineeDetail') {
          setTimeout(() => {
            localStorage.setItem("trainee", "");
            setEnrl(true);
          }, 1000);
        }
        if(decoded.channel === 'enketo') {
          setTimeout( () => {
            setTrainee(decoded.message)
            localStorage.setItem("trainee", JSON.stringify(decoded.message));
            setEnrl(false)
           }, 1000)
        }
      }
      catch (e) {
        // console.log(e)
      }
    });
  }, []);

  const onLogout = () => {
    localStorage.setItem("trainee", "");
    setEnrl(true);
  }

  return (
    <div className="App">
      <header>
        <div className="row logo">
          <div className="shaksham-logo">
            <img className="haiyana-small-logo" src={GoH} alt="logo"/>
          </div>
          <div>
            <img className="iti-small-logo" src={haryanaLogo} alt="logo"/>
          </div>
          <div className="hariyana-logo">
            <img className="shaksham-small-logo" src={sakshamHaryanaLogo} alt="logo"/>
          </div>
          {
            !isEnrl &&
            <div>
              <button className="logout" onClick={onLogout}>Logout</button>
            </div>
          }

        </div>
        <div className="header-text">
          <h2 className="header-text-color">DST Trainee Attendance</h2>
        </div>
      </header>
        {isEnrl ?
          <iframe
            frameBorder="0"
            src={`${process.env.REACT_APP_ENKETO}/preview?xform=${process.env.REACT_APP_GET_FORM}/getForm/enrollment&id=enrollment`}
            title="Enrollment"
            allow="geolocation"
            width={'100%'}
            height={'500px'}>
          </iframe>
           :
          <iframe
            frameBorder="0"
            src={`${process.env.REACT_APP_ENKETO}/preview?xform=${process.env.REACT_APP_GET_FORM}/getFormPrefilled/${trainee.id}&id=preFilled`}
            title="Test Geolocation"
            allow="geolocation"
            width={'100%'}
            height={'650px'}>
          </iframe>}
    </div>
  )
}
