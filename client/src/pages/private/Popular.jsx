import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Details from "./Details";
import { useLocation } from "react-router-dom";
import { UserContext } from "UserContext";
import { LoopSVG, ReversedLoopSVG } from "components/svg/Loop";

global.API_KEY = "55bb5aeea2538b26cf848582959d4fc8";
global.TMDB_API = "https://api.themoviedb.org/3";
global.API_ENDPOINT = "https://myallocine-neomovie.onrender.com";

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
    <form className="w-full p-4 bg-gray-200">
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

const Filter = ({ onFilterChange, handleSearch }) => {
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
    <div className="flex flex-wrap items-center justify-center p-4 bg-gray-300 space-x-10">
      <div className="flex items-center mb-2">
        <label htmlFor="year" className="hidden md:block mr-2">
          Année de sortie :
        </label>
        <select
          name="year"
          id="year"
          onChange={handleFilterChange}
          className="py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
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

      <div className="flex items-center mb-2">
        <label htmlFor="genre" className="hidden md:block mr-2">
          Genre :
        </label>
        <select
          name="genre"
          id="genre"
          onChange={handleFilterChange}
          className="py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
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

      <div className="flex items-center mb-2">
        <label htmlFor="language" className="hidden md:block mr-2">
          Langue :
        </label>
        <select
          name="language"
          id="language"
          onChange={handleFilterChange}
          className="py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        >
          {languages.map((language) => (
            <option
              key={language.iso_639_1}
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
      <div onClick={handleSearch}>
        <LoopSVG className="flex justify-center items-center cursor-pointer w-6 h-6 my-auto text-blue-600 mb-2 hover:scale-150" />
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

  const MovieList = () => {
    if (movies.length === 0) return <NoResult />;

    return (
      <div className="mx-4 mt-4">
        <div className="flex items-stretch flex-wrap justify-center w-full gap-y-20 gap-4">
          {movies.map(
            (movieReq) =>
              movieReq.id &&
              movieReq.poster_path && (
                <Details
                  key={movieReq.id}
                  {...movieReq}
                  genres={ConvertGenres(movieReq.genre_ids)}
                />
              )
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <SearchBar setMovies={setMovies} fetchMovies={fetchMovies} />
      <Filter onFilterChange={handleFilterChange} handleSearch={handleSearch} />
      <MovieList />
    </div>
  );
};

export default Popular;
