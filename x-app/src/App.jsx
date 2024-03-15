import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AddPost from "./pages/AddPost";
import Likes from "./pages/Likes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/post/new",
        element: <AddPost />,
      },
      {
        path: "/likes/:id",
        element: <Likes />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
