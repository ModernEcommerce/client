import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import Message from '../components/LoadingError/Error';
import Loading from './../components/LoadingError/Loading';
import { forgotPass, login, loginGoogle } from "../Redux/Actions/UserAction";
import Toast from './../components/LoadingError/Toast';
import { toast } from "react-toastify";
import { GoogleLogin } from 'react-google-login';
import {gapi} from 'gapi-script'
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
  const {userInfo: userInfoGG , loading: loadingGG, error: errorGG} = useSelector(state => state.userLoginGoogle);
  const {loading: loadingForgot , error: errorForgot ,success: successForgot ,message} = useSelector(state => state.userForgot);

  const responseGoogle = (response) => {
    dispatch(loginGoogle(response));
  }

  useEffect(() =>{
  function start() {
      gapi.auth2.init({client_id: '344262799523-2p7e0n0qu1desabj44knm8o8ic40bi3f.apps.googleusercontent.com'})
    }
    gapi.load('client:auth2', start)
    
    if(userInfo){
      history.push('/');
    }
  }, [userInfo, userInfoGG, history, dispatch])

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
          errorGG && (<Message variant="alert-danger">{errorGG}</Message>)
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
            loading || loadingGG ? 'Logging...' : 'Login'
          }</button>
          <GoogleLogin
            clientId="344262799523-2p7e0n0qu1desabj44knm8o8ic40bi3f.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
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
