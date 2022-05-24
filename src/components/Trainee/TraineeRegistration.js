import React from 'react';
import Header from '../Header';

const TraineeRegistration = () => {
  let url = `${process.env.REACT_APP_GET_FORM}/getForm/traineeRegistration`;
  const customURL = localStorage.getItem('traineeRegistationURL');
  if (customURL !== null && customURL !== undefined && customURL !== 'undefined') url = customURL;
  console.log({ url });

  return (
    <>
      <Header />
      <iframe
        frameBorder="0"
        src={`${process.env.REACT_APP_ENKETO}/preview?xform=${encodeURIComponent(url)}&id=traineeRegistration`}
        title="Trainer"
        allow="geolocation"
        width="100%"
        height="670px"
      />
    </>
  );
};
export default TraineeRegistration;
