import {API, setAuthToken} from "../config/api";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";

export const checkUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await API.get("/check-auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data.data.user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const handleRegister =
  ({authGoogle}, token) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      setAuthToken(token);
    }

    const body = JSON.stringify({
      ...authGoogle,
    });

    try {
      const response = await API.post("/register", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data.user,
      });
    } catch (error) {
      console.log({error});
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const handleLogin = (userName, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({userName, password});

  try {
    const response = await API.post("/login", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.user,
    });
  } catch (err) {
    console.log({err});
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
