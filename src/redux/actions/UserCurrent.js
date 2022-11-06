import { GET_DATA_USER, GET_DATA_USER_ROLE, GET_DATA_USER_IDENTIFICATION } from '../../@jumbo/constants/ActionTypes';

export const setDataUser = user => {
  return dispatch => {
    dispatch({
      type: GET_DATA_USER,
      payload: user,
    });
  };
};

export const setDataUserRole = user => {
  return dispatch => {
    dispatch({
      type: GET_DATA_USER_ROLE,
      payload: user,
    });
  };
};

export const setDataUserIdentification = user => {
  return dispatch => {
    dispatch({
      type: GET_DATA_USER_IDENTIFICATION,
      payload: user,
    });
  };
};
