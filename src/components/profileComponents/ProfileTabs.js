import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Redux/Actions/UserAction";
import Toast from "../LoadingError/Toast";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import renderToast from "../../util/Toast";

const ProfileTabs = () => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })
  const [ isStop , setIsStop ] = useState(false)
  const { username, email, password, passwordConfirm } = data;
  const handelChange = e => {
    e.preventDefault();
    setData(prev => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }
  const { loading, error, user } = useSelector(state => state.userDetails);
  const { loading: loadingUpdate} = useSelector(state => state.userUpdateProfile);
  const dispatch = useDispatch();


  const handleSubmit = e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      if(!isStop){
        renderToast('Password does not match','error', setIsStop, isStop)
        return;
      }
    }
    else{
      dispatch(updateUserProfile(data));
      if(!isStop){
        renderToast('Profile updated','success', setIsStop, isStop)
        setData({
          password: '',
          passwordConfirm: ''
        })
      }
    }
  }

  useEffect(() => {
    if (user) {
      setData({
        username: user.name || '',
        email: user.email || '',
        password: '',
        passwordConfirm: '',
      })
     
    }
  }, [dispatch, user])
  
  return (
    <>
      <Toast />
      {
        loading ? (<Loading/>) : error ? (<Message>{error}</Message>) : ''
      }
      {
        loadingUpdate && (<Loading/>)
      }
      <form className="row  form-container" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">UserName</label>
            <input onChange={handelChange} value={username} name="username" className="form-control" type="text" required />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-mail Address</label>
            <input onChange={handelChange} value={email} name="email" className="form-control" type="email" required/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">New Password</label>
            <input onChange={handelChange} name="password" value={password} className="form-control" type="password" required/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirm Password</label>
            <input onChange={handelChange} name="passwordConfirm" value={passwordConfirm} className="form-control" type="password" required />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
