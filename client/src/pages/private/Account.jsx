import React, { useContext } from "react";
import { Button } from "components/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

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

const MovieLiked = ({ likedMovies }) => {
  return (
    <div>
      Film likés:
      <div className="flex flex-wrap">
        {likedMovies.map((movie) => (
          <div key={movie.id}>
            <p>{movie.title}</p>
            <img src={API_IMG + movie.poster_path} />
          </div>
        ))}
      </div>
    </div>
  );
};

const AlreadySeen = ({ alreadySeen }) => {
  return (
    <div>
      Film déjà vu:
      <div className="flex flex-wrap">
        {alreadySeen.map((movie) => (
          <div key={movie.id}>
            <p>{movie.title}</p>
            <img src={API_IMG + movie.poster_path} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CreatePlaylist = () => {
  // create a component to create a playlist, only with an unique name
  return (
    <div>
      <form>
        <input type="text" placeholder="Nom de la playlist" />
        <button>Créer</button>
      </form>
    </div>
  );
};

const Account = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Button className="bg-main text-white">
        <a href="/account/movies">Voir les films du moment</a>
      </Button>
      <Logout />
      <MovieLiked likedMovies={user.likedMovies} />
      <AlreadySeen alreadySeen={user.alreadySeen} />
    </div>
  );
};

export default Account;
