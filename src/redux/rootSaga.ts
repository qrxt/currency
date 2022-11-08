import { all } from "redux-saga/effects";
import { getConversionResultSaga } from "./modules/conversionResult/sagas";
import { getSymbolsSaga } from "./modules/symbols/sagas";
import { getCurrencyTimeSeriesSaga } from "./modules/timeSeries/sagas";

function* rootSaga() {
  yield all([
    getSymbolsSaga,
    getConversionResultSaga,
    getCurrencyTimeSeriesSaga,
  ]);
}

export default rootSaga;
