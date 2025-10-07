
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { profile, setProfile } = useAuth();

  const handleLogout = async () => {

    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    try {
      
      const res = await fetch("/api/auth/logout", {
      
      
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setProfile(null);
        alert("You have been logged out successfully");
        navigate("/login");
      } else {
        let data;
        try {
          data = await res.json();
        } catch {
          data = { msg: "Logout failed" };
        }
        alert(data.msg || "Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Server error during logout");
    }
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-10 bg-black bg-opacity-95 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="text-red-600 text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Silver Screen Review
        </div>

        <div className="flex items-center space-x-6">
          {profile && (
            <span className="text-white text-lg">
              Hi, Welcome   {profile.userRole === "admin" ? "Admin" : "User"} {profile.userName}
            </span>
          )}

          <Link to="/contact" className="text-white font-semibold hover:text-red-500 text-sm">
            Contact
          </Link>

          {profile ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-3 py-2 rounded-full transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-3 py-2 rounded-full transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
