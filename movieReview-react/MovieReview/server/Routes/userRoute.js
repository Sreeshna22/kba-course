
import { Router } from "express";
import  authenticate  from "../Middleware/auth.js";
import { Movie, Review } from "../Models/sample.js";

import mongoose from "mongoose";

const user = Router();














user.get("/movies", authenticate, async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});  


user.post("/addReview", authenticate, async (req, res) => {
  try {
    const { movieId, reviewText, rating } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });

    const existingReview = await Review.findOne({ userId: req.user.id, movieId });
    if (existingReview) return res.status(400).json({ msg: "Already reviewed" });

    const review = new Review({ userId: req.user.id, movieId, reviewText, rating });
    await review.save();
    res.status(201).json({ msg: "Review added", review });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});




user.get("/myReviews", authenticate, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user.id });
    res.json({ reviews });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


                          
   






export { user };
