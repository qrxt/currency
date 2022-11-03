import React from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import Section from "components/Section";
import { useCookies } from "react-cookie";
import { SubmitHandler, useController, useForm } from "react-hook-form";
import { OptionBase, GroupBase, Select } from "chakra-react-select";
import { find } from "lodash";

const currencies = [
  { value: "eur", label: "EUR" },
  { value: "usd", label: "USD" },
  { value: "rub", label: "RUB" },
];

interface CurrencyOption extends OptionBase {
  value: string;
  label: string;
}

interface IFormInput {
  baseCurrency: CurrencyOption;
}

function SettingsPage() {
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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
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
    ? find(currencies, (currency) => currency.value === value.value)
    : find(currencies, (currency) => currency.value === baseCurrency);

  return (
    <Box>
      <Section py={6}>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="baseCurrency">Base currency</FormLabel>
            <FormControl>
              <Box mb={3} w={["100%", "100%", "100%", "50%"]}>
                <Select<CurrencyOption, true, GroupBase<CurrencyOption>>
                  colorScheme="purple"
                  placeholder="Select base currency..."
                  ref={ref}
                  onChange={onChange}
                  onBlur={onBlur}
                  options={currencies}
                  value={initialOption}
                />
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
    </Box>
  );
}

export default SettingsPage;
