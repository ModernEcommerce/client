import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { producerListReducer, productCreateReviewReducer, productDetailsReducer  } from './Reducers/ProductReducers.js'
import { cartReducer } from './Reducers/CartReducer.js';
import { themeReducer } from './Reducers/ThemeReducer.js'
import { userChangeProfileReducer, userConfirmForgotReducer, userConfirmRegisterReducer, userDetailsReducer, userForgotReducer, userLoginGGReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './Reducers/UserReducer.js';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer} from './Reducers/OrderReducer';
import { categoryListReducer } from './Reducers/CategoryReducer';
const reducer = combineReducers({
    productList: producerListReducer,
    productDetails: productDetailsReducer,
    productReview: productCreateReviewReducer,
    cart: cartReducer,
    theme: themeReducer,
    userLogin: userLoginReducer,
    userLoginGoogle: userLoginGGReducer,
    userDetails: userDetailsReducer,
    userRegister: userRegisterReducer,
    userConfirmRegister: userConfirmRegisterReducer,
    userForgot: userForgotReducer,
    userConfirmForgot: userConfirmForgotReducer,
    userChangeProfile: userChangeProfileReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderListMyReducer,
    categoryList: categoryListReducer
})

const initialState = {
  cart:{
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")): {}
  },
  userLogin:{
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null
  }
}

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;