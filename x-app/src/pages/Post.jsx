import React, { useEffect, useState } from "react";

import PostCard from "../components/PostCard";

import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../providers/AuthProvider";

const Post = () => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { auth, authUser } = useAuth();

  const like = (_id) => {
    const result = posts.map((post) => {
      if (post._id === _id) {
        if (post.likes) {
          post.likes.push(authUser._id);
        }
      }
      return post;
    });

    setPosts(result);
  };

  const unlike = (_id) => {
    const result = posts.map((post) => {
      if (post._id === _id) {
        if (post.likes) {
          post.likes = post.likes.filter((like) => like !== authUser._id);
        }
      }
      return post;
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

export default Post;
