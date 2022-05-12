import React, { useEffect } from 'react';
import Header from '../Header';

const TrainerDetail = () => {
  useEffect(() => {
    console.log('Test');
  }, []);
  return (
    <>
      <Header />
      <iframe
        frameBorder="0"
        src={`${process.env.REACT_APP_ENKETO}/preview?xform=${process.env.REACT_APP_GET_FORM}/getForm/trainer&id=trainer`}
        title="Trainer"
        allow="geolocation"
        width="100%"
        height="670px"
      />
    </>
  );
};
export default TrainerDetail;
