import { Router } from 'express';
import { authenticate } from '../Middleware/auth.js';
import admincheck from '../Middleware/admin.js';
import { Movie } from '../Models/sample.js'; 

const admin = Router();

admin.post('/addMovie', authenticate, admincheck, async (req, res) => {
  try {
    const { movieTitle, movieType, releaseDate, review } = req.body;

    const existingMovie = await Movie.findOne({ movieTitle });         
    if (existingMovie) {
      return res.status(400).json({ msg: 'Movie already exists' });
    }
             
    const newMovie = new Movie({ movieTitle, movieType, releaseDate, review });
    await newMovie.save();

    res.status(201).json({ msg: 'Movie successfully added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

admin.put('/updateMovie', authenticate, admincheck, async (req, res) => {
  try {
    const { movieTitle, movieType, releaseDate, review } = req.body;

    const updatedMovie = await Movie.findOneAndUpdate(
      { movieTitle },
      { movieType, releaseDate, review },
      { new: true }
    );

    if (!updatedMovie) return res.status(404).json({ msg: 'Movie not found' });

    res.status(200).json({ msg: 'Movie updated successfully', updatedMovie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

admin.get('/getMovie', authenticate, admincheck, async (req, res) => {
  try {
    const title = req.query.movieTitle;

    const movie = await Movie.findOne({ movieTitle: title });

    if (!movie) return res.status(404).json({ msg: 'Movie not found' });

    res.status(200).json({ movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

admin.delete('/deleteMovie', authenticate, admincheck, async (req, res) => {
  try {
    const { movieTitle } = req.body;

    const deletedMovie = await Movie.findOneAndDelete({ movieTitle });

    if (!deletedMovie) return res.status(404).json({ msg: 'Movie not found' });

    res.status(200).json({ msg: 'Movie deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

export { admin };
 
