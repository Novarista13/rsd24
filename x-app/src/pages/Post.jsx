import React from "react";
import { useEffect, useState } from "react";

import PostCard from "../components/PostCard";

import { Box, CircularProgress } from "@mui/material";

const Post = () => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);

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

  console.log(posts);
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
    posts?.map((p) => <PostCard key={p._id} data={p} />)
  );
};

export default Post;
