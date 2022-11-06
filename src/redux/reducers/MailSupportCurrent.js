import {GET_DATA_MAILSUPPORT} from "../../@jumbo/constants/ActionTypes";

const INIT_STATE = {
  listMailSupport: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DATA_MAILSUPPORT: {
      return {
        ...state,
        listMailSupport: action.payload
      };
    }
    default:
      return state;
  }
};
