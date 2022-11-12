import {
  findAllByTestId,
  findByLabelText,
  findByTestId,
  fireEvent,
} from "@testing-library/react";

export default function servicePage(nodeElement: HTMLElement) {
  return {
    nodeElement,
    // wrapper
    settingsWrapper() {
      return findByTestId(nodeElement, "settings-wrapper");
    },
    // settings form
    settingsForm() {
      return findByTestId(nodeElement, "settings-form");
    },

    settingsFormBaseCurrencyField(ariaLabelText: string) {
      return findByLabelText(nodeElement, ariaLabelText);
    },
    settingsFormBaseCurrencyFieldLabel() {
      return findByTestId(nodeElement, "settings-form-baseCurrency-label");
    },
    settingsFormBaseCurrencyShowAllCheckbox() {
      return findByTestId(nodeElement, "settings-form-baseCurrency-showAll");
    },
    settingsFormBaseCurrencyHint() {
      return findByTestId(nodeElement, "settings-form-baseCurrency-hint");
    },

    settingsFormLanguageSelect() {
      return findByTestId(nodeElement, "settings-form-language-select");
    },
    settingsFormLanguageSelectOptions() {
      const options: Promise<HTMLOptionElement[]> = findAllByTestId(
        nodeElement,
        "settings-form-language-select-option"
      );

      return options;
    },
    settingsFormLanguageFieldLabel() {
      return findByTestId(nodeElement, "settings-form-language-label");
    },

    settingsFormSubmit() {
      return findByTestId(nodeElement, "settings-form-submit");
    },
    async submitSettingsForm() {
      fireEvent.click(await this.settingsFormSubmit());
    },
  };
}
