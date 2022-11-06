import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversionResult } from "types/conversion";

interface ConversionResultState {
  result: ConversionResult | null;
  isLoading: boolean;
  isFailed: boolean;
}

const initialState: ConversionResultState = {
  result: null,
  isLoading: false,
  isFailed: false,
};

export const conversionResultSlice = createSlice({
  name: "conversionResult",
  initialState,
  reducers: {
    getConversionResult(state) {
      state.isLoading = true;
      state.isFailed = false;
    },
    getConversionResultSuccess(state, action: PayloadAction<ConversionResult>) {
      state.result = action.payload;
      state.isLoading = false;
    },
    getConversionResultFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.result = null;
      state.isFailed = true;
    },
  },
});
