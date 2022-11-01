import React from "react";
import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";

function Sidebar() {
  const sidebarStyles = css`
    grid-area: sidebar;
  `;

  return (
    <Box as="aside" css={sidebarStyles}>
      sidebar
    </Box>
  );
}

export default Sidebar;
