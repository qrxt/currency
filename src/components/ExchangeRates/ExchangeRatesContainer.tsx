import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "@redux/hooks";
import {
  selectError,
  selectTimeSeries,
} from "@redux/modules/timeSeries/selectors";
import { timeSeriesSlice } from "@redux/modules/timeSeries/slice";
import { t } from "i18next";
import useConfig from "lib/hooks/useConfig";
import { includes, isEmpty, size, without, zip } from "lodash";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Conversion } from "types/conversion";
import { CurrencySymbol } from "types/currency";
import ExchangeRates from "./ExchangeRates";
import ExchangeRatesSkeleton from "./ExchangeRatesSkeleton";

function useCurrenciesToConvert(baseCurrency: CurrencySymbol): Conversion[] {
  const { config } = useConfig();
  const priorityCurrencies = config.currencies
    .priorityCurrencies as CurrencySymbol[];

  const filteredCurrencies = includes(priorityCurrencies, baseCurrency)
    ? without(priorityCurrencies, baseCurrency)
    : without(priorityCurrencies, "RUB");

  const conversions = zip(
    Array(size(filteredCurrencies)).fill(baseCurrency),
    filteredCurrencies
  );
  return conversions;
}

function ExchangeRatesContainer() {
  const dispatch = useDispatch();
  const toast = useToast();
  const [baseCurrencyCookie, setBaseCurrencyCookie] = useCookies([
    "base-currency",
  ]);
  const baseCurrency = baseCurrencyCookie["base-currency"] as CurrencySymbol;
  const conversions = useCurrenciesToConvert(baseCurrency);
  const timeSeries = useSelector(selectTimeSeries);
  const isTimeSeriesLoadFailed = useSelector(selectError);

  useEffect(() => {
    if (baseCurrency) {
      dispatch(timeSeriesSlice.actions.getTimeSeries({ conversions }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, baseCurrency]);

  useEffect(() => {
    if (isTimeSeriesLoadFailed) {
      toast({
        title: t("timeSeries.toast.error"),
        status: "error",
        isClosable: true,
      });
    }
  }, [isTimeSeriesLoadFailed, toast]);

  useEffect(() => {
    // TODO: determine by location / lang
    if (isEmpty(baseCurrencyCookie)) {
      setBaseCurrencyCookie("base-currency", "USD");
    }
  }, [baseCurrencyCookie, setBaseCurrencyCookie]);

  if (!timeSeries) {
    return <ExchangeRatesSkeleton />;
  }

  return <ExchangeRates series={timeSeries} baseCurrency={baseCurrency} />;
}

export default ExchangeRatesContainer;
