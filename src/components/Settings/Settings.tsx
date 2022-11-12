import React, { ChangeEvent, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  useToast,
  Select,
} from "@chakra-ui/react";
import Section from "components/Section";
import { useCookies } from "react-cookie";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import {
  OptionBase,
  GroupBase,
  Select as SelectWithSearch,
} from "chakra-react-select";
import { find, keys, map, upperCase } from "lodash";
import { Symbols } from "types/currency";
import { initialSymbols } from "@redux/modules/symbols/slice";
import { useTranslation } from "react-i18next";

interface CurrencyOption extends OptionBase {
  value: string;
  label: string;
}
interface IFormInput {
  baseCurrency: CurrencyOption;
  language: string;
}

interface SettingsProps {
  currencySymbols: Symbols;
}

const initialCurrencies = map(keys(initialSymbols), (symbol) => ({
  value: symbol,
  label: symbol,
}));

function Settings({ currencySymbols }: SettingsProps) {
  const currencyOptions: CurrencyOption[] = map(
    keys(currencySymbols),
    (currencySymbol) => ({
      value: currencySymbol,
      label: upperCase(currencySymbol),
    })
  );
  const [showAll, setShowAll] = useState(false);
  const toast = useToast();
  const { t, i18n } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IFormInput>();
  const [baseCurrencyCookie, setBaseCurrencyCookie] = useCookies([
    "base-currency",
  ]);
  const baseCurrency = baseCurrencyCookie["base-currency"];

  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name: "baseCurrency",
    control,
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { baseCurrency, language } = data;

    if (baseCurrency) {
      setBaseCurrencyCookie("base-currency", baseCurrency.value);
      toast({
        title: t("baseCurrency.toast.success.title"),
        description: t("baseCurrency.toast.success.description", {
          currency: baseCurrency.label,
        }),
        status: "success",
        isClosable: true,
      });
    }

    if (language) {
      i18n.changeLanguage(language);
    }
  };

  const initialOption = value
    ? find(currencyOptions, (currency) => currency.value === value.value)
    : find(currencyOptions, (currency) => currency.value === baseCurrency);

  function handleShowAllCheckbox(e: ChangeEvent<HTMLInputElement>) {
    setShowAll(e.target.checked);
  }

  return (
    <Section py={6} data-testid="settings-wrapper">
      <Box>
        <form onSubmit={handleSubmit(onSubmit)} data-testid="settings-form">
          <FormLabel
            htmlFor="baseCurrency"
            data-testid="settings-form-baseCurrency-label"
          >
            {t("settings.form.fields.baseCurrency.label")}
          </FormLabel>
          <FormControl>
            <Box mb={3} w={["100%", "100%", "100%", "50%"]}>
              <Flex justifyContent="space-between">
                <Box w="65%">
                  <SelectWithSearch<
                    CurrencyOption,
                    true,
                    GroupBase<CurrencyOption>
                  >
                    aria-label="baseCurrency-select"
                    colorScheme="purple"
                    placeholder={t(
                      "settings.form.fields.baseCurrency.placeholder"
                    )}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={showAll ? currencyOptions : initialCurrencies}
                    value={initialOption}
                    data-testid="settings-form-baseCurrency-select"
                    inputId="baseCurrency"
                  />
                </Box>

                <Checkbox
                  colorScheme="purple"
                  onChange={handleShowAllCheckbox}
                  data-testid="settings-form-baseCurrency-showAll"
                >
                  {t("settings.form.fields.baseCurrency.showAll")}
                </Checkbox>
              </Flex>
            </Box>

            <Alert
              status="info"
              mb={6}
              colorScheme="purple"
              borderRadius="md"
              w={["100%", "100%", "100%", "50%"]}
              data-testid="settings-form-baseCurrency-hint"
            >
              <AlertIcon />
              {t("settings.form.fields.baseCurrency.hint")}
            </Alert>
          </FormControl>

          <FormLabel
            htmlFor="language"
            data-testid="settings-form-language-label"
          >
            {t("settings.form.fields.language.label")}
          </FormLabel>
          <FormControl mb={6}>
            <Box mb={3} w={["100%", "100%", "100%", "50%"]}>
              <Flex justifyContent="space-between">
                <Box w="65%">
                  <Select
                    colorScheme="purple"
                    defaultValue={i18n.language || ""}
                    id="language"
                    data-testid="settings-form-language-select"
                    {...register("language")}
                  >
                    <option
                      hidden
                      disabled
                      value=""
                      data-testid={"settings-form-language-select-option"}
                    >
                      {t("settings.form.fields.language.placeholder")}
                    </option>
                    <option
                      value="en"
                      data-testid={"settings-form-language-select-option"}
                    >
                      {t("common.languages.en")}
                    </option>
                    <option
                      value="ru"
                      data-testid={"settings-form-language-select-option"}
                    >
                      {t("common.languages.ru")}
                    </option>
                  </Select>
                </Box>
              </Flex>
            </Box>
          </FormControl>

          <Button
            type="submit"
            disabled={!isDirty}
            data-testid="settings-form-submit"
          >
            {t("common.form.submit")}
          </Button>
        </form>
      </Box>
    </Section>
  );
}

export default Settings;
