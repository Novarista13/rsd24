import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import AppDrawer from "./components/AppDrawer";
import Header from "./components/Header";

function Layout() {
  return (
    <Box>
      <AppDrawer />
      <Header />
      <Container maxWidth="sm" sx={{mt:4}}>
        <Outlet />
      </Container>
    </Box>
  );
}

export default Layout;
