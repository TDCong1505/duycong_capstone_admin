import {GET_DATA_MAILSUPPORT} from "../../@jumbo/constants/ActionTypes";

export const setDataMailSupport = list => {
  return dispatch => {
    dispatch({
      type: GET_DATA_MAILSUPPORT,
      payload: list
    });
  };
};
