import { OTP_API_URL } from '../common/config';
import { store } from '../redux/store';
import { loaderSet, notifySet } from '../redux/actions';
import { queryString } from '../common/globals';

const validateResponse = async (response) => {
  const apiRes = await response.json();
  const jsonResponse = {
    ...apiRes.status,
    status: false,
  };
  if (response.status === 200 || response.status === 204) {
    jsonResponse.status = true;
  } else {
    jsonResponse.status = false;
  }
  return jsonResponse;
};

const handleNetworkError = async (responseError) => {
  console.log('responseError', responseError);
  if (responseError.name !== 'AbortError') {
    store.dispatch(loaderSet(false));
    store.dispatch(notifySet({
      type: 'error',
      message: 'Network request error. Please try again.',
    }));
  }
};

export const sendOTP = async (data) => fetch(`${OTP_API_URL}/user/sendOTP?${queryString(data)}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}).then(async (response) => await validateResponse(response))
  .catch((error) => handleNetworkError(error));

export const verifyOTP = async (data) => fetch(`${OTP_API_URL}/user/verifyOTP?${queryString(data)}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}).then(async (response) => await validateResponse(response))
  .catch((error) => handleNetworkError(error));
