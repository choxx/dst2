import {UserIcon} from '@heroicons/react/solid'
import { browserHistory } from 'react-router';
export default function Home() {

  return (
    <>
      <div className="mt-10 text-center text-teal-700">
        Select your user profile to log in
      </div>
      <div className="mt-10 text-center flex flex-col space-y-4">
        <div>
          <button
            onClick={() => browserHistory.push('/principal-login')}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-teal-700 shadow-sm text-base font-medium rounded-md text-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <UserIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true"/>
            Login as a Principle
          </button>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-teal-700 shadow-sm text-base font-medium rounded-md text-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <UserIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true"/>
            Login as a Trainer
          </button>
        </div>
        <div>
          <button
            onClick={() => browserHistory.push('/trainee-login')}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-teal-700 shadow-sm text-base font-medium rounded-md text-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <UserIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true"/>
            Login as a Trainee
          </button>
        </div>
      </div>
    </>
  )
}
