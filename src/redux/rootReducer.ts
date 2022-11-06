import { combineReducers } from "redux";
import { symbolsSlice } from "./modules/symbols/slice";

export const rootReducer = combineReducers({
  symbols: symbolsSlice.reducer,
});
