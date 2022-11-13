import React from "react";
import ExchangeRatesPage from "components/pages/ExchangeRatesPage";
import converterPage from "__tests__/locators/pages/ratesPage";
import { server } from "__tests__/mocks/server";
import { render, waitFor } from "__tests__/test-utils";
import { size } from "lodash";

describe("SettingsPage", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Layout", async () => {
    const result = await waitFor(() => render(<ExchangeRatesPage />));
    const page = converterPage(result.baseElement);

    expect(await page.ratesWrapper()).toBeInTheDocument();
    const rateItems = await page.rateItems();
    expect(size(rateItems)).toBe(2);
    rateItems.forEach((item) => {
      expect(item).toBeInTheDocument();
    });

    const titles = await page.rateItemTitles();
    expect(titles[0]).toHaveTextContent("RUB / USD");
  });
});
