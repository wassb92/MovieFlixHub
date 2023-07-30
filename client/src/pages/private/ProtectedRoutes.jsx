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

        const { data } = await axios.get(
          `${global.API_ENDPOINT}/api/private/account`,
          config
        );
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("authToken");
      }
    };

    fetchPrivateAccount();
  }, []);

  if (loadingGetUser.current) return null;

  return value;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? (
    <UserContext.Provider value={isAuth}>
      <Outlet />
    </UserContext.Provider>
  ) : (
    <LoadingToRedirect />
  );
};

export default ProtectedRoutes;
