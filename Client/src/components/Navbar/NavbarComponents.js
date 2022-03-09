import React from "react";
import {Nav, Navbar, Container} from "react-bootstrap";
import store from "../../store";

export default function NavbarComponents() {
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
        <Container>
          <Navbar.Brand href="#home">TaskLogin</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">About</Nav.Link>
            <Nav.Link href="#pricing">Category</Nav.Link>
            <Nav.Link href="/login" onClick={logoutSession}>
              <span style={{color: "red"}}>Logout</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
