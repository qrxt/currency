import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { formatDate, getNDaysAgo } from "lib/utils/dates";
import map from "lodash/map";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { TimeSeries } from "types/timeSeries";
import api from "./api";
import { timeSeriesSlice, GetTimeSeriesPayload } from "./slice";

export function* getCurrencyTimeSeries({
  // payload: { startDate, endDate, base, symbol },
  payload: { conversions },
}: PayloadAction<GetTimeSeriesPayload>) {
  try {
    const LAST_DAYS_NUMBER = 7;
    const today = new Date();
    const startDate = formatDate(getNDaysAgo(LAST_DAYS_NUMBER, today));
    const endDate = formatDate(today);

    const requests = map(conversions, ([base, symbol]) =>
      call(api.getCurrencyTimeSeries, startDate, endDate, base, symbol)
    );

    const responses: AxiosResponse<TimeSeries>[] = yield all(requests);

    const timeSeriesList = map(responses, (response) => response.data);

    yield put(timeSeriesSlice.actions.getTimeSeriesSuccess(timeSeriesList));
  } catch (error) {
    console.error("failed to get time series");

    yield put(timeSeriesSlice.actions.getTimeSeriesFailure());
  }
}

export const getCurrencyTimeSeriesSaga = takeLatest(
  timeSeriesSlice.actions.getTimeSeries,
  getCurrencyTimeSeries
);
