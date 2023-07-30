import React, { useContext } from "react";
import ProfileSVG from "assets/img/profile.svg.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "UserContext";

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
    <div className="flex justify-start lg:w-0 flex-1">
      <button onClick={handleLogout} className="flex gap-x-4 items-center">
        <li
          className={
            "flex  rounded-md p-2 cursor-pointer text-sm items-center gap-x-4 mt-9"
          }
        >
          <span className="origin-left duration-200">Se déconnecter</span>
        </li>
      </button>
    </div>
  );
};

const Browse = () => {
  return (
    <nav className="flex md:space-x-10">
      <a href="/account/movies">Voir les films du moment</a>
    </nav>
  );
};

const Header = () => {
  return (
    <div className="py-3 z-50 w-full h-1/6 bg-gradient-to-r from-main to-white text-white">
      <div className="mx-auto sm:px-6">
        <div className="hidden sm:flex justify-between items-center md:justify-start md:space-x-10">
          <Logout />
          <Browse />
          <div className="flex items-center justify-end flex-1 lg:w-0">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
