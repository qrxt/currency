import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { setupStore } from "../src/redux/store";
import { Provider as ReduxProvider } from "react-redux";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const store = setupStore();

  return (
    <ReduxProvider store={store}>
      <ChakraProvider>
        <Router>{children}</Router>
      </ChakraProvider>
    </ReduxProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react";

export { customRender as render };
