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
import NotFound from "./screens/NotFound";
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
        <Route path="/products/:id" component={SingleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={ProfileScreen}/>
        <Route path="/cart/:id?" component={CartScreen}/>
        <Route path="/shipping" component={ShippingScreen}/>
        <Route path="/payment" component={PaymentScreen}/>
        <Route path="/placeorder" component={PlaceOrderScreen}/>
        <Route path="/order" component={OrderScreen}/>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
