import { all, call, put } from "redux-saga/effects";
import { getCurrencyTimeSeries } from "@redux/modules/timeSeries/sagas";
import {
  GetTimeSeriesPayload,
  timeSeriesSlice,
} from "@redux/modules/timeSeries/slice";
import api from "@redux/modules/timeSeries/api";
import { createAxiosResponse } from "../helpers/api";
import { CurrencySymbol } from "types/currency";

describe("Time Series saga test", () => {
  const timeSeriesPayload: GetTimeSeriesPayload = {
    conversions: [["USD", "RUB"]],
  };

  const timeSeriesRequestParams = {
    startDate: "2022-11-07",
    endDate: "2022-11-14",
    base: "USD" as CurrencySymbol,
    symbol: "RUB" as CurrencySymbol,
  };

  test("getTimeSeries success", () => {
    const saga = getCurrencyTimeSeries(
      timeSeriesSlice.actions.getTimeSeries(timeSeriesPayload)
    );

    expect(saga.next().value).toEqual(
      all([
        call(
          api.getCurrencyTimeSeries,
          timeSeriesRequestParams.startDate,
          timeSeriesRequestParams.endDate,
          timeSeriesRequestParams.base,
          timeSeriesRequestParams.symbol
        ),
      ])
    );

    const responseData = {
      base: "USD" as CurrencySymbol,
      target: "RUB" as CurrencySymbol,
      rates: {
        "2022-11-14": {
          RUB: 60.016064,
        },
      },
    };

    const response = createAxiosResponse({
      data: responseData,
    });

    expect(saga.next([response]).value).toEqual(
      put(timeSeriesSlice.actions.getTimeSeriesSuccess([responseData]))
    );
    expect(saga.next().done).toBeTruthy();
  });

  test("getConversionResult failure", () => {
    const saga = getCurrencyTimeSeries(
      timeSeriesSlice.actions.getTimeSeries(timeSeriesPayload)
    );

    expect(saga.next().value).toEqual(
      all([
        call(
          api.getCurrencyTimeSeries,
          timeSeriesRequestParams.startDate,
          timeSeriesRequestParams.endDate,
          timeSeriesRequestParams.base,
          timeSeriesRequestParams.symbol
        ),
      ])
    );

    const errorMessage = "Failed to get time series";
    expect(saga.throw(errorMessage).value).toEqual(
      put(timeSeriesSlice.actions.getTimeSeriesFailure())
    );
    expect(saga.next().done).toBeTruthy();
  });
});
