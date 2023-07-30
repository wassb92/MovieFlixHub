const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  movieId: { type: Number, required: false },
  title: { type: String, required: false },
  poster_path: { type: String, required: false },
});

module.exports = MovieSchema;
