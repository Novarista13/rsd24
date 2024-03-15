import {
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
} from "@mui/icons-material";
import { IconButton, Button, ButtonGroup } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useAuth } from "../providers/AuthProvider";

const LikeButton = ({ post, like, unlike }) => {
  const { authUser } = useAuth();
  const token = localStorage.getItem("token");

  return (
    <IconButton
      aria-label="add to favorites"
      onClick={async (e) => {
        e.preventDefault();
        post?.likes?.find((like) => like === authUser?._id)
          ? unlike(post?._id)
          : like(post?._id);
        const api = import.meta.env.VITE_API_URL;
        const res = await fetch(`${api}/posts/like/${post?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }}
    >
      {post?.likes?.find((like) => like === authUser?._id) ? (
        <LikedIcon sx={{ color: pink[500] }} />
      ) : (
        <LikeIcon sx={{ color: pink[500] }} />
      )}
    </IconButton>
  );
};

export default LikeButton;
