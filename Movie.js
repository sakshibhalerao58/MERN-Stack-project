const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  rating: Number,
  views: { type: Number, default: 0 }
});

module.exports = mongoose.model("Movie", movieSchema);
