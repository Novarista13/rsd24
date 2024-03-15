import { Outlet } from "react-router-dom";
import AppDrawer from "./components/AppDrawer";
import Header from "./components/Header";
import { Alert, Box, Container, Snackbar, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useUIState } from "./providers/UIStateProvider";

function Layout() {
  const { openFeedback, setOpenFeedback, feedbackMessage } = useUIState();
  const navigate = useNavigate();
  return (
    <Box>
      <AppDrawer />
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Outlet />
        <Fab
          sx={{ position: "fixed", bottom: 50, right: 50 }}
          size="medium"
          color="primary"
          aria-label="add"
          onClick={() => {
            navigate("/post/new");
          }}
        >
          <AddIcon />
        </Fab>
      </Container>
      <Snackbar
        open={openFeedback}
        autoHideDuration={4000}
        onClose={() => {
          setOpenFeedback(false);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert severity="info" variant="filled" sx={{ width: "100%" }}>
          {feedbackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Layout;
