import { GET_DATA_JOB } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
  listJob: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DATA_JOB: {
      return {
        ...state,
        listJob: action.payload,
      };
    }
    default:
      return state;
  }
};
