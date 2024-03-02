import {
  Drawer,
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { pink, blue, grey } from "@mui/material/colors";

import {
  Home as HomeIcon,
  Person as ProfileIcon,
  PersonAdd as RegisterIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { useUIState } from "../providers/UIStateProvider";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const AppDrawer = () => {
  const { openDrawer, setOpenDrawer } = useUIState();
  const { auth, setAuth, authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <Box sx={{ width: 300 }}>
        {auth && (
          <Box
            sx={{
              height: 150,
              bgcolor: "banner.background",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              p: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ width: 98, height: 98, background: pink[500] }}>
                {authUser?.name[0]}
              </Avatar>
              <Box sx={{ ml: 3 }}>
                <Typography
                  sx={{ fontSize: 18, fontWeight: "bold", color: blue[600] }}
                >
                  {authUser?.name}
                </Typography>
                <Typography sx={{ fontSize: 15, color: grey[600], mt: 1 }}>
                  @{authUser?.handle}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <List>
          {auth && (
            <>
              {["home", "profile", "logout"].map((i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton
                    sx={{ px: 5 }}
                    onClick={() => {
                      if (i === "logout") {
                        setAuth(false);
                        setAuthUser({});
                        localStorage.removeItem("token");
                        navigate("/login");
                      } else navigate(i === "home" ? `/` : `/${i}`);
                      setOpenDrawer(false);
                    }}
                    disableRipple
                  >
                    <ListItemIcon>
                      {i === "home" ? (
                        <HomeIcon />
                      ) : i === "profile" ? (
                        <ProfileIcon />
                      ) : i === "logout" ? (
                        <LogoutIcon />
                      ) : null}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ textTransform: "capitalize" }}
                      primary={i}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}

          {/* <Divider /> */}
          {!auth && (
            <>
              {["register", "login"].map((i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton
                    sx={{ px: 5 }}
                    onClick={() => {
                      navigate(`/${i}`);
                      setOpenDrawer(false);
                    }}
                    disableRipple
                  >
                    <ListItemIcon>
                      {i === "register" ? (
                        <RegisterIcon />
                      ) : i === "login" ? (
                        <LoginIcon />
                      ) : null}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ textTransform: "capitalize" }}
                      primary={i}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default AppDrawer;
