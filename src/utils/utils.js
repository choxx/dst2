import base64 from 'base-64';
import {OTP_API_URL, HTTP_BASIC_USER, HTTP_BASIC_PASS, API_KEY, HASURA_QUERY_URL, API_BASE_URL, APPLICATION_ID} from '../common/config';
import { store } from '../redux/store';
import { loaderSet, notifySet } from '../redux/actions';
import { queryString } from '../common/globals';

const validateResponse = async (response) => {
  const apiRes = await response.json();
  const jsonResponse = {
    ...apiRes,
    responseStatus: false,
  };
  /*const { resp: { params: { status, errMsg } } } = jsonResponse;
  if (status === 'Success') {
    const { resp: { result: { responseMsg } } } = jsonResponse;
    jsonResponse.responseStatus = true;
    jsonResponse.message = responseMsg;
  } else {
    jsonResponse.responseStatus = false;
    jsonResponse.message = errMsg;
  }*/
  return jsonResponse;
};

const handleNetworkError = async (responseError) => {
  if (responseError.name !== 'AbortError') {
    store.dispatch(loaderSet(false));
    store.dispatch(notifySet({
      type: 'error',
      message: 'Network request error. Please try again.',
    }));
  }
};

const generateHasuraAPI = async (query) => fetch(HASURA_QUERY_URL, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `Basic ${base64.encode(`${HTTP_BASIC_USER}:${HTTP_BASIC_PASS}`)}`,
    Authorization: `Bearer ${store.getState().user?.user?.token}`,
  },
  body: JSON.stringify(query)
}).then(async (response) => await validateResponse(response))
    .catch((error) => handleNetworkError(error));

export const sendOTP = async (data) => fetch(`${OTP_API_URL}/dst/sendOTP?${queryString(data)}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64.encode(`${HTTP_BASIC_USER}:${HTTP_BASIC_PASS}`)}`,
  },
}).then(async (response) => await validateResponse(response))
  .catch((error) => handleNetworkError(error));

export const verifyOTP = async (data) => fetch(`${OTP_API_URL}/dst/verifyOTP?${queryString(data)}`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64.encode(`${HTTP_BASIC_USER}:${HTTP_BASIC_PASS}`)}`,
  },
}).then(async (response) => await validateResponse(response))
  .catch((error) => handleNetworkError(error));

export const ITIlogin = (data) => fetch(`${API_BASE_URL}/login/pin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `Basic ${base64.encode(`${HTTP_BASIC_USER}:${HTTP_BASIC_PASS}`)}`,
    Authorization: API_KEY,
  },
  body: JSON.stringify(data)
}).then(async (response) => await validateResponse(response))
    .catch((error) => handleNetworkError(error));

export const ResetPIN = (data) => fetch(`${API_BASE_URL}/changePin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `Basic ${base64.encode(`${HTTP_BASIC_USER}:${HTTP_BASIC_PASS}`)}`,
    Authorization: API_KEY,
    "x-application-id": APPLICATION_ID
  },
  body: JSON.stringify(data)
}).then(async (response) => await validateResponse(response))
    .catch((error) => handleNetworkError(error));


export const getAcademicCalendarLinks = (data) => {
  const query = {
    query: `query MyQuery($name: String) {
      iti_academic_calendar_link(where: {iti: {name: {_eq: $name}}}, limit: 1) {
        calendar_link
        id
        created_at
      }
    }`,
    "variables": {name: data.itiName}
  };
  return generateHasuraAPI(query);
};

export const getLoggedInITIDetails = (data) => {
  const query = {
    query: `query MyQuery($name: String) {
      principal(where: {iti: {_eq: $name}}, limit: 1) {
        principal_name
        iti
        email_id
        district
        contact_number
      }
    }`,
    "variables": {name: data.itiName}
  };
  return generateHasuraAPI(query);
};


