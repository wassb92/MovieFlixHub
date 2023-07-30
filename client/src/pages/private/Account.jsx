import React, { useState, useContext } from "react";
import { Button } from "components/Button";
import { UserContext } from "../../UserContext";
import { Input } from "components/Input";
import axios from "axios";
import { MovieCard, PlaylistCard } from "components/Card";
import Accordion from "components/Accordion";

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
        setName("");
        window.location.reload();
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
      setName("");
      window.location.reload();
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

const ListPlaylist = () => {
  const { user } = useContext(UserContext);
  const { playlists } = user;

  return <PlaylistCard playlists={playlists} />;
};

const Account = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center mt-8">
        <CreatePlaylist />
      </div>
      <Accordion header="Mes playlists">
        <ListPlaylist />
      </Accordion>
      <Accordion header="Mes films préférés">
        <MovieCard movies={user.likedMovies} />
      </Accordion>
      <Accordion header="Mes films déjà vu">
        <MovieCard movies={user.alreadySeen} />
      </Accordion>
    </div>
  );
};

export default Account;
