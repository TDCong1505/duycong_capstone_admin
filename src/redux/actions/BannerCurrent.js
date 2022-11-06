import { GET_DATA_BANNERS } from '../../@jumbo/constants/ActionTypes';

export const setDataBanners = item => {
  return dispatch => {
    dispatch({
      type: GET_DATA_BANNERS,
      payload: item,
    });
  };
};
