import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { producerListReducer, productCreateReviewReducer, productDetailsReducer  } from './Reducers/ProductReducers.js'
import { cartReducer } from './Reducers/CartReducer.js';
import { themeReducer } from './Reducers/ThemeReducer.js'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './Reducers/UserReducer.js';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer} from './Reducers/OrderReducer';
const reducer = combineReducers({
    productList: producerListReducer,
    productDetails: productDetailsReducer,
    productReview: productCreateReviewReducer,
    cart: cartReducer,
    theme: themeReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderListMyReducer
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