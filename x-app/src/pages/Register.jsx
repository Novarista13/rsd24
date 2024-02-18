import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Input,
  Button,
  TextField,
  Alert,
} from "@mui/material";

const Register = () => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const nameRef = useRef();
  const profileRef = useRef();
  const [hasError, setHasError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  return (
    <Box>
      <Typography variant="h4" sx={{ my: 2 }}>
        Register
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const handle = inputRef.current.value;
          const name = nameRef.current.value;
          const password = passwordRef.current.value;
          const confirmPassword = confirmRef.current.value;
          const profile = profileRef.current.value;
          if (!handle || !password || !confirmPassword || !name || !profile) {
            setHasError(true);
          } else {
            setHasError(false);
          }
          if (password !== confirmPassword) {
            setPasswordError(true);
          }
          console.log(password !== confirmPassword);
        }}
      >
        {hasError && (
          <Alert sx={{ my: 2 }} severity="error">
            You need to fill all the fields.
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
        {!hasError && passwordError && (
          <Alert sx={{ my: 2 }} severity="error">
            passwords didn't match
          </Alert>
        )}
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
