import axios  from "axios";
import { actionTypes } from "../actiontype";
const URL_API = process.env.REACT_APP_URL_API_USER

export const login = (email, password) => {
    return async (dispatch) => {
      dispatch({ type: actionTypes.LOGIN_REQUEST });
      try {
        const response = await axios.post(`${URL_API}/login`,{
            email,password
        })
        const {status, message, token } = response.data;
        localStorage.setItem("token", token);
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: { status, token, message },
        });
        return { success: true, message };
      } catch (error) {
        const errorMessage = error.response?.data?.errors;
        dispatch({
          type: actionTypes.LOGIN_FAILED,
          payload: errorMessage,
        });
        return { success: false, message: errorMessage };
      }
    };
  };