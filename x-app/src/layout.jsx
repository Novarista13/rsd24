import { Outlet } from "react-router-dom";
import AppDrawer from "./components/AppDrawer";
import Header from "./components/Header";
import { Alert, Box, Container, Snackbar, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useUIState } from "./providers/UIStateProvider";
import { useAuth } from "./providers/AuthProvider";

import { useEffect } from "react";

const token = localStorage.getItem("token");
const wsURL = import.meta.env.VITE_WS_URL;
const wsc = new WebSocket(`${wsURL}/subscribe`);

wsc.addEventListener("open", () => {
  if (token) {
    wsc.send(token);
  }
});

function Layout() {
  const { openFeedback, setOpenFeedback, feedbackMessage, setNotiCount } =
    useUIState();

  const { auth } = useAuth();
  const navigate = useNavigate();

  wsc.addEventListener("message", (e) => {
    const data = JSON.parse(e.data);
    if (data.type === "notis") {
      setNotiCount(data.notiCount);
    }
  });

  useEffect(() => {
    if (auth) {
      const token = localStorage.getItem("token");
      wsc.send(token);
    }
  }, [auth]);

  return (
    <Box>
      <AppDrawer />
      <Header />
      <Container maxWidth="sm" sx={{ mt: 10 }}>
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
