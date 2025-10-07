
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sImage from "../assets/images/s.png";

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('user');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      
      
      const response = await fetch("/api/auth/signup", {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    FirstName: firstName,
    LastName: lastName,
    UserName: username,
    Password: password,
    UserRole: userRole,
  }),
});


      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || 'Signup Failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message || 'Signup Failed: Please Try Again!');
    }
  };

  return (
    <div className="bg-black text-white flex items-center justify-center min-h-screen">
      <div className="border border-red-500 p-10 max-w-5xl w-full">
        <div className="flex items-center justify-between">

        
          <div className="w-1/2 flex justify-center">
            <img src={sImage} alt="Left Side" className="rounded shadow-lg max-h-80" />
          </div>

         
          <div className="w-px h-80 bg-red-500 mx-6"></div>

         
          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSignup}>
              <label htmlFor="firstName" className="block mb-1 text-sm text-white">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                className="bg-black border border-red-500 w-full mb-4 p-2 rounded text-white placeholder-red-400"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <label htmlFor="lastName" className="block mb-1 text-sm text-white">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                className="bg-black border border-red-500 w-full mb-4 p-2 rounded text-white placeholder-red-400"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <label htmlFor="username" className="block mb-1 text-sm text-white">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="bg-black border border-red-500 w-full mb-4 p-2 rounded text-white placeholder-red-400"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />

              <label htmlFor="password" className="block mb-1 text-sm text-white">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="bg-black border border-red-500 w-full mb-4 p-2 rounded text-white placeholder-red-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label htmlFor="role" className="block mb-1 text-sm text-white">Role</label>
              <select
                id="role"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="bg-black border border-red-500 w-full mb-6 p-2 rounded text-white"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full block text-center mb-4"
              >
                Sign Up
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
