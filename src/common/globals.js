import { browserHistory } from 'react-router';
import {
  goBackSet,
} from '../redux/actions';

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
