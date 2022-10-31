import React from "react";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setupStore } from "@redux/store";

function AppContainer() {
  const store = setupStore();

  const theme = extendTheme({
    styles: {
      global: {
        "html, body, #root": {
          height: "100%",
          backgroundColor: "#f7f5f5",
        },
      },
    },
  });

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default AppContainer;
