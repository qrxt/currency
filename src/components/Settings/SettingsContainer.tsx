import React, { useCallback, useEffect } from "react";
import Settings from "./Settings";
import { useDispatch, useSelector } from "@redux/hooks";
import {
  selectError,
  selectIsLoading,
  selectSymbols,
} from "@redux/modules/symbols/selectors";
import { symbolsSlice } from "@redux/modules/symbols/slice";
import { useToast } from "@chakra-ui/react";
import SettingsSkeleton from "./SettingsSkeleton";

function SettingsContainer() {
  const toast = useToast();
  const dispatch = useDispatch();
  const symbols = useSelector(selectSymbols);
  const isLoading = useSelector(selectIsLoading);
  const isFailed = useSelector(selectError);

  useEffect(() => {
    if (isFailed) {
      toast({
        title: "Failed to load symbols",
        status: "error",
        isClosable: true,
      });
    }
  }, [isFailed, toast]);

  const initFetch = useCallback(() => {
    dispatch(symbolsSlice.actions.getSymbols());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  return <Settings currencySymbols={symbols} />;
}

export default SettingsContainer;
