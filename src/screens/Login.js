import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import Message from '../components/LoadingError/Error';
import { login } from "../Redux/Actions/UserAction";
const Login = () => {
  window.scrollTo(0, 0);
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = e =>{
    e.preventDefault();
    setData(prev =>{
      return {
        ...prev, [e.target.name]: e.target.value 
      }
    })
  }
  const {userInfo, loading, error} = useSelector(state => state.userLogin);
  useEffect(() =>{
    if(userInfo){
      history.push('/');
    }
  }, [userInfo, history, dispatch])
  const handleSubmit = e =>{
    e.preventDefault();
    dispatch(login({...data}))
  }
  const {email, password} = data;
  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {
          error && (<Message variant="alert-danger">{error}</Message>)
        }
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit}>
          <input type="email" value={email} name="email" onChange={handleChange} placeholder="Email" />
          <input type="password" value={password} name="password" onChange={handleChange} placeholder="Password" />
          <button type="submit">{
            loading ? 'Logging...' : 'Login'
          }</button>
          <p>
            <Link to={"/register"}>Create Account</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
