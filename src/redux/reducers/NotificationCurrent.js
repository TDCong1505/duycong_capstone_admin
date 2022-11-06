import { GET_DATA_NOTIFICATION } from '../../@jumbo/constants/ActionTypes';

const INIT_STATE = {
    listNoti: null,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_DATA_NOTIFICATION: {
            return {
                ...state,
                listNoti: action.payload,
            };
        }
        default:
            return state;
    }
};
