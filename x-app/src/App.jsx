import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AddPost from "./pages/AddPost";
import Likes from "./pages/Likes";
import Notis from "./pages/Notis";
import Post from "./pages/Post";
import Search from "./pages/Search";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import EditProfile from "./pages/EditProfile";

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
        path: "/notis",
        element: <Notis />,
      },
      {
        path: "/post/new",
        element: <AddPost />,
      },
      {
        path: "/posts/:id",
        element: <Post />,
      },
      {
        path: "/likes/:id",
        element: <Likes />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/followers/:id",
        element: <Followers />,
      },
      {
        path: "/following/:id",
        element: <Following />,
      },
      {
        path: "/edit",
        element: <EditProfile />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
