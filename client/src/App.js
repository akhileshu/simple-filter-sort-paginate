import React from "react";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import "./App.css";

import { useDispatch } from "react-redux";

import NotFoundPage from "./components/NotFoundPage";
import Display from "./components/Products/Display";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Display/>
    },

    {
      path: "/*",
      element: <NotFoundPage />,
    },
  ]);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // ! here we can load app only after userChecked  for loader/spinner on every page

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
