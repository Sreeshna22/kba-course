
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar2";

export default function AddMoviePage() {
  const [form, setForm] = useState({
    MovieTitle: "",
    Genre: "",
    ReleaseYear: "",
    BoxOfficeCollection: "",
    Synopsis: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (file) data.append("MovieImage", file);

      
       const res = await fetch("/api/admin/addMovie", {
        method: "POST",
        credentials: "include",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert(" " + result.msg);
        setForm({
          MovieTitle: "",
          Genre: "",
          ReleaseYear: "",
          BoxOfficeCollection: "",
          Synopsis: "",
        });
        setFile(null);
      } else {
        alert(" " + result.msg);
      }
    } catch (err) {
      alert(" Error: " + err.message);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar title="Add New Movie" backLink="/admin/dashboard" />

      <div className="max-w-2xl mx-auto mt-10 bg-gray-900 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm mb-1">Movie Title</label>
            <input
              type="text"
              name="MovieTitle"
              value={form.MovieTitle}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black text-white border border-red-600"
              placeholder="Enter movie title"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm mb-1">Genre</label>
            <input
              type="text"
              name="Genre"
              value={form.Genre}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black text-white border border-red-600"
              placeholder="Enter Genre"
            />
          </div>

          
          <div>
            <label className="block text-sm mb-1">Release Year</label>
            <input
              type="date"
              name="ReleaseYear"
              value={form.ReleaseYear}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black text-white border border-red-600"
            />
          </div>

          
          <div>
            <label className="block text-sm mb-1">Box Office Collection (USD)</label>
            <input
              type="number"
              name="BoxOfficeCollection"
              value={form.BoxOfficeCollection}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black text-white border border-red-600"
              placeholder="Enter box office collection"
            />
          </div>

          
          <div>
            <label className="block text-sm mb-1">Synopsis</label>
            <textarea
              rows="3"
              name="Synopsis"
              value={form.Synopsis}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black text-white border border-red-600"
              placeholder="Brief movie description..."
            />
          </div>

          
          <div>
            <label className="block text-sm mb-1">Upload Poster</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 bg-black text-white border border-red-600 rounded"
            />
          </div>

          
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold"
            >
              Submit
            </button>

            <Link
              to="/admin/MovieList"
              className="bg-gray-700 hover:bg-gray-800 px-6 py-2 rounded text-white font-semibold"
            >
              Cancel / View All Movies
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

