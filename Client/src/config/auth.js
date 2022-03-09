import {API} from "./api";
import store from "../store";

const checkUser = async () => {
  try {
    const response = await API.get("/check-auth");

    if (response.status !== 200) {
      return store.dispatch({
        type: "AUTH_ERROR",
      });
    }

    let payload = response.data.data.user;
    console.log(payload);

    payload.token = localStorage.token;

    store.dispatch({
      type: "AUTH_SUCCESS",
      payload,
    });
  } catch (error) {
    store.dispatch({
      type: "STOP_LOADING",
    });
  }
};

export default checkUser;
