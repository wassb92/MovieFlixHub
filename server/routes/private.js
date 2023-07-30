const express = require("express");
const router = express.Router();
const {
  getPrivateRoute,
  addLikedMovie,
  addAlreadySeen,
  playlists,
  deletePlaylist,
  addMovieToPlaylist,
} = require("../controllers/private");
const { protect } = require("../middleware/auth");

router.route("/private/account").get(protect, getPrivateRoute);
router.route("/private/likedMovies").put(protect, addLikedMovie);
router.route("/private/alreadySeen").put(protect, addAlreadySeen);
router.route("/private/playlists").put(protect, playlists);
router.route("/private/playlists/:name").delete(protect, deletePlaylist);
router.route("/private/playlists/add-movie").put(protect, addMovieToPlaylist);

module.exports = router;
