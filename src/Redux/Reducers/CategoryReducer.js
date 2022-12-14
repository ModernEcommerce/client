  // CATEGORY LIST
import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_RESET, CATEGORY_LIST_SUCCESS } from './../Constants/CategoryConstant';
  export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
      case CATEGORY_LIST_REQUEST:
        return { loading: true };
      case CATEGORY_LIST_SUCCESS:
        return { loading: false, categories: action.payload };
      case CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload };
      case CATEGORY_LIST_RESET:
        return { categories: [] };
      default:
        return state;
    }
  };
  