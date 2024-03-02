import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Input,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const nameRef = useRef();
  const profileRef = useRef();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" sx={{ my: 2 }}>
        Register
      </Typography>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const handle = inputRef.current.value;
          const name = nameRef.current.value;
          const password = passwordRef.current.value;
          const confirmPassword = confirmRef.current.value;
          const profile = profileRef.current.value;
          if (!name || !handle || !password || !confirmPassword) {
            setErrorMessage("name, handle, password all required");
            setHasError(true);
          }
          if (password !== confirmPassword) {
            setErrorMessage("passwords didn't match");
            setHasError(true);
          }

          const api = import.meta.env.VITE_API_URL;
          const res = await fetch(`${api}/users`, {
            method: "POST",
            body: JSON.stringify({ name, handle, password }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            // setErrorMessage((await res.json().msg))
            setErrorMessage("Something went wrong, try again");
            setHasError(true);
            return false;
          }

          const data = await res.json();
          if (data._id) {
            navigate("/login");
          }
        }}
      >
        {hasError && (
          <Alert sx={{ my: 2 }} severity="error">
            {errorMessage}
          </Alert>
        )}

        <TextField
          inputRef={nameRef}
          fullWidth
          label="Name"
          sx={{ my: 2 }}
          variant="outlined"
        />
        <TextField
          inputRef={inputRef}
          fullWidth
          label="Handle"
          sx={{ my: 2 }}
          variant="outlined"
        />
        <TextField
          inputRef={profileRef}
          fullWidth
          label="Profile/Bio"
          multiline
          rows={3}
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

        <TextField
          inputRef={confirmRef}
          fullWidth
          type="password"
          label="Confirm Password"
          sx={{ my: 2 }}
          variant="outlined"
        />
        <Button type="submit" sx={{ my: 2 }} fullWidth variant="contained">
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
