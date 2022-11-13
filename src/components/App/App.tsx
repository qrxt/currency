import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Page from "components/Page";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import ExchangeRatesSkeleton from "components/ExchangeRates/ExchangeRatesSkeleton";
import ConverterSkeleton from "components/Converter/ConverterSkeleton";
import SettingsSkeleton from "components/Settings/SettingsSkeleton";

const ExchangeRates = React.lazy(
  () => import("components/pages/ExchangeRatesPage")
);
const Converter = React.lazy(() => import("components/pages/ConverterPage"));
const Settings = React.lazy(() => import("components/pages/SettingsPage"));

function App() {
  const { t } = useTranslation();

  return (
    <Page>
      <Helmet>
        <title>{t("common.title")}</title>
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<ExchangeRatesSkeleton />}>
              <ExchangeRates />
            </Suspense>
          }
        />
        <Route
          path="/converter"
          element={
            <Suspense fallback={<ConverterSkeleton />}>
              <Converter />
            </Suspense>
          }
        />
        <Route
          path="/settings"
          element={
            <Suspense fallback={<SettingsSkeleton />}>
              <Settings />
            </Suspense>
          }
        />
      </Routes>
    </Page>
  );
}

export default App;
