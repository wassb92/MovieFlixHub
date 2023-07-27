import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MovieBox from "./MovieBox";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, FormControl } from "react-bootstrap";

global.API_KEY = "55bb5aeea2538b26cf848582959d4fc8";
global.API_ENDPOINT = "https://api.themoviedb.org/3";

const API_URL = `${global.API_ENDPOINT}/movie/popular?api_key=${global.API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const fetchMovies = async () => {
    try {
      const res = await axios.get(API_URL);
      const data = await res.data;
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const searchHandler = async (e) => {
    setQuery(e.target.value);
    const instantQuery = e.target.value;
    if (instantQuery.length < 1) return fetchMovies();

    try {
      const url = `${global.API_ENDPOINT}/search/movie?api_key=${global.API_KEY}&query=${instantQuery}`;
      const res = await axios.get(url);
      const data = await res.data;

      console.log(data);
      setMovies(data.results);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">MovieDb App</Navbar.Brand>
          <Navbar.Brand href="/home">Trending</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <FormControl
              type="search"
              placeholder="Movie Search"
              className="me-2"
              aria-label="search"
              name="query"
              value={query}
              onChange={searchHandler}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map(
                (movieReq) =>
                  movieReq.id &&
                  movieReq.poster_path && (
                    <MovieBox key={movieReq.id} {...movieReq} />
                  )
              )}
            </div>
          </div>
        ) : (
          <h2>{query} n'existe pas</h2>
        )}
      </div>
    </>
  );
}

export default App;
