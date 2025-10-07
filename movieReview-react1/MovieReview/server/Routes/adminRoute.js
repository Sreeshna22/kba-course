



import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/admin.js";
import { Movie } from "../Models/sample.js";
import upload from "../Middleware/upload.js";

const admin = Router();         


const convertToBase64 = (buffer) => buffer.toString("base64");

admin.post(
  "/addMovie",
  authenticate,
  adminCheck,
  upload.single("Poster"),
  async (req, res) => {
    try {
      const { MovieTitle, ReleaseYear, Type } = req.body;
      if (!MovieTitle || !ReleaseYear || !Type)
        return res.status(400).json({ msg: "All fields are required" });

      const exists = await Movie.findOne({ MovieTitle });
      if (exists) return res.status(400).json({ msg: "Movie already exists" });

      const Poster = req.file ? convertToBase64(req.file.buffer) : null;
      if (!Poster) return res.status(400).json({ msg: "Poster is required" });

      const newMovie = new Movie({      
        MovieTitle,           
        ReleaseYear: Number(ReleaseYear),
        Type,
        Poster,
      });

      await newMovie.save();
      res.status(201).json({ msg: "Movie added", newMovie });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }   
  }
);

admin.get("/movies", authenticate, adminCheck, async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


 


export { admin };





