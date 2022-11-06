import {
  SEND_FORGET_PASSWORD_EMAIL,
  UPDATE_AUTH_USER,
  UPDATE_TOKEN,
  UPDATE_LOAD_USER,
} from '../../@jumbo/constants/ActionTypes';

export const setAuthUser = user => {
  return dispatch => {
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: user,
    });
  };
};

export const updateToken = token => {
  return dispatch => {
    dispatch({
      type: UPDATE_TOKEN,
      payload: token,
    });
  };
};

export const updateLoadUser = loading => {
  return dispatch => {
    dispatch({
      type: UPDATE_LOAD_USER,
      payload: loading,
    });
  };
};

export const setForgetPassMailSent = status => {
  return dispatch => {
    dispatch({
      type: SEND_FORGET_PASSWORD_EMAIL,
      payload: status,
    });
  };
};
