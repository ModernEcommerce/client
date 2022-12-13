import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route} from "react-router-dom";
function PrivateRouter({component: Component, ...rest}) {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <Route
      {...rest}
      component={() => {
        if (userInfo) {
          return <Component />;
        } else {
          return <Redirect to={`/login`} />;
        }
      }}
    />
  );
}

export default PrivateRouter; 
