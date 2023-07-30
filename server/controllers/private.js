const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Assurez-vous de bien importer le modèle d'utilisateur (User)

exports.getPrivateRoute = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You got access to the private data in this route",
    user: req.user,
  });
};

function getAuthToken(req) {
  let authToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    authToken = req.headers.authorization.split(" ")[1];
  }

  return authToken;
}

exports.addLikedMovie = async (req, res, next) => {
  const { movieId, title, poster_path } = req.body;

  const authToken = getAuthToken(req);

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

  const authToken = getAuthToken(req);

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

exports.playlists = async (req, res, next) => {
  const { playlistName } = req.body;

  const authToken = getAuthToken(req);

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

    const existingPlaylistIndex = foundUser.playlists.findIndex(
      (playlist) => playlist.name === playlistName
    );

    if (existingPlaylistIndex !== -1) {
      return res.status(400).json({
        message: "Une playlist avec ce nom existe déjà",
      });
    }

    foundUser.playlists.push({ name: playlistName, movies: [] });
    await foundUser.save();

    return res.status(200).json({
      message: "Playlist ajoutée avec succès",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout de la playlist",
    });
  }
};

exports.deletePlaylist = async (req, res, next) => {
  const { name } = req.params;

  const authToken = getAuthToken(req);

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

    const existingPlaylistIndex = foundUser.playlists.findIndex(
      (playlist) => playlist.name === name
    );

    if (existingPlaylistIndex === -1) {
      return res.status(400).json({
        message: "Une playlist avec ce nom n'existe pas",
      });
    }

    foundUser.playlists.splice(existingPlaylistIndex, 1);
    await foundUser.save();

    return res.status(200).json({
      message: "Playlist supprimée avec succès",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Une erreur est survenue lors de la suppression de la playlist",
    });
  }
};

exports.addMovieToPlaylist = async (req, res, next) => {
  const { playlistName, movieId, title, poster_path } = req.body;

  const authToken = getAuthToken(req);

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

    const existingPlaylistIndex = foundUser.playlists.findIndex(
      (playlist) => playlist.name === playlistName
    );

    if (existingPlaylistIndex === -1) {
      return res.status(400).json({
        message: "Une playlist avec ce nom n'existe pas",
      });
    }

    const existingMovieIndex = foundUser.playlists[
      existingPlaylistIndex
    ].movies.findIndex((movie) => movie.movieId === movieId);

    if (existingMovieIndex !== -1) {
      foundUser.playlists[existingPlaylistIndex].movies.splice(
        existingMovieIndex,
        1
      );
      await foundUser.save();
      return res.status(200).json({
        message: "ID de film supprimé avec succès de la playlist",
      });
    }

    foundUser.playlists[existingPlaylistIndex].movies.push({
      movieId,
      title,
      poster_path,
    });
    await foundUser.save();

    return res.status(200).json({
      message: "ID de film ajouté avec succès à la playlist",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout du film à la playlist",
    });
  }
};
