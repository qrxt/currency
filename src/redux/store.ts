import { Store } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "@redux";
import rootSaga from "@redux/rootSaga";

export interface SagaStore extends Store {
  sagaTask: Task;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export function setupStore() {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({ thunk: false }),
      sagaMiddleware,
    ],
  }) as SagaStore;

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
}
