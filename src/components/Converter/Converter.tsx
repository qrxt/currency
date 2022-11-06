import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import Section from "components/Section";
import { AiOutlineSwap as IconSwap } from "react-icons/ai";
import {
  OptionBase,
  GroupBase,
  Select,
  SingleValue,
} from "chakra-react-select";
import { CurrencySymbol, Symbols } from "types/currency";
import { filter, find, includes, keys, map, sortBy } from "lodash";
import { SubmitHandler, useForm } from "react-hook-form";

interface CurrencyOption extends OptionBase {
  value: string;
  label: string;
}

interface ConverterProps {
  // baseCurrency: CurrencySymbol;
  symbols: Symbols;
}

interface IFormInput {
  amount: number;
}

function useCurrencyOptions(symbols: Symbols): CurrencyOption[] {
  return map(keys(symbols), (symbol) => ({
    label: symbol,
    value: symbol,
  }));
}

function useConverter({
  from,
  to,
  currencyOptions,
}: {
  from: CurrencySymbol | null;
  to?: CurrencySymbol | null;
  currencyOptions: CurrencyOption[];
}) {
  const sort = (options: CurrencyOption[]) => {
    const priorityCurrencies = ["USD", "RUB", "EUR"];
    return sortBy(
      options,
      (option) => !includes(priorityCurrencies, option.value)
    );
  };

  const fromOptionsFiltered = filter(
    currencyOptions,
    (option) => option.value !== to
  );
  const toOptionsFiltered = filter(
    currencyOptions,
    (option) => option.value !== from
  );

  const fromOptions = sort(fromOptionsFiltered);
  const toOptions = sort(toOptionsFiltered);

  return {
    fromOptions: fromOptions,
    toOptions: toOptions,
  };
}

function Converter(props: ConverterProps) {
  const { symbols } = props;
  const [from, setFrom] = useState<CurrencySymbol | null>(null);
  const [to, setTo] = useState<CurrencySymbol | null>(null);
  const currencyOptions = useCurrencyOptions(symbols);
  const { fromOptions, toOptions } = useConverter({
    from,
    to,
    currencyOptions,
  });

  function toggleSwapCurrencies() {
    const currentFrom = from;
    setFrom(to);
    setTo(currentFrom);
  }

  function handleChangeFrom(option: SingleValue<CurrencyOption>) {
    if (option) {
      setFrom(option.value as CurrencySymbol);
    }
  }

  function handleChangeTo(option: SingleValue<CurrencyOption>) {
    if (option) {
      setTo(option.value as CurrencySymbol);
    }
  }

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  function renderForm() {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box mb={3} pt={70}>
            <Flex mb={3}>
              <Box w={300}>
                <NumberInput>
                  <NumberInputField
                    textAlign="center"
                    fontSize="1.6em"
                    // placeholder={inputPlaceholder}
                    fontWeight="medium"
                    py={6}
                    {...register("amount", {
                      required: true,
                    })}
                  />
                </NumberInput>
              </Box>
            </Flex>

            <Box mb={3}>
              <Flex>
                <Box w={75} mr={3}>
                  <Select<CurrencyOption, false, GroupBase<CurrencyOption>>
                    variant="unstyled"
                    placeholder="From"
                    onChange={handleChangeFrom}
                    options={fromOptions}
                    value={find(
                      currencyOptions,
                      (currency) => currency.value == from
                    )}
                  />
                </Box>

                <IconButton
                  onChange={toggleSwapCurrencies}
                  aria-label="Swap currencies"
                  icon={<IconSwap size="35px" />}
                  variant="ghost"
                  mr={3}
                />

                <Box w={75} mr={3}>
                  <Select<CurrencyOption, false, GroupBase<CurrencyOption>>
                    variant="unstyled"
                    placeholder="To"
                    onChange={handleChangeTo}
                    options={toOptions}
                    value={find(
                      currencyOptions,
                      (currency) => currency.value == to
                    )}
                  />
                </Box>

                <Button w="60px" type="submit" ml="auto">
                  Go
                </Button>
              </Flex>
            </Box>

            <Box h="70px">
              <Center h="100%">
                <Text fontSize="3xl" fontWeight="medium">
                  {/* 249.32 EUR */}
                </Text>
              </Center>
            </Box>
          </Box>
        </Flex>
      </form>
    );
  }

  return <Section py={6}>{renderForm()}</Section>;
}

export default Converter;
