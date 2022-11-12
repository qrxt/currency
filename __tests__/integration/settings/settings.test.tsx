import React from "react";
import {
  act,
  findByLabelText,
  findByText,
  queryByText,
  waitFor,
} from "@testing-library/react";
import SettingsPage from "components/pages/SettingsPage";
import { render } from "__tests__/test-utils";
import settingsPage from "__tests__/locators/settingsPage";
import { server } from "__tests__/mocks/server";
import selectEvent from "react-select-event";
import select from "__tests__/locators/select";
import toastWrapper from "__tests__/locators/toast";

describe("SettingsPage", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test("Layout", async () => {
    const result = await waitFor(() => render(<SettingsPage />));
    const page = settingsPage(result.baseElement);

    expect(await page.settingsWrapper()).toBeInTheDocument();
    expect(await page.settingsForm()).toBeInTheDocument();

    expect(
      await page.settingsFormBaseCurrencyField("baseCurrency-select")
    ).toBeInTheDocument();
    expect(await page.settingsFormBaseCurrencyFieldLabel()).toHaveTextContent(
      "Base currency"
    );
    expect(
      await page.settingsFormBaseCurrencyShowAllCheckbox()
    ).not.toBeChecked();
    expect(await page.settingsFormBaseCurrencyHint()).toHaveTextContent(
      "Currency against which conversions will be made"
    );

    expect(await page.settingsFormLanguageSelect()).toBeInTheDocument();
    expect(await page.settingsFormLanguageFieldLabel()).toHaveTextContent(
      "Language"
    );

    expect(await page.settingsFormSubmit()).toHaveTextContent("Submit");
    expect(await page.settingsFormSubmit()).toBeDisabled();
  });

  test("Settings should allow the user to change the base currency", async () => {
    const result = await waitFor(() => render(<SettingsPage />));
    const page = settingsPage(result.baseElement);

    expect(queryByText(page.nodeElement, "USD")).not.toBeInTheDocument();

    await selectEvent.select(
      await findByLabelText(page.nodeElement, "Base currency"),
      ["USD"]
    );

    expect(await findByText(page.nodeElement, "USD")).toBeInTheDocument();

    await act(() => page.submitSettingsForm());

    // should display success toast
    const toast = toastWrapper(
      page.nodeElement,
      "Base currency changed successfully"
    );

    expect(await toast.toast()).toBeInTheDocument();
  });

  test("Settings should allow the user to change the language of the application", async () => {
    const result = await waitFor(() => render(<SettingsPage />));
    const page = settingsPage(result.baseElement);

    const languageSelect = await select(
      page.nodeElement,
      "settings-form-language"
    );
    const languageSelectOptions =
      await page.settingsFormLanguageSelectOptions();

    // Should be initially detected by i18n language detector plugin
    const selectedOption = await languageSelect.selectedOption();
    expect(selectedOption?.value).toBe("en");

    // Check placeholder text
    expect(languageSelectOptions[0]).toHaveTextContent("Select language");

    await languageSelect.change("ru");

    const selectedOptionAfterChange = await languageSelect.selectedOption();
    expect(selectedOptionAfterChange?.value).toBe("ru");

    await act(() => page.submitSettingsForm());

    const updatedLanguageSelectOptions =
      await page.settingsFormLanguageSelectOptions();
    expect(updatedLanguageSelectOptions[0]).toHaveTextContent("Выберите язык");
  });
});
