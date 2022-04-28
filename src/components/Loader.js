import React from 'react';
import { Spinner } from 'react-activity';

const Loader = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-teal-700 opacity-75 flex flex-col items-center justify-center">
    <Spinner size={50} color="white" />
  </div>
);

export default Loader;
