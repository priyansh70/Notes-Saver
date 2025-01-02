import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/Home";
import Notes from "./page/Notes";
import ViewNote from "./page/ViewNote";
import NotFound from "./page/NotFound";
import Navbar from "./components/Navbar";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";

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
          <Notes />
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
          <ViewNote />
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
  return <RouterProvider router={router} />;
}

export default App;
