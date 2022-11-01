import React from "react";
import { Routes, Route } from "react-router-dom";
import Page from "components/Page";
import MonitorPage from "components/pages/MonitorPage";

function App() {
  return (
    <Page>
      <Routes>
        <Route path="/" element={<MonitorPage />} />
      </Routes>
    </Page>
  );
}

export default App;
