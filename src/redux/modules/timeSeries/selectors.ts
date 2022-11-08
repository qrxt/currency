import { RootState } from "@redux/store";
import { createSelector } from "@reduxjs/toolkit";

const selectSelf = (state: RootState) => state.timeSeries;

export const selectTimeSeries = createSelector(
  selectSelf,
  (state) => state.result
);
export const selectIsLoading = createSelector(
  selectSelf,
  (state) => state.isLoading
);
export const selectError = createSelector(
  selectSelf,
  (state) => state.isFailed
);
