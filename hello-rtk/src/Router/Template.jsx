/* eslint-disable react/prop-types */
import "../App.css";
import Header from "../components/Header";
import { Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Template = () =>
  // { list, clear }
  {

    return (
      <Box role="main" className="app">
        <Header
          // count={list.filter((i) => !i.done).length}
          // clear={clear}
        />
        <Container maxWidth="sm" sx={{ mt: 4 }}>
          <Outlet />
        </Container>
      </Box>
    );
  };

export default Template;
