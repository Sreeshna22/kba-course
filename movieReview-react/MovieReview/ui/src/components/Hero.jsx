



       

import movieBg from "../assets/images/movie.jpg"; 
import { Link } from "react-router-dom";


export default function Hero() {
  return (
    <div className="relative h-screen">
      
      <div
        className="absolute inset-0 bg-cover bg-center h-full"
        style={{ backgroundImage: `url(${movieBg})` }}
      ></div>

    
      <div className="absolute inset-0 bg-black opacity-70 h-full"></div>


      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-red-600 mb-6 drop-shadow-lg">
          NEW RELEASES THIS WEEK
        </h3>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-gray-200">
          Dive into the latest movie reviews, ratings, and fan discussions. Stay updated with trending films and honest opinions.
        </p>
        
        <Link
  to="/movies"
  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition"
>
  Browse Now
</Link>
      </div>
    </div>
  );
}
