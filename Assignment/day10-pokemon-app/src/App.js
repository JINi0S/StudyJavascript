import "./App.css";
import Nav from "./components/Nav";
import { Outlet, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import React, { useState } from "react";

import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  );
};

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <MainPage
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            />
            <Route path="/pokemon/:id" element={<DetailPage />} />
            <Route
              path="search"
              element={
                <SearchPage
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
