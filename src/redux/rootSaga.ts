import { all } from "redux-saga/effects";
import { getConversionResultSaga } from "./modules/conversionResult/sagas";
import { getSymbolsSaga } from "./modules/symbols/sagas";

function* rootSaga() {
  yield all([getSymbolsSaga, getConversionResultSaga]);
}

export default rootSaga;
