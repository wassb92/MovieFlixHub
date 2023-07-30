import { Button } from "components/Button";
import React from "react";
import { Link } from "react-router-dom";

const Unauthenticated = ({ count }) => {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center">
      <div className="flex justify-center items-center w-full">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">403</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Désole, vous n'avez pas accès à cette page.
          </p>
          <p className="mb-8">
            {count &&
              `
              Vous n'êtes pas connecté, vous allez être redirigé vers la page
              d'authentification dans ${count} seconde${count > 1 ? "s" : ""}`}
          </p>

          <Link to="/">
            <Button>Se connecter</Button>
          </Link>
        </div>
        <div className="max-w-lg">
          <img
            src="https://error404.fun/img/full-preview/1x/19.png"
            alt="403 error"
          />
        </div>
      </div>
    </div>
  );
};

export default Unauthenticated;
