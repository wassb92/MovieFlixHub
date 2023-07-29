import React from "react";
import { Routes, Route } from "react-router-dom";

/* components */
import Header from "./components/Header";

/* pages */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
/* private */
import ProtectedRoutes from "./pages/private/ProtectedRoutes";
import Popular from "./pages/private/Popular";

const NotFound = () => {
  return <div>Not Found</div>;
};

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route
            path="account/*"
            element={
              <Routes>
                <Route path="/profile" element={<div>Profile page</div>} />
                <Route path="/movies" element={<Popular />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            }
          />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;
