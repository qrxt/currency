import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Section from "components/Section";
import { AiOutlineSwap as IconSwap } from "react-icons/ai";
import { GroupBase, Select, SingleValue } from "chakra-react-select";
import { CurrencySymbol, Symbols } from "types/currency";
import { SubmitHandler, useForm } from "react-hook-form";
import { CurrencyOption, useConverter, useCurrencyOptions } from "./hooks";
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box mb={3} pt={70}>
            <Flex mb={3} justifyContent="center">
              <Box w={[200, 200, 300, 300]}>
                <NumberInput>
                  <NumberInputField
                    textAlign="center"
                    fontSize={["1.2em", "1.2em", "1.6em", "1.6em"]}
                    placeholder="Enter amount"
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
                  <Select<CurrencyOption, false, GroupBase<CurrencyOption>>
                    variant="unstyled"
                    placeholder="From"
                    onChange={handleChangeCurrency(CurrencySelectSubtype.From)}
                    options={fromOptions}
                    value={fromValue}
                  />
                </Box>

                <IconButton
                  onClick={toggleSwapCurrencies}
                  disabled={isSwapButtonDisabled}
                  aria-label="Swap currencies"
                  icon={<IconSwap size="100%" />}
                  w={[14, 14, 10, 10]}
                  h={[14, 14, 10, 10]}
                  variant="ghost"
                  mr={3}
                />

                <Box w={["100%", "100%", 75, 75]} mr={3} mb={[6, 6, 0, 0]}>
                  <Select<CurrencyOption, false, GroupBase<CurrencyOption>>
                    variant="unstyled"
                    placeholder="To"
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
                >
                  Go
                </Button>
              </Flex>
            </Box>

            <Box h="70px">
              <Center h="100%">
                {isConversionResultLoading ? (
                  <Spinner thickness="4px" color="purple.500" size="xl" />
                ) : (
                  conversionResult && (
                    <Flex alignItems="flex-end">
                      <Text fontSize="3xl" fontWeight="medium" mr={1}>
                        {conversionResult.toFixed(2)}
                      </Text>
                      <Text fontSize="xl" pb="1">
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
    <Section minW={100} py={[3, 3, 6, 6]}>
      {renderForm()}
    </Section>
  );
}

export default Converter;
