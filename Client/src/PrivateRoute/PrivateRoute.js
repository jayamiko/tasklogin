import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

function PrivateRoutes({children}) {
  const currentState = useSelector((state) => state.auth);
  const isLogin = currentState.isLogin;
  return isLogin && currentState.isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoutes;
