import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import formSpec from '../form_spec.json';
import withUser from '../redux/HOC/withUser';

const TraineeLogin = ({ setUser }) => {
  const [trainee, setTrainee] = useState({});
  const [isEnrl, setEnrl] = useState(true);

  const triggers = JSON.stringify(formSpec[0].triggers);

  useEffect(() => {
    console.log('Test');
    window.addEventListener('message', (e) => {
      const { data } = e;
      console.log('data', data);
      try {
        const decoded = JSON.parse(data);
        if (decoded.channel === 'traineeDetail') {
          setTimeout(() => {
            setEnrl(true);
          }, 1000);
        }
        if (decoded.channel === 'enketo') {
          setTimeout(() => {
            const { resp } = decoded.loginRes;
            setTrainee(decoded.message);
            setEnrl(false);
            setUser(resp.result.data.user);
          }, 1000);
        }
      } catch (error) {
        // console.log(e)
      }
    });
  }, []);
  return (
    <>
      <Header isLogout={isEnrl} />
      <div className="m-10 text-xl font-bold text-teal-800 text-center">
        <h2 className="header-text-color">DST Trainee Attendance</h2>
      </div>
      {isEnrl
        ? (
          <iframe
            frameBorder="0"
            src={`${process.env.REACT_APP_ENKETO}/preview?xform=${process.env.REACT_APP_GET_FORM}/getForm/enrollment&id=enrollment&triggers=${triggers}`}
            title="Enrollment"
            allow="geolocation"
            width="100%"
            height="500px"
          />
        )
        : (
          <iframe
            frameBorder="0"
            src={`${process.env.REACT_APP_ENKETO}/preview?xform=${process.env.REACT_APP_GET_FORM}/getFormPrefilled/${trainee.id}&id=preFilled`}
            title="Test Geolocation"
            allow="geolocation"
            width="100%"
            height="650px"
          />
        )}
    </>
  );
};
export default withUser(TraineeLogin);
