import React from "react";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setupStore } from "@redux/store";
import theme from "./theme";

function AppContainer() {
  const store = setupStore();

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
