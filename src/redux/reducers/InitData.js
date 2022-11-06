import { INIT_DATA } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  initData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_DATA: {
      return {
        ...state,
        initData: action.payload,
      };
    }
    default:
      return state;
  }
};
