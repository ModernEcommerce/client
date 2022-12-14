import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./../components/Header";
import Message from "../components/LoadingError/Error";
import Toast from './../components/LoadingError/Toast';
import { toast } from "react-toastify";
import { confirmForgot } from "../Redux/Actions/UserAction";
import Loading from './../components/LoadingError/Loading';
import { useHistory } from 'react-router-dom';
import { USER_CONFIRM_FORGOT_RESET } from "../Redux/Constants/UserConstant";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const ResetPassword = ({match}) => {
  const token = match.params.token
  const history = useHistory()
  const dispatch = useDispatch();
  const [data, setData] = useState({
    password: '',
    passwordagain: '',
    token
  })
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
    if (data.password !== data.passwordagain) {
      toast.error('Password does not match', ToastObjects);
      return;
    }else{
      dispatch(confirmForgot({...data}))
    }
  }

  const {loading, error, success, message} = useSelector((state)=>state.userConfirmForgot)
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
          loading ? (<Loading/>) : error ? (<Message>{error}</Message>) :
          success ? (<Message variant="alert-success">{message}</Message>) : ''
        }
        <form className="Login col-md-8 col-lg-4 col-11" onSubmit={handleSubmit}>
          <input 
            onChange={handelChange} 
            name="password" 
            value={success && ''}
            type="password" 
            placeholder="New password" 
            autoComplete="off"
            disabled={success ? true : false}
            required/>
          <input 
            onChange={handelChange} 
            name="passwordagain" 
            value={success && ''}
            type="password" 
            placeholder="Confirm new password" 
            autoComplete="off"
            disabled={success ? true : false}
            required />
          { success ? (<button 
                        className="btn btn-primary" 
                        onClick={(e)=>{
                            e.preventDefault(); 
                            history.push('/login');
                            setData({
                                password: '',
                                passwordagain: '',
                            })
                            dispatch({type: USER_CONFIRM_FORGOT_RESET})
                        }}>LOGIN</button>) 
            : 
            (<button type="submit">SUBMIT</button>)}
        </form>
      </div>
    </>
  );
};

export default ResetPassword;
