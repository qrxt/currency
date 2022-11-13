import { findAllByTestId, findByTestId } from "@testing-library/react";

export default function ratesPage(nodeElement: HTMLElement) {
  return {
    nodeElement,
    // wrapper
    ratesWrapper() {
      return findByTestId(nodeElement, "rates-wrapper");
    },
    rateItems() {
      return findAllByTestId(nodeElement, "rates-item");
    },
    rateItemTitles() {
      return findAllByTestId(nodeElement, "rates-item-title");
    },
  };
}
