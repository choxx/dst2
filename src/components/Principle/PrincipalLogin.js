import React from 'react';
import {browserHistory} from "react-router";

export default function PrincipalLogin() {

  return (
    <div>
      <div className="m-10 text-teal-800 text-center">
        <h2 className="header-text-color">Principal Log in</h2>
      </div>
      <div className="flex justify-center items-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-teal-700 text-sm font-bold mb-2" htmlFor="username">
              Enter your HRMS Code
            </label>
            <input
              className="shadow appearance-none border border-teal-600 rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hrms" type="text"/>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => browserHistory.push('/verify-otp')}
              className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="button">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => browserHistory.push('/')}
          className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          type="button">
          Go Back
        </button>
      </div>
    </div>
  )
}
