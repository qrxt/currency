import React from "react";
import ConverterPage from "components/pages/ConverterPage";
import converterPage from "__tests__/locators/converterPage";
import { server } from "__tests__/mocks/server";
import { act, findByText, render, waitFor } from "__tests__/test-utils";

describe("SettingsPage", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Layout", async () => {
    const result = await waitFor(() => render(<ConverterPage />));
    const page = converterPage(result.baseElement);

    expect(await page.converterWrapper()).toBeInTheDocument();
    expect(await page.converterForm()).toBeInTheDocument();

    const selectFrom = await page.selectFrom();
    const selectTo = await page.selectTo();
    expect(await selectFrom.select()).toBeInTheDocument();
    expect(await selectTo.select()).toBeInTheDocument();

    expect(await page.swapCurrencies()).toBeInTheDocument();
    expect(await page.amountField()).toBeInTheDocument();
    expect(await page.converterFormSubmit()).toHaveTextContent("Go");
  });

  test("Should convert currencies", async () => {
    const result = await waitFor(() => render(<ConverterPage />));
    const page = converterPage(result.baseElement);
    const selectFrom = await page.selectFrom();
    const selectTo = await page.selectTo();

    // Submit should be disabled by default
    expect(await page.converterFormSubmit()).toBeDisabled();

    // Should convert AED to ALL
    const baseCurrency = "AED";
    const targetCurrency = "ALL";

    await selectFrom.change([baseCurrency]);
    expect(
      await findByText(page.nodeElement, baseCurrency)
    ).toBeInTheDocument();
    await selectTo.change([targetCurrency]);
    expect(
      await findByText(page.nodeElement, targetCurrency)
    ).toBeInTheDocument();

    await page.changeAmount(100);

    // Result shouldn't display before form submit
    expect(page.converterFormResult()).not.toBeInTheDocument();
    expect(await page.converterFormSubmit()).not.toBeDisabled();

    await act(() => page.submitConverterForm());

    expect(await page.converterFormResultValue()).toBeInTheDocument();
    expect(await page.converterFormResultCurrency()).toHaveTextContent(
      targetCurrency
    );
  });
});
