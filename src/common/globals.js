import { browserHistory } from 'react-router';
import { isEmpty } from 'lodash';
import {
  goBackSet,
} from '../redux/actions';

export const USER_STORAGE_KEY = 'DST_USER_DATA';

// STORE USER IN LOCAL STORAGE
export const storeUser = (user) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

// GET USER FROM LOCAL STORAGE
export const getUser = async () => {
  const user = await localStorage.getItem(USER_STORAGE_KEY);
  return user !== 'null' && !isEmpty(user) ? JSON.parse(user) : null;
};

export const onGoBack = (goBack) => {
  browserHistory.push((goBack && goBack.length > 0) ? `${goBack[goBack.length - 1]}` : browserHistory.goBack);
  if (goBack) {
    goBack.pop();
    goBackSet(goBack);
  }
};
// CONVERT OBJECT TO QUERY STRING
export const queryString = (obj) => {
  const str = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const p in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  }
  return str.join('&');
};
