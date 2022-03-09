import React, {useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {handleLogin} from "../../actions/auth";
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import "./Login.scss";

const Login = ({handleLogin, auth: {isLoading}}) => {
  const navigate = useNavigate();
  const [inputLogin, setInputLogin] = useState({
    userName: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setInputLogin((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    handleLogin(inputLogin.userName, inputLogin.password);
    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="text-center my-5">Login</h2>
      <Form onSubmit={handleSubmit} className="form-login">
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">User Name</Form.Label>
          <Form.Control
            name="userName"
            type="text"
            onChange={handleLoginChange}
            value={inputLogin.userName}
            id="userName"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            onChange={handleLoginChange}
            value={inputLogin.password}
            id="password"
            required
          />
        </Form.Group>
        <div class="d-flex flex-column gap-2 ">
          <Button
            className="text-white fw-bold"
            variant="warning"
            type="submit"
            required
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {handleLogin})(Login);
