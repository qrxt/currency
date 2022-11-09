import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversion } from "types/conversion";
import { TimeSeries } from "types/timeSeries";

interface TimeSeriesState {
  result: TimeSeries[] | null;
  isLoading: boolean;
  isFailed: boolean;
}

export interface GetTimeSeriesPayload {
  conversions: Conversion[];
}

const initialState: TimeSeriesState = {
  result: null,
  isLoading: false,
  isFailed: false,
};

export const timeSeriesSlice = createSlice({
  name: "timeSeries",
  initialState,
  reducers: {
    getTimeSeries(state, _action: PayloadAction<GetTimeSeriesPayload>) {
      state.isLoading = true;
      state.isFailed = false;
      state.result = null;
    },
    getTimeSeriesSuccess(state, action: PayloadAction<TimeSeries[]>) {
      state.result = action.payload;
      state.isLoading = false;
    },
    getTimeSeriesFailure(state) {
      state.isLoading = false;
      state.result = null;
      state.isFailed = true;
    },
  },
});
