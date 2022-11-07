import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConversionResult } from "types/conversion";
import { CurrencySymbol } from "types/currency";

interface ConversionResultState {
  result: ConversionResult | null;
  isLoading: boolean;
  isFailed: boolean;
}

export interface GetConversionResultPayload {
  amount: number;
  from: CurrencySymbol;
  to: CurrencySymbol;
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
    setToInitialValues(state) {
      state.result = null;
    },
    getConversionResult(
      state,
      _action: PayloadAction<GetConversionResultPayload>
    ) {
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
