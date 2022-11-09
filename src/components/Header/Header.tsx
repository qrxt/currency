import React from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Hide,
  Show,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import routes from "lib/routes";
import { useCookies } from "react-cookie";
import StatusBar from "components/StatusBar";

function Header() {
  const [baseCurrencyCookie] = useCookies(["base-currency"]);
  const baseCurrency = baseCurrencyCookie["base-currency"];

  const { pathname } = useLocation();
  const { name, heading } = routes[pathname];

  const bg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const headerStyles = css`
    grid-area: header;
  `;

  return (
    <Box as="header" css={headerStyles} bg={bg} pt={[3, 3, 0, 0]}>
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

          <Heading as="h1" w={["100%", "100%", "auto", "auto"]}>
            {heading}
          </Heading>
        </Box>

        <Show above="630px">
          <StatusBar baseCurrency={baseCurrency} />
        </Show>
      </Flex>
    </Box>
  );
}

export default Header;
