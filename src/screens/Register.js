import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../Redux/Actions/UserAction";
import Header from "./../components/Header";
import Message from "../components/LoadingError/Error";
import Toast from './../components/LoadingError/Toast';
import { toast } from "react-toastify";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const Register = () => {
  window.scrollTo(0, 0);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  })
  const dispatch = useDispatch();
  const {name, email, phone, password} = data; 
  const {error, loading, success, message} = useSelector(state => state.userRegister);
  const handelChange = e =>{
    e.preventDefault();
    setData(prev =>{
      return {
        ...prev, [e.target.name]: e.target.value 
      }
    })

  }
  const handleSubmit = e =>{
    e.preventDefault();
    dispatch(register({...data}))
  }
  useEffect(() =>{
    if(success){
      toast.success("Your information has been received", ToastObjects);
    }
  }, [success, dispatch])
  return (
    <>
      <Toast/>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {
          error && (<Message>{error}</Message>)
        }
        { success ? (<Message variant="alert-success">{message}</Message>) : ''}
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit}>
          <input onChange={handelChange} name="name" value={name} type="text" placeholder="Username" required/>
          <input onChange={handelChange} name="email" type="email" value={email} placeholder="Email" required/>
          <input onChange={handelChange} name="phone" type="phone" value={phone} placeholder="Phone number" required/>
          <input onChange={handelChange} name="password" type="password" value={password} placeholder="Password" required />

          <button 
            className={success ? 'btn btn-secondary' :''}
            disabled={success ? true : false} 
            type="submit"
            >{ success ? "You're registered" : loading ? 'Loading...' : 'Register' }
          </button>
          <p>
            <Link to={"/login"}>
              I Have Account <strong>Login</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
