import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedInApi, loginApi } from "../svc/auth";
import { ILoginInput } from "../interfaces/inputs";
import { useDispatch } from "react-redux";
import userSlice from "../state/slices/userSlice";
import loaderSlice from "../state/slices/loaderSlice";
import React, { useState } from "react";
import { Popup } from "../components/popup/popup";
import { ICommonOutput } from "../interfaces/outputs";

const defaultTheme = createTheme();

export default function Login() {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const [popupState, setPopupState] = useState({ title: "", description: "", open: false });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const setLoader = loaderSlice.actions.setLoader;
    try {
      dispacth(setLoader(true));
      const payload: ILoginInput = {
        email: data.get("email")?.toString() || "",
        accountPassword: data.get("password")?.toString() || "",
      };
      const loginResponse = await loginApi(payload);
      await handleLoginResponse(loginResponse);
    } catch (error) {
      setPopupState({
        title: "Login Failed !",
        description: "Please check your credentials",
        open: true,
      });
    } finally {
      dispacth(setLoader(false));
    }
  };

  const handleLoginResponse = async (loginResponse: ICommonOutput) => {
    if (loginResponse.isSuccess) {
      const isLoggedInResponse = await isLoggedInApi();
      const setCurrentUser = userSlice.actions.setCurrentUser;
      dispacth(setCurrentUser(isLoggedInResponse.result));
      navigate("/");
    } else {
      throw new Error("Login Failed");
    }
  };

  return (
    <>
      <Popup state={popupState} setState={setPopupState} />
      <ThemeProvider theme={defaultTheme}>
        <Container component="div" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Link to={"/register"}>{"Don't have an account? Register"}</Link>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
