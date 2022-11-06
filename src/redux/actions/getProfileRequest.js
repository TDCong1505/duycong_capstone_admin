import { GET_PROFILE_REQUEST } from '../../@jumbo/constants/ActionTypes';

export const getProfileRequest = (userCode) => ({
    type: GET_PROFILE_REQUEST,
    payload: userCode,
})