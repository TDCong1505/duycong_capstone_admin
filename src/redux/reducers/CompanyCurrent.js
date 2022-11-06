import { GET_DATA_COMPANY } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
    listCompany: null,
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_DATA_COMPANY: {
        return {
          ...state,
          listCompany: action.payload,
        };
      }
      default:
        return state;
    }
  };
  