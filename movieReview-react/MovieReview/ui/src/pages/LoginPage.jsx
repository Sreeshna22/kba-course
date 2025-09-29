


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {          
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserName: username, Password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Login Failed");
      }

      
      if (data.userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/homepage");
      }
    } catch (err) {
      setError(err.message || "Login Failed: Please try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-sm text-white">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-white">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 p-2 rounded font-semibold"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-white">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-400 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
}
