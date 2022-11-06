import { GET_DATA_BLOG,UPDATE_DATA_BLOG, GET_NEW_CATEGORY_BLOG } from '../../@jumbo/constants/ActionTypes';


const INIT_STATE = {
  listBlog: null,
  listCategoryBlog: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DATA_BLOG: {
      return {
        ...state,
        listBlog: action.payload,
      };
    }
    case UPDATE_DATA_BLOG: {
      return {
        ...state,
        listBlog: action.payload,
      };
    }
    case GET_NEW_CATEGORY_BLOG: {
      return {
        ...state,
        listCategoryBlog: action.payload,
      };
    }
    default:
      return state;
  }
};
