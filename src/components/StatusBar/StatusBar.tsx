import React from "react";
import {
  Box,
  Flex,
  useColorMode,
  useColorModeValue,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Section from "components/Section";
import { motion } from "framer-motion";
import { CurrencySymbol } from "types/currency";
import { t } from "i18next";

interface StatusBarProps {
  baseCurrency: CurrencySymbol;
  variant?: "ghost";
}

const textVariants = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.3,
    },
  },
  hide: {
    y: -20,
    opacity: 0,
  },
};

function StatusBar(props: StatusBarProps) {
  const { baseCurrency, variant } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const colorModeMessage = `Set ${colorMode} mode`;
  const colorModeIcon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;

  const basicCurrencyColor = useColorModeValue("black", "whiteAlpha.900");

  return (
    <Section
      boxShadow={variant === "ghost" ? "none" : "md"}
      data-testid="status-bar"
    >
      <Flex alignItems="center">
        <Box mr={6}>
          <Tooltip label={t("header.baseCurrency")} placement="auto-end">
            <Text
              fontWeight="medium"
              color={basicCurrencyColor}
              textTransform="uppercase"
              as={motion.p}
              animate={"show"}
              initial="hide"
              variants={textVariants}
              key={baseCurrency}
              data-testid="status-bar-base-currency"
            >
              {baseCurrency}
            </Text>
          </Tooltip>
        </Box>
        <Box as={motion.div} whileTap={{ scale: 0.9 }}>
          <IconButton
            onClick={toggleColorMode}
            aria-label={colorModeMessage}
            icon={colorModeIcon}
            variant="outline"
          />
        </Box>
      </Flex>
    </Section>
  );
}

export default StatusBar;
