import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ActiveAccount from "./screens/ActiveAccount";
import ResetPassword from "./screens/ResetPassword";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useSelector } from "react-redux";

const App = () => {
  const data = useSelector((state)=> state.theme)
  if(data.theme === "dark"){
    document.body.classList.remove("bg-light")
    document.body.classList.add("bg-dark")
  }
  else{
    document.body.classList.remove("bg-dark")
    document.body.classList.add("bg-light")
  }
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pageNumber" component={HomeScreen} exact />
        <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/account/activate/:token" component={ActiveAccount} />
        <Route path="/account/reset/:token" component={ResetPassword} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRouter path="/profile" component={ProfileScreen} />
        <PrivateRouter path="/cart/:id?" component={CartScreen} />
        <PrivateRouter path="/shipping" component={ShippingScreen} />
        <PrivateRouter path="/payment" component={PaymentScreen} />
        <PrivateRouter path="/placeorder" component={PlaceOrderScreen} />
        <PrivateRouter path="/order/:id" component={OrderScreen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
