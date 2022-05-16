export const RESET_REDUX = 'redux/RESET';
export const GO_BACK_SET = 'goBack/SET';
export const LOADER_SET = 'loader/SET';
export const NOTIFY_SET = 'notify/SET';
export const USER_SET = 'user/SET';
export const TRAINEE_SET = 'trainee/SET';
export const PHONE_SET = 'phone/SET';

export const resetRedux = () => ({
  type: RESET_REDUX,
});

export const goBackSet = (data) => ({
  type: GO_BACK_SET,
  data,
});

export const loaderSet = (data) => ({
  type: LOADER_SET,
  data,
});

export const notifySet = (state) => ({
  type: NOTIFY_SET,
  state,
});

export const userSet = (user) => ({
  type: USER_SET,
  user,
});

export const traineeSet = (trainee) => ({
  type: TRAINEE_SET,
  trainee,
});

export const phoneSet = (phone) => ({
  type: PHONE_SET,
  phone,
});
