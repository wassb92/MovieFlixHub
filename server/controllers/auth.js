const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
require("dotenv").config({ path: "./.env" });

exports.register = async function (req, res) {
  const { email, password, favoriteGenre } = req.body;

  const confirmToken = jwt.sign(
    { email: email, password: password, favoriteGenre: favoriteGenre },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  try {
    const decodedToken = jwt.verify(confirmToken, process.env.JWT_SECRET);
    const password = bcrypt.hashSync(decodedToken.password, 10);
    await User.create({
      email: decodedToken.email,
      password: password,
      favoriteGenre: decodedToken.favoriteGenre,
    });
    res.status(200).json({ success: true, data: "Succès de l'inscription" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server: échec de l'enregistrement" });
  }
};

exports.login = async (req, res, next) => {
  const { email, password, favoriteGenre, rememberMe } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Veuillez remplir tous les champs" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      if (!favoriteGenre) {
        return res.status(400).json({
          error: "Veuillez choisir un genre de film favori",
          firstAuth: true,
        });
      }
      return this.register(req, res);
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({
      message: "Authentification réussie",
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: rememberMe ? process.env.JWT_EXPIRE : "1s",
      }),
    });
  } catch (err) {
    res.status(500).json({ error: "Server: échec de l'authentification" });
  }
};

exports.deleteRefreshToken = async (req, res, next) => {
  const { user } = req.body;
  const { service } = req.body;
  const userId = user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Utilisateur non trouvé" });
    }
    user[service] = undefined;
    await user.save();
    res.status(200).json({ success: true, data: "Token supprimé" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.users = async function (req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.usersId = async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteUser = async function (req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error });
  }
};
