import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-main to-secondary">
      <div className="px-10 py-6 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <div className="font-bold text-main text-6xl">Erreur 404</div>
          <br />
          <div className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            Page introuvable
          </div>
          <div className="mb-8 text-center text-gray-500 md:text-lg">
            La page que vous cherchez n'existe pas
          </div>
          <div className="my-6">
            <Link
              to="/"
              className="mx-4 px-6 py-2 text-xl font-semibold text-white hover:bg-secondary bg-main rounded-xl"
            >
              Accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
