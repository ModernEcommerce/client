import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import Message from '../components/LoadingError/Error';
import Loading from './../components/LoadingError/Loading';
import { forgotPass, login } from "../Redux/Actions/UserAction";
import Toast from './../components/LoadingError/Toast';
import { toast } from "react-toastify";
const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
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
  const handleForgotPassword = e =>{
    e.preventDefault()
    if(email===''){
      toast.warning("Please enter your email", ToastObjects);
    }else{
      dispatch(forgotPass(email))
    }
  }
  const {userInfo, loading, error} = useSelector(state => state.userLogin);
  const {loading: loadingForgot , error: errorForgot ,success: successForgot ,message} = useSelector(state => state.userForgot);

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
      <Toast/>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {
          error && (<Message variant="alert-danger">{error}</Message>)
        }
        {
          loadingForgot ? (<Loading/>) : errorForgot ? (<Message variant="alert-danger">{errorForgot}</Message>) 
          : successForgot ? (
            <Message variant="alert-success">{message}</Message>
          ) : ''
        }
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit}>
          <input type="email" value={email} name="email" onChange={handleChange} placeholder="Email" />
          <input type="password" autoComplete="off" value={password} name="password" onChange={handleChange} placeholder="Password" />
          <button type="submit">{
            loading ? 'Logging...' : 'Login'
          }</button>
          <p>
            <Link to={"/register"}>Create Account</Link>
          </p>
          <p style={{marginTop:'10px'}}>
            <Link to='#'>
              <div onClick={(e)=>handleForgotPassword(e)}>Forgot Your Password ?</div>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
