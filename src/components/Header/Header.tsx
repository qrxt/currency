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
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";
import routes from "lib/routes";

function Header() {
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
  const controlsBg = useColorModeValue("white", "whiteAlpha.200");

  return (
    <Box as="header" css={headerStyles} bg={bg}>
      <Flex h="100%" alignItems="center" px="6" justifyContent="space-between">
        <Box>
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

          <Heading as="h1">{heading}</Heading>
        </Box>

        <Box py={3} px={6} borderRadius="xl" boxShadow="md" bg={controlsBg}>
          <Flex alignItems="center">
            <Box mr={6}>
              <Tooltip label="Basic currency" placement="auto-end">
                {/* TODO: set actual basic currency */}
                <Text fontWeight="medium" color={basicCurrencyColor}>
                  USD
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
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;
