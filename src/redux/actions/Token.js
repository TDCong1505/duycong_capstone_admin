import { UPDATE_TOKEN } from '../../@jumbo/constants/ActionTypes';

export const setToken = job => {
  return dispatch => {
    dispatch({
      type: UPDATE_TOKEN,
      payload: job,
    });
  };
};
