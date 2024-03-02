import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Input,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { useAuth } from "../providers/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setAuth, setAuthUser } = useAuth();

  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" sx={{ my: 2 }}>
        Login
      </Typography>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const handle = inputRef.current.value;
          const password = passwordRef.current.value;

          if (!handle || !password) {
            setHasError(true);
            setErrorMessage("handle or password required");
          }

          const api = import.meta.env.VITE_API_URL;
          const res = await fetch(`${api}/login`, {
            method: "POST",
            body: JSON.stringify({ handle, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            // setErrorMessage((await res.json().msg))
            setErrorMessage("Incorrect Handle or Password");
            setHasError(true);
            return false;
          }

          const data = await res.json();
          localStorage.setItem("token", data.token);

          fetch(`${api}/verify`, {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          })
            .then((res) => res.json())
            .then((user) => {
              setAuth(true);
              setAuthUser(user);
              navigate("/");
            });
        }}
      >
        {hasError && (
          <Alert sx={{ my: 2 }} severity="error">
            {errorMessage}
          </Alert>
        )}
        <TextField
          inputRef={inputRef}
          fullWidth
          type="text"
          label="Handle"
          sx={{ my: 2 }}
          variant="outlined"
        />
        <TextField
          inputRef={passwordRef}
          fullWidth
          type="password"
          label="Password"
          sx={{ my: 2 }}
          variant="outlined"
        />
        <Button type="submit" sx={{ my: 2 }} fullWidth variant="contained">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
