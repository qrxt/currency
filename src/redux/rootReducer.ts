import { combineReducers } from "redux";
import { symbolsSlice } from "./modules/symbols/slice";
import { conversionResultSlice } from "./modules/conversionResult/slice";
import { timeSeriesSlice } from "./modules/timeSeries/slice";

export const rootReducer = combineReducers({
  symbols: symbolsSlice.reducer,
  conversionResult: conversionResultSlice.reducer,
  timeSeries: timeSeriesSlice.reducer,
});
