import React from "react";
import {
  Box,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  IconButton,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Header() {
  const bg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const iconButtonColorScheme = useColorModeValue("purple", "black");
  const { colorMode, toggleColorMode } = useColorMode();
  const headerStyles = css`
    grid-area: header;
  `;

  const colorModeMessage = `Set ${colorMode} mode`;
  const colorModeIcon = colorMode === "light" ? <MoonIcon /> : <SunIcon />;

  return (
    <Box as="header" css={headerStyles} bg={bg}>
      <Flex h="100%" alignItems="center" px="6" justifyContent="space-between">
        <Breadcrumb>
          {/* TODO: actual links */}
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Pages</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Monitor</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <IconButton
          onClick={toggleColorMode}
          aria-label={colorModeMessage}
          icon={colorModeIcon}
          colorScheme={iconButtonColorScheme}
          variant="outline"
        />
      </Flex>
    </Box>
  );
}

export default Header;
