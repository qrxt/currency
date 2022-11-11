import React, { useCallback, useEffect } from "react";
import Settings from "./Settings";
import { useDispatch, useSelector } from "@redux/hooks";
import {
  selectError,
  selectIsInitialSymbolsList,
  selectIsLoading,
  selectSymbols,
} from "@redux/modules/symbols/selectors";
import { symbolsSlice } from "@redux/modules/symbols/slice";
import { useToast } from "@chakra-ui/react";
import SettingsSkeleton from "./SettingsSkeleton";
import { useTranslation } from "react-i18next";

function SettingsContainer() {
  const toast = useToast();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const symbols = useSelector(selectSymbols);
  const isLoading = useSelector(selectIsLoading);
  const isFailed = useSelector(selectError);
  const isInitialSymbolsList = useSelector(selectIsInitialSymbolsList);

  useEffect(() => {
    if (isFailed) {
      toast({
        title: t("currencySymbols.toast.error"),
        status: "error",
        isClosable: true,
      });
    }
  }, [isFailed, t, toast]);

  const initFetch = useCallback(() => {
    if (isInitialSymbolsList) {
      dispatch(symbolsSlice.actions.getSymbols());
    }
  }, [dispatch, isInitialSymbolsList]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  return <Settings currencySymbols={symbols} />;
}

export default SettingsContainer;
