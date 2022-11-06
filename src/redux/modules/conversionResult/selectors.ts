import { RootState } from "@redux/store";
import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state: RootState) => state.conversionResult;

export const selectConversionQuery = createSelector(
  selectSelf,
  (state) => state.result?.query
);
export const selectConversionResult = createSelector(
  selectSelf,
  (state) => state.result?.result
);
export const selectIsLoading = createSelector(
  selectSelf,
  (state) => state.isLoading
);
export const selectError = createSelector(
  selectSelf,
  (state) => state.isFailed
);
