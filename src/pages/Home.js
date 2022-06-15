import { UserIcon, InformationCircleIcon } from '@heroicons/react/solid';
import { browserHistory } from 'react-router';
import withGoBack from '../redux/HOC/withGoBack';
import Header from '../components/Header';

const Home = ({ goBack, setGoBack }) => {
  const onGoBack = () => {
    goBack.push(window.location.pathname);
    setGoBack(goBack);
  };

  /* const onPrincipalLogin = () => {
    onGoBack();
    browserHistory.push('/principal-login');
  };

  const onTrainerLogin = () => {
    onGoBack();
    browserHistory.push('/trainer-login');
  };
*/
  const onTraineeLogin = () => {
    onGoBack();
    browserHistory.push('/trainee-login');
  };

  /*  const onTrainerDetail = () => {
    onGoBack();
    browserHistory.push('/trainer-detail');
  }; */

  return (
    <>
      <Header />
      <div className="mt-10 font-bold text-2xl text-center text-teal-700">
        Select your user profile to log in
      </div>
      <div className="mt-20 flex flex-col space-y-8 items-center justify-center">
        {/* <div>
          <button
            onClick={onPrincipalLogin}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-teal-700 shadow-sm text-base
             font-medium rounded-md text-teal-700 focus:outline-none focus:ring-2
             focus:ring-offset-2 focus:ring-teal-500"
          >
            <UserIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            Login as a Principal
          </button>
        </div>
        <div>
          <button
            onClick={onTrainerLogin}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-teal-700
            shadow-sm text-base font-medium rounded-md text-teal-700 focus:outline-none focus:ring-2
            focus:ring-offset-2 focus:ring-teal-500"
          >
            <UserIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            Login as a Trainer
          </button>
        </div> */}
        <div>
          <button
            onClick={onTraineeLogin}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-teal-700 shadow-sm text-base font-medium rounded-md text-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <UserIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            Trainee Login
          </button>
        </div>
        {/* <div>
          <button
            onClick={onTrainerDetail}
            type="button"
            className="inline-flex items-center px-4 py-2 border
             border-teal-700 shadow-sm text-base font-medium
             rounded-md text-teal-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <UserIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            Trainer Login
          </button>
        </div> */}
      </div>

      <div className="absolute text-teal-700 text-center inset-x-0 bottom-0 p-28">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-teal-700 shadow-sm text-base font-medium rounded-md text-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <InformationCircleIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
          <a href="https://drive.google.com/drive/folders/1iEKsiWWA-plrFwk4izoCBaer6ug0NSnu" target="_blank" rel="noreferrer">Help</a>
        </button>
      </div>
      <div className="absolute text-teal-700 text-center inset-x-0 bottom-0 p-12">Please refer above for FAQs and raising grievances</div>

    </>
  );
};
export default withGoBack(Home);
