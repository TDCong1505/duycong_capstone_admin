import { GET_DATA_NOTIFICATION } from '../../@jumbo/constants/ActionTypes';

export const setDataNotification = noti => {
    return dispatch => {
        dispatch({
            type: GET_DATA_NOTIFICATION,
            payload: noti,
        });
    };
};