import { Schema} from "mongoose";
import {model}  from "mongoose"
import mongoose from "mongoose";
const demo = new Schema({
    FirstName :String,
    LastName : String,
     UserName: {type:String,required:true,unique:true},
      Password: String, 
      UserRole : {type :String,enum:['admin','user'],required:true}
});
const Sample= model('sample',demo)   
const movieSchema = new Schema({
  movieTitle: { type: String, required: true },
  movieType: { type: String },
  releaseDate: { type: Date },
  review: { type: String }
});


const Movie = model('Movie', movieSchema);

export { Sample,Movie };




