import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "components/Input";
import { DisplayError } from "components/DisplayNotice";
import { Button } from "components/Button";

const NeedRegister = () => {
  return (
    <span className="mt-4 text-xs block py-4">
      Vous n'avez pas de compte ?{" "}
      <Link className="text-blue-500 " to="/register">
        S'enregistrer
      </Link>
    </span>
  );
};

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${global.API_ENDPOINT}/api/auth/login`,
        user,
        config
      );
      localStorage.setItem("authToken", data.token);
      navigate("/hello");
    } catch (error) {
      setError(error?.response?.data?.error);
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
        <div className="px-10 pt-10 bg-white rounded-xl drop-shadow-lg space-y-5">
          <h1 className="text-center text-3xl">Se connecter</h1>
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
          {error && <DisplayError message={error} />}
          <div className="flex justify-center mt-4">
            <Button type="submit" children="Connexion" onClick={loginHandler} />
          </div>
          <NeedRegister />
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center h-screen"
      style={{ backgroundImage: "url('https://rb.gy/p2hphi')" }}
    >
      {/* <img
        src="https://rb.gy/ulxxee"
        alt="Netflix Logo"
        className="w-24 h-auto"
      /> */}
      <div className="flex justify-center items-center h-full">
        <Login />
      </div>
    </div>
  );
};

export default Home;
