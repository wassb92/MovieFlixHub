import React, { useContext } from "react";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Logout = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  if (!user) return null;

  return (
    <button onClick={handleLogout} className="flex gap-x-4 items-center">
      <li
        className={
          "flex  rounded-md p-2 cursor-pointer text-sm items-center gap-x-4 mt-9"
        }
      >
        <span className="origin-left duration-200">Se déconnecter</span>
      </li>
    </button>
  );
};

const Account = () => {
  return (
    <div>
      <Button className="bg-main text-white">
        <a href="/account/movies">Voir les films du moment</a>
      </Button>
      <Logout />
    </div>
  );
};

export default Account;
