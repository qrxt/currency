import React from "react";
import {
  Box,
  Flex,
  useColorMode,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  IconButton,
  Heading,
  Text,
  Tooltip,
  Hide,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";
import routes from "lib/routes";
import Section from "components/Section";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";

const variants = {
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

function Header() {
  const [baseCurrencyCookie] = useCookies(["base-currency"]);
  const baseCurency = baseCurrencyCookie["base-currency"];

  const { pathname } = useLocation();
  const { name, heading } = routes[pathname];

  const bg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const { colorMode, toggleColorMode } = useColorMode();
  const headerStyles = css`
    grid-area: header;
  `;

  const colorModeMessage = `Set ${colorMode} mode`;
  const colorModeIcon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;

  const basicCurrencyColor = useColorModeValue("black", "white");

  return (
    <Box as="header" css={headerStyles} bg={bg}>
      <Flex h="100%" alignItems="center" px="6" justifyContent="space-between">
        <Box>
          <Hide below="md">
            <Breadcrumb fontWeight="medium" fontSize="xs">
              <BreadcrumbItem>
                <BreadcrumbLink as={RouterLink} to="/">
                  Pages
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <span>{name}</span>
              </BreadcrumbItem>
            </Breadcrumb>
          </Hide>

          <Heading as="h1">{heading}</Heading>
        </Box>

        <Section>
          <Flex alignItems="center">
            <Box mr={6}>
              <Tooltip label="Basic currency" placement="auto-end">
                <Text
                  fontWeight="medium"
                  color={basicCurrencyColor}
                  textTransform="uppercase"
                  as={motion.p}
                  animate={"show"}
                  initial="hide"
                  variants={variants}
                  key={baseCurency}
                >
                  {baseCurency}
                </Text>
              </Tooltip>
            </Box>
            <IconButton
              onClick={toggleColorMode}
              aria-label={colorModeMessage}
              icon={colorModeIcon}
              variant="outline"
            />
          </Flex>
        </Section>
      </Flex>
    </Box>
  );
}

export default Header;
