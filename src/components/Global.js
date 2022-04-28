import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import withLoader from '../redux/HOC/withLoader';
import withNotify from '../redux/HOC/withNotify';
import Loader from './Loader';

const Global = ({ loader, notify }) => {
  useEffect(() => {
    if (notify) {
      toast(notify.message, {
        type: notify.type,
        icon: true,
        position: 'top-center',
        theme: 'colored',
      });
    }
  }, [notify]);

  return (
    <>
      <ToastContainer />
      {loader && <Loader />}
    </>
  );
};

export default withLoader(withNotify(Global));
