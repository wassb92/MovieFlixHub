import React, { useState, useEffect } from "react";
import axios from "axios";
import Details from "./Details";

global.API_KEY = "55bb5aeea2538b26cf848582959d4fc8";
global.API_ENDPOINT = "https://api.themoviedb.org/3";

const SearchBar = ({ setMovies, fetchMovies }) => {
  const [query, setQuery] = useState("");
  const searchHandler = async (e) => {
    setQuery(e.target.value);
    const instantQuery = e.target.value;
    if (instantQuery.length < 1) return fetchMovies();

    try {
      const url = `${global.API_ENDPOINT}/search/movie?api_key=${global.API_KEY}&query=${instantQuery}&language=fr`;
      const res = await axios.get(url);
      const data = await res.data;

      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="w-full p-4 bg-main">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Rechercher un film ou une série"
          className="w-full py-3 pl-12 pr-4 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          name="query"
          value={query}
          onChange={searchHandler}
        />
      </div>
    </form>
  );
};

const Home = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const url = `${global.API_ENDPOINT}/movie/popular?api_key=${global.API_KEY}&language=fr`;

    try {
      const res = await axios.get(url);
      const data = await res.data;
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  if (!movies) return <h1>Loading...</h1>;

  return (
    <>
      <div className="w-full">
        <SearchBar setMovies={setMovies} fetchMovies={fetchMovies} />
        {movies.length > 0 ? (
          <div className="mx-4">
            <div className="grid grid-cols-4 gap-4 justify-items-center">
              {movies.map(
                (movieReq) =>
                  movieReq.id &&
                  movieReq.poster_path && (
                    <Details key={movieReq.id} {...movieReq} />
                  )
              )}
            </div>
          </div>
        ) : (
          <h2>Aucun résultat trouvé</h2>
        )}
      </div>
    </>
  );
};

export default Home;
