import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import axios from "axios";
import { DisplayError } from "../components/DisplayNotice";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

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

const ForgetPassword = () => {
  return (
    <div>
      <Link to="/forgotpassword" className="underline underline-offset-1">
        Mot de passe oublié ?
      </Link>
    </div>
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
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error || error?.message);
      setTimeout(() => {
        setError("");
      }, 3 * 1000);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-main to-secondary">
      <div className="flex justify-center ">
        <Button
          className="px-10 py-2 bg-soft text-white rounded-md hover:bg-main hover:drop-shadow-md duration-200 ease-in border my-6"
          children={<HomeIcon className="w-6 h-6" />}
          onClick={() => navigate("/")}
        />
      </div>

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
          <ForgetPassword />
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

export default Login;
