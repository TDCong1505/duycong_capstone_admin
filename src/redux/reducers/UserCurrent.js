import { GET_DATA_USER, GET_DATA_USER_ROLE, GET_DATA_USER_IDENTIFICATION } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  authUser: null,
  userRole: null,
  userIdentification: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DATA_USER: {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    case GET_DATA_USER_ROLE: {
      return {
        ...state,
        userRole: action.payload,
      };
    }
    case GET_DATA_USER_IDENTIFICATION: {
      return {
        ...state,
        userIdentification: action.payload,
      };
    }
    default:
      return state;
  }
};
