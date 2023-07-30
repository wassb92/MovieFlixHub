import React, { useContext } from "react";
import ProfileSVG from "assets/img/profile.svg.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "UserContext";
import { Button } from "components/Button";

const Profile = () => {
  return (
    <div className="">
      <a
        className="hover:bg-gray-200 inline-flex py-2 text-xl cursor-pointer border-2 rounded-xl border-gray-800 pl-2"
        href="/account"
      >
        <ProfileSVG />
      </a>
    </div>
  );
};

const Logout = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  if (!user) return null;

  return (
    <Button color="inherit" onClick={handleLogout}>
      Se déconnecter
    </Button>
  );
};

const Browse = () => {
  return (
    <a href="/account/movies">
      <Button color="inherit">Voir les films du moment</Button>
    </a>
  );
};

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-secondary to-white p-4 text-white flex justify-between items-center px-8">
      <div>
        <Logout />
      </div>
      <div>
        <Browse />
      </div>
      <div>
        <Profile />
      </div>
    </header>
  );
};

export default Header;
