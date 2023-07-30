const express = require("express");
const router = express.Router();
const {
  getPrivateRoute,
  addLikedMovie,
  addAlreadySeen,
} = require("../controllers/private");
const { protect } = require("../middleware/auth");

router.route("/private/account").get(protect, getPrivateRoute);
router.route("/private/likedMovies").put(protect, addLikedMovie);
router.route("/private/alreadySeen").put(protect, addAlreadySeen);

module.exports = router;
