
import { GET_DATA_BANNERS } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listBanners: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DATA_BANNERS: {
      return {
        ...state,
        listBanners: action.payload,
      };
    }
    default:
      return state;
  }
};