import React, { useState, useContext } from "react";
import { Button } from "components/Button";
import { UserContext } from "../../UserContext";
import { Input } from "components/Input";
import axios from "axios";
import { MovieCard, PlaylistCard } from "components/Card";

const MovieLiked = ({ likedMovies }) => {
  return (
    <div>
      Film likés:
      <MovieCard movies={likedMovies} />
    </div>
  );
};

const AlreadySeen = ({ alreadySeen }) => {
  return (
    <div>
      Film déjà vu:
      <MovieCard movies={alreadySeen} />
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
        setName("");
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
      setName("");
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

const ListPlaylist = () => {
  const { user } = useContext(UserContext);
  const { playlists } = user;

  // playlists[0].movies = [
  //   {
  //     movieId: 1150394,
  //     title: "La Leyenda de los Chaneques",
  //     poster_path: "/uybOgGtSW3orlkHTO0qYOQcSgfq.jpg",
  //     _id: { $oid: "64c69a241d5a9888932e1026" },
  //   },
  //   {
  //     movieId: 787752,
  //     title: "Fresh",
  //     poster_path: "/60D9rjVhPBahiW1hmunY2uGfWS0.jpg",
  //     _id: { $oid: "64c69a251d5a9888932e102c" },
  //   },
  //   {
  //     movieId: 1083862,
  //     title: "Resident Evil : Death Island",
  //     poster_path: "/5I0ok6CLpnqU07drE5yO9uDhQVE.jpg",
  //     _id: { $oid: "64c69a9b1d5a9888932e1050" },
  //   },
  //   {
  //     movieId: 298618,
  //     title: "The Flash",
  //     poster_path: "/kIHEPNYLWnG2fSwsAPmJkHdwce6.jpg",
  //     _id: { $oid: "64c69ab41d5a9888932e106a" },
  //   },
  //   {
  //     movieId: 667538,
  //     title: "Transformers: Rise of the Beasts",
  //     poster_path: "/kq6AYN96FjWSZQVRYpAPmBAVq2s.jpg",
  //     _id: { $oid: "64c6bff2827e6bf290350534" },
  //   },
  // ];
  return <PlaylistCard playlists={playlists} />;
};

const Account = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center mt-8">
        <CreatePlaylist />
      </div>
      <ListPlaylist />
      <MovieLiked likedMovies={user.likedMovies} />
      <AlreadySeen alreadySeen={user.alreadySeen} />
    </div>
  );
};

export default Account;
