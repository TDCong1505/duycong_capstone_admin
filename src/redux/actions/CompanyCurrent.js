import { GET_DATA_COMPANY} from '../../@jumbo/constants/ActionTypes';

export const setDataCompany = company => {
  return dispatch => {
    dispatch({
      type: GET_DATA_COMPANY,
      payload: company,
    });
  };
};
