import React from "react";
import { Routes, Route } from "react-router-dom";
import { css, Global } from "@emotion/react";
import Page from "components/Page";

function App() {
  const globalStyles = css`
    body: {
      height: 100%;
    }
  `;

  return (
    <Page>
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/" element={<p>hello</p>} />
      </Routes>
    </Page>
  );
}

export default App;
