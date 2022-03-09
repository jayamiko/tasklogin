import React, {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./App.scss";
import checkUser from "./config/auth";
import {setAuthToken} from "./config/api";
import PrivateRoutes from "./PrivateRoute/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
