import React from "react";
import { Routes, Route } from "react-router-dom";
import Page from "components/Page";
import ExchangeRatesPage from "components/pages/ExchangeRatesPage";
import ConverterPage from "components/pages/ConverterPage";
import SettingsPage from "components/pages/SettingsPage";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <Page>
      <Helmet>
        <title>{t("common.title")}</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<ExchangeRatesPage />} />
        <Route path="/converter" element={<ConverterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Page>
  );
}

export default App;
