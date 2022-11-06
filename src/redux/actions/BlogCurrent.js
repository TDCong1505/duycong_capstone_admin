import { GET_DATA_BLOG, UPDATE_DATA_BLOG, GET_NEW_CATEGORY_BLOG } from '../../@jumbo/constants/ActionTypes';

export const setDataBlog = blog => {
  return dispatch => {
    dispatch({
      type: GET_DATA_BLOG,
      payload: blog,
    });
  };
};

export const updateDataBlog = blog => {
  return dispatch => {
    dispatch({
      type: UPDATE_DATA_BLOG,
      payload: blog,
    });
  };
};

export const setDataCategoryBlog = blog => {
  return dispatch => {
    dispatch({
      type: GET_NEW_CATEGORY_BLOG,
      payload: blog,
    });
  };
};
