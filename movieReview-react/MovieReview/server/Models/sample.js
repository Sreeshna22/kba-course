
import {Schema} from 'mongoose';
import {model} from 'mongoose';
import mongoose from "mongoose";






                                       
const demo = new Schema({
  firstName: String,
  lastName: String,
  userName: { type: String, required: true, unique: true },
  password: String,
  userRole: { type: String, enum: ['admin', 'user'], required: true },
});
const sample = model('sample1', demo);









const movieSchema = new Schema({
  MovieTitle: { type: String, required: true },  
  Genre: String,                                 
  Synopsis: String,                              
  MovieImage: String,                            
  ReleaseYear: { type: Date }, 
  BoxOfficeCollection: Number,
  Image: String
});

const Movie = model("Movie", movieSchema);








const reviewSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "sample1", required: true }, // <-- use 'sample1' as ref
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true },
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);
 


export { Review };





const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "sample1", required: true }, // <--- FIXED
    feedback: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
export {sample, Movie,};