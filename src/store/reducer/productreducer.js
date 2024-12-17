import { actionTypesProduct } from "../actiontype";
const initialState = {
  product: [],
  status: null,
  message: "",
  loading: false,
  error: null,
};

export const getProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesProduct.GET_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case actionTypesProduct.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload
      };
    case actionTypesProduct.GET_PRODUCT_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypesProduct.CREATE_PRODUCT_REQUEST:
        return { ...state, loading: true };
      case actionTypesProduct.CREATE_PRODUCT_SUCCESS:
        return {
          ...state,
          product: action.payload.data
        };
      case actionTypesProduct.CREATE_PRODUCT_FAILED:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const updateProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypesProduct.UPDATE_PRODUCT_REQUEST:
        return { ...state, loading: true };
      case actionTypesProduct.UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          message: action.payload.message
        };
      case actionTypesProduct.UPDATE_PRODUCT_FAILED:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const deleteProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypesProduct.DELETE_PRODUCT_REQUEST:
        return { ...state, loading: true };
      case actionTypesProduct.DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          product: state.product.filter((item) => item.id !== action.payload),
        };
      case actionTypesProduct.DELETE_PRODUCT_FAILED:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };