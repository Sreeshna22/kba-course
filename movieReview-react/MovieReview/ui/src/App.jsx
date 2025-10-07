
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MyReviewPage from "./pages/MyReviewPage";

import ContactPage from "./pages/ContactPage";

import DashboardPage from "./pages/DashboardPage";
import AddMoviePage from "./pages/AddMoviePage";
import ViewAllMoviesPage from "./pages/ViewAllMoviesPage";
import EditMoviePage from "./pages/EditMoviePage";
import AdminReviewPage from "./pages/AdminReviewPage";
import ManageUser from "./pages/ManageUser";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* User pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/homepage" element={<HomePage />} />
          <Route path="/movies" element={<MovieListPage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
       <Route path="/user/myReviews" element={<MyReviewPage />} />

          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin pages */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/add" element={<AddMoviePage />} />
          <Route path="/admin/MovieList" element={<ViewAllMoviesPage />} />
          <Route path="/admin/edit/:id" element={<EditMoviePage />} />
          <Route path="/admin/manage-reviews" element={<AdminReviewPage />} />
          <Route path="/admin/manage-users" element={<ManageUser />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
