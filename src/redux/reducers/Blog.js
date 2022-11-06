import { UPDATE_POST } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
  blog: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_POST: {
      return {
        ...state,
        blog: action.payload,
        loadUser: true,
      };
    }
    default:
      return state;
  }
};
