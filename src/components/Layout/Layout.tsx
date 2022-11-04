import React from "react";
import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Main from "components/Main";

function Layout({ children }: { children: React.ReactNode }) {
  const bg = useColorModeValue("white", "whiteAlpha.200");
  const color = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("whiteAlpha.300", "whiteAlpha.100");

  const wrapperStyles = css`
    display: grid;
    grid-template-areas:
      "sidebar header"
      "sidebar main"
      "sidebar main";
    grid-template-rows: 90px 1fr 1fr;
    grid-template-columns: 170px 1fr;
  `;

  return (
    <Container maxW={"5xl"} py={3}>
      {/* TODO: adaptive */}
      <Box
        minH={[782, 726, 726, 700]}
        bg={bg}
        color={color}
        border="1px"
        borderColor={borderColor}
        borderRadius="xl"
        css={wrapperStyles}
        boxShadow="lg"
      >
        <Header />
        <Sidebar />
        <Main>{children}</Main>
      </Box>
    </Container>
  );
}

export default Layout;
