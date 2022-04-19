import {GO_BACK_SET, RESET_REDUX} from './actions';

export const goBack = (state = [], action) => {
  switch (action.type) {
    case GO_BACK_SET: {
      return action.data.filter((item, pos) => action.data[pos - 1] !== item);
    }
    case RESET_REDUX:
      return [];
    default:
      return state;
  }
};
