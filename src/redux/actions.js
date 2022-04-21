export const RESET_REDUX = 'redux/RESET';
export const GO_BACK_SET = 'goBack/SET';

export const resetRedux = () => ({
  type: RESET_REDUX,
});

export const goBackSet = (data) => ({
  type: GO_BACK_SET,
  data,
});
