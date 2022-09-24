import React, {useEffect, useState} from 'react';
import { UserIcon } from '@heroicons/react/solid';
import { browserHistory } from 'react-router';
import { onGoBack } from '../../common/globals';
import withGoBack from '../../redux/HOC/withGoBack';
import Header from '../Header';
import withUser from '../../redux/HOC/withUser';
import {getLoggedInITIDetails} from "../../utils/utils";
import withNotify from "../../redux/HOC/withNotify";
import withLoader from "../../redux/HOC/withLoader";

const ITIWelcome = ({ goBack, setGoBack, setLoader, setNotify, user }) => {
    const [userDetails, setUserDetails] = useState({});
  const onBack = () => {
    onGoBack(goBack);
  };
  const onNext = () => {
    goBack.push(window.location.pathname);
    setGoBack(goBack);
    browserHistory.push('/iti-options');
  };
  const onResetPassword = () => {
      browserHistory.push('/iti-reset');
  };
  const fetchUserDetails = async () => {
      setLoader(true);
      const reqData = {
          itiName : user?.user?.user?.username || ''
      };
      const {data: {principal}} = await getLoggedInITIDetails(reqData);
      setUserDetails(principal[0]);
      setLoader(false);
  };

  useEffect(() => {
      fetchUserDetails();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center text-teal-700">
        <UserIcon className="w-5/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6" aria-hidden="true" />
      </div>
      <div className="flex mb-10 items-center justify-center text-2xl font-bold text-teal-700">
        <span className="font-semibold">Welcome</span>
      </div>
      <div className="flex flex-col space-y-8 items-center justify-center">
        <div className="text-center bg-teal-700 text-white">
          <span className="m-2 my-8">ITI Name:</span>
          <span className="m-2 my-8">{userDetails?.iti}</span>
        </div>
          <div className="text-center bg-teal-700 text-white">
              <span className="m-2 my-8">District:</span>
              <span className="m-2 my-8">{userDetails?.district}</span>
          </div>
        <div className="text-center bg-teal-700 text-white">
          <span className="m-2 my-8">Principal:</span>
          <span className="m-2 my-8">{userDetails?.principal_name}</span>
        </div>
        <div className="text-center bg-teal-700 text-white">
          <span className="m-2 my-8">Email ID:</span>
          <span className="m-2 my-8">{userDetails?.email_id}</span>
        </div>
        <div className="text-center bg-teal-700 text-white">
          <span className="m-2 my-8">Phone No.:</span>
          <span className="m-2 my-8">{userDetails?.contact_number}</span>
        </div>
      </div>
      <div className="p-10 flex item-center justify-center">
        <div className="flex justify-center">
          <button
            onClick={onResetPassword}
            type="button"
            className="bg-teal-700 text-white p-2 text-sm w-auto"
          >
            Reset Password
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
export default withNotify(withLoader(withUser(withGoBack(ITIWelcome))));
