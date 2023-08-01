import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Details from "./Details";
import { useLocation } from "react-router-dom";
import { UserContext } from "UserContext";

global.API_KEY = "55bb5aeea2538b26cf848582959d4fc8";
global.TMDB_API = "https://api.themoviedb.org/3";
global.API_ENDPOINT = "http://localhost:8080";

const LoopSVG = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "absolute top-3 left-3"}
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
  );
};

const ReversedLoopSVG = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "text-red-600 w-1/3 h-1/3"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        transform="rotate(90, 12, 12)"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
};

const SearchBar = ({ setMovies, fetchMovies }) => {
  const [query, setQuery] = useState("");
  const searchHandler = async (e) => {
    setQuery(e.target.value);
    const instantQuery = e.target.value;
    if (instantQuery.length < 1) return fetchMovies();

    try {
      const url = `${global.TMDB_API}/search/movie?api_key=${global.API_KEY}&query=${instantQuery}&language=fr`;
      const res = await axios.get(url);
      const data = await res.data;

      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="w-full p-4 bg-gradient-to-r from-secondary to-white">
      <div className="relative">
        <LoopSVG className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" />
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

const Filter = ({ onFilterChange }) => {
  const firstYear = 1898;
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= firstYear; year--) {
    years.push(year);
  }

  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);

  const fetchFilterValues = async () => {
    const urlGenres = `${global.TMDB_API}/genre/movie/list?api_key=${global.API_KEY}&language=fr`;
    try {
      const res = await axios.get(urlGenres);
      const data = await res.data.genres;
      setGenres(data);
    } catch (e) {
      console.log(e);
    }

    const urlLanguages = `${global.TMDB_API}/configuration/languages?api_key=${global.API_KEY}`;
    try {
      const res = await axios.get(urlLanguages);
      const data = await res.data;
      setLanguages(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchFilterValues();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
  };

  return (
    <div className="flex space-x-4 text-center">
      <div className="w-full md:w-auto">
        <label htmlFor="year" className="hidden md:block">
          Année de sortie
        </label>
        <select
          name="year"
          id="year"
          onChange={handleFilterChange}
          className="text-black block appearance-none w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {years.map((year) => (
            <option
              key={year.toString()}
              value={year}
              onChange={handleFilterChange}
            >
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-auto">
        <label htmlFor="genre" className="hidden md:block">
          Genre
        </label>
        <select
          name="genre"
          id="genre"
          onChange={handleFilterChange}
          className="text-black block appearance-none w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {genres.map((genre) => (
            <option
              key={genre.id}
              value={genre.id}
              onChange={handleFilterChange}
            >
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-auto">
        <label htmlFor="language" className="hidden md:block">
          Langue
        </label>
        <select
          name="language"
          id="language"
          onChange={handleFilterChange}
          className="text-black block appearance-none w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {languages.map((language) => (
            <option
              key={language.id}
              value={language.iso_639_1}
              onChange={handleFilterChange}
            >
              {language.name !== ""
                ? language.name + " (" + language.iso_639_1.toUpperCase() + ")"
                : language.iso_639_1.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Popular = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    genre: "28",
    language: "fr",
  });

  let loggedIn = location?.state?.loggedIn;
  location.state = {};

  const fetchMovies = async () => {
    let url = `${global.TMDB_API}/discover/movie?api_key=${global.API_KEY}&language=fr`;

    if (loggedIn) {
      const { favoriteGenreId } = user;
      url = `${global.TMDB_API}/discover/movie?api_key=${global.API_KEY}&with_genres=${favoriteGenreId}&language=fr`;
    }

    try {
      const res = await axios.get(url);
      const data = await res.data;

      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchGenres = async () => {
    const url = `${global.TMDB_API}/genre/movie/list?api_key=${global.API_KEY}&language=fr`;

    try {
      const res = await axios.get(url);
      const data = await res.data.genres;
      setGenres(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const ConvertGenres = (genre_ids) => {
    const genresName = [];
    genre_ids.forEach((genre_id) => {
      genres.forEach((genre) => {
        if (genre.id === genre_id) {
          genresName.push(genre.name);
        }
      });
    });
    return genresName;
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    const { year, genre, language } = filter;

    try {
      const url = `${global.TMDB_API}/discover/movie?api_key=${global.API_KEY}&language=fr&with_original_language=${language}&primary_release_year=${year}&with_genres=${genre}`;
      const res = await axios.get(url);
      const data = await res.data;

      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  if (!movies) return <h1>Loading...</h1>;

  const NoResult = () => {
    return (
      <div>
        <div className="w-full p-4 bg-gradient-to-b from-main to-white flex justify-center items-center space-x-4">
          <ReversedLoopSVG />
        </div>
        <div className="text-black bg-white flex justify-center items-center space-x-4">
          <p className="text-2xl">Aucun résultat trouvé, essayez autre chose</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="w-full bg-secondary">
        <SearchBar setMovies={setMovies} fetchMovies={fetchMovies} />
        <div className="w-full p-4 bg-gradient-to-r from-secondary to-white flex justify-center items-center space-x-4 text-white">
          <Filter onFilterChange={handleFilterChange} />
          <div onClick={handleSearch}>
            <LoopSVG className="flex justify-center items-center cursor-pointer w-6 h-6 my-auto text-white mt-6 hover:scale-150" />
          </div>
        </div>
        {movies.length > 0 ? (
          <div className="mx-4 mt-4">
            <div className="grid grid-cols-4 gap-4 justify-items-center">
              {movies.map(
                (movieReq) =>
                  movieReq.id &&
                  movieReq.poster_path && (
                    <>
                      <Details
                        key={movieReq.id}
                        {...movieReq}
                        genres={ConvertGenres(movieReq.genre_ids)}
                      />
                    </>
                  )
              )}
            </div>
          </div>
        ) : (
          <NoResult />
        )}
      </div>
    </>
  );
};

export default Popular;
