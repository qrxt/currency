import { useDispatch, useSelector } from "@redux/hooks";
import { symbolsSlice } from "@redux/modules/symbols/slice";
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

function ConverterContainer() {
  const dispatch = useDispatch();
  const symbols = useSelector(selectSymbols);
  const isSymbolsListLoading = useSelector(selectIsLoading);
  const isInitialSymbolsList = useSelector(selectIsInitialSymbolsList);
  // const isFailed = useSelector(selectError);

  // const [baseCurrencyCookie] = useCookies(["base-currency"]);
  // const baseCurrency = baseCurrencyCookie["base-currency"];

  const initFetch = useCallback(() => {
    if (isInitialSymbolsList && !isSymbolsListLoading) {
      dispatch(symbolsSlice.actions.getSymbols());
    }
  }, [dispatch, isInitialSymbolsList, isSymbolsListLoading]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const isLoading = isSymbolsListLoading;

  if (isLoading) {
    // TODO: skeleton
    return <p>loading...</p>;
  }

  return <Converter symbols={symbols} />;
}

export default ConverterContainer;
