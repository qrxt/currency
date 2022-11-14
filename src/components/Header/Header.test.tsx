import React from "react";
import headerLocator from "__tests__/locators/header";
import { render, waitFor } from "__tests__/test-utils";
import Header from "./Header";

describe("Header", () => {
  beforeAll(() => {
    Object.defineProperty(window.document, "cookie", {
      writable: true,
      value: "base-currency=USD",
    });
  });
  test("Layout", async () => {
    const result = await waitFor(() => render(<Header />));
    const header = headerLocator(result.baseElement);

    expect(await header.wrapper()).toBeInTheDocument();
    expect(await header.statusBar()).toBeInTheDocument();
  });

  test("Should set base currency from cookies", async () => {
    const result = await waitFor(() => render(<Header />));
    const header = headerLocator(result.baseElement);

    expect(await header.wrapper()).toBeInTheDocument();
    expect(await header.baseCurrency()).toHaveTextContent("USD");
  });
});
