import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import React from "react";

const layoutWrapperStyles = css`
  height: 100%;
`;

function Page({ children }: { children: React.ReactNode }) {
  return (
    <Box
      css={layoutWrapperStyles}
      display="flex"
      flexDirection="column"
      minW={320}
    >
      {children}
    </Box>
  );
}

export default Page;
