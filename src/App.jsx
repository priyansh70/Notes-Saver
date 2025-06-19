import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./redux/authSlice";
import Home from "./page/Home";
import Notes from "./page/Notes";
import ViewNote from "./page/ViewNote";
import NotFound from "./page/NotFound";
import Navbar from "./components/Navbar";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="w-full h-full flex flex-col">
        <>
          <Navbar />
          <Home />
        </>
      </div>
    ),
  },
  {
    path: "/notes",
    element: (
      <div className="w-full h-full flex flex-col">
        <>
          <Navbar />
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        </>
      </div>
    ),
  },
  {
    path: "/notes/:id",
    element: (
      <div className="w-full h-full flex flex-col">
        <>
          <Navbar />
          <ProtectedRoute>
            <ViewNote />
          </ProtectedRoute>
        </>
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div className="w-full min-h-screen flex flex-col ">
        <>
          <Navbar />
          <LoginPage />
        </>
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div className="w-full min-h-screen flex flex-col ">
        <>
          <Navbar />
          <SignupPage />
        </>
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <div className="w-full h-full flex flex-col">
        <>
          <Navbar />
          <NotFound />
        </>
      </div>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize authentication state from localStorage
    dispatch(initializeAuth());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
