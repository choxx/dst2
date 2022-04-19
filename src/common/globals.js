import { browserHistory } from 'react-router';
import {
  goBackSet
} from '../redux/actions';

export const onGoBack = (goBack) => {
  browserHistory.push((goBack && goBack.length > 0) ? `${goBack[goBack.length - 1]}` : browserHistory.goBack);
  if (goBack) {
    goBack.pop();
    goBackSet(goBack);
  }
};
