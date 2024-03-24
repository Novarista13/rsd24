import React, { useEffect, useState } from "react";

import PostCard from "../components/PostCard";

import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../providers/AuthProvider";

const Home = () => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { auth, authUser } = useAuth();

  const like = async (_id) => {
    const result = posts.map((post) => {
      if (post._id === _id) {
        if (post.likes) {
          post.likes.push(authUser._id);
        }
      }
      return post;
    });

    const api = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const owner = posts.filter((post) => post._id === _id)[0].owner._id;

    await fetch(`${api}/notis/like`, {
      method: "POST",
      body: JSON.stringify({ owner, target: _id }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    setPosts(result);
  };

  const unlike = async (_id) => {
    const result = posts.map((post) => {
      if (post._id === _id) {
        if (post.likes) {
          post.likes = post.likes.filter((like) => like !== authUser._id);
        }
      }
      return post;
    });

    const api = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const owner = posts.filter((post) => post._id === _id)[0].owner._id;

    await fetch(`${api}/notis/unlike`, {
      method: "POST",
      body: JSON.stringify({ owner, target: _id }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    setPosts(result);
  };

  const deletePost = (_id) => {
    const result = posts.filter((post) => post._id !== _id);
    setPosts(result);
  };

  useEffect(() => {
    (async () => {
      const api = import.meta.env.VITE_API_URL;
      const res = await fetch(`${api}/posts`);
      if (res.ok) {
        const post = await res.json();
        setPosts(post);
        setIsLoading(false);
      }
    })();
  }, []);

  // <Typography variant="h4" sx={{ marginBottom: 5 }}>
  //   Home
  // </Typography>

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        height: 200,
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    posts?.map((p) => (
      <PostCard
        key={p._id}
        post={p}
        like={like}
        unlike={unlike}
        deletePost={deletePost}
      />
    ))
  );
};

export default Home;
