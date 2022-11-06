import { GET_DATA_SETTING } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listSetting: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DATA_SETTING: {
      return {
        ...state,
        listSetting: action.payload,
      };
    }
    default:
      return state;
  }
};
