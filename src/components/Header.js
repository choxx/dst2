import { ArrowLeftIcon } from '@heroicons/react/solid';
import GoH from '../images/GoH-Transparent.png';
import haryanaLogo from '../images/SDIT-Haryana.png';

const Header = ({ title = '', onBackButton = '' }) => (
  <>
    <div className="flex flex-row h-10 w-full bg-teal-700 text-white text-center justify-center">
      <div className="w-1/6 self-center pl-2" onClick={onBackButton === '' ? () => {} : onBackButton}>
        {
            onBackButton && <ArrowLeftIcon className="w-7 h-7" aria-hidden="true" />
          }
      </div>
      <div className="w-10/12 pr-12 self-center">
        {
            title !== '' && <span className="text-2xl" aria-hidden="true">{title}</span>
          }
      </div>
    </div>
    <div className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
        >
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <span className="sr-only">Workflow</span>
            <img
              className="h-8 w-auto sm:h-10"
              src={haryanaLogo}
              alt=""
            />
          </div>
          <img
            className="h-14 w-auto sm:h-14"
            src={GoH}
            alt=""
          />
        </div>
      </div>
    </div>
  </>
);
export default Header;
