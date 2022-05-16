import React from 'react';
import { UserIcon } from '@heroicons/react/solid';
import { browserHistory } from 'react-router';
import { onGoBack, ROLE } from '../common/globals';
import withGoBack from '../redux/HOC/withGoBack';
import withUser from '../redux/HOC/withUser';
import Header from './Header';

const Welcome = ({ goBack, setGoBack, user }) => {
  const onBack = () => {
    onGoBack(goBack);
  };
  const onNext = () => {
    if (user !== null) {
      if (user.user.registrations[0].roles[0] === ROLE.PRINCIPAL) {
        browserHistory.push('/dst-mc');
      }
      if (user.user.registrations[0].roles[0] === ROLE.TRAINER) {
        browserHistory.push('/trainer-options');
      }
      goBack.push(window.location.pathname);
      setGoBack(goBack);
    }
  };
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center text-teal-700">
        <UserIcon className="w-5/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6" aria-hidden="true" />
      </div>
      <div className="flex mb-10 items-center justify-center text-2xl font-bold text-teal-700">
        <span className="font-semibold">Welcome Bhagat Singh</span>
      </div>
      <div className="flex flex-col space-y-8 items-center justify-center">
        <div className="text-center bg-teal-700 text-white">
          <span className="m-2 my-8">ITI Name:</span>
          <span className="m-2 my-8">GITI Faridabad</span>
        </div>
        <div className="text-center bg-teal-700 text-white">
          <span className="m-2 my-8">Designation:</span>
          <span className="m-2 my-8">Principal</span>
        </div>
        <div className="text-center bg-teal-700 text-white">
          <span className="m-2 my-8">Email ID:</span>
          <span className="m-2 my-8">Bhgat@gmail.com</span>
        </div>
      </div>
      <div className="p-10 flex item-center justify-center">
        <div className="flex justify-center">
          <button
            onClick={onBack}
            type="button"
            className="bg-teal-700 text-white p-2 text-sm w-auto"
          >
            Go Back
          </button>
          <button
            onClick={onNext}
            type="button"
            className="bg-teal-700 text-white p-2 ml-6 text-lg w-auto"
          >
            Next
          </button>
        </div>
      </div>
      <div className="p-10 flex item-center justify-center">
        <span className="text-teal-700">Incase details are incorrect, contact SDIT department</span>
      </div>
    </div>
  );
};
export default withUser(withGoBack(Welcome));
