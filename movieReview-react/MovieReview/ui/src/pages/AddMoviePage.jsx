

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMoviePage = () => {    
  const [movie, setMovie] = useState({
    MovieTitle: "",
    ReleaseYear: "",
    Type: "",
    PosterFile: null,
  });

  const navigate = useNavigate();   

  const handleChange = (e) => setMovie({ ...movie, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setMovie({ ...movie, PosterFile: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!movie.PosterFile) return alert("Poster is required");

    const formData = new FormData();
    formData.append("MovieTitle", movie.MovieTitle);
    formData.append("ReleaseYear", movie.ReleaseYear);
    formData.append("Type", movie.Type);
    formData.append("Poster", movie.PosterFile);

    try {
      const res = await fetch("/api/admin/addMovie", {
        method: "POST",
        body: formData,
        credentials: "include",                      
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Error adding movie");

      alert(`Movie "${data.newMovie.MovieTitle}" added!`);
      setMovie({ MovieTitle: "", ReleaseYear: "", Type: "", PosterFile: null });
      navigate("/movies");          
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Movie</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Movie Title</label>
            <input
              type="text"
              name="MovieTitle"
              placeholder="Enter movie title" 
              onChange={handleChange} 
              value={movie.MovieTitle}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 "
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Release Year</label>
            <input
              type="text"
              name="ReleaseYear"
              placeholder="Enter release year"
              onChange={handleChange}
              value={movie.ReleaseYear}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 "
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Type</label>
            <input
              type="text"
              name="Type"
              placeholder="Action, Drama, Comedy..."
              onChange={handleChange}
              value={movie.Type}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 "
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Poster</label>
            <input
              type="file"
              name="Poster"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-gray-700"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold px-4 py-2 rounded-lg  "
          >
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMoviePage;

