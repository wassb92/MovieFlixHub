import React, { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { DisplaySuccess, DisplayError } from "../components/DisplayNotice";

const NeedRegister = () => {
  return (
    <span className="mt-4 text-xs block py-4">
      Vous avez un compte ?{" "}
      <Link className="text-blue-500 " to="/login">
        Se connecter
      </Link>
    </span>
  );
};

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    if (user.password !== user.confirmPassword) {
      setUser({ ...user, password: "", confirmPassword: "" });
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3 * 1000);
      return setError("Les mots de passe ne correspondent pas");
    }

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${global.API_ENDPOINT}/api/auth/register`,
        {
          email: user.email,
          password: user.password,
        },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response?.data?.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-main to-secondary">
      <form
        className="px-10 pt-10 bg-white rounded-xl drop-shadow-lg space-y-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-3xl">S'enregistrer</h1>
        <div className="flex flex-col space-y-2">
          <Input
            type="email"
            placeholder="Votre Email"
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
            header="Mot de passe"
            value={user.password}
            onChange={handleChange}
            required={true}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            type="password"
            placeholder="Confirmer votre mot de passe"
            name="confirmPassword"
            id="password"
            header="Confirmation de votre mot de passe"
            value={user.confirmPassword}
            onChange={handleChange}
            required={true}
          />
        </div>
        {error && <DisplayError message={error} />}
        {success && <DisplaySuccess message={success} />}

        <div className="flex justify-center mt-4">
          <Button type="submit" children="Créer mon compte" />
        </div>
        <NeedRegister />
      </form>
    </div>
  );
};

export default Register;
