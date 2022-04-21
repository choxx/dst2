import React, {useState, useEffect} from 'react';
import Header from "../components/Header";

export default function TraineeLogin() {
  const [trainee, setTrainee] = useState({});
  const [isEnrl, setEnrl] = useState(true);

  useEffect(() => {
    console.log('Test');
    window.addEventListener('message', function (e) {
      const data = e.data;
      console.log('data', data);
      try {
        const decoded = JSON.parse(data);
        if(decoded.channel === 'enketo') {
          setTimeout( () => {
            setTrainee(decoded.message)
            setEnrl(false)
          }, 1000)
        }
      }
      catch (e) {
        // console.log(e)
      }
    });
  }, []);

  return (
   <>
     <Header/>
     <div className="m-10 text-xl font-bold text-teal-800 text-center">
       <h2 className="header-text-color">DST Trainee Attendance</h2>
     </div>
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
    </>
  )
}
