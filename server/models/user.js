const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const MovieSchema = require("./movie");

const UserSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    favoriteGenreId: { type: Number, required: false },
    likedMovies: [MovieSchema],
    alreadySeen: [MovieSchema],
    playlists: [
      {
        name: { type: String, required: false },
        movies: [MovieSchema],
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
