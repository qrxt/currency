import React from "react";
import { Routes, Route } from "react-router-dom";
import Page from "components/Page";
import MonitorPage from "components/pages/MonitorPage";
import ConverterPage from "components/pages/ConverterPage";
import SettingsPage from "components/pages/SettingsPage";

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<MonitorPage />} />
        <Route path="/converter" element={<ConverterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Page>
  );
}

export default App;
