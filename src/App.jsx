import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Note from "./components/Note";
import ViewNote from "./components/ViewNote";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound"

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
          <Note />
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
