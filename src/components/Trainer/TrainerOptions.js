import React from 'react';
import {
  ViewGridIcon, ClipboardListIcon,
} from '@heroicons/react/solid';
import { LocationMarkerIcon, CalendarIcon } from '@heroicons/react/outline';
import { browserHistory } from 'react-router';
import withGoBack from '../../redux/HOC/withGoBack';
import Header from '../Header';

const TrainerOptions = ({ goBack, setGoBack }) => {
  const onDstMc = () => {
    goBack.push(window.location.pathname);
    setGoBack(goBack);
    browserHistory.push('/create-dst-mc');
  };

  return (
    <div>
      <Header />
      <div className="m-10 text-teal-800 text-center">
        <h2 className="header-text-color">Please select one option to proceed</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 h-48">
        <div
          onClick={onDstMc}
          className="text-center text-2xl"
        >
          <div className="flex items-center justify-center text-teal-700">
            <CalendarIcon className="w-5/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6" aria-hidden="true" />
          </div>
          Update Academic Calendar
        </div>
        <div className="text-center text-2xl">
          <div className="flex items-center justify-center text-teal-700">
            <LocationMarkerIcon className="w-5/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6" aria-hidden="true" />
          </div>
          Update Industry/OJT location
        </div>
        <div className="text-center text-2xl">
          <div className="flex items-center justify-center text-teal-700">
            <ViewGridIcon className="w-5/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6" aria-hidden="true" />
          </div>
          View OJT attendance
        </div>
        <div className="text-center text-2xl">
          <div className="flex items-center justify-center text-teal-700">
            <ClipboardListIcon className="w-5/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6" aria-hidden="true" />
          </div>
          Add MC meeting details
        </div>
      </div>
    </div>
  );
};
export default withGoBack(TrainerOptions);
