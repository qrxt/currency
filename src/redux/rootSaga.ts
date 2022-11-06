import { all } from "redux-saga/effects";
import { getSymbolsSaga } from "./modules/symbols/sagas";

function* rootSaga() {
  yield all([getSymbolsSaga]);
}

export default rootSaga;
