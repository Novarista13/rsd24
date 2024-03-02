import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import { pink, blue, grey, red } from "@mui/material/colors";
import {
  Comment as CommentIcon,
  FavoriteBorder as FavoriteIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

const PostCard = ({ data }) => {
  const [user, setUser] = useState({ name: "Sample" });

  useEffect(() => {
    if (!data) return;
    (async () => {
      const api = import.meta.env.VITE_API_URL;
      const res = await fetch(`${api}/users/${data?.owner}`);
      if (res.ok) {
        const user = await res.json();
        setUser(user);
      }
    })();
  }, []);

  return (
    <Card sx={{ maxWidth: 500, marginBottom: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user?.name[0]}
          </Avatar>
        }
        title={
          <>
            <Typography
              sx={{
                fontSize: 17,
                marginRight: 0.5,
                display: "inline",
                fontWeight: "bold",
                color: blue[600],
              }}
            >
              {user?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                display: "inline",
                color: grey[600],
              }}
            >
              @{user?.handle}
            </Typography>
          </>
        }
        subheader={
          new Date(data?.created).toDateString().slice(4)
          // + " " +
          // new Date(data?.created).toLocaleTimeString()
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data?.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
          <Typography variant="caption" color="text.secondary">
            {data?.likes?.length + " "}
          </Typography>
        </IconButton>
        <IconButton aria-label="add to favorites">
          <CommentIcon />
        </IconButton>
      </CardActions>
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
