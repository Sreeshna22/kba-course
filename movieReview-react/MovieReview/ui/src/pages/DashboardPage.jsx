
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminDashboard() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
        const res = await fetch("/api/auth/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          throw new Error("Unauthorized Access!");
        }

        const data = await res.json();
        setProfile({
          userName: data.userName,
          userRole: data.userRole,
        });
      } catch (err) {
        setError(err.message);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      
       const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        alert("Logged out successfully");
        navigate("/login");
      } else {
        const data = await res.json();
        alert(data.msg || "Failed to logout");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex">
  
      <aside className="w-64 bg-black hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-red-500">SilverScreen Review</h2>
          <nav className="mt-8 space-y-3">
            <Link to="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-red-700">
              Dashboard
            </Link>
            <Link to="/admin/add" className="block py-2 px-4 rounded hover:bg-red-700">
              Add Movie
            </Link>
            <Link to="/admin/manage-users" className="block py-2 px-4 rounded hover:bg-red-700">
              Manage Users
            </Link>
            <Link to="/admin/manage-reviews" className="block py-2 px-4 rounded hover:bg-red-700">
              Manage Reviews
            </Link>
          </nav>
        </div>
      </aside>

   
      <main className="flex-1 p-6 bg-red-600">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300">Welcome, Admin. Overview of the system.</p>
          </div>
          <div className="flex items-center gap-4">
            <i className="fa-solid fa-user text-white text-xl"></i>
            <button
              onClick={handleLogout}
              className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

       
        <div className="mb-6">
          {error && <p className="text-red-500">{error}</p>}
          {profile ? (
            <div className="bg-black p-4 rounded">
              <p>Welcome, {profile.userName}</p>
              <p>Your Role is: {profile.userRole}</p>
            </div>
          ) : (
            <p>Loading Profile...</p>
          )}
        </div>

        
        <div className="bg-black text-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-white">Admin Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/add"
              className="bg-white hover:bg-gray-100 text-black text-center px-4 py-3 rounded shadow"
            >
              Add New Movie
            </Link>
            <Link
              to="/admin/MovieList"
              className="bg-white hover:bg-gray-100 text-black text-center px-4 py-3 rounded shadow"
            >
              View Admin Added Movies
            </Link>
            <Link
              to="/admin/manage-reviews"
              className="bg-white hover:bg-gray-100 text-black text-center px-4 py-3 rounded shadow"
            >
              Manage Reviews
            </Link>
            <Link
              to="/admin/manage-users"
              className="bg-white hover:bg-gray-100 text-black text-center px-4 py-3 rounded shadow"
            >
              Manage Users
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
