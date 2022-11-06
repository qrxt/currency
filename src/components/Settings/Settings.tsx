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
} from "@chakra-ui/react";
import Section from "components/Section";
import { useCookies } from "react-cookie";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { OptionBase, GroupBase, Select } from "chakra-react-select";
import { find, keys, map, upperCase } from "lodash";
import { Symbols } from "types/currency";
import { initialSymbols } from "@redux/modules/symbols/slice";

interface CurrencyOption extends OptionBase {
  value: string;
  label: string;
}

interface IFormInput {
  baseCurrency: CurrencyOption;
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
  const {
    control,
    handleSubmit,
    reset,
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

  const onSubmit: SubmitHandler<IFormInput> = (data, e) => {
    e?.preventDefault();
    const { baseCurrency } = data;

    setBaseCurrencyCookie("base-currency", baseCurrency.value);

    reset();
    toast({
      title: "Base currency changed",
      description: `New base currency is ${baseCurrency.label}`,
      status: "success",
      isClosable: true,
    });
  };

  const initialOption = value
    ? find(currencyOptions, (currency) => currency.value === value.value)
    : find(currencyOptions, (currency) => currency.value === baseCurrency);

  function handleShowAllCheckbox(e: ChangeEvent<HTMLInputElement>) {
    setShowAll(e.target.checked);
  }

  return (
    <Section py={6}>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel htmlFor="baseCurrency">Base currency</FormLabel>
          <FormControl>
            <Box mb={3} w={["100%", "100%", "100%", "50%"]}>
              <Flex justifyContent="space-between">
                <Box w="65%">
                  <Select<CurrencyOption, true, GroupBase<CurrencyOption>>
                    colorScheme="purple"
                    placeholder="Select base currency..."
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={showAll ? currencyOptions : initialCurrencies}
                    value={initialOption}
                  />
                </Box>

                <Checkbox colorScheme="purple" onChange={handleShowAllCheckbox}>
                  Show all
                </Checkbox>
              </Flex>
            </Box>

            <Alert
              status="info"
              mb={6}
              colorScheme="purple"
              borderRadius="md"
              w={["100%", "100%", "100%", "50%"]}
            >
              <AlertIcon />
              Currency against which conversions will be made
            </Alert>
          </FormControl>

          <Button type="submit" disabled={!isDirty}>
            Submit
          </Button>
        </form>
      </Box>
    </Section>
  );
}

export default Settings;
