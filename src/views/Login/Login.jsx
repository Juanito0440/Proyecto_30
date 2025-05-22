import React, { useState } from "react";
import {
  Grid,
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "./FirebaseConfig";
// import fondo from './fondo.jpg'
import login from "./IMG/login.jpg";
import "./css/Login.css";

const Login = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputChange = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  const onSubmit = () => {
    axios
      .post("http://localhost:4000/api/login", body)
      .then(({ data }) => {
        localStorage.setItem("auth", "yes");
        localStorage.setItem("rol", data.rol);
        switch (data.rol) {
          case "docente":
            navigate("/usuarios");
            break;
          case "coordinador":
            navigate("/dashboard/default");
            break;
          case "estudiante":
            navigate("/sample-page");
            break;
          default:
            navigate("/");
        }
      })
      .catch(({ response }) => {
        const message =
          typeof response.data === "string"
            ? response.data
            : "Error al iniciar sesión";
        setError(message);
        setBody({ username: "", password: "" });
      });
  };

  const onGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("auth", "yes");
      localStorage.setItem("googleUser", JSON.stringify(user));
      navigate("/dashboard/default");
    } catch (error) {
      console.error("Error en el inicio de sesión con Google:", error);
    }
  };

  return (
    <Grid
      container
      component="main"
      className="login-root"
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Container
        component={Paper}
        elevation={6}
        maxWidth="xs"
        className="glass-card"
      >
        <div className="login-content">
          <Avatar className="login-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="login-title">
            Iniciar Sesión
          </Typography>
          {error && (
            <Typography
              color="error"
              align="center"
              variant="body2"
              className="error-text"
            >
              {error}
            </Typography>
          )}

          <form className="login-form">
            <TextField
              fullWidth
              autoFocus
              margin="normal"
              variant="outlined"
              label="Usuario"
              value={body.username}
              onChange={inputChange}
              name="username"
              InputProps={{ className: "text-field" }}
            />
            <TextField
              fullWidth
              type="password"
              margin="normal"
              variant="outlined"
              label="Contraseña"
              value={body.password}
              onChange={inputChange}
              name="password"
              InputProps={{ className: "text-field" }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="login-button"
              onClick={onSubmit}
            >
              Ingresar
            </Button>
          </form>

          <Typography
            align="center"
            style={{ margin: "16px 0", color: "#aaa" }}
          >
            ó
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={onGoogleSignIn}
            className="google-button"
          >
            Ingresar con Google
          </Button>
        </div>
      </Container>
    </Grid>
  );
};

export default Login;
