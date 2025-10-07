

import { Router } from "express";
import  authenticate  from "../Middleware/auth.js";
import adminCheck from "../Middleware/admin.js";
import { Movie } from "../Models/sample.js";
import upload from "../Middleware/upload.js";
import {Review} from  "../Models/sample.js"
import Feedback from "../Models/sample.js";



const admin = Router();
function convertToBase64(buffer) {
  return buffer.toString("base64");
}


admin.post(
  "/addMovie",
  authenticate,
  adminCheck,
  upload.single("MovieImage"),
  async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try {
      const { MovieTitle, Genre, Synopsis, BoxOfficeCollection, ReleaseYear } = req.body;

      
      if (!MovieTitle || !ReleaseYear) {
        return res.status(400).json({ msg: "MovieTitle and ReleaseYear required" });
      }

      
      const exists = await Movie.findOne({ MovieTitle });
      if (exists) {
        return res.status(400).json({ msg: "Movie already exists" });
      }

      
      const imageBase64 = req.file ? convertToBase64(req.file.buffer) : null;

    
      const newMovie = new Movie({
        MovieTitle,
        Genre,
        Synopsis,
        BoxOfficeCollection: BoxOfficeCollection ? Number(BoxOfficeCollection) : undefined,
        ReleaseYear:ReleaseYear ? new Date(ReleaseYear) : undefined,
        MovieImage: imageBase64,
      });

      await newMovie.save();

      res.status(201).json({ msg: "Movie added", newMovie });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);









admin.put( "/updateMovie/:id", authenticate, adminCheck,upload.single("MovieImage"), async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).json({ msg: "Movie not found" });

      const { MovieTitle, Genre, ReleaseYear, BoxOfficeCollection, Synopsis } = req.body;

      if (MovieTitle) movie.MovieTitle = MovieTitle;
      if (Genre) movie.Genre = Genre;
      if (ReleaseYear) movie.ReleaseYear = new Date(ReleaseYear);
      if (BoxOfficeCollection) movie.BoxOfficeCollection = Number(BoxOfficeCollection);
      if (Synopsis) movie.Synopsis = Synopsis;

      if (req.file) {
        movie.MovieImage = convertToBase64(req.file.buffer);
      }

      await movie.save();
      res.json({ msg: "Movie updated", movie });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);


admin.get("/movies/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    res.json(movie);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


admin.delete("/deleteMovie/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });
    res.json({ msg: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


admin.get("/movies", authenticate, async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


admin.get("/admin/movies/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    res.json(movie);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});










admin.get("/allReviews", authenticate, adminCheck, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("movieId", "MovieTitle")
      .populate("userId", "userName")
      .sort({ createdAt: -1 });

   
    const filteredReviews = reviews.filter(r => r.movieId);

    res.json({ reviews: filteredReviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});



admin.delete("/deleteReview/:id", authenticate, adminCheck, async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) return res.status(404).json({ msg: "Review not found" });
    res.json({ msg: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

















admin.get("/feedbacks", authenticate, async (req, res) => {
  try {
    if (req.user.userRole !== "admin")
      return res.status(403).json({ msg: "Access denied" });

    const feedbacks = await Feedback.find()
      .populate("userId", "userName")  
      .sort({ createdAt: -1 });

    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});



admin.delete("/feedback/:id", authenticate, async (req, res) => {
  try {
    if (req.user.userRole !== "admin")
      return res.status(403).json({ msg: "Access denied" });

    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Feedback not found" });

    res.json({ msg: "Feedback deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


export { admin };
