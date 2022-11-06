import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Symbols } from "types/currency";

interface SymbolsState {
  list: Symbols;
  isLoading: boolean;
  isFailed: boolean;
}

export const initialSymbols = {
  USD: "United States Dollar",
  EUR: "Euro",
  RUB: "Russian Ruble",
};

const initialState: SymbolsState = {
  list: initialSymbols,
  isLoading: false,
  isFailed: false,
};

export const symbolsSlice = createSlice({
  name: "symbols",
  initialState,
  reducers: {
    getSymbols(state) {
      state.isLoading = true;
      state.isFailed = false;
    },
    getSymbolsSuccess(state, action: PayloadAction<Symbols>) {
      state.list = action.payload;
      state.isLoading = false;
    },
    getSymbolsFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.list = initialSymbols;
      state.isFailed = true;
    },
  },
});
