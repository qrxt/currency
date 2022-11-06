import { combineReducers } from "redux";
import { symbolsSlice } from "./modules/symbols/slice";
import { conversionResultSlice } from "./modules/conversionResult/slice";

export const rootReducer = combineReducers({
  symbols: symbolsSlice.reducer,
  conversionResult: conversionResultSlice.reducer,
});
