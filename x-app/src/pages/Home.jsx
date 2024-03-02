import { Box, Typography } from "@mui/material";
import Post from "./Post";

const Home = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 5 }}>
        Home
      </Typography>
      <Post />
    </Box>
  );
};

export default Home;
