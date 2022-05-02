import React, { useState } from 'react';
import OTPInput, { ResendOTP } from 'otp-input-react';
import { browserHistory } from 'react-router';
import { onGoBack } from '../common/globals';
import withGoBack from '../redux/HOC/withGoBack';
import withUser from '../redux/HOC/withUser';
import withNotify from '../redux/HOC/withNotify';
import withLoader from '../redux/HOC/withLoader';
import Header from './Header';
import { verifyOTP } from '../utils/utils';

const Otp = ({
  goBack, setGoBack, user, setNotify, setLoader, setUser,
}) => {
  const [OTP, setOTP] = useState('');
  const renderButton = (buttonProps) => (
    <div className="items-center justify-center">
      <button
        type="button"
        className={`${buttonProps.remainingTime !== 0 ? 'mr-5 text-teal-700' : 'mr-5 w-44 bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline'}`}
        {...buttonProps}
      >
        {buttonProps.remainingTime !== 0 ? `${buttonProps.remainingTime} seconds remaining` : 'Resend'}
      </button>
    </div>
  );

  const renderTime = () => React.Fragment;
  const onValidate = async () => {
    const verifyOtpData = {
      phone: user.phone,
      otp: OTP,
    };
    const verifyOTPData = await verifyOTP(verifyOtpData);
    const { responseStatus, message, resp } = verifyOTPData;
    if (responseStatus) {
      setUser({ ...user, ...resp.result.data.user });
      setNotify({ message, type: 'success' });
      setOTP('');
      goBack.push(window.location.pathname);
      setGoBack(goBack);
      browserHistory.push('/welcome');
    } else {
      setNotify({ message, type: 'error' });
    }
    setLoader(false);
  };
  const onBack = () => {
    onGoBack(goBack);
  };

  return (
    <div>
      <Header />
      <div className="m-10 font-bold text-xl text-teal-800 text-center">
        <h2 className="header-text-color">Please enter OTP sent to +91-**********</h2>
      </div>
      <div className="flex flex-col space-y-16">
        <div className="flex justify-center items-center">
          <OTPInput
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={4}
            otpType="number"
            inputStyles={{ border: 'teal 1px solid' }}
          />
        </div>
        {
          OTP.length >= 4
          && (
          <div className="flex items-center justify-center">
            <button
              onClick={onValidate}
              className="mr-5 w-44 bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="button"
            >
              VALIDATE
            </button>
          </div>
          )
        }
        <div className="flex justify-center items-center">
          <ResendOTP
            style={{ justifyContent: 'space-between', display: 'block', alignItem: 'center' }}
            renderButton={renderButton}
            renderTime={renderTime}
            onResendClick={() => console.log('Resend clicked')}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={onBack}
            className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
            type="button"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default withNotify(withLoader(withUser(withGoBack(Otp))));
