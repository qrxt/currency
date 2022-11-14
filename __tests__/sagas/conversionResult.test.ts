import { call, put } from "redux-saga/effects";
import { getConversionResult } from "@redux/modules/conversionResult/sagas";
import {
  conversionResultSlice,
  GetConversionResultPayload,
} from "@redux/modules/conversionResult/slice";
import api from "@redux/modules/conversionResult/api";
import { createAxiosResponse } from "../helpers/api";
import { ConversionResult } from "types/conversion";

describe("Conversion saga test", () => {
  const conversionPayload: GetConversionResultPayload = {
    amount: 10,
    from: "USD",
    to: "RUB",
  };

  test("getConversionResult success", () => {
    const saga = getConversionResult(
      conversionResultSlice.actions.getConversionResult(conversionPayload)
    );

    expect(saga.next().value).toEqual(
      call(
        api.getConversionResult,
        String(conversionPayload.amount),
        conversionPayload.from,
        conversionPayload.to
      )
    );

    const conversionResult: ConversionResult = {
      query: {
        from: "USD",
        to: "RUB",
      },
      result: 600,
    };

    const response = createAxiosResponse({
      data: conversionResult,
    });

    expect(saga.next(response).value).toEqual(
      put(
        conversionResultSlice.actions.getConversionResultSuccess(
          conversionResult
        )
      )
    );
    expect(saga.next().done).toBeTruthy();
  });

  test("getConversionResult failure", () => {
    const saga = getConversionResult(
      conversionResultSlice.actions.getConversionResult(conversionPayload)
    );

    expect(saga.next().value).toEqual(
      call(
        api.getConversionResult,
        String(conversionPayload.amount),
        conversionPayload.from,
        conversionPayload.to
      )
    );

    const errorMessage = "Failed to get conversion result";
    expect(saga.throw(errorMessage).value).toEqual(
      put(conversionResultSlice.actions.getConversionResultFailure())
    );
    expect(saga.next().done).toBeTruthy();
  });
});
