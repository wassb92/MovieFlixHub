import React from "react";
import { Outlet } from "react-router";

const LoadingToRedirect = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Loading...</h4>
    </div>
  );
};

/*
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
*/

const ProtectedRoutes = () => {
  const isAuth = true;

  return isAuth ? <Outlet /> : <LoadingToRedirect />;
};

export default ProtectedRoutes;
