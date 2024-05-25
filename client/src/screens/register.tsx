import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IRegisterInput } from "../interfaces/inputs";
import { registerApi } from "../svc/auth";
import loaderSlice from "../state/slices/loaderSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Popup } from "../components/popup/popup";

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [popupState, setPopupState] = useState({
    title: "",
    description: "",
    open: false,
  });

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    const setLoader = loaderSlice.actions.setLoader;
    try {
      event.preventDefault();
      dispatch(setLoader(true));
      const data = new FormData(event.currentTarget);
      const payload: IRegisterInput = {
        accountPassword: data.get("password")?.toString() || "",
        email: data.get("email")?.toString() || "",
        firstName: data.get("firstName")?.toString() || "",
        lastName: data.get("lastName")?.toString() || "",
      };
      const response = await registerApi(payload);
      if (response.isSuccess) {
        navigate("/login");
      } else {
        throw new Error("Registration Failed !");
      }
    } catch (error) {
      setPopupState({
        title: "Registration Failed !",
        description: "Please check your credentials",
        open: true,
      });
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <>
      <Popup state={popupState} setState={setPopupState} />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
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
              <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={handleRegister}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="First Name"
                type="text"
                id="first-name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                type="text"
                id="last-name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
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
                Register
              </Button>
              <Link to={"/login"}>{"Already have an account? Login"}</Link>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
