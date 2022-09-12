import React from 'react';
import {
  ViewGridIcon, ClipboardListIcon, UserGroupIcon,
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
      <div className="p-2">
        <div className="m-10 text-teal-800 text-center">
          <h2 className="header-text-color">Please select one option to proceed</h2>
        </div>
        <div className="grid grid-cols-12 mb-10">
          <div className="col-span-2"></div>
          <div className="col-span-10 grid grid-cols-1 gap-y-9">
          <div
              onClick={onDstMc}
              className="text-lg cursor-pointer"
          >
            <div className="flex items-center text-teal-700">
              <CalendarIcon className="w-2/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 pr-3" aria-hidden="true" />
              <span>Update Academic Calendar</span>
            </div>
          </div>
          <div className="text-lg cursor-pointer">
            <div className="flex items-center text-teal-700">
              <LocationMarkerIcon className="w-2/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 pr-3" aria-hidden="true" />
              <span>Update Industry/OJT location</span>
            </div>
          </div>
          <div className="text-lg cursor-pointer">
            <div className="flex items-center text-teal-700">
              <ViewGridIcon className="w-2/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 pr-3" aria-hidden="true" />
              <span>View OJT attendance</span>
            </div>
          </div>
          <div className="text-lg cursor-pointer">
            <div className="flex items-center text-teal-700">
              <ClipboardListIcon className="w-2/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 pr-3" aria-hidden="true" />
              <span>Add MC meeting details</span>
            </div>
          </div>
          <div className="text-lg cursor-pointer">
            <div className="flex items-center text-teal-700">
              <UserGroupIcon className="w-2/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 pr-3" aria-hidden="true" />
              <span>Report Placements</span>
            </div>
          </div>
        </div>
        </div>
        <div className="flex items-center justify-center">
          <button
              className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default withGoBack(TrainerOptions);
