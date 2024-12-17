import { actionTypesPurchases } from "../actiontype";
const initialState = {
  purchases: [],
  status: null,
  message: "",
  loading: false,
  error: null,
};

export const getPurchasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesPurchases.GET_PURCHASES_REQUEST:
      return { ...state, loading: true };
    case actionTypesPurchases.GET_PURCHASES_SUCCESS:
      return {
        ...state,
        purchases: action.payload
      };
    case actionTypesPurchases.GET_PURCHASES_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createPurchasesReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypesPurchases.CREATE_PURCHASES_REQUEST:
        return { ...state, loading: true };
      case actionTypesPurchases.CREATE_PURCHASES_SUCCESS:
        return {
          ...state,
          purchases: action.payload.data
        };
      case actionTypesPurchases.CREATE_PURCHASES_FAILED:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  


  export const deletePurchasesReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypesPurchases.DELETE_PURCHASES_REQUEST:
        return { ...state, loading: true };
      case actionTypesPurchases.DELETE_PURCHASES_SUCCESS:
        return {
          ...state,
          purchases: state.purchases.filter((item) => item.id !== action.payload),
        };
      case actionTypesPurchases.DELETE_PURCHASES_FAILED:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };