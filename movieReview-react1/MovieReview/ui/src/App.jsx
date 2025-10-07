
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";


import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

import AddMoviePage from "./pages/AddMoviePage";

      


const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/user/homepage", element: <HomePage /> },
  { path: "/admin/dashboard", element: <DashboardPage /> },

  { path: "/addmovie", element: <AddMoviePage /> },  
 
  
]);

export default function App() {
  return <RouterProvider router={router} />;
}
