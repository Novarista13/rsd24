import {
  MoreVert as MenuIcon,
  Comment as CommentIcon,
  Delete as DeleteIcon,
  Favorite as LikeIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { blue, green, grey, pink } from "@mui/material/colors";
import { format } from "date-fns";
import LikeButton from "./LikeButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../providers/AuthProvider";

const PostCard = ({ post, like, unlike, deletePost }) => {
  const navigate = useNavigate();
  const { auth, authUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);

  const photo = `${import.meta.env.VITE_PROFILE_PHOTOS}/${
    post?.owner?.profile
  }`;

  return (
    <Card sx={{ mb: 5 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <CardActionArea
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 2,
            }}
            onClick={() => navigate(`/profile/${post?.owner._id}`)}
          >
            <Avatar
              src={photo}
              sx={{
                width: 50,
                height: 50,
                bgcolor: blue[600],
                cursor: "pointer",
              }}
            >
              {post?.owner?.name[0]}
            </Avatar>
            <Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Typography
                  sx={{
                    marginRight: 5,
                    fontWeight: "bold",
                    color: blue[600],
                    cursor: "pointer",
                  }}
                >
                  {post?.owner?.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: green[500],
                  }}
                >
                  -{" "}
                  {
                    // new Date(post?.created).toDateString().slice(4)
                    post?.created && format(post?.created, "MM/dd/yyyy")
                  }
                </Typography>
              </Box>

              <Typography
                sx={{ color: grey[500], fontSize: 13, cursor: "pointer" }}
              >
                @{post?.owner?.handle}
              </Typography>
            </Box>
          </CardActionArea>
          <Box>
            <IconButton
              onClick={(e) => {
                setShowMenu(true);
                setMenuPosition(e.currentTarget);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={menuPosition}
              open={showMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={() => {
                setShowMenu(false);
              }}
            >
              {authUser?._id === post?.owner._id && (
                <MenuItem
                  onClick={async () => {
                    deletePost(post?._id);
                    const token = localStorage.getItem("token");
                    const api = import.meta.env.VITE_API_URL;
                    console.log(post?._id);
                    const res = await fetch(`${api}/posts/${post?._id}`, {
                      method: "DELETE",
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                    console.log(res);
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Box>
        <CardActionArea>
          <Typography
            sx={{ py: 2, px: 1 }}
            variant="body2"
            color="text.secondary"
          >
            {post?.body}
          </Typography>
        </CardActionArea>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <ButtonGroup>
            {auth && post?.likes ? (
              <LikeButton post={post && post} like={like} unlike={unlike} />
            ) : (
              <IconButton>
                <LikeIcon sx={{ color: pink[500] }} />
              </IconButton>
            )}
            <Button
              variant="text"
              onClick={() => navigate(`/likes/${post._id}`)}
            >
              {post?.likes?.length + " "}
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <IconButton aria-label="add to favorites">
              <CommentIcon sx={{ color: blue[500] }} />
            </IconButton>
            <Button variant="text">{post?.comments?.length + " "}</Button>
          </ButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
{
  /* <Box sx={{ display: "flex", alignItems: "center" }}>
  <Avatar sx={{ width: 40, height: 40, background: pink[500] }}>m</Avatar>
  <Box sx={{ ml: 2 }}>
    
  </Box>
</Box>; */
}
