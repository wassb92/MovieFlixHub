import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AutoComplete, Input } from "components/Input";
import { DisplayError } from "components/DisplayNotice";
import { Button } from "components/Button";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    favoriteGenreId: 0,
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [options, setOptions] = useState([]);
  const [favoriteGenre, setFavoriteGenre] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      if (isFirstLogin) {
        const favoriteGenreId = options.find(
          (option) => option.name === favoriteGenre
        ).id;
        user.favoriteGenreId = favoriteGenreId;
      }
      const { data } = await axios.post(
        `${global.API_ENDPOINT}/api/auth/login`,
        user,
        config
      );

      localStorage.setItem("authToken", data.token);
      navigate("/account/movies", { state: { loggedIn: true } });
    } catch (error) {
      const isFirstAuth = error?.response?.data?.firstAuth;
      setError(!isFirstAuth && error?.response?.data?.error);
      setIsFirstLogin(isFirstAuth);
      if (isFirstAuth) {
        console.log(
          "url = ",
          `${global.TMDB_API}/genre/movie/list?api_key=${global.API_KEY}&language=fr`
        );
        try {
          const { data } = await axios.get(
            `${global.TMDB_API}/genre/movie/list?api_key=${global.API_KEY}&language=fr`,
            config
          );
          setOptions(data.genres);
          setFavoriteGenre(data.genres[0].name);
        } catch (error) {
          console.log(error);
        }
      }
      setTimeout(() => {
        setError("");
      }, 3 * 1000);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="from-main to-secondary">
      <div className="flex justify-center items-center">
        <div className="md:px-10 md:pt-10 px-2 pt-2 bg-white rounded-xl drop-shadow-lg space-y-5 pb-8">
          <h1 className="text-center md:text-3xl text-xl">Se connecter</h1>
          <div className="flex flex-col space-y-2">
            <Input
              type="email"
              placeholder="Votre email"
              name="email"
              id="email"
              header="Email"
              value={user.email}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Input
              type="password"
              placeholder="Votre mot de passe"
              name="password"
              id="password"
              header="Password"
              value={user.password}
              onChange={handleChange}
              required={true}
            />
          </div>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={user.rememberMe}
                  onChange={(e) =>
                    setUser({ ...user, rememberMe: e.target.checked })
                  }
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Se souvenir de moi"
            />
          </FormGroup>
          {error && <DisplayError message={error} />}
          <div className="flex justify-center mt-4">
            <Button type="submit" children="Connexion" onClick={loginHandler} />
          </div>
        </div>
      </div>
      {isFirstLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="px-20 py-6 bg-white rounded-md shadow-xl">
            <div className="flex flex-col items-center">
              <div className="font-bold text-main text-6xl">
                Hop hop hop, il semblerait que tu sois nouveau !
              </div>
              <br />
              <div className="mb-2 text-xl font-bold text-center text-gray-800 md:text-3xl">
                Pour ta première connexion, nous aurions besoin de connaître ton
                genre de film préféré
              </div>
              {options && options.length > 0 && (
                <AutoComplete
                  options={options.map((option) => option.name)}
                  value={favoriteGenre}
                  setValue={setFavoriteGenre}
                />
              )}
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <Button
                type="submit"
                children="Créer mon compte !"
                onClick={loginHandler}
              />
              <Button
                type="submit"
                children="Annuler"
                onClick={() => setIsFirstLogin(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: "url('https://rb.gy/p2hphi')",
      }}
    >
      <div
        className="w-full text-center text-white font-bold text-3xl bg-whited p-4 mb-6 top-40 relative bg-gradient-to-r from-transparent via-black to-transparent"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div>
          NeoMovie est la solution pour trouver le film parfait pour vous !
        </div>
        <div>
          Créez votre compte et commencez à ajouter des films à vos playlists
        </div>
        <div>
          Vous pouvez également voir les films du moment, les ajouter à vos
          préférences, marquer des films comme déjà vus, et bien plus encore !
        </div>
      </div>
      <div className="flex justify-center items-center h-full">
        <Login />
      </div>
    </div>
  );
};

export default Home;
