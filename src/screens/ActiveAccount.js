import React, { useEffect } from "react";
import Header from "../components/Header";
import Toast from "../components/LoadingError/Toast";
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmRegister } from "../Redux/Actions/UserAction";
import Message from "./../../src/components/LoadingError/Error";
import Loading from  "./../../src/components/LoadingError/Loading";
const ActiveAccount = ({match}) => {
  const token = match.params.token
  const history = useHistory()
  const dispatch = useDispatch()
  const confirmRegis = useSelector((state)=>state.userConfirmRegister)
  const {loading, error, success} = confirmRegis
  useEffect(()=>{
    if(!token){
      history.push("*")
    }
    else{
      dispatch(confirmRegister(token));
    }
  },[token, dispatch, history])
  return (
    <div >
      <Toast/>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        { loading ? (<Loading />) : error ? (<Message>{error}</Message>)
          : success ? (
          <div className="btn btn-success">Successful registration, You can login at <Link to="/login">here</Link></div>
        ) : 
        (<Message>WAITTING</Message>)}
      </div>

    </div>
  );
};

export default ActiveAccount;
