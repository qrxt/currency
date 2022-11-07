import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { ConversionResult } from "types/conversion";
import api from "./api";
import { conversionResultSlice, GetConversionResultPayload } from "./slice";

export function* getConversionResult({
  payload: { amount, from, to },
}: PayloadAction<GetConversionResultPayload>) {
  try {
    const response: AxiosResponse<ConversionResult> = yield call(
      api.getConversionResult,
      String(amount),
      from,
      to
    );
    const conversionResult = response.data;

    yield put(
      conversionResultSlice.actions.getConversionResultSuccess(conversionResult)
    );
  } catch (error) {
    const errorMessage = String(error) || "An unknown error occurred";
    console.error("failed to get symbols list: ", errorMessage);

    yield put(
      conversionResultSlice.actions.getConversionResultFailure(errorMessage)
    );
  }
}

export const getConversionResultSaga = takeLatest(
  conversionResultSlice.actions.getConversionResult,
  getConversionResult
);
