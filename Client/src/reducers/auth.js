const initialValue = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  isLogin: false,
  user: {},
};

const authReducer = (state = initialValue, action) => {
  const {type, payload} = action;

  switch (type) {
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };
    case "AUTH_SUCCESS":
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);

      return {
        isLoading: false,
        isLogin: true,
        isAuthenticated: true,
        user: payload,
        error: {},
      };
    case "REGISTER_FAIL":
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLoading: false,
        isLogin: false,
        isAuthenticated: false,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;
