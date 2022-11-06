import { INIT_DATA } from '../../@jumbo/constants/ActionTypes';

export const setDataInit = data => {
  return dispatch => {
    dispatch({
      type: INIT_DATA,
      payload: data,
    });
  };
};
