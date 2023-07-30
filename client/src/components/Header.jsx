import React from "react";
import ProfileSVG from "assets/img/profile.svg.js";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <button
        className="hover:bg-gray-200 inline-flex py-2 text-xl cursor-pointer border-2 rounded-xl border-gray-800 pl-2"
        onClick={() => navigate("/account")}
      >
        <ProfileSVG />
      </button>
    </div>
  );
};

const Header = () => {
  return (
    <div className="sticky top-0 py-3 z-50 w-full h-1/6 bg-gradient-to-r from-main to-white text-black">
      <div className="mx-auto sm:px-6">
        <div className="hidden sm:flex justify-between items-center md:justify-start md:space-x-10">
          <div className="flex items-center justify-end flex-1 lg:w-0">
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
