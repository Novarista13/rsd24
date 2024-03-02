import React from "react";
import { useEffect, useState } from "react";

import PostCard from "../components/PostCard";
import { useAuth } from "../providers/AuthProvider";

import { Typography, Box, CircularProgress } from "@mui/material";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { authUser } = useAuth();

  useEffect(() => {
    if (!Object.keys(authUser).length > 0) return;
    (async () => {
      const api = import.meta.env.VITE_API_URL;
      const res = await fetch(`${api}/posts?owner=${authUser._id}`);
      console.log(res);
      if (res.ok) {
        setIsLoading(false);
        const post = await res.json();
        setPosts(post);
      }
    })();
  }, [authUser]);

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
  ) : posts.length > 0 ? (
    posts?.map((p) => <PostCard key={p._id} data={p} />)
  ) : (
    <Typography
      variant="h6"
      color="text.secondary"
      sx={{ textAlign: "center" }}
    >
      You have not posted anything yet
    </Typography>
  );
};

export default Profile;
