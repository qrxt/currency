import { RootState } from "@redux/store";
import { createSelector } from "@reduxjs/toolkit";
import isEqual from "lodash/isEqual";
import { initialSymbols } from "./slice";

const selectSelf = (state: RootState) => state.symbols;

export const selectSymbols = createSelector(selectSelf, (state) => state.list);
export const selectIsLoading = createSelector(
  selectSelf,
  (state) => state.isLoading
);
export const selectError = createSelector(
  selectSelf,
  (state) => state.isFailed
);
export const selectIsInitialSymbolsList = createSelector(selectSelf, (state) =>
  isEqual(state.list, initialSymbols)
);
