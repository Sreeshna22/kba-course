// import React from 'react'
// import Navbar from './components/Navbar'
// import Hero from './components/Hero'
// import TopCourses from './components/TopCourses'
// import CourseGrid from './components/CourseGrid'
// import coursesData from './assets/data/courses.json'
// import AllCoursesButton from './components/AllCoursesButton'

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Hero />
//       <TopCourses />
//       <CourseGrid />
//       <AllCoursesButton />

//     </div>
//   )
// }

// export default App
import React from 'react'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import HomePage from './pages/HomePage'
import CoursesPage from './pages/CoursesPage'
import ContactPage from './pages/ContactPage'
import AddCoursePage from './pages/AddCoursePage'
import  NotFoundPage from './pages/NotFoundPage'
import CoursePage, { courseLoader } from './pages/CoursePage'
import EditCoursePage from './pages/EditCoursePage'

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {index:true, element:<Login />}, // "/"
      {path: "sign-up", element: <Signup />},  // "/sign-up"
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {path: "home", element: <HomePage />},
      {path: "courses", element: <CoursesPage />},
      {path: "contact", element: <ContactPage />},
      {path: "add-course", element: <AddCoursePage />},
      {path: "dashboard", element: <Dashboard />},
      {path: "courses/:courseName",element: <CoursePage />,loader: courseLoader,},
      {path: "edit-course/:courseName", element: <EditCoursePage />},
      {path: "*", element: <NotFoundPage />},
    ],
  },
])
const App = () => {
  return <RouterProvider router={router} />
}
export default App