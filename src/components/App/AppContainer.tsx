import React, { useEffect } from "react";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { setupStore } from "@redux/store";
import theme from "lib/theme";
import { useCookies } from "react-cookie";
import { isEmpty } from "lodash";

function AppContainer() {
  const store = setupStore();
  const [baseCurrencyCookie, setBaseCurrencyCookie] = useCookies([
    "base-currency",
  ]);

  useEffect(() => {
    // TODO: determine by location / lang
    if (isEmpty(baseCurrencyCookie)) {
      setBaseCurrencyCookie("base-currency", "usd");
    }
  }, [baseCurrencyCookie, setBaseCurrencyCookie]);

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
