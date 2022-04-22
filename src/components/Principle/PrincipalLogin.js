import React from 'react';
import { browserHistory } from 'react-router';
import withGoBack from '../../common/withGoBack';
import { onGoBack } from '../../common/globals';
import Header from '../Header';

const PrincipalLogin = ({ goBack, setGoBack }) => {
  const onSendOTP = () => {
    goBack.push(window.location.pathname);
    setGoBack(goBack);
    browserHistory.push('/verify-otp');
  };
  const onBack = () => {
    onGoBack(goBack);
  };

  return (
    <div>
      <Header />
      <div className="m-10 font-bold text-2xl text-teal-800 text-center">
        <h2 className="header-text-color">Principal Log in</h2>
      </div>
      <div className="flex justify-center items-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-teal-700 text-sm font-bold mb-2" htmlFor="username">
              Enter your HRMS Code
            </label>
            <input
              className="shadow appearance-none border border-teal-600 rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hrms"
              type="text"
            />
          </div>
          <div className="p-10 flex item-center justify-center w-9/12">
            <div className="flex justify-center">
              <button
                onClick={onBack}
                type="button"
                className="bg-teal-700 text-white p-2 text-sm w-auto"
              >
                Go Back
              </button>
              <button
                onClick={onSendOTP}
                type="button"
                className="bg-teal-700 text-white p-2 ml-6 text-lg w-auto"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default withGoBack(PrincipalLogin);
