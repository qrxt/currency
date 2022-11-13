import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  IconButton,
  NumberInput,
  NumberInputField,
  Spinner,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import Section from "components/Section";
import { AiOutlineSwap as IconSwap } from "react-icons/ai";
import { GroupBase, Select, SingleValue } from "chakra-react-select";
import { CurrencySymbol, Symbols } from "types/currency";
import { SubmitHandler, useForm } from "react-hook-form";
import { CurrencyOption, useConverter, useCurrencyOptions } from "./hooks";
import { useTranslation } from "react-i18next";
interface ConverterProps {
  symbols: Symbols;
  fetchConversionResult: (
    amount: number,
    from: CurrencySymbol,
    to: CurrencySymbol
  ) => void;
  conversionResult?: number;
  isConversionResultLoading: boolean;
}

interface IFormInput {
  amount: number;
}

enum CurrencySelectSubtype {
  From,
  To,
}

function Converter(props: ConverterProps) {
  const {
    symbols,
    fetchConversionResult,
    conversionResult,
    isConversionResultLoading,
  } = props;
  const { t } = useTranslation();
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState<CurrencySymbol | null>(null);
  const [to, setTo] = useState<CurrencySymbol | null>(null);
  const currencyOptions = useCurrencyOptions(symbols);
  const { register, handleSubmit } = useForm<IFormInput>();
  const isSubmitButtonDisabled = !from || !to;
  const isSwapButtonDisabled = isSubmitButtonDisabled;
  const { fromOptions, toOptions, fromValue, toValue } = useConverter({
    from,
    to,
    currencyOptions,
  });

  function toggleSwapCurrencies() {
    const currentFrom = from;
    setFrom(to);
    setTo(currentFrom);

    if (conversionResult && from && to) {
      fetchConversionResult(Number(amount), from, to);
    }
  }

  function handleChangeCurrency(subtype: CurrencySelectSubtype) {
    const subtypeToSetState = {
      [CurrencySelectSubtype.From]: setFrom,
      [CurrencySelectSubtype.To]: setTo,
    };

    return (option: SingleValue<CurrencyOption>) => {
      if (conversionResult && from && to) {
        fetchConversionResult(Number(amount), from, to);
      }

      if (option) {
        subtypeToSetState[subtype](option.value as CurrencySymbol);
      }
    };
  }

  const onSubmit: SubmitHandler<IFormInput> = ({ amount }) => {
    if (from && to) {
      fetchConversionResult(Number(amount), from, to);
    }
  };

  function renderForm() {
    return (
      <form onSubmit={handleSubmit(onSubmit)} data-testid="converter-form">
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box mb={3} pt={70}>
            <Flex mb={3} justifyContent="center">
              <Box w={[200, 200, 300, 300]}>
                <VisuallyHidden>
                  <FormLabel htmlFor="currency-amount">
                    {t("converter.form.fields.amount.placeholder")}
                  </FormLabel>
                </VisuallyHidden>
                <NumberInput id="currency-amount">
                  <NumberInputField
                    textAlign="center"
                    fontSize={["1.2em", "1.2em", "1.6em", "1.6em"]}
                    placeholder={t("converter.form.fields.amount.placeholder")}
                    data-testid="converter-form-amount-field"
                    fontWeight="medium"
                    py={6}
                    {...register("amount", {
                      required: true,
                      onChange: (e) => setAmount(e.target.value),
                    })}
                  />
                </NumberInput>
              </Box>
            </Flex>

            <Box mb={3}>
              <Flex
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
                flexDirection={["column", "column", "row", "row"]}
              >
                <Box w={["100%", "100%", 75, 75]} mr={3}>
                  <VisuallyHidden>
                    <FormLabel htmlFor="currencyFrom">
                      {t("converter.form.fields.from.placeholder")}
                    </FormLabel>
                  </VisuallyHidden>
                  <Select<CurrencyOption, false, GroupBase<CurrencyOption>>
                    inputId="currencyFrom"
                    aria-label={t("converter.form.fields.from.placeholder")}
                    variant="unstyled"
                    placeholder={t("converter.form.fields.from.placeholder")}
                    onChange={handleChangeCurrency(CurrencySelectSubtype.From)}
                    options={fromOptions}
                    value={fromValue}
                  />
                </Box>

                <IconButton
                  onClick={toggleSwapCurrencies}
                  disabled={isSwapButtonDisabled}
                  aria-label={t("converter.form.fields.swapCurrencies.aria")}
                  data-testid="converter-form-swapCurrencies"
                  icon={<IconSwap size="100%" />}
                  w={[14, 14, 10, 10]}
                  h={[14, 14, 10, 10]}
                  variant="ghost"
                  mr={3}
                />

                <Box w={["100%", "100%", 75, 75]} mr={3} mb={[6, 6, 0, 0]}>
                  <VisuallyHidden>
                    <FormLabel htmlFor="currencyTo">
                      {t("converter.form.fields.to.placeholder")}
                    </FormLabel>
                  </VisuallyHidden>
                  <Select<CurrencyOption, false, GroupBase<CurrencyOption>>
                    inputId="currencyTo"
                    aria-label={t("converter.form.fields.to.placeholder")}
                    variant="unstyled"
                    placeholder={t("converter.form.fields.to.placeholder")}
                    onChange={handleChangeCurrency(CurrencySelectSubtype.To)}
                    options={toOptions}
                    value={toValue}
                  />
                </Box>

                <Button
                  w={["100%", "65%", "60px", "60px"]}
                  type="submit"
                  ml={[0, 0, "auto", "auto"]}
                  disabled={isSubmitButtonDisabled}
                  data-testid="converter-form-submit"
                >
                  {t("converter.form.submit")}
                </Button>
              </Flex>
            </Box>

            <Box h="70px">
              <Center h="100%">
                {isConversionResultLoading ? (
                  <Spinner thickness="4px" color="purple.500" size="xl" />
                ) : (
                  conversionResult && (
                    <Flex
                      alignItems="flex-end"
                      data-testid="converter-form-result"
                    >
                      <Text
                        fontSize="3xl"
                        fontWeight="medium"
                        mr={1}
                        data-testid="converter-form-result-value"
                      >
                        {conversionResult.toFixed(2)}
                      </Text>
                      <Text
                        fontSize="xl"
                        pb="1"
                        data-testid="converter-form-result-currency"
                      >
                        {to}
                      </Text>
                    </Flex>
                  )
                )}
              </Center>
            </Box>
          </Box>
        </Flex>
      </form>
    );
  }

  return (
    <Section minW={100} py={[3, 3, 6, 6]} data-testid="converter-wrapper">
      {renderForm()}
    </Section>
  );
}

export default Converter;
