import axios from "axios";
import { actionTypesProduct } from "../actiontype";
const URL_API = process.env.REACT_APP_URL_API_PRODUCT;

export const getProduct = () => {
  return async (dispatch) => {
    dispatch({ type: actionTypesProduct.GET_PRODUCT_REQUEST });
    try {
      const response = await axios.get(`${URL_API}/product`, {});

      dispatch({
        type: actionTypesProduct.GET_PRODUCT_SUCCESS,
        payload: response.data.data,
      });
      console.log(response.data.data)
    } catch (error) {
      const errorMessage = error.response?.data?.errors;
      dispatch({
        type: actionTypesProduct.GET_PRODUCT_FAILED,
        payload: errorMessage,
      });
    }
  };
};

export const createProduct = (params) => {
    return async (dispatch) => {
      dispatch({ type: actionTypesProduct.CREATE_PRODUCT_REQUEST });
      try {
        
        const response = await axios.post(`${URL_API}/`, params);
        
        const{status,data,message} = response.data
  
        dispatch({
          type: actionTypesProduct.CREATE_PRODUCT_SUCCESS,
          payload: {status,data,message},
        });
        console.log(response.data.data)
      } catch (error) {
        const errorMessage = error.response?.data?.errors;
        dispatch({
          type: actionTypesProduct.CREATE_PRODUCT_FAILED,
          payload: errorMessage,
        });
        console.log(errorMessage)
      }
    };
  };

  export const updateProduct = (params) => {
    return async (dispatch) => {
      dispatch({ type: actionTypesProduct.UPDATE_PRODUCT_REQUEST });
      try {
        const { id, ...productData } = params; 
        const response = await axios.put(`${URL_API}/${id}`,productData);
  
        dispatch({
          type: actionTypesProduct.UPDATE_PRODUCT_SUCCESS,
          payload: response.data.message,
        });
        console.log(response.data.message)
      } catch (error) {
        const errorMessage = error.response?.data?.errors;
        console.log(errorMessage)
        dispatch({
          type: actionTypesProduct.UPDATE_PRODUCT_FAILED,
          payload: errorMessage,
        });
      }
    };
  };

  export const deleteProduct = (id) => {
    return async (dispatch) => {
      dispatch({ type: actionTypesProduct.DELETE_PRODUCT_REQUEST });
      try {
        const response = await axios.delete(`${URL_API}/${id}`, {});
  
        dispatch({
          type: actionTypesProduct.DELETE_PRODUCT_SUCCESS,
          payload: id,
        });
        
      } catch (error) {
        const errorMessage = error.response?.data?.errors;
        dispatch({
          type: actionTypesProduct.DELETE_PRODUCT_FAILED,
          payload: errorMessage,
        });
      }
    };
  };