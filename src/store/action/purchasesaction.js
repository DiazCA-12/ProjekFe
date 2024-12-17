import axios from "axios";
import { actionTypesPurchases } from "../actiontype";
const URL_API = process.env.REACT_APP_URL_API_PURCHASES;

export const getPurchases = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypesPurchases.GET_PURCHASES_REQUEST });
    try {
      const response = await axios.get(`${URL_API}/purchases`, {});

      dispatch({
        type: actionTypesPurchases.GET_PURCHASES_SUCCESS,
        payload: response.data.data,
      });
      console.log(response.data.data)
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      dispatch({
        type: actionTypesPurchases.GET_PURCHASES_FAILED,
        payload: errorMessage,
      });
    }
  };
};

export const createPurchases = (params) => {
    return async (dispatch) => {
      dispatch({ type: actionTypesPurchases.CREATE_PURCHASES_REQUEST });
      try {
        console.log("params",params)
        const response = await axios.post(`${URL_API}/`, params);
        const{status,data,message} = response.data
  
        dispatch({
          type: actionTypesPurchases.CREATE_PURCHASES_SUCCESS,
          payload: {status,data,message},
        });
        console.log(response.data.data)
      } catch (error) {
        const errorMessage = error.response?.data?.errors;
        dispatch({
          type: actionTypesPurchases.CREATE_PURCHASES_FAILED,
          payload: errorMessage,
        });
        console.log(errorMessage)
      }
    };
  };

  export const deletePurchases = (id) => {
    return async (dispatch) => {
      dispatch({ type: actionTypesPurchases.DELETE_PURCHASES_REQUEST });
      try {
        const response = await axios.delete(`${URL_API}/${id}`, {});
  
        dispatch({
          type: actionTypesPurchases.DELETE_PURCHASES_SUCCESS,
          payload: id,
        });
        
      } catch (error) {
        const errorMessage = error.response?.data?.errors;
        dispatch({
          type: actionTypesPurchases.DELETE_PURCHASES_FAILED,
          payload: errorMessage,
        });
      }
    };
  };