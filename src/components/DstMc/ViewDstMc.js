import React, {useState} from 'react';
import {
  UserGroupIcon, PlusIcon, ViewGridIcon, ClipboardListIcon,
} from '@heroicons/react/solid';
import { UserAddIcon } from '@heroicons/react/outline';
import { browserHistory } from 'react-router';
import withGoBack from '../../redux/HOC/withGoBack';
import Header from '../Header';
import {onGoBack} from "../../common/globals";

const ViewDstMc = ({ goBack, setGoBack }) => {
  const [DSTList, setDSTList] = useState([{name: 1, id: 1}, {name: 2, id: 2}, {name: 3, id: 3}, {name: 4, id: 4}]);
  const onDstMc = () => {
    goBack.push(window.location.pathname);
    setGoBack(goBack);
    browserHistory.push('/create-dst-mc');
  };

  const onBack = () => {
    onGoBack(goBack);
  };

  return (
    <div>
      <Header title="View DST MC" onBackButton={onBack} />
      <div className="p-2">
        {/*<div className="m-10 text-teal-800 text-center">
        <h2 className="header-text-color">Please select one option to proceed</h2>
      </div>*/}
        {/*<div className="grid grid-cols-2 gap-4 pt-6">*/}
        <div className="grid grid-cols-12 mb-10">
          <div className="col-span-1"></div>
          <div className="col-span-11 grid grid-cols-1 gap-y-9">
            {
              DSTList && DSTList.length > 0 && DSTList.map(DST => (<div
                  onClick={onDstMc}
                  className="text-lg cursor-pointer"
              >
                <div className="flex items-center text-teal-700">
                  <UserGroupIcon className="w-2/12 sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/6 pr-3" aria-hidden="true" />
                  <span>DST MC {DST.name}</span>
                </div>
                {/*<div className="bg-teal-700 text-white inline-block px-2">
                  DST MC {DST.name}
                </div>*/}
              </div>))
            }
          </div>
        </div>
      </div>
    </div>
  );
};
export default withGoBack(ViewDstMc);
