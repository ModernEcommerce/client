import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { createOrder } from "../Redux/Actions/OrderAction";
import { ORDER_CREATE_RESET, ORDER_DETAILS_RESET } from "../Redux/Constants/OrderConstant";
import Header from "./../components/Header";

const PlaceOrderScreen = () => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector(state => state.cart);
  const { shippingAddress, cartItems, paymentMethod } = cart;
  const { userInfo } = useSelector(state => state.userLogin);
  cart.itemsPrice = cartItems.reduce((sum, current) => sum + current.price * current.qty, 0);
  cart.taxPrice = 5;
  cart.shippingPrice = 10;
  cart.totalPrice = cart.itemsPrice + (cart.itemsPrice * (cart.taxPrice / 100)) + cart.shippingPrice;
  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(createOrder({
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice,
    }))
  };
  const { loading, error, order, success } = useSelector(state => state.orderCreate);
  
  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({type: ORDER_CREATE_RESET})
      dispatch({type: ORDER_DETAILS_RESET})
    }
    if(!paymentMethod){
      history.push('/payment');
    }
  }, [dispatch, order, history, success, paymentMethod])


  return (
    <>
      <Header />
      <div className="container">
        {
          loading ? (<Loading />) : error ? (<Message>{error}</Message>) : ''
        }
        <div className="row order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Customer</strong>
                </h5>
                <p>{userInfo.name}</p>
                <p>{userInfo.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Order info</strong>
                </h5>
                <p>Shipping: {shippingAddress.country}</p>
                <p>Pay method: {paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Deliver to</strong>
                </h5>
                <p>
                  Address: {shippingAddress.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {
          cartItems.length > 0 ? (<div className="row order-products justify-content-between">
            <div className="col-lg-8">
              {/* <Message variant="alert-info mt-5">Your cart is empty</Message> */}

              {
                cartItems.map((cart, index) => {
                  return (
                    <div key={index} className="order-product row">
                      <div className="col-md-3 col-6">
                        <img src={cart.image} alt="product" />
                      </div>
                      <div className="col-md-5 col-6 d-flex align-items-center">
                        <Link to={"/"}>
                          <h6>{cart.name}</h6>
                        </Link>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                        <h4>QUANTITY</h4>
                        <h6>{cart.qty}</h6>
                      </div>
                      <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                        <h4>SUBTOTAL</h4>
                        <h6>${cart.qty * cart.price}</h6>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            {/* total */}
            <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <strong>Products</strong>
                    </td>
                    <td>${cart.itemsPrice}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Shipping</strong>
                    </td>
                    <td>${cart.shippingPrice}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tax</strong>
                    </td>
                    <td>${cart.taxPrice}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>${cart.totalPrice}</td>
                  </tr>
                </tbody>
              </table>
              <button type="submit" onClick={placeOrderHandler} className="text-white">
                  PLACE ORDER
              </button>
            </div>
          </div>) : <Message>Your cart is empty</Message>
        }
      </div>
    </>
  );
};

export default PlaceOrderScreen;
