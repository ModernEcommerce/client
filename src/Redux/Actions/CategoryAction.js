import { CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL } from './../Constants/CategoryConstant';
import axios from 'axios';
import { logout } from './UserAction';
export const listCategory = () => async(dispatch, getState) =>{
    try {
        dispatch({type: CATEGORY_LIST_REQUEST});
        const { userLogin: {userInfo}} = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`/api/category/active`, config)
        dispatch({type: CATEGORY_LIST_SUCCESS, payload: data})
    } catch (error) {
        const message = error.response && error.response.data.message 
            ? error.response.data.message
            : error.message
        if(message === "Not authorized, token failed"){
            dispatch(logout());
        }
        dispatch({type: CATEGORY_LIST_FAIL, payload: message});
    }
}
