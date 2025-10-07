
import React from "react";

const MovieCard = ({ title, poster, year, type }) => {
  return (
    <div>
      {poster && <img src={poster} alt={title} className="w-full h-64 object-cover rounded" />}
      <div className="mt-2">
        <h2 className="font-bold text-lg">{title}</h2>
        <p>{type} | {year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
