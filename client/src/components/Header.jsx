import React, { useContext } from "react";
import ProfileSVG from "assets/img/profile.svg.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "UserContext";
import { Button } from "components/Button";

const Profile = () => {
  return (
    <div className="">
      <a
        className="hover:bg-main inline-flex py-2 text-xl cursor-pointer border-2 rounded-xl border-white pl-2"
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
    <Button
      onClick={handleLogout}
      className="md:px-10 md:py-2 px-1 py-1 bg-main text-white rounded-md hover:bg-secondary hover:drop-shadow-md duration-200 ease-in"
    >
      Se déconnecter
    </Button>
  );
};

const Browse = () => {
  return (
    <a href="/account/movies">
      <Button className="md:px-10 md:py-2 px-4 py-1 bg-main text-white rounded-md hover:bg-secondary hover:drop-shadow-md duration-200 ease-in">
        Voir les films du moment
      </Button>
    </a>
  );
};

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600">
      <Logout />
      <Browse />
      <Profile />
    </header>
  );
};

export default Header;
