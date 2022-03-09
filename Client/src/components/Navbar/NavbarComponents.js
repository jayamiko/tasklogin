import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import store from "../../store";
import {useSelector} from "react-redux";
import "./NavbarComponent.scss";

export default function NavbarComponents() {
  const stateAuth = useSelector((state) => state.auth);
  const isLogin = stateAuth.isLogin;

  const logoutSession = () => {
    store.dispatch({
      type: "LOGOUT",
      isLogin: false,
      user: {
        userName: "",
        password: "",
      },
    });
    window.location.reload();
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Nav className="nav">
          <Navbar.Brand className="navbar-brand" href="#home">
            TaskLogin
          </Navbar.Brand>
          <div className="nav-item">
            {isLogin ? (
              <>
                <Nav.Link href="#home" className="home">
                  Home
                </Nav.Link>
                <Nav.Link href="#features">About</Nav.Link>
                <Nav.Link href="#pricing">Category</Nav.Link>
                <Nav.Link href="/" onClick={logoutSession}>
                  <span className="text-logout">Logout</span>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login" onClick={logoutSession}>
                  <span className="text-login">Login</span>
                </Nav.Link>
              </>
            )}
          </div>
        </Nav>
      </Navbar>
    </div>
  );
}
