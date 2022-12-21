import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Header from "./../components/Header";
import Message from '../components/LoadingError/Error';
import Loading from './../components/LoadingError/Loading';
import { forgotPass, login, loginGoogle } from "../Redux/Actions/UserAction";
import { GoogleLogin } from 'react-google-login';
import {gapi} from 'gapi-script'

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
    dispatch(forgotPass(email))
  }
  const {userInfo, loading, error} = useSelector(state => state.userLogin);
  const {userInfo: userInfoGG , loading: loadingGG, error: errorGG} = useSelector(state => state.userLoginGoogle);
  const {loading: loadingForgot , error: errorForgot ,success: successForgot ,message} = useSelector(state => state.userForgot);

  const responseGoogle = (response) => {
    dispatch(loginGoogle(response));
  }

  useEffect(() =>{
  function start() {
      gapi.auth2.init({client_id: '212016326790-5p0pb3fh7m7jpccqa3b2mrm9gqaunq9a.apps.googleusercontent.com'})
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
            clientId="212016326790-5p0pb3fh7m7jpccqa3b2mrm9gqaunq9a.apps.googleusercontent.com"
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
