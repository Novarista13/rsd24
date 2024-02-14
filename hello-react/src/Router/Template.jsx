/* eslint-disable react/prop-types */
import "../App.css";
import Header from "../components/Header";
import { Container, Box, CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";

const Template = ({ isLoading, list, clear }) => {
  return (
    <Box role="main" className="app">
      <Header count={list.filter((i) => !i.done).length} clear={clear} />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              height: 200,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Outlet />
        )}
      </Container>
    </Box>
  );
};

export default Template;
