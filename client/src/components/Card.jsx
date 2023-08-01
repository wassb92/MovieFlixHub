import React from "react";
import axios from "axios";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ movies, canDelete = false, playlistName = "" }) => {
  const handleDelete = async (e, movieId, playlistName) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    const body = {
      playlistName,
      movieId,
    };

    try {
      const { data } = await axios.put(
        `${global.API_ENDPOINT}/api/private/playlists/delete-movie`,
        body,
        config
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center w-full">
      {movies &&
        movies.length > 0 &&
        movies.map((movie) => (
          <div
            key={movie.movieId}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            {canDelete && (
              <div
                className="bg-red-600 text-white text-center p-1 cursor-pointer"
                onClick={(e) => handleDelete(e, movie.movieId, playlistName)}
              >
                Supprimer
              </div>
            )}
            <img
              src={API_IMG + movie.poster_path}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <p className="text-gray-600">Movie ID: {movie.movieId}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

const PlaylistCard = ({ playlists }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center w-full">
      {playlists.map((playlist) => (
        <div
          key={playlist.name}
          className="border rounded-lg overflow-hidden shadow-md text-center"
        >
          <h2 className="text-xl font-semibold p-4">{playlist.name}</h2>
          {playlist.movies && playlist.movies.length > 0 ? (
            <div key={playlist.name} className="p-4">
              <MovieCard
                movies={playlist.movies}
                canDelete
                playlistName={playlist.name}
              />
            </div>
          ) : (
            <div className="col-span-full text-center text-gray-600">
              Aucun film dans cette playlist
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export { MovieCard, PlaylistCard };
