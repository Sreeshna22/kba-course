











import { Router } from "express";
// import mongoose from "mongoose";

import authenticate from "../Middleware/auth.js";

import { Movie, Review } from "../Models/sample.js";
// import User from "../Models/User.js";  
import Feedback from "../Models/sample.js";


const user = Router();




user.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find().lean();

    const moviesWithAvg = await Promise.all(
      movies.map(async (movie) => {
        const reviews = await Review.find({ movieId: movie._id }).lean();

        let avgRating = null;
        if (reviews.length > 0) {
          avgRating =
            reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
        }

        return { ...movie, averageRating: avgRating };
      })
    );

    res.json(moviesWithAvg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


user.get("/reviews/:movieId", async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId }).populate("userId", "userName");
    res.json({ reviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

user.get("/movie/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean();
    if (!movie) return res.status(404).json({ msg: "Movie not found" });


    const reviews = await Review.find({ movieId: movie._id }).lean();

    const numberOfReviews = reviews.length;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        : 0;

    res.json({ 
      movie: {
        ...movie,
        averageRating,
        numberOfReviews,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});



user.get("/movie/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ msg: "Movie not found" });
    res.json({ movie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});


user.post("/addReview", authenticate, async (req, res) => {
  try {
    const { movieId, reviewText, rating } = req.body;

    const newReview = await Review.create({
      movieId,
      userId: req.user._id,
      reviewText,
      rating,
    });

    res.status(201).json({ msg: "Review added", review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});



user.get("/myReviews", authenticate, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .populate("movieId", "MovieTitle")
      .populate("userId", "userName")
      .sort({ createdAt: -1 });

    
    const validReviews = reviews.filter(r => r.movieId);

    res.json({ reviews: validReviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


user.put("/updateReview/:id", authenticate, async (req, res) => {
  try {
    const { text, rating } = req.body;
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { reviewText: text, rating },
      { new: true }
    );
    if (!review) return res.status(404).json({ msg: "Review not found or not yours" });
    res.json({ msg: "Review updated", review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

user.delete("/deleteReview/:id", authenticate, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!review) return res.status(404).json({ msg: "Review not found or not yours" });
    res.json({ msg: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


user.post("/feedback", authenticate, async (req, res) => {
  try {
    const { feedback } = req.body;
    if (!feedback) return res.status(400).json({ msg: "Feedback is required" });

    const newFeedback = new Feedback({
      feedback,
      userId: req.user._id, 
    });

    await newFeedback.save();
    res.status(201).json({ msg: "Feedback submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export { user };