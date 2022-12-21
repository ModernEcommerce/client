import {
  USER_CHANGE_FAIL,
  USER_CHANGE_REQUEST,
  USER_CHANGE_SUCCESS,
  USER_CONFIRM_FORGOT_FAIL,
  USER_CONFIRM_FORGOT_REQUEST,
  USER_CONFIRM_FORGOT_SUCCESS,
  USER_CONFIRM_REGISTER_FAIL,
  USER_CONFIRM_REGISTER_REQUEST,
    USER_CONFIRM_REGISTER_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_FORGOT_FAIL,
    USER_FORGOT_REQUEST,
    USER_FORGOT_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_GG_FAIL,
    USER_LOGIN_GG_REQUEST,
    USER_LOGIN_GG_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
  } from "../Constants/UserConstant";
  import axios from "axios";
import { CART_CLEAR_ITEMS } from "../Constants/CartConstant";
import { ORDER_LIST_MY_RESET } from "../Constants/OrderConstant";
import { toast } from "react-toastify";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

  // LOGIN
  export const login = ({email, password}) => async (dispatch) => {

    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(`/api/users/login`, { email, password }, config);
      if( data ){
        toast.success(`Hi ${data.name}, welcome to shop`, ToastObjects);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });        
        localStorage.setItem("userInfo", JSON.stringify(data));
      }

    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  

  // LOGIN_GOOGLE
  export const loginGoogle = (response) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_GG_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const formatTokenId  ={
        tokenId: response.tokenId
      }
      const { data } = await axios.post(`/api/users/google_login`, formatTokenId, config);
      if( data ){
        toast.success(`Hi ${data.name}, welcome to shop`, ToastObjects);
        dispatch({ type: USER_LOGIN_GG_SUCCESS, payload: data });   
        localStorage.setItem("userInfo", JSON.stringify(data));     
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_GG_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // LOGOUT
  export const logout = () => async(dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({type: CART_CLEAR_ITEMS});
    dispatch({ type: ORDER_LIST_MY_RESET });
  };
  
  // REGISTER
  export const register = ({name, email, phone, password}) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      if(phone.length !== 10){
        toast.error(`The phone number is wrong`, ToastObjects);
      }
      else{
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
    
        const { data } = await axios.post(`/api/users`, { name, email, phone, password }, config);
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // CONFIRM REGISTER
  export const confirmRegister = (token) => async (dispatch) => {
    try {
      dispatch({ type: USER_CONFIRM_REGISTER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const formatToken = {
        "activation_token": token
      }
      const { data } = await axios.post(`/api/users/active`, formatToken , config);
      dispatch({ type: USER_CONFIRM_REGISTER_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_CONFIRM_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // FORGOT PASS
  export const forgotPass = (email) => async (dispatch) => {
    try {
      if(email===''){
        toast.warning("Please enter your email", ToastObjects);
      }
      else{
        dispatch({ type: USER_FORGOT_REQUEST });
    
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const formatEmail = {
          "forgot_email": email
        }
        const { data } = await axios.post(`/api/users/forgotpass`, formatEmail, config);
        dispatch({ type: USER_FORGOT_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: USER_FORGOT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  // CONFIRM REGISTER
  export const confirmForgot = (dataReset) => async (dispatch) => {
    try {
      dispatch({ type: USER_CONFIRM_FORGOT_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(`/api/users/confirm/password`, dataReset , config);
      dispatch({ type: USER_CONFIRM_FORGOT_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_CONFIRM_FORGOT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // CHANGE PROFILE
  export const changeProfile = ({emailModal, passModal}) => async (dispatch) => {
    try {
      dispatch({ type: USER_CHANGE_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const formatForm = {
        "email": emailModal,
        "password": passModal
      }
      const { data } = await axios.post(`/api/users/changeprofile`, formatForm, config);
      dispatch({ type: USER_CHANGE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_CHANGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // USER DETAILS
  export const getUserDetails = () => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { userLogin: { userInfo }} = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/users/profile`, config);
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: message,
      });
    }
  };
  
  // UPDATE PROFILE
  export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(`/api/users/profile`, user, config);
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: message,
      });
    }
  };
  