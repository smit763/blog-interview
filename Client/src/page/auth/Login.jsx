import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "../../helpers/Axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("/auth/login", formData);

      if (res.status === 200) {
        const { token, user } = res.data;

        // Store auth data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/");
      }

    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
        px: 2,
      }}
    >
      <Card sx={{ width: 400, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Sign in to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>

            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, height: 45 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Not registered?{" "}
            <span
              style={{ color: "#1976d2", cursor: "pointer" }}
              onClick={() => navigate("/sign-up")}
            >
              Create account
            </span>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
