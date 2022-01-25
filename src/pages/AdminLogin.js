import React from "react";
import TextField from "@mui/material/TextField";
import { Box, Container, Button, CircularProgress } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm(formOptions);

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/admin");
    } catch (e) {
      console.log(e);
      setError("apiError", {
        message: "Hiba a bejelentkezés során!",
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {isSubmitting && <CircularProgress />}
        <TextField
          {...register("email")}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email cím"
          name="email"
          autoFocus
        />
        <TextField
          {...register("password")}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Jelszó"
          type="password"
          id="password"
        />
        <div style={{ color: "red" }}>{errors.apiError?.message}</div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Bejelentkezés
        </Button>
      </Box>
    </Container>
  );
};

export default AdminLogin;
