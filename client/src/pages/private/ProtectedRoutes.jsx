import React, { useState, useEffect, useMemo } from "react";
import { Outlet } from "react-router";
import { UserContext } from "UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Unauthenticated from "pages/Unauthenticated";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    if (count === 0) navigate("/");

    return () => clearInterval(interval);
  }, [count]);

  return <Unauthenticated count={count} />;
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const loadingGetUser = React.useRef(true);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    const fetchPrivateAccount = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        if (!localStorage.getItem("authToken")) return;
        loadingGetUser.current = false;

        const res = await axios.get(
          `${global.API_ENDPOINT}/api/private/account`,
          config
        );
        setUser(res.data.user);
        setStatusCode(res.status);
      } catch (error) {
        setStatusCode(error.response.status);
        localStorage.removeItem("authToken");
      }
    };

    fetchPrivateAccount();
  }, []);

  if (statusCode === 401) {
    localStorage.removeItem("authToken");
    return statusCode;
  }
  if (loadingGetUser.current) return null;

  return value;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  const hasToken =
    isAuth === 401 || localStorage.getItem("authToken") === null ? false : true;

  if (hasToken === false) return <LoadingToRedirect />;

  if (isAuth === null) return null;

  return isAuth ? (
    <UserContext.Provider value={isAuth}>
      <Outlet />
    </UserContext.Provider>
  ) : (
    <LoadingToRedirect />
  );
};

export default ProtectedRoutes;
