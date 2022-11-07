import { useDispatch, useSelector } from "@redux/hooks";
import { symbolsSlice } from "@redux/modules/symbols/slice";
import { conversionResultSlice } from "@redux/modules/conversionResult/slice";
import React, { useCallback, useEffect, useState } from "react";
import {
  selectError,
  selectIsLoading,
  selectSymbols,
  selectIsInitialSymbolsList,
} from "@redux/modules/symbols/selectors";
import { useCookies } from "react-cookie";
import Converter from "./Converter";
import { size } from "lodash";
import { CurrencySymbol } from "types/currency";
import {
  selectConversionResult,
  selectIsLoading as selectConversionIsLoading,
} from "@redux/modules/conversionResult/selectors";
import ConverterSkeleton from "./ConverterSkeleton";

function ConverterContainer() {
  const dispatch = useDispatch();

  const symbols = useSelector(selectSymbols);
  const isSymbolsListLoading = useSelector(selectIsLoading);
  const isInitialSymbolsList = useSelector(selectIsInitialSymbolsList);

  const conversionResult = useSelector(selectConversionResult);
  const isConversionResultLoading = useSelector(selectConversionIsLoading);

  const fetchConversionResult = (
    amount: number,
    from: CurrencySymbol,
    to: CurrencySymbol
  ) => {
    dispatch(
      conversionResultSlice.actions.getConversionResult({ amount, from, to })
    );
  };

  const initFetch = useCallback(() => {
    if (isInitialSymbolsList && !isSymbolsListLoading) {
      dispatch(symbolsSlice.actions.getSymbols());
    }
  }, [dispatch, isInitialSymbolsList, isSymbolsListLoading]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    dispatch(conversionResultSlice.actions.setToInitialValues());
  }, [dispatch]);

  const isLoading = isSymbolsListLoading;
  if (isLoading) {
    return <ConverterSkeleton />;
  }

  return (
    <Converter
      symbols={symbols}
      fetchConversionResult={fetchConversionResult}
      conversionResult={conversionResult}
      isConversionResultLoading={isConversionResultLoading}
    />
  );
}

export default ConverterContainer;
