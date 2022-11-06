import { GET_DATA_SETTING } from '../../@jumbo/constants/ActionTypes';

export const setDataSetting = item => {
  return dispatch => {
    dispatch({
      type: GET_DATA_SETTING,
      payload: item,
    });
  };
};
