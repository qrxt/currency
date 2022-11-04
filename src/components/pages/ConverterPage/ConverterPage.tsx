import React from "react";
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
import { upperCase } from "lodash";
import Section from "components/Section";
import { useCookies } from "react-cookie";
import { AiOutlineSwap as IconSwap } from "react-icons/ai";
import { OptionBase, GroupBase, Select } from "chakra-react-select";

const currencies = [
  { value: "eur", label: "EUR" },
  { value: "usd", label: "USD" },
  { value: "rub", label: "RUB" },
];

interface CurrencyOption extends OptionBase {
  value: string;
  label: string;
}

function ConverterPage() {
  const [baseCurrencyCookie] = useCookies(["base-currency"]);
  const baseCurrency = upperCase(baseCurrencyCookie["base-currency"]);

  //
  // const format = (val) => "$" + val;
  // const parse = (val) => val.replace(/^\$/, "");
  // const [value, setValue] = React.useState("1.53");
  //

  function handleChangeFrom() {
    console.log("from");
  }

  function toggleSwapCurrencies() {
    console.log("swap");
  }

  function handleChangeTo() {
    console.log("to");
  }

  const inputPlaceholder = `250.0 ${baseCurrency}`; // `${baseCurrency} to `;

  return (
    <Section py={6}>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Box mb={3} pt={70}>
          <Flex mb={3}>
            <Box w={300}>
              <NumberInput>
                <NumberInputField
                  textAlign="center"
                  fontSize="1.6em"
                  placeholder={inputPlaceholder}
                  fontWeight="medium"
                  py={6}
                />
              </NumberInput>
            </Box>
          </Flex>

          <Box mb={3}>
            <Flex>
              <Box w={75} mr={3}>
                <Select<CurrencyOption, true, GroupBase<CurrencyOption>>
                  variant="unstyled"
                  placeholder="From"
                  onChange={handleChangeFrom}
                  options={currencies}
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
                <Select<CurrencyOption, true, GroupBase<CurrencyOption>>
                  variant="unstyled"
                  placeholder="To"
                  onChange={handleChangeTo}
                  options={currencies}
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
    </Section>
  );
}

export default ConverterPage;
