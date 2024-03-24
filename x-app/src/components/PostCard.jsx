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

const PostCard = ({ post, type, like, unlike, remove, focus }) => {
  const navigate = useNavigate();
  const { auth, authUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);

  const photo = `${import.meta.env.VITE_PROFILE_PHOTOS}/${
    post?.owner?.profile
  }`;
  return (
    <Card
      variant="outlined"
      sx={{
        bgcolor: focus ? "post.background" : "transparent",
        my: 5,
        maxWidth: type === "comment" ? 500 : "auto",
        mx: "auto",
      }}
    >
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
            onClick={() => navigate(`/profile/${post?.owner?._id}`)}
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
              {post?.owner?.name && post?.owner?.name[0]}
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
                  {post?.owner?.name && post?.owner?.name}
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
          {authUser && authUser._id === post.owner._id && (
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
                <MenuItem
                  onClick={() => {
                    const api = import.meta.env.VITE_API_URL;
                    fetch(`${api}/posts/${post._id}`, {
                      method: "DELETE",
                    });

                    remove(post._id);
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
        <CardActionArea
          onClick={() => {
            navigate(`/posts/${post._id}`);
          }}
        >
          <Typography
            sx={{
              py: 2,
              px: 1,
              fontSize: focus ? "1.6em" : "1.2em",
            }}
          >
            {post.body}
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
