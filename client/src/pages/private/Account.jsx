import React, { useState, useContext } from "react";
import { Button } from "components/Button";
import { UserContext } from "../../UserContext";
import { Input } from "components/Input";
import axios from "axios";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

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
  const [name, setName] = useState("");

  const handleSubmit = async (e, remove = false) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    if (remove) {
      try {
        const { data } = await axios.delete(
          `${global.API_ENDPOINT}/api/private/playlists/${name}`,
          config
        );
        console.log(data);
      } catch (error) {
        console.log(error);
      }
      return;
    }

    try {
      const { data } = await axios.put(
        `${global.API_ENDPOINT}/api/private/playlists`,
        { playlistName: name },
        config
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-2">
        <Input
          type="text"
          placeholder="Nom de la playlist"
          name="name"
          id="name"
          header="Nom de la playlist"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <Button
          type="submit"
          children="Supprimer la playlist"
          onClick={(e) => handleSubmit(e, true)}
          className="px-10 py-2 bg-red-700 text-white rounded-md hover:bg-red-800 hover:drop-shadow-md duration-200 ease-in"
        />
        <Button
          type="submit"
          children="Créer la playlist"
          onClick={(e) => handleSubmit(e)}
        />
      </div>
    </div>
  );
};

const Account = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center mt-8">
        <CreatePlaylist />
      </div>
      {/* <MovieLiked likedMovies={user.likedMovies} /> */}
      {/* <AlreadySeen alreadySeen={user.alreadySeen} /> */}
    </div>
  );
};

export default Account;
