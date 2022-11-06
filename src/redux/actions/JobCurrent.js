import { GET_DATA_JOB } from '../../@jumbo/constants/ActionTypes';

export const setDataJob = job => {
  return dispatch => {
    dispatch({
      type: GET_DATA_JOB,
      payload: job,
    });
  };
};
