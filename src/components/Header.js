import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch ,useSelector } from "react-redux";
import { changeTheme } from '../Redux/Actions/ThemeAction'
import { getUserDetails, logout } from "../Redux/Actions/UserAction";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import debounce from "lodash.debounce";
import { USER_FORGOT_RESET, USER_REGISTER_RESET } from "../Redux/Constants/UserConstant";
import { listCategory } from './../Redux/Actions/CategoryAction';
const Header = () => {
  const MyVerticallyCenteredModal = (props) =>{
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Log out
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to log out ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{
            dispatch(logout())
            history.push('/')
          }}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = useState(false);
  const [keyword, setKeyword] = useState()
  const dispatch = useDispatch();
  const history  = useHistory();

  const data = useSelector((state)=> state.theme)
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.userLogin);
  const { categories } = useSelector(state => state.categoryList);
  const {user} = useSelector(state => state.userDetails);
  
  const handleLogout = e =>{
    e.preventDefault()
    setModalShow(true)
  }

  const handleChangeTheme = (e) =>{
    e.preventDefault();
    dispatch(changeTheme(data.theme === 'light' ? 'dark' : 'light'))
    var element = document.getElementById("radio-inner");
    element.classList.toggle("active");
  }

  const callApiKeywordSearch = (keyword) =>{
    if( keyword.trim() !== ''){
      history.push(`/search/${keyword.trim()}`);
    }
    else{
      history.push('/');
    }
  }
  const debounceDropDown = useRef(debounce((keyword) => callApiKeywordSearch(keyword) , 300)).current;

  const handleSubmitSearch = e =>{
    setKeyword(e.target.value)
    debounceDropDown(e.target.value);
  }
  useEffect(()=>{
    dispatch(listCategory())
    dispatch(getUserDetails())
  }, [dispatch])
  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>{userInfo ? userInfo.phone : ''}</p>
              <p>{userInfo ? userInfo.email : ''}</p>
              {/* <ul class="lv1">
              {categories?.map((item, index)=>(
                  <li key={index}>{item.name}</li>
                ))}
              </ul> */}
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
              <div className="radio-btn" onClick={handleChangeTheme}>
                <div id="radio-inner"></div>
              </div>
              </Link>
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.png" />	
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {
                    userInfo && (
                      <div className="btn-group">
                        <button
                          type="button"
                          className="name-button dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fas fa-user"></i>
                        </button>
                        <div className="dropdown-menu">
                          <Link className="dropdown-item" to="/profile">
                            Profile
                          </Link>

                          <Link className="dropdown-item" to="#" onClick={handleLogout}>
                            Logout
                          </Link>
                        </div>
                      </div>
                    )

                  }
                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{
                      cartItems.length
                    }</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={handleSubmitSearch} className="input-group">
                    <input
                      type="search"
                      // value={keyword}
                      className="form-control rounded search"
                      placeholder="Search"
                      value={keyword}
                      onChange={handleSubmitSearch}
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={handleSubmitSearch} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                    value={keyword}
                    onChange={handleSubmitSearch}
                  />
                  <button type="submit" className="search-button">
                    search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {
                  userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Hi, {user?.name}
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>

                        <Link className="dropdown-item" to="#" onClick={(e)=>handleLogout(e)}>
                          Logout
                        </Link>
                        <MyVerticallyCenteredModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </div>
                    </div>
                  )
                    :
                    (
                      < >
                      
                          <Link to ="#">
                            <div onClick={(e)=>{
                              e.preventDefault()
                              dispatch({type: USER_FORGOT_RESET})
                              history.push('/login')
                            }}>
                              Login
                            </div>
                          </Link>
                          <Link to ="#">
                            <div onClick={(e)=>{
                              e.preventDefault()
                              dispatch({type: USER_REGISTER_RESET})
                              history.push('/register')
                            }}>
                              Register
                            </div>
                          </Link>

                        
                      </>
                    )
                }

                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{
                    cartItems.length > 0 && cartItems.length
                  }</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
