import { Box, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
import Layout from "components/Layout";
import React from "react";

const layoutWrapperStyles = css`
  height: 100%;
`;

function Page({ children }: { children: React.ReactNode }) {
  const bgGradient = useColorModeValue(
    "linear(to-br, rgb(133,139,255), #441AFF)",
    "blackAlpha.600"
  );

  return (
    <Box
      bgGradient={bgGradient}
      css={layoutWrapperStyles}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minW={320}
    >
      <Layout>{children}</Layout>
    </Box>
  );
}

export default Page;
