import {
  USER_CHANGE_FAIL,
  USER_CHANGE_REQUEST,
  USER_CHANGE_RESET,
  USER_CHANGE_SUCCESS,
  USER_CONFIRM_FORGOT_FAIL,
  USER_CONFIRM_FORGOT_REQUEST,
  USER_CONFIRM_FORGOT_RESET,
  USER_CONFIRM_FORGOT_SUCCESS,
  USER_CONFIRM_REGISTER_FAIL,
  USER_CONFIRM_REGISTER_REQUEST,
    USER_CONFIRM_REGISTER_RESET,
    USER_CONFIRM_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_FORGOT_FAIL,
    USER_FORGOT_REQUEST,
    USER_FORGOT_RESET,
    USER_FORGOT_SUCCESS,
    USER_GG_LOGOUT,
    USER_LOGIN_FAIL,
    USER_LOGIN_GG_FAIL,
    USER_LOGIN_GG_REQUEST,
    USER_LOGIN_GG_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_RESET,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
  } from "../Constants/UserConstant";
  
  // LOGIN
  export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true};
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload};
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };

  // LOGIN_GOOGLE
  export const userLoginGGReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_GG_REQUEST:
        return { loading: true};
      case USER_LOGIN_GG_SUCCESS:
        return { loading: false, success: true, userInfo: action.payload};
      case USER_LOGIN_GG_FAIL:
        return { loading: false, error: action.payload };
      case USER_GG_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  
  // REGISTER
  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, success : true, message: action.payload };
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      case USER_REGISTER_RESET:
        return {}
      default:
        return state;
    }
};

  // CONFIRM REGISTER
  export const userConfirmRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_CONFIRM_REGISTER_REQUEST:
        return { loading: true };
      case USER_CONFIRM_REGISTER_SUCCESS:
        return { loading: false, success: true, userInfo: action.payload};
      case USER_CONFIRM_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      case USER_CONFIRM_REGISTER_RESET:
        return {}
      default:
        return state;
    }
  };
  
  // FORGOT PASS
  export const userForgotReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_FORGOT_REQUEST:
        return { loading: true };
      case USER_FORGOT_SUCCESS:
        return { loading: false, success: true, message: action.payload};
      case USER_FORGOT_FAIL:
        return { loading: false, error: action.payload };
      case USER_FORGOT_RESET:
        return {}
      default:
        return state;
    }
  };

  // CONFIRM FORGOT
  export const userConfirmForgotReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_CONFIRM_FORGOT_REQUEST:
        return { loading: true };
      case USER_CONFIRM_FORGOT_SUCCESS:
        return { loading: false, success: true, message: action.payload};
      case USER_CONFIRM_FORGOT_FAIL:
        return { loading: false, error: action.payload };
      case USER_CONFIRM_FORGOT_RESET:
        return {}
      default:
        return state;
    }
  };

  // CHANGE PROFILE
  export const userChangeProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_CHANGE_REQUEST:
        return { loading: true };
      case USER_CHANGE_SUCCESS:
        return { loading: false, success: true, info: action.payload };
      case USER_CHANGE_FAIL:
        return { loading: false, error: action.payload };
      case USER_CHANGE_RESET:
        return {}
      default:
        return state;
    }
  };

  // USER DETAILS
  export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { ...state, loading: true };
      case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload};
      case USER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case USER_DETAILS_RESET:
        return { user: {} };
      default:
        return state;
    }
  };
  
  // UPDATE PROFILE
  export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
        return { loading: true };
      case USER_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success: true, userInfo: action.payload };
      case USER_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  