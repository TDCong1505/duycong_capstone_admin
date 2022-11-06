import { UPDATE_TOKEN } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  token: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    default:
      return state;
  }
};
