import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Input,
  Button,
  TextField,
  Alert,
} from "@mui/material";

const Login = () => {
  const inputRef = useRef();
  const passwordRef = useRef();
  const [hasError, setHasError] = useState(false);

  return (
    <Box>
      <Typography variant="h4" sx={{ my: 2 }}>
        Login
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const handle = inputRef.current.value;
          const password = passwordRef.current.value;
          if (!handle || !password) {
            setHasError(true);
          } else {
            setHasError(false);
          }
          console.log(handle, password);
        }}
      >
        {hasError && (
          <Alert sx={{ my: 2 }} severity="error">
            Login Unsuccessful.
          </Alert>
        )}
        <TextField
          inputRef={inputRef}
          fullWidth
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
