import React, { useEffect } from 'react';
import { browserHistory } from 'react-router';
import Header from '../components/Header';
import withTrainee from '../redux/HOC/withTrainee';

const TraineeDetail = ({ trainee }) => {
  console.log('trainee redux', trainee);
  useEffect(() => {
    console.log('Test');
    window.addEventListener('message', (e) => {
      const { data } = e;
      console.log('data', data);
      try {
        const decoded = JSON.parse(data);
        if (decoded.channel === 'traineeDetail') {
          setTimeout(() => {
            // need to redirect
            browserHistory.push('/trainee-login');
          }, 1000);
        }
      } catch (error) {
        // console.log(e)
      }
    });
  }, []);
  return (
    <>
      <Header />
      <div className="m-10 text-xl font-bold text-teal-800 text-center">
        <h2 className="header-text-color">DST Trainee Attendance</h2>
      </div>
      <iframe
        frameBorder="0"
        src={`${process.env.REACT_APP_ENKETO}/preview?xform=${process.env.REACT_APP_GET_FORM}/getFormPrefilled/${trainee.id}&id=preFilled`}
        title="Test Geolocation"
        allow="geolocation"
        width="100%"
        height="650px"
      />
    </>
  );
};
export default withTrainee(TraineeDetail);
