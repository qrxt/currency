import { findByTestId, fireEvent, queryByTestId } from "@testing-library/react";
import selectWithSearch from "./selectWithSearch";

export default function servicePage(nodeElement: HTMLElement) {
  return {
    nodeElement,
    // wrapper
    converterWrapper() {
      return findByTestId(nodeElement, "converter-wrapper");
    },
    // converter form
    converterForm() {
      return findByTestId(nodeElement, "converter-form");
    },

    async selectFrom() {
      return selectWithSearch(this.nodeElement, "From");
    },
    async selectTo() {
      return selectWithSearch(this.nodeElement, "To");
    },

    swapCurrencies() {
      return findByTestId(nodeElement, "converter-form-swapCurrencies");
    },

    amountField() {
      return findByTestId(nodeElement, "converter-form-amount-field");
    },
    async changeAmount(value: number) {
      const field = await this.amountField();

      fireEvent.change(field, { target: { value } });
    },

    converterFormSubmit() {
      return findByTestId(nodeElement, "converter-form-submit");
    },
    async submitConverterForm() {
      fireEvent.click(await this.converterFormSubmit());
    },

    converterFormResult() {
      return queryByTestId(nodeElement, "converter-form-result");
    },
    converterFormResultValue() {
      return findByTestId(nodeElement, "converter-form-result-value");
    },
    converterFormResultCurrency() {
      return findByTestId(nodeElement, "converter-form-result-currency");
    },
  };
}
