import React, { useState } from 'react';
import OTPInput, { ResendOTP } from 'otp-input-react';
import { browserHistory } from 'react-router';
import { onGoBack, storeUser } from '../../common/globals';
import withGoBack from '../../redux/HOC/withGoBack';
import withUser from '../../redux/HOC/withUser';
import withNotify from '../../redux/HOC/withNotify';
import withLoader from '../../redux/HOC/withLoader';
import Header from '../Header';
import { verifyOTP } from '../../utils/utils';
import {store} from "../../redux/store";
import {notifySet} from "../../redux/actions";
import { ResetPIN } from '../../utils/utils';

const ResetPassword = ({
               goBack, setGoBack, user, setNotify, setLoader, setUser,
             }) => {
  const [confirmPin, setConfirmPin] = useState('');
  const [newPin, setNewPin] = useState('');

  const onBack = () => {
    onGoBack(goBack);
  };

  const onReset = async () => {
    if(!user?.user?.user?.username || (newPin && newPin.length<4)){
      setNotify({ message: 'PIN should be of 4 digit', type: 'error' });
      return ;
    }
    if(confirmPin !== newPin){
      setNotify({ message: 'PIN do not match', type: 'error' });
      return ;
    }
    const reqData = {
      loginId: user?.user?.user?.username,
      password: newPin,
    };
    ResetPIN(reqData).then((res) => {
      if(res.msg === "Password changed successfully"){
        setNotify({ message: res?.msg || 'PIN Changed successfully', type: 'success' });
        browserHistory.push('/iti-welcome');
      }else{
        setNotify({ message: res.message || 'error occured', type: 'error' });
      }
    });
    setLoader(false);
  };

  return (
      <div>
        <Header />
        <div className="m-10 font-bold text-xl text-teal-800 text-center">
          <h2 className="header-text-color">Reset Password</h2>
        </div>
        <div className="flex flex-col space-y-12">
          <div>
            <label className="block text-teal-700 text-sm font-bold mb-2 text-center">
              Enter New Pin
            </label>
            <div className="flex justify-center items-center text-center">
              <OTPInput
                  value={newPin}
                  onChange={setNewPin}
                  autoFocus
                  OTPLength={4}
                  otpType="number"
                  inputStyles={{ border: 'teal 1px solid' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-teal-700 text-sm font-bold mb-2 text-center">
              Confirm New Pin
            </label>
            <div className="flex justify-center items-center">
              <OTPInput
                  value={confirmPin}
                  onChange={setConfirmPin}
                  OTPLength={4}
                  otpType="number"
                  inputStyles={{ border: 'teal 1px solid' }}
              />
            </div>
          </div>



          <div className="flex items-center justify-center">
            <button
                onClick={onBack}
                className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="button"
            >
              Go Back
            </button>

            <button
                onClick={onReset}
                className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 ml-6 focus:outline-none focus:shadow-outline"
                type="button"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
  );
};
export default withNotify(withLoader(withUser(withGoBack(ResetPassword))));
