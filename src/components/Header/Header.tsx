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
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface Route {
  breadcrumb: string;
  heading: string;
}

const routes: Record<string, Route> = {
  "/": { breadcrumb: "Monitor", heading: "Exchange Rates" },
  "/settings": { breadcrumb: "Settings", heading: "Application Settings" },
  "/converter": { breadcrumb: "Converter", heading: "Currency converter" },
};

function Header() {
  const { pathname } = useLocation();
  const { breadcrumb, heading } = routes[pathname];

  const bg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const { colorMode, toggleColorMode } = useColorMode();
  const headerStyles = css`
    grid-area: header;
  `;

  const colorModeMessage = `Set ${colorMode} mode`;
  const colorModeIcon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;

  return (
    <Box as="header" css={headerStyles} bg={bg}>
      <Flex h="100%" alignItems="center" px="6" justifyContent="space-between">
        <Box>
          <Breadcrumb fontWeight="medium" fontSize="xs">
            {/* TODO: actual links */}
            <BreadcrumbItem>
              <BreadcrumbLink as={RouterLink} to="/">
                Pages
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={RouterLink} to={pathname}>
                {breadcrumb}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Heading as="h1">{heading}</Heading>
        </Box>
        <IconButton
          onClick={toggleColorMode}
          aria-label={colorModeMessage}
          icon={colorModeIcon}
          variant="outline"
        />
      </Flex>
    </Box>
  );
}

export default Header;
