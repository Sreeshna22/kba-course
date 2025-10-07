import React from "react";

function Trailer() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 px-6 py-10">
      
      <div className="w-full md:w-1/2">
        <div className="aspect-video">
          <iframe
            src="https://www.youtube.com/embed/6WrNoNra_2U?si=y5ffVFtV-3UbXwSB"
            title="YouTube trailer"
            className="w-full h-64 md:h-80 rounded-lg shadow-lg"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-6xl font-bold text-red-600 mb-4">
          Watch Movie <br /> Trailer
        </h1>
      </div>
    </div>
  );
}

export default Trailer;
