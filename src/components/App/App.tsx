import React from "react";
import { Routes, Route } from "react-router-dom";
import Page from "components/Page";
import ExchangeRatesPage from "components/pages/ExchangeRatesPage";
import ConverterPage from "components/pages/ConverterPage";
import SettingsPage from "components/pages/SettingsPage";

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<ExchangeRatesPage />} />
        <Route path="/converter" element={<ConverterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Page>
  );
}

export default App;
