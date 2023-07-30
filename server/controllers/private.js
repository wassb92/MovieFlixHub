const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Assurez-vous de bien importer le modèle d'utilisateur (User)

exports.getPrivateRoute = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You got access to the private data in this route",
    user: req.user,
  });
};

exports.addLikedMovie = async (req, res, next) => {
  const { movieId, title, poster_path } = req.body;

  let authToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    authToken = req.headers.authorization.split(" ")[1];
  }

  try {
    if (!authToken) {
      return res.status(401).json({
        message:
          "Accès non autorisé. Veuillez fournir un jeton d'authentification.",
      });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const foundUser = await User.findById(decoded.userId);

    if (!foundUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const existingMovieIndex = foundUser.likedMovies.findIndex(
      (movie) => movie.movieId === movieId
    );

    if (existingMovieIndex !== -1) {
      foundUser.likedMovies.splice(existingMovieIndex, 1);
      await foundUser.save();
      return res.status(200).json({
        message: "ID de film supprimé avec succès du tableau likedMovies",
      });
    }

    foundUser.likedMovies.push({ movieId, title, poster_path });
    await foundUser.save();

    return res.status(200).json({
      message: "ID de film ajouté avec succès au tableau likedMovies",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de l'ID de film",
    });
  }
};

exports.addAlreadySeen = async (req, res, next) => {
  const { movieId, title, poster_path } = req.body;

  let authToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    authToken = req.headers.authorization.split(" ")[1];
  }

  try {
    if (!authToken) {
      return res.status(401).json({
        message:
          "Accès non autorisé. Veuillez fournir un jeton d'authentification.",
      });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    const foundUser = await User.findById(decoded.userId);

    if (!foundUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const existingMovieIndex = foundUser.alreadySeen.findIndex(
      (movie) => movie.movieId === movieId
    );

    if (existingMovieIndex !== -1) {
      foundUser.alreadySeen.splice(existingMovieIndex, 1);
      await foundUser.save();
      return res.status(200).json({
        message: "ID de film supprimé avec succès du tableau alreadySeen",
      });
    }

    foundUser.alreadySeen.push({ movieId, title, poster_path });
    await foundUser.save();

    return res.status(200).json({
      message: "ID de film ajouté avec succès au tableau alreadySeen",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de l'ID de film",
    });
  }
};
