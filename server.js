const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Movie = require("./models/Movie");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/recommendationDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ✅ POST route (THIS FIXES YOUR ERROR)
app.post("/movies", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET route
app.get("/movies", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.listen(5000, () => {
  console.log("Backend running on 5000");
});
