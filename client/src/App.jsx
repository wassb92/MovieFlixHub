import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

/* components */
import Header from "./components/Header";

/* pages */
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
/* private */
import ProtectedRoutes from "./pages/private/ProtectedRoutes";
import Account from "./pages/private/Account";
import Popular from "./pages/private/Popular";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route
          path="account/*"
          element={
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Account />} />
                <Route path="/movies" element={<Popular />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          }
        />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
