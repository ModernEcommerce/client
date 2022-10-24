import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { producerListReducer, productDetailsReducer  } from './Reducers/ProductReducers.js'
import { cartReducer } from './Reducers/CartReducer.js';
import { themeReducer } from './Reducers/ThemeReducer.js'
const reducer = combineReducers({
    productList: producerListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    theme: themeReducer
})

const initialState = {
  cart:{
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  }
}

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;