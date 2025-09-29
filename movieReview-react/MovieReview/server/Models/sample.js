
import {Schema} from 'mongoose';
import {model} from 'mongoose';

const demo=new Schema({
    firstName:String,
    lastName:String,
    userName:{type:String,required:true,unique:true},
    password:String,
    userRole:{type:String ,enum:['admin','user'],required:true}
});

const sample=model('sample1',demo)


import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  MovieTitle: { type: String, required: true, unique: true },
  Poster: { type: String, required: true }, 
  ReleaseYear: { type: Number, required: true },
  Type: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

export const Movie = mongoose.model("Movie", movieSchema);

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  reviewText: { type: String, required: true },
}, { timestamps: true });
             
const Review = mongoose.model("Review", reviewSchema);

export {sample,Review};