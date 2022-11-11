import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setupStore } from "@redux/store";
import App from "./App";
import theme from "lib/theme";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

function AppContainer() {
  const store = setupStore();

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Router>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default AppContainer;
