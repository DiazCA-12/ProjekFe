import { combineReducers } from "redux";
import { authReducer } from "./userreducer";
import { getProductReducer,createProductReducer,deleteProductReducer,updateProductReducer } from "./productreducer";
import { getPurchasesReducer,createPurchasesReducer,deletePurchasesReducer } from "./purchasesreducer";

const rootReducer = combineReducers({
  authReducer,
  getProductReducer,
  createProductReducer,
  updateProductReducer,
  deleteProductReducer,
  getPurchasesReducer,
  createPurchasesReducer,
  deletePurchasesReducer,
});

export default rootReducer;
