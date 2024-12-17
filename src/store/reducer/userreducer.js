import { actionTypes } from "../actiontype";
const initialState = {
    isAuthenticated:false,
    user:null,
    status: null,
    message: "",
    token: "",
    loading: false,
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.LOGIN_REQUEST:
        return { ...state, loading: true };
      case actionTypes.LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          token: action.payload.token,
          status: action.payload.status,
          message: action.payload.message,
          isAuthenticated:true,
        };
      case actionTypes.LOGIN_FAILED:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };