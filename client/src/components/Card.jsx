import React from "react";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ movies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies &&
        movies.length > 0 &&
        movies.map((movie) => (
          <div
            key={movie.movieId}
            className="border rounded-lg overflow-hidden shadow-md"
          >
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {playlists.map((playlist) => (
        <div
          key={playlist.name}
          className="border rounded-lg overflow-hidden shadow-md text-center"
        >
          <h2 className="text-xl font-semibold p-4">{playlist.name}</h2>
          {playlist.movies && playlist.movies.length > 0 ? (
            <div key={playlist.name} className="p-4">
              <MovieCard movies={playlist.movies} />
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
