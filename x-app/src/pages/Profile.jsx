import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { blue, pink } from "@mui/material/colors";

import { useAuth } from "../providers/AuthProvider";
import { Link, useParams, useNavigate } from "react-router-dom";

import PostCard from "../components/PostCard";
import FollowButton from "../components/FollowButton";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [photo, setPhoto] = useState("");
  const [cover, setCover] = useState("");
  const { authUser } = useAuth();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const api = import.meta.env.VITE_API_URL;

      const posts_res = await fetch(`${api}/posts/profile/${id}`);
      setPosts(await posts_res.json());

      const user_res = await fetch(`${api}/users/${id}`);
      const user_data = await user_res.json();

      setUser(user_data);

      const profilePhoto = `${import.meta.env.VITE_PROFILE_PHOTOS}/${
        user_data.profile
      }`;
      setPhoto(profilePhoto);

      const coverPhoto = `${import.meta.env.VITE_COVER_PHOTOS}/${
        user_data.cover
      }`;
      setCover(coverPhoto);

      setIsLoading(false);
    })();
  }, [authUser]);

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

  const remove = (_id) => {
    setPosts(posts.filter((post) => post._id !== _id));
  };

  const getFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });

    return await fileHandle.getFile();
  };

  const changePhoto = async (e) => {
    const file = await getFile();
    setPhoto(URL.createObjectURL(file));

    const filename =
      file.type === "image/png"
        ? `${authUser?._id}-profile.png`
        : `${authUser?._id}-profile.jpg`;

    const formData = new FormData();
    formData.append("profile", file, filename);

    const api = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const res = await fetch(`${api}/users/profile`, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.ok;
  };

  const changeCover = async (e) => {
    const file = await getFile();
    setCover(URL.createObjectURL(file));

    const filename =
      file.type === "image/png"
        ? `${authUser?._id}-profile.png`
        : `${authUser?._id}-profile.jpg`;

    const formData = new FormData();
    formData.append("cover", file, filename);

    const api = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const res = await fetch(`${api}/users/cover`, {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.ok;
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: blue[500],
          height: 200,
          borderRadius: 5,
          cursor: "pointer",
          overflow: "hidden",
        }}
        onClick={async () => {
          user?._id === authUser?._id && changeCover();
        }}
      >
        {cover && <img src={cover} width="100%" />}
      </Box>
      <Box
        sx={{ marginTop: "-64px", marginBottom: "40px", textAlign: "center" }}
      >
        <Button
          onClick={async () => {
            user?._id === authUser?._id && changePhoto();
          }}
        >
          <Avatar
            src={photo}
            sx={{
              width: 120,
              height: 120,
              background: pink[500],
            }}
          ></Avatar>
        </Button>
        <Typography>{user.name}</Typography>
        <Typography sx={{ fontSize: "0.8em", color: "gray" }}>
          @{user.handle}
        </Typography>
        <Box
          sx={{
            my: 1,
            display: "flex",
            gap: 1,
            justifyContent: "center",
            fontSize: "0.8em",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "deeppink" }}
            to={`/followers/${user._id}`}
          >
            {(user.followers && user.followers.length) || 0} Followers
          </Link>
          <span>•</span>
          <Link
            style={{ textDecoration: "none", color: "deeppink" }}
            to={`/following/${user._id}`}
          >
            {(user.following && user.following.length) || 0} Following
          </Link>
        </Box>
        {authUser._id === user._id ? (
          <Button
            size="small"
            variant="contained"
            sx={{ borderRadius: 5, px: 3 }}
            onClick={() => {
              navigate("/edit");
            }}
          >
            Edit
          </Button>
        ) : (
          <FollowButton user={user} />
        )}
      </Box>
      {isLoading ? (
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
        posts?.map((p) => (
          <PostCard
            key={p._id}
            post={p}
            like={like}
            unlike={unlike}
            remove={remove}
          />
        ))
      ) : (
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          User have not posted anything yet
        </Typography>
      )}
    </Box>
  );
};

export default Profile;
