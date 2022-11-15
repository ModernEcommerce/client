import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/CartAction";

const ShippingScreen = () => {
  const {shippingAddress} = useSelector(state => state.cart);
  window.scrollTo(0, 0);
  const [data, setData] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || ''
  })
  const history = useHistory();
  const dispatch = useDispatch();
  const {address, city, postalCode, country} = data;
 
  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(saveShippingAddress({...data}));
      history.push('/payment')
  };
  const handleChange = e =>{
    e.preventDefault();
    setData(prev =>{
      return {
        ...prev, [e.target.name]: e.target.value 
      }
    })

  }
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <input onChange={handleChange} value={address} required name="address"  type="text" placeholder="Enter address" />
          <input onChange={handleChange} value={city} required name="city" type="text" placeholder="Enter city" />
          <input onChange={handleChange} value={postalCode} required name="postalCode" type="text" placeholder="Enter postal code" />
          <input onChange={handleChange} value={country} required name="country" type="text" placeholder="Enter country" />
          <button type="submit" className="text-white">
              Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
